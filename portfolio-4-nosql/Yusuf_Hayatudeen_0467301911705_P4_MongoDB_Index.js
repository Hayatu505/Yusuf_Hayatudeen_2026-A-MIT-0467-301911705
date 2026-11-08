// Run with mongosh after the main Portfolio 4 script, against the same MongoDB deployment.
// This creates the index used by queries on source.key.registration_id.
const db = db.getSiblingDB('portfolio_nosql');

const indexName = db.getCollection('examination_events').createIndex(
  { 'source.key.registration_id': 1 },
  { name: 'source_registration_id' }
);

print(`Created index: ${indexName}`);
