const User = require('../models/user');
const Meal = require('../models/meal');

exports.getIndex = (req, res, next) => {
  res.render('index', {
    pageTitle: 'Food Track',
    path:'/index',
  });
};

exports.getRegisterMeal = (req, res, next) => {
  res.render('register-meal', {
    pageTitle: 'Registrar Refeição',
    path:'/register-meal',
  });
};

exports.postRegisterMeal = (req, res, next) => {
  const meal = req.body.meal;
  const date = req.body.date;
  const time = req.body.time;
  const desc = req.body.desc;
  req.user.createMeal({
    type: meal,
    date: date,
    time: time,
    desc: desc
  }).then((result) => {
    console.log('meal registered');
    res.redirect('/');
  }).catch((err) => {
    console.log(err);
    
  });
  
};