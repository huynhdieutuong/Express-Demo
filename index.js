const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('<h1>Hello World!</h1><a href="/users">Users</a>'));

app.get('/users', (req, res) => res.send('Users'));

app.listen(port, () => console.log(`Server listening on port ${port}`));