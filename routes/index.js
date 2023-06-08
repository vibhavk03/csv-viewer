const express = require('express');
const router = express.Router();

const homeController = require('../controller/homeController');
const fileRouter = require('./fileRouter');

router.get('/', homeController.home);
router.use('/file', fileRouter);

module.exports = router;
