const express = require('express');

const router = express.Router();

const diaryController = require('../controllers/diary');
const authController = require('../controllers/auth');

router.get('/', diaryController.getIndex);

router.get('/my-diary', diaryController.getDiary);

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);
router.post('/logout', authController.postLogout);

router.get('/user/meals/:mealId', diaryController.getMeal);

router.get('/register-meal', diaryController.getRegisterMeal);
router.post('/register-meal', diaryController.postRegisterMeal);
router.get('/edit-meal/:mealId', diaryController.getEditMeal);
router.post('/delete-meal', diaryController.postDeleteMeal);
router.post('/edit-meal', diaryController.postEditMeal);

module.exports = router;