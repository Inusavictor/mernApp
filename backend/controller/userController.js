const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//desc Register user
//route POST api/users/register
//access public
const createUser = asyncHandler (async(req, res) => {
    const {name, email, password} = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please fill in all fields')
    }
    //ensure no registered user
    const userExist = await User.findOne({email})
    if (userExist) {
        res.status(401)
        throw new Error('User exists, register with a different email')
    } else {
         //hash password
         const salt = bcrypt.genSaltSync(10)
         const hashedPass = bcrypt.hashSync(password, salt)
        const userData = {
            name, email, password:hashedPass
        }
        //add user to database
        const newUser = await User.create(userData)
        if (newUser) {
            res.status(200).json({
                _id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                token: token(newUser._id)
            })
        } else {
            res.status(400)
            throw new Error('User not registered')
        }
    }
})

//desc Register user
//route POST api/users/register
//access public
const loginUser = asyncHandler (async(req, res) => {
    const {email, password} = req.body
    if(!email || !password) {
        res.status(400)
        throw new Error('Please fill in all fields')
    }
    //check if user exist
    const userExist = await User.findOne({email})
    if (!userExist) {
        res.status(400)
        throw new Error('User not found')
    }
    //verify password
    if (userExist && bcrypt.compareSync(password, userExist.password)){
        res.status(200).json({
            _id: userExist._id,
            name: userExist.name,
            email: userExist.email,
            token: token(userExist._id)
        })
    } else {
        res.status(400)
        throw new Error('incorrect password')
    }
})

//desc Register user
//route GET api/users/me
//access private
const getMe = asyncHandler (async(req, res) => {
    const {id, name, email} = req.user
    console.log(id, name, email)
    res.status(200).json({ id, name, email})
})

const token = (id) => {
  return  jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1h'})
}


module.exports = {createUser, loginUser, getMe}