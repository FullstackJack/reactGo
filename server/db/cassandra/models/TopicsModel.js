/**
 * Schema Definitions
 *
 */
 // id: String,
 // text: String,
 // count: { type: Number, min: 0 },
 // date: { type: Date, default: Date.now }
module.exports = {
  fields: {
    id: {
      type: 'uuid',
      default: { '$db_function': 'uuid()'}
    },
    text: { type: 'varchar' },
    count: 'int',
    date: {
      type: 'timestamp',
      default: {"$db_function": "toTimestamp(now())"}
    }
  },
  key: [['id'], 'date'],
  table_name: 'topics'
};
