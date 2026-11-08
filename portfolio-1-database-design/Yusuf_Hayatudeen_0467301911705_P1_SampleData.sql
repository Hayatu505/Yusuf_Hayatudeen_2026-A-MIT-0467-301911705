-- Fictional sample records for MIT 8103 University Examination Management Exercise.
BEGIN;
SET LOCAL standard_conforming_strings = on;
INSERT INTO portfolio."course" ("course_id", "course_code", "title") VALUES (1001, 'CS101', 'Foundations of Computing');
INSERT INTO portfolio."candidate" ("candidate_key", "programme_code", "study_year") VALUES (2001, 'BSC-COMP', 1);
INSERT INTO portfolio."candidate" ("candidate_key", "programme_code", "study_year") VALUES (2002, 'BSC-MATH', 2);
INSERT INTO portfolio."exam" ("exam_id", "course_id", "starts_at", "venue_code", "seat_limit") VALUES (3001, 1001, '2026-11-10T09:00:00Z', 'HALL-A', 120);
INSERT INTO portfolio."exam" ("exam_id", "course_id", "starts_at", "venue_code", "seat_limit") VALUES (3002, 1001, '2026-11-12T13:30:00Z', 'HALL-B', 80);
INSERT INTO portfolio."registration" ("registration_id", "candidate_key", "exam_id", "registered_at", "attendance_state", "score") VALUES (4001, 2001, 3001, '2026-10-01T10:00:00Z', 'present', 87.5);
INSERT INTO portfolio."registration" ("registration_id", "candidate_key", "exam_id", "registered_at", "attendance_state", "score") VALUES (4002, 2002, 3002, '2026-10-02T11:00:00Z', 'pending', NULL);
COMMIT;
