let mongoose = require('mongoose')
let Event = require('../models/event')

exports.create_event = async function (req, res){
    let user_id = mongoose.Types.ObjectId(req.body.user_id)
    let { title, description, event_date } = req.body
    let event_id = mongoose.Types.ObjectId()
    let newEvent = new Event({_id:event_id,title, description, event_date, organized_by : user_id})
    await newEvent.save()
    res.json({status : 1, message : "event created"})
}

exports.get_event_by_id = function(req, res){
    Event.findOne({_id:req.params.eid})
        .then(event => res.json({status : 1,message : "event get", event : event}))
        .catch(err => res.json({status : 0, message : err}))
}

exports.get_event_by_id_with_userdata = function(req, res){
    Event.findOne({_id:req.params.eid}).populate('organized_by')
        .then(event => res.json({status : 1,message : "event get", event : event}))
        .catch(err => res.json({status : 0, message : err}))
}

exports.get_all_events = function (req, res){
    Event.find()
        .then(events => res.json({status : 1, message : "all events get", events : events}))
        .catch(err => res.json({status : 0, message : err}))
}

exports.get_events_created_by_user = function(req, res){
    Event.find({organized_by : req.params.uid})
        .then(events => res.json({status : 1, message : "events created by user get", events : events}))
        .catch(err => res.json({status : 0, message : err}))
} 

exports.update_event = async function (req, res){
    await Event.findByIdAndUpdate(req.params.eid, req.body)
    res.json({status : 1, message : "event updated"})
}

exports.cancel_event = function (req, res){
    Event.findByIdAndUpdate(req.params.eid, {status : 0})
        .then(() => res.json({status:1, message : "event cancelled"}))
        .catch((err) => res.json({status : 0, message : err}))
}

