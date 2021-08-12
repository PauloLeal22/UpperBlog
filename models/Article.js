const Sequelize = require('sequelize')
const connection = require('../database/database')
const Category = require('./Category')

const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    resume: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

// Defining relationships
Article.belongsTo(Category) // (1, 1)
Category.hasMany(Article) // (1, N)

module.exports = Article