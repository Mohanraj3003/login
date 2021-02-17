import passport from 'passport';
import express from 'express';
let app = express.Router()
import session from 'express-session';
import flash from 'express-flash';
import passportInitialize from './local.js';

import User from '../database/schema.js';
import bcrypt from 'bcrypt';

passportInitialize(passport, async (email) => {
    return await User.findOne({ mail: email })
}, async (id) => {
    return await User.findById({ _id: id })
})


app.use(flash())
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize())
app.use(passport.session())


app.get('/fail', (req, res) => {
    res.send("failed....!")
})

app.get('/dasboard', (req, res) => {
    res.send(`successfully done...!`)
})

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

app.post('/login', passport.authenticate('local', {
    successRedirect: '/register/dasboard',
    failureRedirect: '/register/fail',
    failureFlash: true
}))

export default app
