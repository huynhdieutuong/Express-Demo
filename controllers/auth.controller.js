module.exports.login = (req, res) => res.render('auth/login');

module.exports.postLogin = (req, res) => {
  res.cookie('userId', res.locals.userId, { signed: true });
  res.redirect('/users');
};

module.exports.logout = (req, res) => res.clearCookie('userId');