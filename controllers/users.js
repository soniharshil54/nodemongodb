let User = require('../models/user')
let mongoose = require('mongoose')
let jwt = require('jsonwebtoken')
let {jwtSecret,saltRounds} = require('../configs/config')
let bcrypt = require('bcrypt')


exports.register_user = async function(req,res){
    console.log("register api")
    let {email, password, name, gender, contact, birthdate} = req.body
    let mailExists = await doesMailExists(email)
    if(mailExists){
        res.json({status:0, message:"mail already exists"})
        return
    }
    let hashedPassword = await bcrypt.hash(password, saltRounds)
    let id = new mongoose.Types.ObjectId()
    let newUser = new User({_id:id,email, name, gender, contact, birthdate, password : hashedPassword})
    await newUser.save()
    res.json({status:1, message:"user registered successfully"})
}

exports.get_user_by_id = function(req, res){
    let {uid} = req.params
    User.findById(uid)
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.json(err)
        })
}

exports.get_users = function(req, res){
    User.find()
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.json(err)
        })
}

exports.user_log_in = async function(req, res){
    let {email, password} = req.body
    let mailExists = await doesMailExists(email)
    if(!mailExists){
        res.json({status:0,message: "Mail doesnt exist"})
        return
    }
    let user = await User.findOne({email})
    let passwordhash = user.password
    let match = await bcrypt.compare(password, passwordhash)
    if(!match){
        res.json({status:0,message: "Password doesnt match"})
        return
    }
    //jwt token code
    let payload = {
        name : user.name,
        email : user.email
    }
    let token = jwt.sign(payload, jwtSecret, { expiresIn: 60 * 60 });
    res.json({status:1, token:token, message:"user logged in"})
}

exports.update_user = function(req, res){
    let {uid} = req.params
    User.findByIdAndUpdate(uid, req.body)
        .then(user => {
            res.json({status:1,message:"user updated"})
        })
        .catch(error => {
            res.json(error)
        })
}

exports.delete_user = function(req, res){
    let {uid} = req.params
    User.findByIdAndRemove(uid)
        .then(user => {
            res.json({status:1,message:"user deleted"})
        })
        .catch(error => {
            res.json(error)
        })
}

exports.delete_multiple_users = function(req, res){
    let {uid} = req.params
    User.findByIdAndRemove(uid)
        .then(user => {
            res.json({status:1,message:"user deleted"})
        })
        .catch(error => {
            res.json(error)
        })
}

async function doesMailExists(qmail){
    let user = await User.findOne({email:qmail})
    if(user){
        return true
    }
    else{
        return false
    }
}


// {
// 	"name":"harshil soni",
// 	"email":"sharshil43@yahoo.com",
// 	"contact":"8686865852",
// 	"gender":"Male",
// 	"password":"soni"
// }