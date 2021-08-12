const express = require('express')
const router = express.Router()
const auth = require('./middlewares/auth')

const UserController = require('./controllers/UserController')
const HomeController = require('./controllers/HomeController')
const CategoryController = require('./controllers/CategoryController')
const ArticleController = require('./controllers/ArticleController')

// Home routes
router.get('/', HomeController.index)
router.get('/admin/register', HomeController.register)
router.get('/admin/login', HomeController.login)
router.get('/admin/register/:error', HomeController.registerError)
router.get('/admin/login/:error', HomeController.loginError)

// User routes
router.post('/user/register', UserController.store)
router.post('/user/login', UserController.login)

// Articles routes
router.get('/admin/home', auth, ArticleController.index)
router.get('/article/new', auth, ArticleController.showForm)
router.post('/article/save', auth, ArticleController.store)

// Categories routes
router.get('/admin/categories', auth, CategoryController.index)
router.get('/category/new', auth, CategoryController.showForm)
router.post('/category/save', auth, CategoryController.store)

module.exports = router