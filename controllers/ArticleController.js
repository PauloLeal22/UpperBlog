const slugify = require('slugify')

const Article = require('../models/Article')
const Category = require('../models/Category')

module.exports = {
    // Show all articles for articles table
    async index(req, res){
        const articles = await Article.findAll({
            include: [{model: Category}]
        })

        res.render('admin/articles/articles', {articles: articles})
    },

    // Render the form for new articles
    async showForm(req, res){
        const categories = await Category.findAll()

        res.render('admin/articles/new', {categories: categories})
    },

    // Creation of new articles
    async store(req, res){
        const {title, resume, body, image, category} = req.body

        // Article date formatting
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

    // Show the chosen article
    async showArticle(req, res){
        const slug = req.params.slug

        try {
            // Select article
            const article = await Article.findOne({
                where: {
                    slug: slug
                }
            })
    
            if(article == undefined){
                res.redirect('/')
            }
            
            // Select categories
            const categories = await Category.findAll()
    
            res.render('article', {
                article: article,
                categories: categories
            })

        } catch (error) {
            const articles = Article.findAll()
            console.log(error)
            res.redirect('/', {categories: categories, articles: articles})
        }
        
    },

    // Render the form for edit articles
    async showFormEdit(req, res){
        const id = req.params.id

        // Select article
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

    // Route for update the article
    async update(req, res){
        const {id, title, resume, body, image, category} = req.body

        try {
            // Update article
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

    // Route for delete the article
    async delete(req, res){
        const id = req.body.id

        try {
            // Delete article
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
    },

    // Show 4 articles per page
    async articlesPages(req, res){
        // Number of page
        const page = req.params.num
        let offset = 0
    
        if(isNaN(page) || page == 1){
            offset = 0
        }else{
            // Setting the number of articles
            offset = (parseInt(page) * 4) - 4
        }
    
        // Select 4 articles
        const articles = await Article.findAndCountAll({
            include: [{model: Category}],
            limit: 4,
            offset: offset,
            order: [['id', 'DESC']]
        })
        
        // Checking if there will be the next page
        if(articles){
            let next
    
            if(offset + 5 >= articles.count){
                next = false
            }else{
                next = true
            }
    
            const result = {
                page: parseInt(page),
                next: next,
                articles: articles
            }

            const categories = await Category.findAll()

            res.render('page', {
                result: result,
                categories: categories
            })
        }
    }
}