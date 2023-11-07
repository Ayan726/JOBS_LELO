const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { Unauthenticated } = require('../errors')

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.jwt
    try {
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        const rootUser = await User.findOne({_id: verifyToken.id, "tokens.token": token})
        if(!rootUser){
            throw new Unauthenticated('No user!!')
        }
        req.userId = rootUser._id
        next()

    } catch (err) {
        throw new Unauthenticated('user not authorized!!')
    }
    
}

module.exports = authMiddleware