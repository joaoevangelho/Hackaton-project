'use strict';

const { Router } = require('express');
const router = new Router();

router.get('/', (req, res, next) => {
  res.redirect('/authentication/sign-in');
});

module.exports = router;
