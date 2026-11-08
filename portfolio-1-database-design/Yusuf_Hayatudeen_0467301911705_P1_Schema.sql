-- MIT 8103 University Examination Management Exercise: tables, keys and business constraints.
-- Run once in a fresh PostgreSQL database.
BEGIN;
SET LOCAL standard_conforming_strings = on;
CREATE SCHEMA portfolio;
CREATE TABLE portfolio."course" (
  "course_id" bigint NOT NULL,
  "course_code" text NOT NULL,
  "title" text NOT NULL,
  CONSTRAINT "pk_course" PRIMARY KEY ("course_id"),
  CONSTRAINT "uq_course_0" UNIQUE ("course_code")
);
CREATE TABLE portfolio."candidate" (
  "candidate_key" bigint NOT NULL,
  "programme_code" text NOT NULL,
  "study_year" bigint NOT NULL,
  CONSTRAINT "pk_candidate" PRIMARY KEY ("candidate_key")
);
CREATE TABLE portfolio."exam" (
  "exam_id" bigint NOT NULL,
  "course_id" bigint NOT NULL,
  "starts_at" timestamptz NOT NULL,
  "venue_code" text NOT NULL,
  "seat_limit" bigint NOT NULL,
  CONSTRAINT "pk_exam" PRIMARY KEY ("exam_id")
);
CREATE TABLE portfolio."registration" (
  "registration_id" bigint NOT NULL,
  "candidate_key" bigint NOT NULL,
  "exam_id" bigint NOT NULL,
  "registered_at" timestamptz NOT NULL,
  "attendance_state" text NOT NULL,
  "score" numeric(18,2),
  CONSTRAINT "pk_registration" PRIMARY KEY ("registration_id"),
  CONSTRAINT "uq_registration_0" UNIQUE ("candidate_key", "exam_id")
);
ALTER TABLE portfolio."exam" ADD CONSTRAINT "fk_exam_0" FOREIGN KEY ("course_id") REFERENCES portfolio."course" ("course_id");
ALTER TABLE portfolio."registration" ADD CONSTRAINT "fk_registration_0" FOREIGN KEY ("candidate_key") REFERENCES portfolio."candidate" ("candidate_key");
ALTER TABLE portfolio."registration" ADD CONSTRAINT "fk_registration_1" FOREIGN KEY ("exam_id") REFERENCES portfolio."exam" ("exam_id");
ALTER TABLE portfolio."registration" ADD CONSTRAINT "registration_score_range" CHECK (("score" >= 0) AND ("score" <= 100));
ALTER TABLE portfolio."registration" ADD CONSTRAINT "registration_attendance_values" CHECK (("attendance_state" = 'pending') OR ("attendance_state" = 'present') OR ("attendance_state" = 'absent'));
ALTER TABLE portfolio."exam" ADD CONSTRAINT "exam_positive_seat_limit" CHECK ("seat_limit" > 0);
COMMIT;
