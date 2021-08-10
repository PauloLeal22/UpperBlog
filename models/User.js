const Sequelize = require('sequelize')
const connection = require('../database/database')

// Defining the table
const User = connection.define('users', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
    }
})

module.exports = User