let mongoose = require('mongoose')
let Schema = mongoose.Schema

let UserSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : {
        type : String,
        require : true
    },
    gender : {
        type : String
    },
    contact : {
        type : String
    },
    email : {
        type : String,
        require : true
    },
    birthdate : {
        type : Date
    },
    profile_img : {
        type : String,
        default : 'noimg.png'
    },
    password : {
        type : String,
        require : true
    }
})

module.exports = User = mongoose.model('user', UserSchema)