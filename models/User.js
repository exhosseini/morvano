const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: { type:String,required:true},
    last_name: { type:String,required:true},
    phone_number: {type:String,required:true},
    email_address: { type:String,required:true},
    password: { type:String,required:true},
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