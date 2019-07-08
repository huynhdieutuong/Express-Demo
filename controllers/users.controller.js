const uuid = require('uuid');

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
  let errors = [];
  const { name, phone } = req.body;
  if(!name) {
    errors.push('Name is empty');
  }
  if(!phone) {
    errors.push('Phone is empty');
  }
  if(errors.length) {
    return res.render('users/create', { errors, values: req.body });
  }
  req.body.id = uuid();
  users.push(req.body);
  db.write();
  res.redirect('/users');
};

module.exports.view = (req, res) => {
  const { id } = req.params;
  const user = db.get('users').find({ id }).value();
  res.render('users/view', { user });
};