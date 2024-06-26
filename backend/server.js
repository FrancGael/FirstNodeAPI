const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const connectDB = require('./Config/db.js')
const cookieParser = require('cookie-parser')

const port = process.env.PORT|| 8080

// DATABASE Connection
connectDB()

const app = express()

// middleware
app.use(express.json()) 
app.use(express.urlencoded({ extended: false}))
app.use(cors({
    origin: process.env.CLIENT_URL|| '*',
    credentials: true,
}))
app.use(cookieParser())

// routes
app.use('/api/posts', require('./routes/postRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.listen(port,()=>{
    console.log(`Server listening from ${port}\n\nLocal server: http://localhost:${port}`);
})