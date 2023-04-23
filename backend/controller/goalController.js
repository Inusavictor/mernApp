const asyncHandler = require('express-async-handler')

//@desc Get goals
//@route get /api/goals
//@access private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'get goals'})
    console.log('my first goal')
})

//@desc create goals
//@route post /api/goals
//@access private
const createGoals = asyncHandler(async (req, res) => {
    if (!req.body.text) {
    res.status(401)
     throw new Error('fill in all fields')
    }
    res.status(200).json(req.body)
})

//@desc update goals
//@route put /api/goals/:id
//@access private
const updGoals = asyncHandler(async (req, res) => {
    res.status(200).json({message: `update goals ${req.params.id}`})
    console.log('updated first goal')
})

//@desc delete goals
//@route delete /api/goals/:id
//@access private
const deleteGoals = asyncHandler(async (req, res) => {
    res.status(200).json({message: `delete goals ${req.params.id}`})
    console.log('deleted first goal')
})

module.exports = {getGoals, createGoals, updGoals, deleteGoals}