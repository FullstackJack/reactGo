import cassandra from 'express-cassandra';

export default (email, done) => {
  cassandra.instance.Users.findOneAsync({ email }, { raw: true }).then(user => {
    done(null, user);
  }).catch(err => {
    done(err, null);
  });
};
