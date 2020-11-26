const express = require('express')
const kavenegar = require('kavenegar');
const { find } = require('../models/User');


const api = kavenegar.KavenegarApi({
    apikey: '42567230676F2F38655A4B535178692F37627456574A764A5656566F4F72456F'
});

const router = express.Router()

// Models

const User = require('../models/User')

// functions

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


router.route('/login')
    .get((req,res) => {
        res.render('auth/showLogin')
    })
    .post(async (req,res) => {
        const findUser = await User.findOne({
            phone_number : req.body.phone_number
        })
        if (findUser) {

            findUser.verify_token = 1
            // findUser.verify_token = randomInteger(11111,55555)
            await findUser.save()
            // await api.VerifyLookup({
            //     receptor: findUser.phone_number,
            //     token: findUser.verify_token,
            //     template: "verify"
            // });

            res.render('auth/showLoginVerify', {phone_number:findUser.phone_number})
        } else {
            res.redirect('/auth/register')
        }
    })

router.post('/login/verify', async (req,res) => {
    const findUser = await User.findOne({
        phone_number : req.body.phone_number
    })

    if (findUser.verify_token === req.body.verify_token) {
        req.session.user = findUser.id
        res.redirect('/dashboard')
    } else {
        res.render('auth/showLoginVerify', {  phone_number:findUser.phone_number,message: 'کد وارد شده اشتباه است .'})
    }

})
router.route('/register')
    .get((req,res) => {
        res.render('auth/showRegister')
    })
    .post(async (req,res) => {
        const findUser = await User.findOne({
            phone_number: req.body.phone_number
        })
        if ( findUser ) {
            res.redirect('/auth/login')
        } else {
            const newUser = new User({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                phone_number: req.body.phone_number,
                verify_token: randomInteger(11111,99999)
            })
            await newUser.save()
            await api.VerifyLookup({
                receptor: newUser.phone_number,
                token: newUser.verify_token,
                template: "verify"
            });

            res.render('auth/showRegisterVerify', {phone_number:newUser.phone_number})
        }
    })
router.post('/register/verify', async (req,res) => {
    const findUser = await User.findOne({
        phone_number: req.body.phone_number
    })
    if (findUser) {
        if ( findUser.verify_token === req.body.verify_token ) {
            req.session.user = findUser.id
            res.redirect('/dashboard')
        } else {
            res.render('auth/showRegisterVerify', {phone_number:findUser.phone_number,message: 'کد وارد شده اشتباه است .'})
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