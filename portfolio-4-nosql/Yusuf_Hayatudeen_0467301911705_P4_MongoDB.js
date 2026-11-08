// Run once in mongosh against a fresh exercise database.
// These records are fictional events for the case study.
(async function () {
  db = db.getSiblingDB('portfolio_nosql');
  if ((await db.getCollectionNames()).includes("examination_events")) {
    throw new Error('The exercise collection already exists. Use a fresh database.');
  }

  // The validator checks the stable event fields while details can vary.
  await db.createCollection("examination_events", {
    validator: {
    "$jsonSchema": {
        "bsonType": "object",
        "required": [
            "_id",
            "schemaVersion",
            "simulation",
            "eventType",
            "occurredAt",
            "source",
            "embedded",
            "references",
            "details"
        ],
        "properties": {
            "_id": {
                "bsonType": "string",
                "minLength": 1
            },
            "schemaVersion": {
                "enum": [
                    1
                ]
            },
            "simulation": {
                "enum": [
                    true
                ]
            },
            "eventType": {
                "bsonType": "string",
                "enum": [
                    "registration_created",
                    "attendance_recorded"
                ]
            },
            "occurredAt": {
                "bsonType": "date"
            },
            "source": {
                "bsonType": "object",
                "required": [
                    "entity",
                    "key",
                    "snapshot"
                ],
                "properties": {
                    "entity": {
                        "enum": [
                            "registration"
                        ]
                    },
                    "key": {
                        "bsonType": "object",
                        "required": [
                            "registration_id"
                        ]
                    },
                    "snapshot": {
                        "bsonType": "object"
                    }
                }
            },
            "embedded": {
                "bsonType": "object"
            },
            "references": {
                "bsonType": "object"
            },
            "details": {
                "bsonType": "object"
            }
        }
    }
},
    validationLevel: 'strict', validationAction: 'error'
  });

  // Insert the four example events and show their IDs.
  printjson(await db.getCollection("examination_events").insertMany([
    {
        "_id": "event_000001",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "registration_created",
        "occurredAt": ISODate("2030-01-01T10:00:00Z"),
        "source": {
            "entity": "registration",
            "key": {
                "registration_id": 4001
            },
            "snapshot": {
                "registration_id": 4001,
                "candidate_key": 2001,
                "exam_id": 3001,
                "registered_at": "2026-10-01T10:00:00Z",
                "attendance_state": "present",
                "score": 87.5
            }
        },
        "embedded": {
            "exam": [
                {
                    "key": {
                        "exam_id": 3001
                    },
                    "snapshot": {
                        "exam_id": 3001,
                        "course_id": 1001,
                        "starts_at": "2026-11-10T09:00:00Z",
                        "venue_code": "HALL-A",
                        "seat_limit": 120
                    },
                    "via": [
                        "registration.exam_id → exam"
                    ]
                }
            ],
            "course": [
                {
                    "key": {
                        "course_id": 1001
                    },
                    "snapshot": {
                        "course_id": 1001,
                        "course_code": "CS101",
                        "title": "Foundations of Computing"
                    },
                    "via": [
                        "registration.exam_id → exam.course_id → course"
                    ]
                }
            ]
        },
        "references": {
            "candidate": [
                {
                    "key": {
                        "candidate_key": 2001
                    },
                    "via": [
                        "registration.candidate_key → candidate"
                    ]
                }
            ]
        },
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000002",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "attendance_recorded",
        "occurredAt": ISODate("2030-01-01T10:01:00Z"),
        "source": {
            "entity": "registration",
            "key": {
                "registration_id": 4001
            },
            "snapshot": {
                "registration_id": 4001,
                "candidate_key": 2001,
                "exam_id": 3001,
                "registered_at": "2026-10-01T10:00:00Z",
                "attendance_state": "present",
                "score": 87.5
            }
        },
        "embedded": {
            "exam": [
                {
                    "key": {
                        "exam_id": 3001
                    },
                    "snapshot": {
                        "exam_id": 3001,
                        "course_id": 1001,
                        "starts_at": "2026-11-10T09:00:00Z",
                        "venue_code": "HALL-A",
                        "seat_limit": 120
                    },
                    "via": [
                        "registration.exam_id → exam"
                    ]
                }
            ],
            "course": [
                {
                    "key": {
                        "course_id": 1001
                    },
                    "snapshot": {
                        "course_id": 1001,
                        "course_code": "CS101",
                        "title": "Foundations of Computing"
                    },
                    "via": [
                        "registration.exam_id → exam.course_id → course"
                    ]
                }
            ]
        },
        "references": {
            "candidate": [
                {
                    "key": {
                        "candidate_key": 2001
                    },
                    "via": [
                        "registration.candidate_key → candidate"
                    ]
                }
            ]
        },
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "examples": {
                "occurred_at": "illustrative occurred_at",
                "actor_role": "illustrative actor_role",
                "payload": "illustrative payload",
                "schema_version": "illustrative schema_version",
                "correlation_key": "illustrative correlation_key"
            }
        }
    },
    {
        "_id": "event_000003",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "registration_created",
        "occurredAt": ISODate("2030-01-01T10:02:00Z"),
        "source": {
            "entity": "registration",
            "key": {
                "registration_id": 4002
            },
            "snapshot": {
                "registration_id": 4002,
                "candidate_key": 2002,
                "exam_id": 3002,
                "registered_at": "2026-10-02T11:00:00Z",
                "attendance_state": "pending",
                "score": null
            }
        },
        "embedded": {
            "exam": [
                {
                    "key": {
                        "exam_id": 3002
                    },
                    "snapshot": {
                        "exam_id": 3002,
                        "course_id": 1001,
                        "starts_at": "2026-11-12T13:30:00Z",
                        "venue_code": "HALL-B",
                        "seat_limit": 80
                    },
                    "via": [
                        "registration.exam_id → exam"
                    ]
                }
            ],
            "course": [
                {
                    "key": {
                        "course_id": 1001
                    },
                    "snapshot": {
                        "course_id": 1001,
                        "course_code": "CS101",
                        "title": "Foundations of Computing"
                    },
                    "via": [
                        "registration.exam_id → exam.course_id → course"
                    ]
                }
            ]
        },
        "references": {
            "candidate": [
                {
                    "key": {
                        "candidate_key": 2002
                    },
                    "via": [
                        "registration.candidate_key → candidate"
                    ]
                }
            ]
        },
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000004",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "attendance_recorded",
        "occurredAt": ISODate("2030-01-01T10:03:00Z"),
        "source": {
            "entity": "registration",
            "key": {
                "registration_id": 4002
            },
            "snapshot": {
                "registration_id": 4002,
                "candidate_key": 2002,
                "exam_id": 3002,
                "registered_at": "2026-10-02T11:00:00Z",
                "attendance_state": "pending",
                "score": null
            }
        },
        "embedded": {
            "exam": [
                {
                    "key": {
                        "exam_id": 3002
                    },
                    "snapshot": {
                        "exam_id": 3002,
                        "course_id": 1001,
                        "starts_at": "2026-11-12T13:30:00Z",
                        "venue_code": "HALL-B",
                        "seat_limit": 80
                    },
                    "via": [
                        "registration.exam_id → exam"
                    ]
                }
            ],
            "course": [
                {
                    "key": {
                        "course_id": 1001
                    },
                    "snapshot": {
                        "course_id": 1001,
                        "course_code": "CS101",
                        "title": "Foundations of Computing"
                    },
                    "via": [
                        "registration.exam_id → exam.course_id → course"
                    ]
                }
            ]
        },
        "references": {
            "candidate": [
                {
                    "key": {
                        "candidate_key": 2002
                    },
                    "via": [
                        "registration.candidate_key → candidate"
                    ]
                }
            ]
        },
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "examples": {
                "occurred_at": "illustrative occurred_at",
                "actor_role": "illustrative actor_role",
                "payload": "illustrative payload",
                "schema_version": "illustrative schema_version",
                "correlation_key": "illustrative correlation_key"
            }
        }
    }
]));
  await db.getCollection("examination_events").createIndex({eventType: 1, occurredAt: -1}, {name: 'event_type_time'});

  // 1. Find the first sample event type (up to five documents).
  printjson(await db.getCollection("examination_events").find({"eventType":"registration_created"}).sort({_id:1}).limit(5).toArray());

  // 2. Find events for the first source record using nested key fields (up to five).
  printjson(await db.getCollection("examination_events").find({"source.key.registration_id":4001}).sort({_id:1}).limit(5).toArray());

  // 3. Find events in the sample time range using a MongoDB Date filter (up to five).
  printjson(await db.getCollection("examination_events").find({"occurredAt":{"$gte":ISODate("2030-01-01T10:00:00Z"), "$lt":ISODate("2030-01-01T11:00:00Z")}}).sort({_id:1}).limit(5).toArray());

  // 4. Count documents for each event type.
  printjson(await db.getCollection("examination_events").aggregate([{"$group":{"_id":"$eventType", "documentCount":{"$sum":1}}}, {"$sort":{"_id":1}}]).toArray());

  // A date stored as text should be rejected by the validator.
  try {
    await db.getCollection("examination_events").insertOne({...{
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "registration_created",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "registration",
        "key": {
            "registration_id": 4001
        },
        "snapshot": {
            "registration_id": 4001,
            "candidate_key": 2001,
            "exam_id": 3001,
            "registered_at": "2026-10-01T10:00:00Z",
            "attendance_state": "present",
            "score": 87.5
        }
    },
    "embedded": {
        "exam": [
            {
                "key": {
                    "exam_id": 3001
                },
                "snapshot": {
                    "exam_id": 3001,
                    "course_id": 1001,
                    "starts_at": "2026-11-10T09:00:00Z",
                    "venue_code": "HALL-A",
                    "seat_limit": 120
                },
                "via": [
                    "registration.exam_id → exam"
                ]
            }
        ],
        "course": [
            {
                "key": {
                    "course_id": 1001
                },
                "snapshot": {
                    "course_id": 1001,
                    "course_code": "CS101",
                    "title": "Foundations of Computing"
                },
                "via": [
                    "registration.exam_id → exam.course_id → course"
                ]
            }
        ]
    },
    "references": {
        "candidate": [
            {
                "key": {
                    "candidate_key": 2001
                },
                "via": [
                    "registration.candidate_key → candidate"
                ]
            }
        ]
    },
    "details": {
        "channel": "web"
    }
}, _id: 'invalid_date_example', occurredAt: 'not-a-date'});
  } catch (error) { print('Invalid date error: ' + error.code); }

  // Reusing an event ID should be rejected by the unique _id index.
  try { await db.getCollection("examination_events").insertOne({
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "registration_created",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "registration",
        "key": {
            "registration_id": 4001
        },
        "snapshot": {
            "registration_id": 4001,
            "candidate_key": 2001,
            "exam_id": 3001,
            "registered_at": "2026-10-01T10:00:00Z",
            "attendance_state": "present",
            "score": 87.5
        }
    },
    "embedded": {
        "exam": [
            {
                "key": {
                    "exam_id": 3001
                },
                "snapshot": {
                    "exam_id": 3001,
                    "course_id": 1001,
                    "starts_at": "2026-11-10T09:00:00Z",
                    "venue_code": "HALL-A",
                    "seat_limit": 120
                },
                "via": [
                    "registration.exam_id → exam"
                ]
            }
        ],
        "course": [
            {
                "key": {
                    "course_id": 1001
                },
                "snapshot": {
                    "course_id": 1001,
                    "course_code": "CS101",
                    "title": "Foundations of Computing"
                },
                "via": [
                    "registration.exam_id → exam.course_id → course"
                ]
            }
        ]
    },
    "references": {
        "candidate": [
            {
                "key": {
                    "candidate_key": 2001
                },
                "via": [
                    "registration.candidate_key → candidate"
                ]
            }
        ]
    },
    "details": {
        "channel": "web"
    }
}); }
  catch (error) { print('Duplicate ID error: ' + error.code); }

  print('Document count: ' + await db.getCollection("examination_events").countDocuments());
})().catch(error => { print(error.stack || String(error)); quit(1); });
