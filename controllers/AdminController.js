const express = require('express')
const router = express.Router()

const Order = require('../models/Order')
const User = require('../models/User')

router.get('/', (req,res) => {
    res.redirect('/admin/orders')
})

router.get('/orders', async (req,res) => {
    const findOrders = await Order.find({}).populate('user')
    res.render('admin/showOrders', {orders: findOrders})
})

router.get('/users', async (req,res) => {
    const users = await User.find()
    res.render('admin/showUsers', {users})
})

module.exports = router