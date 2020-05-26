const express = require('express');

const router = express.Router();

const diaryController = require('../controllers/diary');

router.get('/', diaryController.getIndex);

module.exports = router;