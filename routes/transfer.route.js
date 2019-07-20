const express = require('express');
const router = express.Router();

const controllers = require('../controllers/transfer.controller');

router.get('/create', controllers.create);
router.post('/create', controllers.postCreate);

module.exports = router;