-- Run these deliberately invalid statements one at a time, outside a transaction.
-- Each should fail at the named constraint; the sample rows should remain unchanged.

-- 1. test pk course. Expected: pk_course, SQLSTATE 23505.
INSERT INTO portfolio."course" ("course_id", "course_code", "title")
VALUES (1001, 'CS102', 'Discrete Structures');

-- 2. test uq course. Expected: uq_course_0, SQLSTATE 23505.
INSERT INTO portfolio."course" ("course_id", "course_code", "title")
VALUES (11001, 'CS101', 'Alternate Computing');

-- 3. test not null course title. Expected: title, SQLSTATE 23502.
INSERT INTO portfolio."course" ("course_id", "course_code", "title")
VALUES (11002, 'CS102', NULL);

-- 4. test pk candidate. Expected: pk_candidate, SQLSTATE 23505.
INSERT INTO portfolio."candidate" ("candidate_key", "programme_code", "study_year")
VALUES (2001, 'BSC-PHYS', 3);

-- 5. test pk exam. Expected: pk_exam, SQLSTATE 23505.
INSERT INTO portfolio."exam" ("exam_id", "course_id", "starts_at", "venue_code", "seat_limit")
VALUES (3001, 1001, '2026-11-15T09:00:00Z', 'HALL-C', 50);

-- 6. test fk exam course. Expected: fk_exam_0, SQLSTATE 23503.
INSERT INTO portfolio."exam" ("exam_id", "course_id", "starts_at", "venue_code", "seat_limit")
VALUES (13001, 13002, '2026-11-16T09:00:00Z', 'HALL-D', 40);

-- 7. test pk registration. Expected: pk_registration, SQLSTATE 23505.
INSERT INTO portfolio."registration" ("registration_id", "candidate_key", "exam_id", "registered_at", "attendance_state", "score")
VALUES (4001, 2001, 3002, '2026-10-03T10:00:00Z', 'pending', NULL);

-- 8. test uq registration. Expected: uq_registration_0, SQLSTATE 23505.
INSERT INTO portfolio."registration" ("registration_id", "candidate_key", "exam_id", "registered_at", "attendance_state", "score")
VALUES (14001, 2001, 3001, '2026-10-04T10:00:00Z', 'pending', NULL);

-- 9. test fk registration candidate. Expected: fk_registration_0, SQLSTATE 23503.
INSERT INTO portfolio."registration" ("registration_id", "candidate_key", "exam_id", "registered_at", "attendance_state", "score")
VALUES (15003, 15001, 3001, '2026-10-05T10:00:00Z', 'pending', NULL);

-- 10. test fk registration exam. Expected: fk_registration_1, SQLSTATE 23503.
INSERT INTO portfolio."registration" ("registration_id", "candidate_key", "exam_id", "registered_at", "attendance_state", "score")
VALUES (15004, 2002, 15002, '2026-10-06T10:00:00Z', 'pending', NULL);

-- 11. test check registration score. Expected: registration_score_range, SQLSTATE 23514.
INSERT INTO portfolio."registration" ("registration_id", "candidate_key", "exam_id", "registered_at", "attendance_state", "score")
VALUES (16001, 2002, 3001, '2026-10-07T10:00:00Z', 'present', 101);

-- 12. test check registration attendance. Expected: registration_attendance_values, SQLSTATE 23514.
INSERT INTO portfolio."registration" ("registration_id", "candidate_key", "exam_id", "registered_at", "attendance_state", "score")
VALUES (16002, 2002, 3001, '2026-10-08T10:00:00Z', 'late', NULL);

-- 13. test check exam seat limit. Expected: exam_positive_seat_limit, SQLSTATE 23514.
INSERT INTO portfolio."exam" ("exam_id", "course_id", "starts_at", "venue_code", "seat_limit")
VALUES (16003, 1001, '2026-11-17T09:00:00Z', 'HALL-E', 0);
