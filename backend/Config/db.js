const mongoose = require('mongoose')

const connectDB = async() => {
    try{
        mongoose.set('strictQuery', false)
        mongoose.connect(process.env.DATABASE_URI)
    }catch(err){
        console.log('[DATABASE_ERR]', err)
        process.exit()
    }
}

module.exports = connectDB