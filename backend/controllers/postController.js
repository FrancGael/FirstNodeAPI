const postModel = require('../models/postsModels');
const userModel = require('../models/usersModels');
const { getLoggedUser } = require('./userController');

const getPosts = async(req, res) => {
    const posts = await postModel.find().sort({createdAt: -1})
    res.json(posts)
}

const getPostsByUser = async (req, res) => {
    const userId  = req.params.userId
   
    // const { userId } = req.params   et  const userId  = req.params.userId signifient la meme chose
    try {
      await postModel.find({author: userId}).sort({createdAt: -1})
      .then((posts) => {
        if(!posts) return res.status(404).json({ message:"Posts not found"})
        res.json(posts)
      })
    } catch (err) {
      res.status(404).json({ message: "Une erreur s'est produite" });
    }
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
        return res.status(400).json({message: "Missing some data"})
    }
    const user = await userModel.findById(author)
    if(!user) return res.status(404).json('Unknow author')
    const authUser = getLoggedUser(req, res)
    if(!authUser) return res.status(403).json('Unauthorized')
    // if(author !== authUser._id) return res.status(403).json('Unauthorized')
    const post = await postModel.create({
        title, 
        content, 
        author: authUser._id, 
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


const likePost  = async(req, res) => {
  try{
       await  postModel.findByIdAndUpdate(
       req.params.id,
       { $addToSet: { likers: req.body.id } },
       { new: true }
    ).then((data) => res.status(200).send(data));
  } catch(err){
       res.status(400).json({message:"Error occured when liking"})
    }
};  


const dislikePost  = async(req, res) => {
    try{
         await  postModel.findByIdAndUpdate(req.params.id,
            { $pull: { likers: req.body.id } },
            { new: true })
         .then((data) => res.status(200).send(data));
    } catch(err){
         res.status(400).json({message:"Error occured when liking"})
      }
  }; 

const deletePost  = async(req,res)=>{
    try {
        const postId = req.params.id
        const delPost = await postModel.findByIdAndDelete(postId)
        res.status(201).json(delPost);

    } catch (error) {
        res.status(422).json({essage: 'An error occured when deleting post'});
    }
}

module.exports = {
    getPosts,
    getPostsByUser,
    getPost,
    addPost,
    updatePost,
    likePost,
    dislikePost,
    deletePost,
}