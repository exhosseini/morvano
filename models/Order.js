const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    description: String,
    link_address: String,
    status: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model('Order', orderSchema)