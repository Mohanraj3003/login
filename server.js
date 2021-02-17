import express from 'express'
const app = express()
const PORT = process.env.PORT || 8000

// import register from './login-register/register.js'
import mongoose from './database/connect.js';

import sign from './passport/passports.js';
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


// app.use('/register', register)
app.use('/register', sign)
app.get('/', (req, res) => {
    res.send('yes')
})



app.listen(PORT, () => {
    console.log('Server is Running on: ' + PORT)
})