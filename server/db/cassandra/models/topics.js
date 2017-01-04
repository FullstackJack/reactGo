module.exports = {
  fields: {
    // Normally we use UUID for unique IDs, but this example uses generic MD5.
    id: { type: 'text' },
    // id: { type: "uuid", default: {"$db_function": "uuid()"} },
    text: { type: 'text' },
    date: {
      type: 'timestamp',
      default: {"$db_function": "toTimestamp(now())"}
    }
  },
  key: [['id'], 'date'],
};
