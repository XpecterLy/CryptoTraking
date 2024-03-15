const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    identificationNumber: { type: String, required: true, unique: true },
    birthDate: { type: Date, required: true },
    createDate: { type: Date, required: true },
    updateDate: { type: Date, required: true },
    activate: { type: Boolean, required: true },
    rol: { type: String, required: true },
});

const userModel= mongoose.model('User', userSchema, 'User')

module.exports = { userModel };