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

const GetAllUser = async () => {
    try {
        const user = await userModel.find().select('-_id');
        if(user === user){
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

const UpdateUser = () => {
    
}

const DeleteUser = () => {
    
}


module.exports = {  GetUserByIdUser, GetUserByIdentificationNumber, GetAllUser, UpdateUser, DeleteUser }