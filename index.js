require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');

const usersRoute = require('./routes/users.route');
const authRoute = require('./routes/auth.route');
const productsRoute = require('./routes/products.route');

const authMiddleware = require('./middlewares/auth.middleware');

const app = express();

const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => res.render('index', { name: 'Tuong' }));

app.use('/users', authMiddleware.requireAuth, usersRoute);
app.use('/auth', authMiddleware.loggedIn, authRoute);
app.use('/products', productsRoute);

app.listen(port, () => console.log(`Server is listening on port ${port}`));