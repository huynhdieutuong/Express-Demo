const express = require('express');
const uuid = require('uuid');

const db = require('../db');

const router = express.Router();

const users = db.get('users').value();

router.get('/', (req, res) => res.render('users/index', { users }));
router.get('/search', (req, res) => {
  const { q } = req.query;
  const filtered = users.filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);
  res.render('users/index', { users: filtered, value: q });
});

router.get('/create', (req, res) => res.render('users/create'));
router.post('/create', (req, res) => {
  req.body.id = uuid();
  users.push(req.body);
  db.write();
  res.redirect('/users');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = db.get('users').find({ id }).value();
  res.render('users/view', { user });
});

module.exports = router;