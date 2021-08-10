const express = require('express')

module.exports = {
    async index(req, res){
        res.render('index')
    },

    async login(req, res){
        res.render('login', {error: false})
    },

    async register(req, res){
        res.render('register', {error: false})
    },

    // 
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

    async loginError(req, res){
        let error = req.params.error

        if(error == 1){
            res.render('login', {error: "Email ou senha incorretos!"})
        }
    }
}