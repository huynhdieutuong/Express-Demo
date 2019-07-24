const express = require('express');
const router = express.Router();

const controllers = require('../controllers/products.controller');

router.get('/', controllers.index);

router.get('/:id', controllers.view);

router.post('/', controllers.create);

router.delete('/:id', controllers.delete);

router.patch('/:id', controllers.patch);

router.put('/:id', controllers.put);

module.exports = router;