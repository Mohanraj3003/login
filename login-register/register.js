import express from 'express';
import User from '../database/schema.js';
import bcrypt from 'bcrypt';
let app = express.Router()

// LocalStrategy = require('passport-local').Strategy;
import LocalStrategy from 'passport-local';
LocalStrategy.Strategy;
app.post('/', async (req, res) => {
    let hashpassword = await bcrypt.hash(req.body.password, 10)
    let reg = new User({
        mail: req.body.mail,
        password: hashpassword
    })
    try {
        let resp = await reg.save();
        res.status(201).json({ response: resp })
    } catch (e) {
        res.status(500).json({ Error: e })
    }
})
app.get('/fail', (req, res) => {
    res.send("failed....!")
})

app.get('/dasboard', (req, res) => {
    res.send("successfully done...!")
})
app.post('/login', (req, res) => {
    let mail = req.body.mail
    let password = req.body.password
    req.passport.authenticate('local', {
        successRedirect: '/dasboard',
        failureRedirect: '/fail'
    })
    let valid = (username, password, done) => {
        let users = User.findOne({ mail: username }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect Mail..'
                })
            }
            if (!(bcrypt.compare(password, user.password))) {
                return done(null, false, {
                    message: 'Incorrect Password...'
                })
            }
            return done(null, user);
        })
    }
    req.passport.use(new LocalStrategy({
        usernameField: mail,
        passwordField: password
    }), valid)

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
});

export default app