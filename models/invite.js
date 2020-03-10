let mongoose = require('mongoose')
let Schema = mongoose.Schema

let InviteSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    event : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'event'
    },
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    receiver : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    sent_date : {
        type : Date,
        default : Date.now
    },
    status : {
        type : Number,
        default : 0
    }
})

module.exports =  Invite = mongoose.model("invite", InviteSchema)