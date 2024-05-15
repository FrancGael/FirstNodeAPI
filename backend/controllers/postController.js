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
         await  postModel.findByIdAndUpdate(
         req.params.id,
         { $pull: { likers: req.body.id } },
         { new: true }
      ).then((data) => res.status(200).send(data));
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
    getPost,
    addPost,
    updatePost,
    likePost,
    dislikePost,
    deletePost,

}