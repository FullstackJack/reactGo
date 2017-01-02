import cassandra from 'express-cassandra';
import users from './../models/UsersModel';

export default (email, password, done) => {
  cassandra.instance.Users.findOne({ email }, (findErr, user) => {
    if (!user) return done(null, false, { message: `There is no record of the email ${email}.` });
    users.comparePassword(password, user.password, (passErr, isMatch) => {
      if (isMatch) {
        return done(null, user);
      }
      return done(null, false, { message: 'Your email or password combination is not correct.' });
    });
  });
};
