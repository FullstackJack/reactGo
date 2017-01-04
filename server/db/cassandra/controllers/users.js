import passport from 'passport';
import cassandra from 'express-cassandra';
import users from './../models/users';

/**
 * POST /login
 */
export function login(req, res, next) {
  // Do email and password validation for the server
  passport.authenticate('local', (authErr, user, info) => {
    if (authErr) return next(authErr);
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    // Passport exposes a login() function on req (also aliased as
    // logIn()) that can be used to establish a login session
    return req.login(user, (loginErr) => {
      if (loginErr) return res.status(401).json({ message: loginErr });
      return res.status(200).json({
        message: 'You have been successfully logged in.'
      });
    });
  })(req, res, next);
}

/**
 * POST /logout
 */
export function logout(req, res) {
  // Do email and password validation for the server
  req.logout();
  res.redirect('/');
}

/**
 * POST /signup
 * Create a new local account
 */
export function signUp(req, res, next) {
  cassandra.instance.Users.findOneAsync({ email: req.body.email }).then(existingUser => {
    if (existingUser) {
      return res.status(409).json({ message: 'Account with this email address already exists!' });
    }

    const hashedPass = users.encryptPassword(req.body.password);
    const user = new cassandra.instance.Users({
      email: req.body.email,
      password: hashedPass,
    });

    return user.save(saveErr => {
      if (saveErr) { return next(saveErr); }
      return req.login(user, loginErr => {
        if (loginErr) { return res.status(401).json({ message: loginErr }); }
        return res.status(200).json({
          message: 'You have been successfully logged in.'
        });
      });
    });
  });
}

export default {
  login,
  logout,
  signUp
};
