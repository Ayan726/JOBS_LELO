const express = require('express')
const router = express.Router()
const {register, login, loginWithGoogle, logout} = require('../controllers/auth')


router.route('/register').post(register)
router.route('/login').post(login)
router.route('/loginwithgoogle').post(loginWithGoogle)
router.route('/logout').delete(logout)

module.exports = router