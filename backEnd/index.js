'use strict';

require('dotenv').config();
const https               = require('https')
const fs                  = require('fs')
const express             = require('express');
const bodyParser          = require('body-parser');
const passport            = require("passport");
const JwtStrategy         = require('passport-jwt').Strategy;
const LocalStrategy       = require('passport-local').Strategy;
const ExtractJwt          = require('passport-jwt').ExtractJwt;
const bcrypt              = require('bcryptjs');
const user_routes         = require('./routes/user');
const User                = require('./model');
const tokenAuthentication = require('./middleware/auth');
const cookieParser        = require('cookie-parser');
const cors                = require('cors');

let app = express();

passport.use(new LocalStrategy({
    usernameField: "user_email",
    passwordField: "user_password",
    session: false
}, (username, password, done)=>{
    User.users.findFirst({ where: { email_addr: username } })
    .then(data=>{
        if(data === null) return done(null, false);
        else if(!bcrypt.compareSync(password, data.pwd)) { return done(null, false); }
        return done(null, data);
    })
    .catch(err=>done(err, null))
}));

let opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
var cookieExtractor = function(req) {
    var token = null;
    if ('jwt' in req.cookies){
        if (req && req.cookies['jwt']) token = req.cookies['jwt'];
    }
    return token;
  };
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET;
opts.algorithms = [process.env.JWT_ALGORITHM];

passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
    User.users.findUnique({ where: { id: jwt_payload.sub } })
        .then(data=>{
        if (data === null) {
            return done(null, false);
        }
        else  
            return done(null, data);
        })
        .catch(err=>done(err, null))
}));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
// app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({ credentials: true, origin: process.env.frontEndUrl }));

app.use('/api', user_routes);

app.use(tokenAuthentication.errorHandler);
app.use(tokenAuthentication.notFoundHandler);

let port = process.env.PORT || 5000;
// app.listen(port, function () {
//   console.log('express server listening ...');
// });
https.createServer({
    key: fs.readFileSync('./cert/server.key'),
    cert: fs.readFileSync('./cert/server.cert')
  }, app).listen(port, function () {
    console.log('Listening...')
  })