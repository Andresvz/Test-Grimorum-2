

var passport = require('passport');
module.exports = {

  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },
  index: function (req, res) {
    res.view('login', {layout: 'login'})
  },
  login: function(req, res) {

    passport.authenticate('local', function(err, user, info) {
      if ((err) || (!user)) {
        return res.redirect('/');
      }
      req.logIn(user, function(err) {
        if (err) res.send(err);
        console.log(user)
        if(user.type == 'admin'){
          return res.redirect('/admin');
        }else{
          return res.redirect('/products');
        }
      });

    })(req, res);
  },
  logout: function(req, res) {
    req.logout();
    return res.redirect('/');
  }
};
