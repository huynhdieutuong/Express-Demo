const express = require('express');

const usersRoute = require('./routes/users.route');

const app = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => res.render('index', { name: 'Tuong' }));

app.use('/users', usersRoute);

app.listen(port, () => console.log(`Server is listening on port ${port}`));