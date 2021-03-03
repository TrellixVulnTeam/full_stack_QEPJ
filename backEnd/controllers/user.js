'use strict'

const User      = require('../models/user');
const bcrypt    = require('bcryptjs');
const passport  = require('passport');
const jwt       = require('jsonwebtoken');
const error_types = require('./error_types');

let controller = {
    register: (req, res, next) => {
        console.log("caso register");
        User.users.findFirst({ where: { email_addr: req.body.username }})
            .then(data => {
                if (data) {
                    throw new error_types.InfoError("user already exists");
                }
                else {
                    console.log("creando usuario");
                    var hash = bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS));
                    let document = new User({
                        username: req.body.username,
                        first_name: req.body.first_name || '',
                        last_name: req.body.last_name || '',
                        email: req.body.email || '',
                        password: hash,
                        login_count: 0
                    });
                    return document.save();
                }
            })
            .then(data => {
                res.json({ data: data });
            })
            .catch(err => {
                next(err);
            })
    },
    login: (req, res, next) => {
        console.log("caso login");
        passport.authenticate("local", { session: false }, (error, user) => {
            if (error || !user) {
                next(new error_types.Error404("username or password not correct."))
            }else {
                const payload = {
                    sub: user.id,
                    exp: Date.now() + parseInt(process.env.JWT_LIFETIME),
                    username: user.email_addr
                };
                const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET, {algorithm: process.env.JWT_ALGORITHM});
                res.cookie('jwt',token);
                res.json({ result: true});
            }

        })(req, res);
    }


}

module.exports = controller;