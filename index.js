const express = require('express');
const app = express();

const uuid = require('uuid');

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] })
  .write()

const port = 3000;
const users = db.get('users').value();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => res.render('index', { name: 'Tuong' }));
app.get('/users', (req, res) => res.render('users/index', { users }));
app.get('/users/search', (req, res) => {
  const { q } = req.query;
  const filtered = users.filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);
  res.render('users/index', { users: filtered, value: q });
});

app.get('/users/create', (req, res) => res.render('users/create'));
app.post('/users/create', (req, res) => {
  req.body.id = uuid();
  users.push(req.body);
  db.write();
  res.redirect('/users');
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = db.get('users').find({ id }).value();
  res.render('users/view', { user });
})

app.listen(port, () => console.log(`Server is listening on port ${port}`));