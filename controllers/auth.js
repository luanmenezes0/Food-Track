const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    pageTitle: 'Login',
    path: '/login',
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        /* req.flash('error', 'Invalid email or password!'); */
        return req.session.save((err) => {
          res.redirect('/login');
        });
      }
      bcrypt.compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect('/my-diary');
            })
          }
          res.redirect('/login');
        })
        .catch((err) => {
          console.log(err);
          res.redirect('/login');
        });

    })
    .catch((err) => console.log(err));
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    pageTitle: 'SignUp',
    path: '/signup',
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({ where: { email: email } })
  .then((userDoc) => {
    if (userDoc) {
      return res.session.save((err) => {
        res.redirect('/signup');
      })
    }
    return bcrypt.hash(password, 12)
    .then((hashedpassword) => {
      User.create({
        email: email,
        password: hashedpassword
      })
      .then((result) => {
        res.redirect('/login');
      })
      .catch((err) => {
        console.log(err);
      });
    })
  })
  .catch((err) => {
    console.log(err);
  });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  })
};
