let mongoose = require('mongoose')
let Schema = mongoose.Schema

let EventSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    title : {
        type : String,
        require : true
    },
    event_date : {
        type : Date
    },
    create_date : {
        type : Date,
        default : Date.now
    },
    description : {
        type : String,
        require : true
    },
    organized_by : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    cover_img : {
        type : String,
        default : 'noimg.png'
    },
    confirmed_invites : {
        type : Number
    },
    pending_invites : {
        type : Number
    },
    status : {
        type : String,
        default : 1,
        require : true
    }
})

module.exports = Event = mongoose.model('event', EventSchema)