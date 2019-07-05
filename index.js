const express = require('express');
const app = express();
const port = 3000;
const users = [
  { id: 1, name: 'Thinh' },
  { id: 2, name: 'Hung' },
  { id: 3, name: 'Tuong' }
];

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => res.render('index', { name: 'Tuong' }));
app.get('/users', (req, res) => res.render('users/index', { users }));
app.get('/users/search', (req, res) => {
  const { q } = req.query;
  const filtered = users.filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);
  res.render('users/index', { users: filtered, value: q });
})

app.listen(port, () => console.log(`Server is listening on port ${port}`));