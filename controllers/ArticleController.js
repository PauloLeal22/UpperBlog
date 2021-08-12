const slugify = require('slugify')

const Article = require('../models/Article')
const Category = require('../models/Category')

module.exports = {
    async index(req, res){
        const articles = await Article.findAll({
            include: [{model: Category}]
        })

        res.render('admin/articles/articles', {articles: articles})
    },

    async showForm(req, res){
        const categories = await Category.findAll()

        res.render('admin/articles/new', {categories: categories})
    },

    async store(req, res){
        const {title, resume, body, image, category} = req.body

        try {
            await Article.create({
                title: title,
                slug: slugify(title),
                resume: resume,
                body: body,
                image: image,
                categoryId: category
            })

            res.redirect('/admin/home')
        } catch (error) {
            console.log(error)
            res.redirect('/admin/home')
        }
    }
}