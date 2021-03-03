'use strict'

const express             = require('express');
const router              = express.Router();
const tokenAuthentication = require('../middleware/custom');
const privateApi          = require('../api/private')
const publicApi           = require('../api/public')


router.post('/login', publicApi.login);
router.post('/register', publicApi.register);

router.get('/protected', tokenAuthentication.ensureAuthenticated, privateApi.protected);
router.get('/userData', tokenAuthentication.ensureAuthenticated, privateApi.userData);
router.get('/clinicData', tokenAuthentication.ensureAuthenticated, privateApi.clinicData);

module.exports = router;