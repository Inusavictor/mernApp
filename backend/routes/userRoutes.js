const express = require('express')
const router = express.Router()
const Protect = require('../middleware/authMiddleware')
const {createUser, loginUser, getMe} = require('../controller/userController')

router.post('/register', createUser)
router.post('/login', loginUser)
router.get('/me', Protect, getMe)


module.exports = router