const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: Number,
    },
},
{
    collection: 'Users'
});

const User = mongoose.model('User', UserSchema);

module.exports = User;