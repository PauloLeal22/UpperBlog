const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

module.exports = {
    async store(req, res){
        const {name, lastName, email, password, confirmPassword} = req.body

        // Comparing passwords
        if(password != confirmPassword){
            res.redirect('/admin/register/1')
        }

        const verif = await User.findOne({
            where: {
                email: email
            }
        })

        // Checking if there is already an email in the database
        if(verif != undefined){
            res.redirect('/admin/register/2')
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        try {
            // Inserting user
            const user = await User.create({
                name: name,
                last_name: lastName,
                email: email,
                password: hash
            })

            // Creating session
            req.session.user = {
                userId: user.id,
                userName: user.name,
                userEmail: user.email
            }

            res.redirect('/admin/home')

        } catch (error) {
            console.log(error)
            res.redirect('/admin/register/3')
        }
    },

    async login(req, res){
        const {email, password} = req.body

        // Checking if the user exists
        const user = await User.findOne({
            where: {
                email: email
            }
        })

        if(user == undefined){
            res.redirect('/admin/login/1')
        }

        // Comparing passwords
        const correct = bcrypt.compareSync(password, user.password)

        if(correct){
            // Creating session
            req.session.user = {
                userId: user.id,
                userName: user.name,
                userEmail: user.email
            }

            res.redirect('/admin/home')
            
        }else{
            res.redirect('/admin/login/1')
        }
        
    },

    async adminHome(req, res){
        res.send('Hello world')
    }
}