const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    phone_number: String,
    verify_token: String,
    is_admin: {
        type: Boolean,
        default: false
    },
    orders : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    }]
})

module.exports = mongoose.model('User', userSchema)