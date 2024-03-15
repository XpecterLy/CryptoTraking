const { userModel } = require('../models/userModel');

// Factory get user
class GetUser {
    async searchUser(paramSearch) {}
}

// Get user by id
class GetUserByIdUser extends GetUser {
    async searchUser(paramSearch)  {
        try {
            const user = await userModel.findById({ _id: paramSearch}).select('-_id');
            if(user === null){
                throw { code: 404 };
            }
            return user;
        } catch (error) {
            if(error.code === 404){
                throw { message:`User with userId: ${paramSearch} is not fount`, code: 404 };
            }else{

                throw {message:error.message, code: 500}
            }
        }
    }
}

// Get user by GetUserByIdentificationNumber
class GetUserByIdentificationNumber extends GetUser {
    async searchUser(paramSearch) {
        try {
            const user = await userModel.findOne({ identificationNumber: paramSearch}).select('-_id');
            if(user === null){
                throw { code: 404 };
            }
            return user;
        } catch (error) {
            if(error.code === 404){
                throw { message:`User with identificationNumber: ${paramSearch} is not fount`, code: 404 };
            }else{

                throw {message:error.message, code: 500}
            }
        }
    }
}

const SearchAllUser = async (rol, activate) => {
    try {
        const filter = {};

        if (rol !== undefined) filter.rol = rol;
        if (activate !== undefined) filter.activate = activate;

        const users = await userModel.find(filter).select('-_id');
        
        return users;
    } catch (error) {
        throw { message: error.message, code: 500 };
    }
}

const PatchRegisterUser = async (userId, userData) => {
    try {
        const userPatchData = {}

        Object.keys(userData).forEach(key => {
            if (userData[key] !== undefined) {
                userPatchData[key] = userData[key];
            }
        });
    
        const userResult = await userModel.updateOne({_id: userId}, userPatchData)
    
        console.log(userResult);
        console.log(userResult.acknowledged);
    
        if(userResult.acknowledged === false){
            throw {code: 400, message: "Request not admitted"}
        }
        else if(userResult.matchedCount === 0){
            throw {code: 404, message: "UserId not fount"}
        }
    } catch (error) {
        throw {code: error.code, message: error.message}
    }
}

const DeleteRegisterUser = async (userId) => {
    try {
        const userResult = await userModel.deleteOne({_id: userId});
        console.log(userResult);
        if(userResult.acknowledged === false){
            throw {code: 400, message: "Request not admitted"}
        }
        if(userResult.deletedCount === 0){
            throw {code: 404, message: "UserId not fount"}
        }
    } catch (error) {
        throw {code: error.code, message: error.message}
    }
}

module.exports = {  GetUserByIdUser, GetUserByIdentificationNumber, SearchAllUser, PatchRegisterUser, DeleteRegisterUser }