const postModel = require('../models/postsModels');

const getPosts = async(req, res) => {
    const posts = await postModel.find()
    res.json(posts)
}

const getPost = async(req, res)=>{
    const postId = req.params.id
    try{
        await postModel.findById(postId)
              .then((post) => {
                res.json(post)
              })

    }catch(err){
        res.status(404).json({message: "Post not found"})
    }
}

const addPost = async (req, res)=>{
    const {title, content, author} = req.body
    if(!title || !content || !author){
        res.status(400).json({message: "Missing some data"})
    }
    const post = await postModel.create({
        title, 
        content, 
        author, 
        likers:[]
    })
    res.json(post)
}


const updatePost = async(req, res) =>{
    const postId = req.params.id
    const {title, content} = req.body
    try{
        await postModel.findByIdAndUpdate(
            postId, 
            //req.body lorsqu'on veut envoyer tout le body
            {
                title,
                content
            },
            {
                new: true
            }
        ).then((post) => res.json(post))
    }catch(err){
        res.status(404).json({message:"Error updating post"})
    }
}


const likePost  = (req, res)=>{(
    res.json({
        message: "le post ayant l'id: "  +req.params.id+ " a été liké en passant par le controlleur" 
    })
)}


const dislikePost  = (req, res)=>{(
    res.json({
        message: "le post ayant l'id: "  +req.params.id+ " a été disliké en passant par le controlleur" 
    })
)}


const deletePost  = (req, res)=>{(
    res.json({
        message: "le post ayant l'id: "  +req.params.id+ " a été supprimé en passant par le controlleur" 
    })
)}


module.exports = {
    getPosts,
    getPost,
    addPost,
    updatePost,
    likePost,
    dislikePost,
    deletePost,

}