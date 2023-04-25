const jwt = require('jsonwebtoken')
const User = require('../model/userModel')
const asyncHandler = require('express-async-handler')

const Protect = asyncHandler (async(req, res, next) => {
    
   let token 
if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
        token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select('-password')
        next()
    } catch (error) {
        console.log(error)
        res.status(400)
        throw new Error('Not Authorized')
    }
    
    
} else if (!token) {
    res.status(400)
    throw new Error('User not authorized, no token')
}
})

module.exports = Protect