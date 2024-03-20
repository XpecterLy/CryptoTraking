const {metaDataCrypto} = require("../api/apiCryptocurrency")
const {verifyUser} = require("../api/apiUser")
const {decodeToken} = require("../utils/tokenUtils")
const {subscriberModel} = require("../models/subscriberModel")

// Register new cryptocurrency subscription to the user 
const registerSubscriber = async (cryptoId, token) => {
    try {
        //Validate if exist subscription in data base
        const validateExistSubscription = await seachSubscription(cryptoId, token)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return null;
            })
        
        if(validateExistSubscription != null ){
            return validateExistSubscription
        }

        const user = decodeToken(token);

        // Get data user
        const userRes = await verifyUser(token, user.userId);

        // Validate if cryptoid exist in coinmarketcap
        const cryptoData = await metaDataCrypto(cryptoId);
        const cryptoIdValue = cryptoData.data[cryptoId].id;

        // Register information
        const dataRegister = {
            identificationNumber: userRes.identificationNumber,
            cryptoId: cryptoIdValue
        };
    
        const newSubscriber = new subscriberModel({...dataRegister});
        await newSubscriber.save();

        return dataRegister;
    } catch (error) {
        console.log("error");
        console.log(error);
        if (error.response && error.response.status === 400) {
            throw {
                code: 400,
                message: error.response.data.status.error_message || ''
            };
        } else {
            throw {
                code: 500,
                message: 'Internal server error'
            };
        }
    }
}

// Search subscription by cryptoId 
const seachSubscription = async (cryptoId, token) => {
    try {
        const user = decodeToken(token);
        const userRes = await verifyUser(token, user.userId);

        const subscriptionRes = 
            await subscriberModel.findOne({ identificationNumber: userRes.identificationNumber, cryptoId: cryptoId }).select('-_id');
    
        if(subscriptionRes === null){
            throw { code: 404, message: "Subscription not found" };
        }
    
        return subscriptionRes;
    } catch (error) {
        console.log(error);
        if (error.code && error.code === 404) {
            throw {
                code: 404,
                message: error.message
            };
        } else {
            throw {
                code: 500,
                message: 'Internal server error'
            };
        }
    }
}

// Get all subscriber
const seachAllSubscription = async () => {
    try {
        const filter = {};
        const subscriptionRes = 
            await subscriberModel.find(filter).select('-_id');
    
        return subscriptionRes;
    } catch (error) {
        console.log(error);
        throw {
            code: 500,
            message: 'Internal server error'
        };
    }
}

// delete subscriber
const deleteSubscription = async (cryptoId, token) => {
    try {
        const user = decodeToken(token);
        const userRes = await verifyUser(token, user.userId);

        const deleteRes = await subscriberModel.deleteOne({ identificationNumber: userRes.identificationNumber, cryptoId: cryptoId });
        console.log('deleteRes');
        console.log(deleteRes);
        if(deleteRes.acknowledged === false){
            throw {code: 400, message: "Request not admitted"}
        }
        if(deleteRes.deletedCount === 0){
            throw {code: 404, message: "subscription not fount"}
        }
    } catch (error) {
        console.log(error);
        throw {
            code: 500,
            message: 'Internal server error'
        };
    }
}



module.exports = {registerSubscriber, seachSubscription, seachAllSubscription, deleteSubscription}