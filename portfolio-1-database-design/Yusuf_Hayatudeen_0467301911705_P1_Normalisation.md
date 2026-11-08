# MIT 8103 University Examination Management Exercise — normalisation

The example uses the saved sample records. The full set of fields is in the design and schema.

## Starting grouped records

| candidate_key | registration records (list) |
| --- | --- |
| 2001 | [4001] |
| 2002 | [4002] |


The record IDs are grouped in a list. In 1NF, each record has its own row and each cell holds one value.

## 1NF: one value per cell

| registration.registration_id | registration.candidate_key | registration.exam_id | registration.attendance_state | candidate.candidate_key | candidate.programme_code | exam.exam_id | exam.course_id |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 4001 | 2001 | 3001 | present | 2001 | BSC-COMP | 3001 | 1001 |
| 4002 | 2002 | 3002 | pending | 2002 | BSC-MATH | 3002 | 1001 |

Key: registration_id.

## 2NF: depend on the whole key

registration: candidate_key is a proper part of candidate key (candidate_key, exam_id), and determines candidate details. registration: exam_id is a proper part of candidate key (candidate_key, exam_id), and determines exam details.

## candidate_example

| candidate.candidate_key | candidate.programme_code |
| --- | --- |
| 2001 | BSC-COMP |
| 2002 | BSC-MATH |

## exam_example

| exam.exam_id | exam.course_id |
| --- | --- |
| 3001 | 1001 |
| 3002 | 1001 |

## registration_example

| registration.registration_id | registration.candidate_key | registration.exam_id | registration.attendance_state |
| --- | --- | --- | --- |
| 4001 | 2001 | 3001 | present |
| 4002 | 2002 | 3002 | pending |

## 3NF: store each entity’s details once

The entity keys determine their own descriptions. Related records keep foreign keys rather than repeating those descriptions.

## course

| course_id | course_code | title |
| --- | --- | --- |
| 1001 | CS101 | Foundations of Computing |

## candidate

| candidate_key | programme_code | study_year |
| --- | --- | --- |
| 2001 | BSC-COMP | 1 |
| 2002 | BSC-MATH | 2 |

## exam

| exam_id | course_id | starts_at | venue_code | seat_limit |
| --- | --- | --- | --- | --- |
| 3001 | 1001 | 2026-11-10T09:00:00+00:00 | HALL-A | 120 |
| 3002 | 1001 | 2026-11-12T13:30:00+00:00 | HALL-B | 80 |

## registration

| registration_id | candidate_key | exam_id | registered_at | attendance_state | score |
| --- | --- | --- | --- | --- | --- |
| 4001 | 2001 | 3001 | 2026-10-01T10:00:00+00:00 | present | 87.5 |
| 4002 | 2002 | 3002 | 2026-10-02T11:00:00+00:00 | pending | NULL |

## Dependencies

- course: (course_id) → course_code, title
- candidate: (candidate_key) → programme_code, study_year
- exam: (exam_id) → course_id, starts_at, venue_code, seat_limit
- registration: (registration_id) → candidate_key, exam_id, registered_at, attendance_state, score

Joining the decomposed sample tables reproduces the original 2 example rows. The design assumes the declared keys describe the relevant business dependencies.
