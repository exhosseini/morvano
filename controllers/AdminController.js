const express = require('express')
const router = express.Router()

const Order = require('../models/Order')

router.get('/', (req,res) => {
    res.render('admin/showAdminDashboard')
})

router.get('/orders', async (req,res) => {
    const findOrders = await Order.find({}).populate('user')
    res.render('admin/showOrders', {orders: findOrders})
})

module.exports = router