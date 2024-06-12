const express = require('express')
const { getUsers, signUP, signIn, signOut, getLoggedUser, } = require('../controllers/userController')
const router = express.Router()

router.get('/', getUsers)
router.post('/sign-up', signUP)
router.post('/sign-In', signIn)
router.post('/sign-out', signOut)
router.get('/get-logged-user', getLoggedUser)

module.exports = router