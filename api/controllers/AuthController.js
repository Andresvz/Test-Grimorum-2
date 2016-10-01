/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function (req, res) {
    var username = req.param('username');
    var password = req.param('password');

    if (!username || !password) {
       res.json(401, {err: 'username and password required'});
    }

    User.findOneByUsername(username, function (err, user) {
      if (!user) {
         res.json(401, {err: 'invalid username'});
      }

      User.comparePassword(password, user, function (err, valid) {
        if (err) {
           res.json(403, {err: 'forbidden'});
        }

        if (!valid) {
           res.json(401, {err: 'invalid password'});
        } else {
          res.json({
            user: user,
            token: jwToken.issue({"id" : user.id })
          });
        }
      });
    })
  }
};
