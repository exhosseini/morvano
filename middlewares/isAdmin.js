const User = require('../models/User')


module.exports = async (req,res,next) => {
    const findUser = await User.findById(req.session.user)
    if (findUser.is_admin) {
        next()
    } else {
        res.send('403 Error')
    }
}