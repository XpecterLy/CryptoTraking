const mongoose = require('mongoose')

const subscriberSchema = new mongoose.Schema({
    identificationNumber: { type: String, required: true },
    cryptoId: { type: Number, required: true }
})

const subscriberModel = mongoose.model('subscriber', subscriberSchema, 'subscriber');

module.exports = {subscriberModel}