
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    count :{
        type : Number
    }
})

module.exports = mongoose.model('User',UserSchema);
