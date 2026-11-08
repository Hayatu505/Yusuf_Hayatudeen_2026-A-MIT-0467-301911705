# MIT 8103 University Examination Management Exercise — ER diagram

```mermaid
erDiagram
    direction LR
    course {
        bigint course_id PK
        text course_code UK
        text title
    }
    candidate {
        bigint candidate_key PK
        text programme_code
        integer study_year
    }
    exam {
        bigint exam_id PK
        bigint course_id FK
        timestamptz starts_at
        text venue_code
        integer seat_limit
    }
    registration {
        bigint registration_id PK
        bigint candidate_key FK
        bigint exam_id FK
        timestamptz registered_at
        text attendance_state
        numeric score "Optional"
    }
    course ||--o{ exam : "course_id"
    candidate ||--o{ registration : "candidate_key"
    exam ||--o{ registration : "exam_id"
```

PK identifies a record; FK links to another table; UK marks a single-field unique value. The relationship ends show exactly one, zero or one, or zero or many records. Composite unique keys and conditional rules are listed in the schema and design.

[Diagram image](../images/Yusuf_Hayatudeen_0467301911705_ERDiagram.png)
