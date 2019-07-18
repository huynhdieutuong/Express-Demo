const express = require('express');
const router = express();

const controllers = require('../controllers/products.controller');
const upload = require('../upload');

router.get('/', controllers.index);

router.get('/create', controllers.create);
router.post('/create', upload.array('images', 5), controllers.postCreate);

router.get('/search', controllers.search);

router.get('/:id', controllers.view);

module.exports = router;