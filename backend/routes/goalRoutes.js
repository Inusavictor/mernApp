const express = require('express')
const router = express.Router()
const {getGoals, createGoals, updGoals, deleteGoals} = require('../controller/goalController')

router.route('/').get(getGoals).post(createGoals)

router.route('/:id').put(updGoals).delete(deleteGoals)

module.exports = router