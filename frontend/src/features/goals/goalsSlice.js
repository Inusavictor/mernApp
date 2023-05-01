import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import goalsService from './goalsService'


const initialState = {
    goals: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}

//get goals
export const getGoals = createAsyncThunk('get/goals', async(_, thunkAPI) => {
    try {
        //retrieve token from logged in user
        const token = thunkAPI.getState().auth.user.token
        //get goals from database
        return await goalsService.getGoals(token)
        
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//set goals
export const setGoal = createAsyncThunk('setgoal', async (formData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalsService.setGoal(token, formData)
        
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//delete goals
export const deleteGoal = createAsyncThunk('delete/goal', async (goalId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalsService.deleteGoal(token, goalId)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//update goals
export const updateGoal = createAsyncThunk('update/goal', async (formData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalsService.updateGoal(token, formData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const goalsSlice = createSlice({
    name: 'goal',
    initialState,
    reducers : {
        reset: (state) => {state.isLoading = false
                           state.isSuccess = false
                           state.isError = false
                           state.message = '' }
    },
    extraReducers : (builder) => {
        builder
        .addCase(getGoals.pending, (state) => {state.isLoading = true})
        .addCase(getGoals.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.goals = action.payload
        })
        .addCase(getGoals.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(setGoal.pending, (state) => { state.isLoading = true })
        .addCase(setGoal.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.goals.push(action.payload)
        })
        .addCase(setGoal.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteGoal.pending, (state) => {state.isLoading = true})
        .addCase(deleteGoal.fulfilled, (state, action) => {
          state.isLoading = false
          state.goals =  state.goals.filter((goal) => {
                return goal._id !== action.payload.id
            })
        })
        .addCase(deleteGoal.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(updateGoal.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updateGoal.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            const index = state.goals.findIndex(goal => goal._id === action.payload._id)
            const newGoals = [...state.goals]
            newGoals[index].text = action.payload.text 
            newGoals[index].description = action.payload.description 
        })
        .addCase(updateGoal.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload 
        })
    }
})

export const { reset } = goalsSlice.actions
export default goalsSlice.reducer