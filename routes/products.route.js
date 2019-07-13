const express = require('express');
const router = express();

const controllers = require('../controllers/products.controller');

router.get('/', controllers.index);

module.exports = router;