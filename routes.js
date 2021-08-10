const express = require('express')
const router = express.Router()
const auth = require('./middlewares/auth')

const UserController = require('./controllers/UserController')
const HomeController = require('./controllers/HomeController')

// Home routes
router.get('/', HomeController.index)
router.get('/admin/register', HomeController.register)
router.get('/admin/login', HomeController.login)
router.get('/admin/register/:error', HomeController.registerError)
router.get('/admin/login/:error', HomeController.loginError)

// User routes
router.post('/user/register', UserController.store)
router.post('/user/login', UserController.login)
router.get('/admin/home', auth, UserController.adminHome)

module.exports = router