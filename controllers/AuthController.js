const express = require('express')
const kavenegar = require('kavenegar');

const router = express.Router()

const User = require('../models/User')

const api = kavenegar.KavenegarApi({
    apikey: '42567230676F2F38655A4B535178692F37627456574A764A5656566F4F72456F'
});

router.route('/register')
    .get((req,res) => {
        res.render('auth/showRegister')
    })
    .post(async (req,res) => {
            const findUserByPhone = await User.findOne({ phone_number: req.body.phone_number })
            const findUserByEmail = await User.findOne({ email_address: req.body.email_address })

            if ( findUserByEmail || findUserByPhone) {
                res.render('auth/showRegister', {error: true})
            } else {
                const newUser = new User({
                    first_name:req.body.first_name,
                    last_name: req.body.last_name,
                    phone_number: req.body.phone_number,
                    email_address: req.body.email_address,
                    password: req.body.password
                })
                await newUser.save()
                req.session.user = newUser.id
                res.redirect('/')        
            }
    })

router.route('/login')
    .get((req,res) => {
        res.render('auth/showLogin')
    })
    .post(async(req,res) => {
        const findUser = await User.findOne({ email_address: req.body.email_address })
        if (findUser) {
            if ( findUser.password === req.body.password) {
                req.session.user = findUser.id
                res.redirect('/')
            } else {
                res.render('auth/showLogin', {error: true})
            }
        } else {
            res.redirect('/auth/register')
        }
    })




router.get('/logout', (req,res) => {
    req.session.user = undefined
    res.redirect('/dashboard')
})
module.exports = router