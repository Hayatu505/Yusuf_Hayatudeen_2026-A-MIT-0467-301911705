-- Show related registration, exam, course records (up to 20).
SELECT t0."registration_id" AS "registration_registration_id",
       t0."registered_at" AS "registration_registered_at",
       t1."exam_id" AS "exam_exam_id",
       t1."starts_at" AS "exam_starts_at",
       t2."course_id" AS "course_course_id",
       t2."course_code" AS "course_course_code"
FROM portfolio."registration" t0
JOIN portfolio."exam" t1 ON t0."exam_id" = t1."exam_id"
JOIN portfolio."course" t2 ON t1."course_id" = t2."course_id"
ORDER BY t0."registration_id", t1."exam_id", t2."course_id"
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT t0."registration_id" AS "registration_registration_id",
       t0."registered_at" AS "registration_registered_at",
       t1."exam_id" AS "exam_exam_id",
       t1."starts_at" AS "exam_starts_at",
       t2."course_id" AS "course_course_id",
       t2."course_code" AS "course_course_code"
FROM portfolio."registration" t0
JOIN portfolio."exam" t1 ON t0."exam_id" = t1."exam_id"
JOIN portfolio."course" t2 ON t1."course_id" = t2."course_id"
ORDER BY t0."registration_id", t1."exam_id", t2."course_id"
LIMIT 20;

-- Find course records where course_code matches "CS101" (up to 20).
SELECT * FROM portfolio."course"
WHERE "course_code" IS NOT DISTINCT FROM 'CS101'
ORDER BY "course_id"
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT * FROM portfolio."course"
WHERE "course_code" IS NOT DISTINCT FROM 'CS101'
ORDER BY "course_id"
LIMIT 20;

-- Count registration records for each candidate_key (up to 20 groups).
SELECT "candidate_key", count(*) AS record_count
FROM portfolio."registration"
GROUP BY "candidate_key"
ORDER BY record_count DESC, "candidate_key" NULLS LAST
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT "candidate_key", count(*) AS record_count
FROM portfolio."registration"
GROUP BY "candidate_key"
ORDER BY record_count DESC, "candidate_key" NULLS LAST
LIMIT 20;

-- Find registration records where exam_id matches 3001 (up to 20).
SELECT * FROM portfolio."registration"
WHERE "exam_id" IS NOT DISTINCT FROM 3001
ORDER BY "registration_id"
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT * FROM portfolio."registration"
WHERE "exam_id" IS NOT DISTINCT FROM 3001
ORDER BY "registration_id"
LIMIT 20;
