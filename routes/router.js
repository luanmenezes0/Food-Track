const express = require('express');

const router = express.Router();

const diaryController = require('../controllers/diary');
const authController = require('../controllers/auth');

router.get('/', diaryController.getIndex);

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);
router.post('/logout', authController.postLogout)

router.get('/register-meal', diaryController.getRegisterMeal);
router.post('/register-meal', diaryController.postRegisterMeal);

module.exports = router;