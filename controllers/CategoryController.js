const Category = require('../models/Category')
const Article = require('../models/Article')
const slugify = require('slugify')

module.exports = {
    // Show all categories for table categories
    async index(req, res){
        const categories = await Category.findAll()

        res.render('admin/categories/categories', {categories: categories})
    },

    // Render the category registration form
    async showForm(req, res){
        res.render('admin/categories/new')
    },

    // Route for register categories
    async store(req, res){
        const title = req.body.title

        try {
            // Add category
            await Category.create({
                title: title,
                slug: slugify(title)
            })

            res.redirect('/admin/categories')

        } catch (error) {
            console.log(error)
            res.redirect('/admin/categories')
        }
    },

    // Router for delete category
    async delete(req, res){
        const id = req.body.id

        // Delete category
        await Category.destroy({
            where: {
                id: id
            }
        })

        res.redirect('/admin/categories')
    },

    // Render the form of edit category
    async showFormEdit(req, res){
        const id = req.params.id

        const category = await Category.findOne({
            where: {
                id: id
            }
        })

        res.render('admin/categories/edit', {category: category})
    },

    // Route for update category
    async update(req, res){
        const {id, title} = req.body

        // Update category
        await Category.update({
            title: title,
            slug: slugify(title)
        }, {
            where: {
                id: id
            }
        })

        res.redirect('/admin/categories')
    },

    // Route to show all articles of a given category
    async showCategoryArticles(req, res){
        const slug = req.params.slug

        // Select the category
        const category = await Category.findOne({
            where: {
                slug: slug
            }
        })

        // Select all categories
        const categories = await Category.findAll()

        // Select all articles of a given category
        const articles = await Article.findAll({
            where: {
                categoryId: category.id
            }
        })

        res.render('category', {
            categories: categories,
            category: category,
            articles: articles
        })
    }
}