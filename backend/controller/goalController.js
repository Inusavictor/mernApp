const asyncHandler = require('express-async-handler')
const Goal = require('../model/goalsModel')

//@desc Get goals
//@route get /api/goals
//@access private
const getGoals = asyncHandler(async (req, res) => {
    
    const goals = await Goal.find({user: req.user.id})
   if (goals) {
    res.status(200).json(goals)
   } else {
    res.status(401)
    throw new Error('Couldnt fetch goals')
   }
    
})

//@desc create goals
//@route post /api/goals
//@access private
const createGoals = asyncHandler(async (req, res) => {
     // body validation
     if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a goal')
    }
    //get user from token
    const {id} = req.user
    // add goal to database
    const goal = await Goal.create({user: id, text: req.body.text, description: req.body.description})
    if (goal) {
        res.status(200).json(goal)
    } else {
        res.status(400)
        throw new Error('goal not added')
    }
   
})

//@desc update goals
//@route put /api/goals/:id
//@access private
const updGoals = asyncHandler(async (req, res) => {
    //Goal validation
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a goal')
    }

    //find goal to be updated
    const goal = await Goal.findOne({_id: req.params.id})
    if (!goal) {
        res.status(400)
        throw new Error('Goal does not exist')
    } 
        //validate user
        if (req.user.id !== goal.user.toString()) {
            res.status(400)
            throw new Error('not authorized')
        }

    // update goal 
    const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if (updateGoal) {
        res.status(200).json(updateGoal)
    } else {
        res.status(402)
        throw new Error('goal couldnt be updated')
    }
    
})

//@desc delete goals
//@route delete /api/goals/:id
//@access private
const deleteGoals = asyncHandler(async (req, res) => {
  
    //find goal to be deleted
    const goal = await Goal.findOne({_id: req.params.id})
    if (!goal) {
        res.status(400)
        throw new Error('Goal does not exist')
    } 
     //validate user
     if (req.user.id !== goal.user.toString()) {
         res.status(400)
         throw new Error('not authorized')
     }
    
    const del = await Goal.findByIdAndDelete(req.params.id)
    
    if (del) {
              res.status(200).json({id: req.params.id})
    } else{
        res.status(500)
        throw new Error('couldnt delete')
    }
})

module.exports = {getGoals, createGoals, updGoals, deleteGoals}