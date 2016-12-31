module.exports = {
  fields: {
    id: {
      type: 'uuid',
      default: { '$db_function': 'uuid()'}
    },
    email: { type: 'text' },
    password: { type: 'text' },
    tokens: { type: 'set', typeDef: '<text>' },
    profile: { type: 'frozen', typeDef: '<profile>' },
    passwordResetToken: { type: 'text' },
    created: {
      type: 'timestamp',
      default: { '$db_function': 'toTimestamp(now())' }
    },
  },
  key: [['id']],
};
