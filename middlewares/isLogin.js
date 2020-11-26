const User = require('../models/User')

module.exports = async (req,res,next) => {
    if(req.session.user) {
        const findUser = await User.findById(req.session.user)
        if ( findUser ) {
            next()
        } else {
            req.session = null
            res.redirect('/auth/login')
        }
    } else {
        res.redirect('/auth/login')
    }
}