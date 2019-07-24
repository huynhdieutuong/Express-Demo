const express = require('express');
const router = express.Router();

const controllers = require('../controllers/users.controller');

router.get('/', controllers.index);

router.get('/:id', controllers.view);

router.post('/', controllers.create);

router.patch('/:id', controllers.update);

router.delete('/:id', controllers.delete);

module.exports = router;