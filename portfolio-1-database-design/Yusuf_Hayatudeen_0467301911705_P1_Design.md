# MIT 8103 University Examination Management Exercise — database design

My case study records course, candidate, exam, registration.

## Users

- Examination administrators
- Lecturers
- Invigilators
- Database students

## Main operations

- Maintain courses and pseudonymous candidate records
- Schedule course examinations and record venue and seat limit
- Register candidates for examinations
- Record attendance and examination scores
- Query examination rosters and course-level score summaries

## Entities

| Entity | Information stored |
| --- | --- |
| course | A course whose examination can be scheduled. |
| candidate | A pseudonymous candidate record without a name or institutional student number. |
| exam | A scheduled examination for one course, with a venue label and positive seat limit. |
| registration | A candidate's unique registration for an exam, including attendance and an optional score. |

## course

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| course_id | BIGINT | PK | Yes |
| course_code | TEXT | Unique | Yes |
| title | TEXT |  | Yes |
- Unique key: (course_code).

## candidate

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| candidate_key | BIGINT | PK | Yes |
| programme_code | TEXT |  | Yes |
| study_year | INTEGER |  | Yes |


## exam

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| exam_id | BIGINT | PK | Yes |
| course_id | BIGINT | FK | Yes |
| starts_at | TIMESTAMPTZ |  | Yes |
| venue_code | TEXT |  | Yes |
| seat_limit | INTEGER |  | Yes |
- course_id → course.course_id

## registration

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| registration_id | BIGINT | PK | Yes |
| candidate_key | BIGINT | FK | Yes |
| exam_id | BIGINT | FK | Yes |
| registered_at | TIMESTAMPTZ |  | Yes |
| attendance_state | TEXT |  | Yes |
| score | NUMERIC(18,2) |  | No |
- candidate_key → candidate.candidate_key
- exam_id → exam.exam_id
- Unique key: (candidate_key, exam_id).

## Relationships and business rules

- Every scheduled exam references an existing course.
- Every registration references an existing pseudonymous candidate.
- Every registration references an existing exam.
- A candidate can have at most one registration for a given exam.
- A score, when present, must be between 0 and 100 inclusive.
- Attendance state is restricted to pending, present, or absent.
- An exam's seat limit must be greater than zero.

## Assumptions

- The university is fictional; all keys and any eventual test data are synthetic.
- Candidate keys are opaque, globally unique surrogate keys, not institutional student numbers; no names or real student identifiers are included.
- Primary keys use globally unique synthetic identifiers.
- Each exam belongs to exactly one course, and each registration refers to exactly one candidate and one exam.
- A candidate may register only once for a given exam; registration uniqueness is enforced by a database unique constraint.
- Scores are percentages from 0 through 100 and may be absent until marked; grades, GPA, departments, and academic sessions are outside this compact model.
- The seat limit is a positive exam attribute; enforcing total venue capacity across exams is outside this model.
- The relational database is authoritative; MongoDB is proposed only for derived event documents and reporting.

