const mongoose = require('mongoose');
const { Schema } = mongoose

const postSchema = new Schema({
    title : {
         type: String,
         required: true
    },
    content: {
        type: String,
        required: true
    },
    likers: {
        type: [String],
    },
    author: {
        type : String,
        required :true
    },
},
{
    timestamps: true
})

const postModel = mongoose.model('Posts', postSchema)

module.exports = postModel