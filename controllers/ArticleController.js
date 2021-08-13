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

        const date = new Date()
        const formatYmd = date => date.toISOString().slice(0, 10);
        const dateFormated = formatYmd(date).split('-').reverse().join('-').replace('-', '/')

        try {
            await Article.create({
                title: title,
                slug: slugify(title),
                resume: resume,
                body: body,
                image: image,
                date: dateFormated,
                categoryId: category
            })

            res.redirect('/admin/home')
        } catch (error) {
            console.log(error)
            res.redirect('/admin/home')
        }
    },

    async showArticle(req, res){
        const slug = req.params.slug

        const article = await Article.findOne({
            where: {
                slug: slug
            }
        })

        if(article == undefined){
            res.redirect('/')
        }

        const categories = await Category.findAll()

        res.render('admin/articles/article', {
            article: article,
            categories: categories
        })
    },

    async showFormEdit(req, res){
        const id = req.params.id

        const article = await Article.findOne({
            where: {
                id: id
            }
        })

        const categories = await Category.findAll()

        res.render('admin/articles/edit', {
            article: article,
            categories: categories
        })
    },

    async update(req, res){
        const {id, title, resume, body, image, category} = req.body

        try {
            await Article.update({
                title: title,
                slug: slugify(title),
                resume: resume,
                body: body,
                image: image,
                categoryId: category
            }, {
                where: {
                    id: id
                }
            })

            res.redirect('/admin/home')
        } catch (error) {
            console.log(error)
            res.redirect('/admin/home')
        }
    },

    async delete(req, res){
        const id = req.body.id

        try {
            Article.destroy({
                where:{
                    id: id
                }
            })

            res.redirect('/admin/home')
        } catch (error) {
            console.log(error)
            res.redirect('/admin/home')
        }
    }
}