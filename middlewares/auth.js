// Checking if the user is logged in
function auth(req, res, next){
    if(req.session.user != undefined){
        next()
    }else{
        res.redirect('/admin/login')
    }
}

module.exports = auth