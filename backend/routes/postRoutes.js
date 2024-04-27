const express = require('express')
const { getPosts, addPost, updatePost, likePost, dislikePost, deletePost } = require('../controllers/postController')
const router = express.Router()

router.get('/', getPosts)

router.post('/', addPost)

router.put('/:id', updatePost)

router.patch('/like-post/:id', likePost)

router.patch('/dislike-post/:id', dislikePost)

router.delete('/:id', deletePost)


router.put('/:id', (req, res) => {
    return res.json({message: "modifier le post avec l'id: " +req.params.id})
})

router.patch('/like-post/:id', (req, res) => {
    return res.json({message: "Liker le post: " +req.params.id})
})


router.patch('/dislike-post/:id', (req, res) => {
    return res.json({message: "Disliker le post: " +req.params.id})
})


router.delete('/:id', (req, res) => {
    return res.json({message: "supprimer le post avec l'id: " +req.params.id})
})

module.exports = router