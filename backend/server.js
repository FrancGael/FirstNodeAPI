const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')

const port = process.env.PORT|| 3000

const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(cors({
    origin: process.env.CLIENT_URL|| '*',
    credentials: true,
}))

// routes
app.use('/api/posts', require('./routes/postRoutes'))

app.listen(port,()=>{
    console.log(`Server listening on ${port}\n\nLocal server: http://localhost:${port}`);
})