const express = require('express');
const router = express();

const controllers = require('../controllers/cart.controller');

router.get('/add/:productId', controllers.addToCart);

module.exports = router;