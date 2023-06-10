const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const fileController = require('../controller/fileController');

router.post('/upload', upload.single('uploaded_file'), fileController.upload);

module.exports = router;