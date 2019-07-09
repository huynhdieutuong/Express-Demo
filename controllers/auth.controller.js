module.exports.login = (req, res) => res.render('auth/login');

module.exports.postLogin = (req, res) => {
  res.cookie('userId', res.locals.userId);
  res.redirect('/users');
};