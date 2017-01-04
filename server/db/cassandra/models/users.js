const bcrypt = require('bcrypt-nodejs');

function comparePassword(candidatePassword, password, cb) {
  bcrypt.compare(candidatePassword, password, (err, isMatch) => {
    if (err) return cb(err);
    return cb(null, isMatch);
  });
}

function encryptPassword(password) {
  const salt = bcrypt.genSaltSync(5);
  if (!salt) {
    throw new Error('SaltError');
  }
  return bcrypt.hashSync(password, salt, null);
}

module.exports = {
  fields: {
    id: {
      type: 'uuid',
      default: { '$db_function': 'uuid()'}
    },
    email: { type: 'text' },
    password: { type: 'text' },
    tokens: { type: 'set', typeDef: '<frozen <user_token>>' },
    profile: { type: 'frozen', typeDef: '<profile>' },
    passwordResetToken: { type: 'text' },
    created: {
      type: 'timestamp',
      default: { '$db_function': 'toTimestamp(now())' }
    },
  },
  key: [['email']],
  encryptPassword,
  comparePassword,
};
