import axios from 'axios'

const API_URL = 'api/goals/'

//get all goals
const getGoals = async (token) => {
 const header = {headers: {
    authorization: `Bearer ${token}`
 }}
 
 const response = await axios.get(API_URL, header)
 return response.data
}

//setGoal
const setGoal = async (token, formData) => {
   const header = {
      headers: {authorization: `Bearer ${token}`}
   }
   const response = await axios.post(API_URL, formData, header)
   return response.data
}

//delete goal
const deleteGoal = async (token, goalId) => {
   const header = {headers:{authorization: `Bearer ${token}`}}
   const response = await axios.delete(API_URL+goalId, header)
   return response.data
}

//update Goal
const updateGoal = async(token, formData) => {
   const {id, text, description} = formData
   const header = {headers: {authorization: `Bearer ${token}`}}
   const response = await axios.put(API_URL+id, {text, description}, header)
   return response.data
}


const goalsService = { getGoals, setGoal, deleteGoal, updateGoal }

export default goalsService