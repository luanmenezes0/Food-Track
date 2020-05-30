const express = require('express');

const router = express.Router();

const diaryController = require('../controllers/diary');
const authController = require('../controllers/auth');
const isAuth = require('../middleware/isAuth');

router.get('/', diaryController.getIndex);

router.get('/my-diary', isAuth, diaryController.getDiary);

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);
router.post('/logout', authController.postLogout);

router.get('/user/meals/:mealId', isAuth, diaryController.getMeal);

router.get('/register-meal', isAuth, diaryController.getRegisterMeal);
router.post('/register-meal', isAuth, diaryController.postRegisterMeal);
router.get('/edit-meal/:mealId', isAuth, diaryController.getEditMeal);
router.post('/delete-meal', isAuth, diaryController.postDeleteMeal);
router.post('/edit-meal', isAuth, diaryController.postEditMeal);

module.exports = router;