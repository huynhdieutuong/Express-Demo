const md5 = require('md5');
const db = require('../db');

module.exports.postLogin = (req, res, next) => {
  let errors = [];
  const { email, password } = req.body;
  const user = db.get('users').find({ email }).value();
  if(!email) {
    errors.push('Email is empty');
  } else {
    if(!user) {
      errors.push('User does not exist');
    } else {
      if(!password) {
        errors.push('Password is empty');
      } else {
        if(md5(password) !== user.password) {
          errors.push('Password is wrong');
        }
      }
    }
  }

  if(errors.length) {
    return res.render('auth/login', { errors, values: req.body });
  }
  
  res.locals.userId = user.id;
  next();
};