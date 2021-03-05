'use strict'

const express   = require('express');
const router    = express.Router();
const tokenAuth = require('../middleware/auth');
const clinic    = require('../controller/clinic')
const user      = require('../controller/user')


router.post('/login', user.login);
router.post('/register', user.register);
router.get('/protected', tokenAuth.ensureAuthenticated, user.protected);
router.get('/userData', tokenAuth.ensureAuthenticated, user.userData);

router.get('/clinicData', tokenAuth.ensureAuthenticated, clinic.clinicData);

module.exports = router;