const { required } = require('joi');
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type:String,
        require: true,
    },

    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    }
});

const UserModel = mongoose.model('Users', UserSchema);
module.exports = UserModel;