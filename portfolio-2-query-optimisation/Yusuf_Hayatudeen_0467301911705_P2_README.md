# MIT 8103 University Examination Management Exercise — SQL queries

## 1. Show related registration, exam, course records (up to 20).

```sql
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
```

| registration_registration_id | registration_registered_at | exam_exam_id | exam_starts_at | course_course_id | course_course_code |
| --- | --- | --- | --- | --- | --- |
| 4001 | 2026-10-01T10:00:00+00:00 | 3001 | 2026-11-10T09:00:00+00:00 | 1001 | CS101 |
| 4002 | 2026-10-02T11:00:00+00:00 | 3002 | 2026-11-12T13:30:00+00:00 | 1001 | CS101 |

## 2. Find course records where course_code matches "CS101" (up to 20).

```sql
SELECT * FROM portfolio."course"
WHERE "course_code" IS NOT DISTINCT FROM 'CS101'
ORDER BY "course_id"
LIMIT 20;
```

| course_id | course_code | title |
| --- | --- | --- |
| 1001 | CS101 | Foundations of Computing |

## 3. Count registration records for each candidate_key (up to 20 groups).

```sql
SELECT "candidate_key", count(*) AS record_count
FROM portfolio."registration"
GROUP BY "candidate_key"
ORDER BY record_count DESC, "candidate_key" NULLS LAST
LIMIT 20;
```

| candidate_key | record_count |
| --- | --- |
| 2001 | 1 |
| 2002 | 1 |

## 4. Find registration records where exam_id matches 3001 (up to 20).

```sql
SELECT * FROM portfolio."registration"
WHERE "exam_id" IS NOT DISTINCT FROM 3001
ORDER BY "registration_id"
LIMIT 20;
```

| registration_id | candidate_key | exam_id | registered_at | attendance_state | score |
| --- | --- | --- | --- | --- | --- |
| 4001 | 2001 | 3001 | 2026-10-01T10:00:00+00:00 | present | 87.5 |


## Index comparison

| Phase | Median (ms) | Three runs (ms) | Plan nodes | Buffer hits |
| --- | --- | --- | --- | --- |
| Before index | 0.488 | 0.488, 0.842, 0.482 | Sort → Seq Scan | 58 |
| After index | 0.139 | 0.166, 0.138, 0.139 | Sort → Bitmap Heap Scan → Bitmap Index Scan | 15 |

The median execution time changed from 0.488 ms to 0.139 ms. The measured plan used p2_filter_idx. The results matched in both phases. An index adds storage and write-maintenance costs; timings depend on the selected lookup and environment.

## Execution plans

### Before index, run 1

```text
Sort (actual time=0.464..0.465 rows=10 loops=1)
  Seq Scan on registration (actual time=0.014..0.431 rows=10 loops=1)
Planning Time: 0.316 ms
Execution Time: 0.488 ms
```

### Before index, run 2

```text
Sort (actual time=0.806..0.808 rows=10 loops=1)
  Seq Scan on registration (actual time=0.02..0.761 rows=10 loops=1)
Planning Time: 0.408 ms
Execution Time: 0.842 ms
```

### Before index, run 3

```text
Sort (actual time=0.456..0.457 rows=10 loops=1)
  Seq Scan on registration (actual time=0.013..0.423 rows=10 loops=1)
Planning Time: 0.294 ms
Execution Time: 0.482 ms
```

### After index, run 1

```text
Sort (actual time=0.087..0.088 rows=10 loops=1)
  Bitmap Heap Scan on registration (actual time=0.023..0.053 rows=10 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.012..0.013 rows=10 loops=1)
Planning Time: 0.479 ms
Execution Time: 0.166 ms
```

### After index, run 2

```text
Sort (actual time=0.089..0.09 rows=10 loops=1)
  Bitmap Heap Scan on registration (actual time=0.024..0.054 rows=10 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.013..0.013 rows=10 loops=1)
Planning Time: 0.494 ms
Execution Time: 0.138 ms
```

### After index, run 3

```text
Sort (actual time=0.089..0.09 rows=10 loops=1)
  Bitmap Heap Scan on registration (actual time=0.023..0.053 rows=10 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.012..0.012 rows=10 loops=1)
Planning Time: 0.499 ms
Execution Time: 0.139 ms
```

## Reproduce

Use a fresh database with the Portfolio 1 schema and sample data. Run Yusuf_Hayatudeen_0467301911705_P2_Queries.sql, then Yusuf_Hayatudeen_0467301911705_P2_Optimisation.sql. The optimisation script creates a separate performance table and runs EXPLAIN (ANALYZE, BUFFERS).

[Query screenshot](screenshots/Yusuf_Hayatudeen_0467301911705_P2_QueryResults.png) · [Index comparison](screenshots/Yusuf_Hayatudeen_0467301911705_P2_IndexComparison.png)

## References

- [PostgreSQL — EXPLAIN](https://www.postgresql.org/docs/17/using-explain.html)

