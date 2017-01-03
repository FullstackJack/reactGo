import cassandra from 'express-cassandra';

/* eslint-disable no-param-reassign */
export default (req, accessToken, refreshToken, profile, done) => {
  cassandra.instance.Users.findOne({ email: profile._json.emails[0].value }, (err, user) => {
    if (err) {
      return done(err);
    }
    // If a user exists in our DB with a matching Google account email address...
    if (user) {
      // Login user.
      return done(null, user);
    }
    // Otherwise, create a new user in the DB with the Google profile data.
    const newUser = new cassandra.instance.Users({
      email: profile.emails[0].value,
      google: profile.id,
      tokens: [{ kind: 'google', access_token: accessToken }],
      profile: {
        name: profile.displayName,
        gender: profile.gender,
        picture: profile.photos[0].value,
      }
    });
    newUser.save(err => {
      if (err) {
        done(err);
      }
      done(null, newUser);
    });
  });
};
/* eslint-enable no-param-reassign */
