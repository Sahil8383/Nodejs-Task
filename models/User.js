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
    boards: [
        {
            type: mongoose.Schema.Types.ObjectId,
        }
    ]
},
{
    collection: 'Kanban-Users'
});

const User = mongoose.model('User', UserSchema);

module.exports = User;