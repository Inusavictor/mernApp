const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const {errorHandler } = require('./middleware/errorMiddleware')
const Protect = require('./middleware/authMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()
const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/goals', Protect, require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

 app.use(errorHandler)

app.listen(port, () => {console.log(`server started on port ${port}`)})