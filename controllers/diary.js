const User = require('../models/user');
const Meal = require('../models/meal');

exports.getIndex = (req, res, next) => {
  res.render('index', {
    pageTitle: 'Food Track',
    path: '/index',
  });
};

exports.getDiary = (req, res, next) => {
  Meal.findAll({ where: { userid: req.user.id } })
    .then((meals) => {
      res.render('my-diary', {
        meals: meals,
        pageTitle: 'Meu Diário',
        path: 'my-diary',
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getMeal = (req, res, next) => {
  const mealId = req.params.mealId;
  Meal.findByPk(mealId)
    .then((meal) => {
      res.render('meals', {
        meal: meal,
        path: 'meals',
        pageTitle: 'Meal Details',
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getRegisterMeal = (req, res, next) => {
  res.render('register-meal', {
    pageTitle: 'Registrar Refeição',
    path: '/register-meal',
    editing: false,
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
    res.redirect('/my-diary');
  }).catch((err) => {
    console.log(err);
  });
};

exports.getEditMeal = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    res.redirect('/my-diary');
  }
  const mealId = req.params.mealId;
  req.user.getMeals({ where: { id: mealId } })
  .then((meals) => {
    const meal = meals[0];
    if (!meal) {
      return res.redirect('/my-diary');
    }
    res.render('register-meal', {
      pageTitle: 'Edit Meal',
      path: '/edit-meal',
      editing: editMode,
      meal: meal,
    })
  })
  .catch((err) => {
    console.log(err);
  });
};

exports.postEditMeal = (req, res, next) => {
  const mealId = req.body.mealId;
  const updatedType = req.body.type;
  const updatedTime = req.body.time;
  const updatedDate = req.body.date;
  const updatedDesc = req.body.desc;
  Meal.findByPk(mealId)
  .then((meal) => {
    meal.type = updatedType
    meal.date = updatedDate;
    meal.time = updatedTime;
    meal.desc = updatedDesc;
    return meal.save();
  }).then((result) => {
    console.log('meal updated!');
    res.redirect('/my-diary')
  })
  .catch((err) => {
    console.log(err);
  });
};

exports.postDeleteMeal = (req, res, next) => {
  const mealId = req.body.mealId;
  Meal.findByPk(mealId)
    .then((meal) => {
      return meal.destroy();
    })
    .then((result) => {
      res.redirect('/my-diary');
    })
    .catch((err) => {
      console.log(err);
    });
};