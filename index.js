const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

mongoose.connect('mongodb://localhost:27017/morvano', {useNewUrlParser: true, useUnifiedTopology: true});

app.set('view engine', 'pug')

app.use(express.static('public'))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(bodyParser.urlencoded({ extended: false }))


const AuthController  = require('./controllers/AuthController')
const DashboardController  = require('./controllers/DashboardController')
const AdminController = require('./controllers/AdminController')

const isLogin = require('./middlewares/isLogin')
const isAdmin = require('./middlewares/isAdmin')
const isGuest = require('./middlewares/isGuest')

app.get('/', (req,res) => {
    res.redirect('/dashboard')
})

app.use('/auth', isGuest,AuthController)
app.use('/dashboard',isLogin, DashboardController)
app.use('/admin', isLogin, isAdmin, AdminController)

app.listen(3000, () => {
    console.log('Server running on port 3000')
})