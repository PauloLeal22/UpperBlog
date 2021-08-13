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
    },

    async delete(req, res){
        const id = req.body.id

        await Category.destroy({
            where: {
                id: id
            }
        })

        res.redirect('/admin/categories')
    },

    async showFormEdit(req, res){
        const id = req.params.id

        const category = await Category.findOne({
            where: {
                id: id
            }
        })

        res.render('admin/categories/edit', {category: category})
    },

    async update(req, res){
        const {id, title} = req.body

        await Category.update({
            title: title,
            slug: slugify(title)
        }, {
            where: {
                id: id
            }
        })

        res.redirect('/admin/categories')
    }
}