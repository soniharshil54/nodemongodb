let mongoose = require('mongoose')
let Invite = require('../models/invite')

exports.send_invite = async function(req, res){
    let sender = mongoose.Types.ObjectId(req.body.sender)
    let receiver = mongoose.Types.ObjectId(req.body.receiver)
    let event =  mongoose.Types.ObjectId(req.body.event)
    let id = mongoose.Types.ObjectId()

    let newInvite = new Invite({_id:id, sender, receiver, event})
    await newInvite.save()
    res.json({status:1, message:"Invite Sent"})
}

exports.accept_invite = async function(req, res){
    Invite.findByIdAndUpdate(req.params.iid, {status:1})
        .then(() => res.json({status:1, message:"invite accepted"}))
        .catch(err => res.json({status:0, message:err}))
}

exports.reject_invite = async function(req, res){
    Invite.findByIdAndUpdate(req.params.iid, {status:2})
        .then(() => res.json({status:1, message:"invite accepted"}))
        .catch(err => res.json({status:0, message:err}))
}

exports.cancel_invite = async function(req, res){
    Invite.findByIdAndUpdate(req.params.iid, {status:3})
        .then(() => res.json({status:1, message:"invite accepted"}))
        .catch(err => res.json({status:0, message:err}))
}

exports.get_invited_users_to_event = function(req,res){
    Invite.find({event:req.params.eid}).select('receiver').populate('receiver')
        .then(users => res.json({status:1, message:"invited users get" ,invited_users:users}))
        .catch(err => res.json({status:0,message:err}))
}