const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    return res.json({message: "Obtenir les posts"})
})

router.post('/', (req, res) => {
    return res.json({message: "Créer un post"})
})

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