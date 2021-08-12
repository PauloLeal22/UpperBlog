const Category = require('../models/Category')
const slugify = require('slugify')

module.exports = {
    async index(req, res){
        const categories = await Category.findAll()

        res.render('admin/categories/categories', {categories: categories})
    },

    async showForm(req, res){
        res.render('admin/categories/new')
    },

    async store(req, res){
        const title = req.body.title

        try {
            await Category.create({
                title: title,
                slug: slugify(title)
            })

            res.redirect('/admin/categories')
        } catch (error) {
            console.log(error)
            res.redirect('/admin/categories')
        }
       
    }
}