const uuid = require('uuid');
const md5 = require('md5');

const db = require('../db');

const users = db.get('users').value();

module.exports.index = (req, res) => res.render('users/index', { users });

module.exports.search = (req, res) => {
  const { q } = req.query;
  const filtered = users.filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);
  res.render('users/index', { users: filtered, value: q });
};

module.exports.create = (req, res) => res.render('users/create');
module.exports.postCreate = (req, res) => {
  req.body.id = uuid();
  const { id, name, phone, email, password} = req.body;
  const hashedPassword = md5(password);
  users.push({ 
    id, 
    name, 
    phone, 
    email, 
    password: hashedPassword 
  });
  db.write();
  res.redirect('/users');
};

module.exports.view = (req, res) => {
  const { id } = req.params;
  const user = db.get('users').find({ id }).value();
  res.render('users/view', { user });
};