const getPosts = (req, res)=>{

    res.json({
        message: "Obtenir les posts en passant par le controlleur"
    })
}

const addPost = (req, res)=>{
    res.json({
        message: "Ajouter un post en passant par le controlleur"
    })
}


const updatePost = (req, res)=>{(
    res.json({
        message: "Modifier le post ayant l'id: "  +req.params.id+ " en passant par le controlleur" 
    })
)}


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
    addPost,
    updatePost,
    likePost,
    dislikePost,
    deletePost,
  
}