const express = require('express')
const Article = require('../models/Article')
const Category = require('../models/Category')

module.exports = {
    // Show the 4 last articles
    async index(req, res){
        const articles = await Article.findAll({
            limit: 4,
            order: [['id', 'DESC']]
        })

        const categories = await Category.findAll()

        res.render('index', {articles: articles, categories: categories})
    },

    // Render the form of login
    async login(req, res){
        res.render('login', {error: false})
    },

    // Render the form of register
    async register(req, res){
        res.render('register', {error: false})
    },

    // Render the registration form if there is an error
    async registerError(req, res){
        let error = req.params.error
        if(error == 1){
            res.render('register', {error: "As senhas não estão iguais!"})
        }else if(error == 2){
            res.render('register', {error: "Esse email já está cadastrado!"})
        }else{
            res.render('register', {error: "Ocorreu um erro inesperado, tente novamente mais tarde!"})
        }
    },

    // Render the login form is there is an error
    async loginError(req, res){
        let error = req.params.error

        if(error == 1){
            res.render('login', {error: "Email ou senha incorretos!"})
        }
    }
}