'use strict'

const express           = require('express');
const router              = express.Router();
const customMdw           = require('../middleware/custom');
const SampleController    = require('../controllers/sample')
const UserController      = require('../controllers/user')


router.post('/login', UserController.login);
router.post('/register', UserController.register);

router.get('/test', SampleController.unprotected);
router.get('/protected', customMdw.ensureAuthenticated, SampleController.protected);
router.get('/userData', customMdw.ensureAuthenticated, SampleController.userData);
router.get('/clinicData', customMdw.ensureAuthenticated, SampleController.clinicData);

module.exports = router;