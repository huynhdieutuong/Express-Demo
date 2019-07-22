const User = require('../models/user.model');

module.exports.postCreate = async (req, res, next) => {
  let errors = [];
  const { name, phone, email, password, password2 } = req.body;
  const user = await User.findOne({ email });
  if(!name) {
    errors.push('Empty Name');
  }
  if(!phone) {
    errors.push('Empty Phone');
  }
  if(!email) {
    errors.push('Empty Email');
  } else if (user) {
    errors.push('Email already in use')
  }
  if(!password) {
    errors.push('Empty Password');
  } else if(password !== password2) {
    errors.push('Wrong Password Confirmation');
  }

  if(errors.length) {
    return res.render('users/create', { errors, values: req.body });
  }

  next();
}