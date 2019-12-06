'use strict';

const { Router } = require('express');
const router = new Router();

const User = require('./../models/user');
const bcrypt = require('bcrypt');

//Sign-Up
router.get('/sign-up', (req, res, next) => {
  res.render('authentication/sign-up');
});

router.post('/sign-up', (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  bcrypt
    .hash(password, 10)
    .then(hash => {
      return User.create({
        email,
        passwordHash: hash
      });
    })
    .then(user => {
      console.log('Created user', user);
      req.session.user = user._id;
      res.redirect('/projects/form');
    })
    .catch(error => {
      next(error);
    });
});

// Sign-in
router.get('/sign-in', (req, res, next) => {
  res.render('authentication/sign-in');
});

router.post('/sign-in', (req, res, next) => {
  let userId;
  const { email, password } = req.body;

  User.findOne({
    email
  })
    .then(user => {
      if (!user) {
        return Promise.reject(new Error("There's no user with that email."));
      } else {
        userId = user._id;
        return bcrypt.compare(password, user.passwordHash);
      }
    })
    .then(result => {
      if (result) {
        req.session.user = userId;
        res.redirect('/projects/list/'); //redirect sign in to the form page
      } else {
        return Promise.reject(new Error('Wrong password.'));
      }
    })
    .catch(error => {
      next(error);
    });
});

// Sign Out
router.get('/sign-out', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
