const express = require('express')
const { getPosts, addPost, updatePost, likePost, dislikePost, deletePost, getPost } = require('../controllers/postController')
const { getPostsByUser } = require('../controllers/postController')
const router = express.Router()

// Obtenir tous les postes
router.get('/', getPosts)

router.get('/user/:userId',getPostsByUser)

// Obtenir un post
router.get('/:id',getPost)

// Ajouter un post
router.post('/', addPost)

// Modifier un post
router.put('/:id', updatePost)

// Liker et disliker un post

router.patch('/like-post/:id', likePost)

router.patch('/dislike-post/:id', dislikePost)

// Supprimer un post
router.delete('/:id', deletePost)



module.exports = router