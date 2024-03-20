const {registerSubscriber, seachSubscription, seachAllSubscription, deleteSubscription} = require("../services/subscriberService");

const addSubscriber = async (req, res) => {
    const token = req.header('Authorization');
    const {cryptoId} = req.body;

    try {
        var subscription = await registerSubscriber(cryptoId, token)
        res.status(201).send({message: 'subscription was added', subscription})
    } catch (error) {
        res.status(error.code).send({message: error.message})
    }    
}

const getSubscriber = async (req, res) => {
    const token = req.header('Authorization');
    const {cryptoId} = req.body;

    try {
        var subscription = await seachSubscription(cryptoId, token)
        res.status(200).send(subscription)
    } catch (error) {
        res.status(error.code).send({message: error.message})
    }    

}

const getAllSubscriber = async (req, res) => {
    try {
        var subscription = await seachAllSubscription()
        res.status(200).send(subscription)
    } catch (error) {
        res.status(error.code).send({message: error.message})
    }    

}

const deleteSubscriber = async (req, res) => {
    try {
        const token = req.header('Authorization');
        const {cryptoId} = req.body;

        var subscription = await deleteSubscription(cryptoId, token)
        res.status(200).send(subscription)
    } catch (error) {
        res.status(error.code).send({message: error.message})
    }    
}

module.exports = {addSubscriber, getSubscriber, getAllSubscriber, deleteSubscriber}