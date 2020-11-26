const express = require('express')
const router = express.Router()

const User = require('../models/User')
const Order = require('../models/Order')

router.get('/',async (req,res) => {
    const findUser = await User.findById(req.session.user)
    res.render('dashboard/showDashboard', { user : findUser})
})

router.get('/orders', async (req,res) => {
    const findUser = await User.findById(req.session.user).populate('orders')
    res.render('dashboard/showOrders', { orders: findUser.orders })
})

router.route('/orders/create')
    .get((req,res) => {
        res.render('dashboard/showOrdersCreate')
    })
    .post(async (req,res) => {
        const newOrder = Order({
            description: req.body.description,
            link_address: req.body.link_address
        })
        const findUser = await User.findById(req.session.user)
        await newOrder.save()
        findUser.orders.push(newOrder)
        await findUser.save()
        res.redirect('/dashboard/orders')
    })

module.exports = router