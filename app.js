const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const errorController = require('./controllers/error');
const User = require('./models/user');
const Meal = require('./models/meal');

const app = express();
const store = new SequelizeStore({
  db: sequelize
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const router = require('./routes/router');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'my secret',
  resave: false,
  store: store,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User
    .findByPk(req.session.user.id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
})

app.use(router);

app.use(errorController.get404);

Meal.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Meal);

sequelize
  .sync({ })
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });