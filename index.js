const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')
const routes = require('./routes')
const session = require('express-session')

// Config view engine
app.set('view engine', 'ejs')

// Config static
app.use(express.static('public'))

// Config session
app.use(session({
    secret: "zlatanibrahimovic",
    cookie: {maxAge: 86400000} // Expires in 24h
}))

// Config bodyParser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Connection in database
connection.authenticate()
    .then(() => console.log('Connection established successfully!'))
    .catch(err => console.log(`Error: ${err}`))

// Using routes
app.use(routes)

// Importing models
const User = require('./models/User')

app.listen(3000, () => console.log('Server is running...'))