const Sequelize = require('sequelize')

const connection = new Sequelize('db_upper_blog', 'root', 'deathnote', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
})

module.exports = connection