const md5 = require('md5');

const User = require('../models/user.model');

module.exports.index = async (req, res) => {
  const users = await User.find();
  res.render('users/index', { users })
};

module.exports.search = async (req, res) => {
  const users = await User.find();
  const { q } = req.query;
  const filtered = users.filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);
  res.render('users/index', { users: filtered, value: q });
};

module.exports.create = (req, res) => res.render('users/create');
module.exports.postCreate = async (req, res) => {
  const { id, name, phone, email, password} = req.body;
  const avatar = '/uploads/' + req.file.filename;
  const user = { 
    name, 
    phone, 
    email, 
    password: md5(password),
    avatar 
  };
  await User.create(user);
  res.redirect('/users');
};

module.exports.view = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.render('users/view', { user });
};