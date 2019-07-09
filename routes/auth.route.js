const express = require('express');
const router = express();

const controllers = require('../controllers/auth.controller');
const validates = require('../validates/auth.validate');

router.get('/login', controllers.login);
router.post('/login', validates.postLogin, controllers.postLogin);

module.exports = router;