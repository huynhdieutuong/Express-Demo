const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: './public/uploads/'});

const controllers = require('../controllers/users.controller');
const validates = require('../validates/users.validate');

router.get('/', controllers.index);

router.get('/search', controllers.search);

router.get('/create', controllers.create);
router.post('/create', upload.single('avatar'), validates.postCreate, controllers.postCreate);

router.get('/:id', controllers.view);

module.exports = router;