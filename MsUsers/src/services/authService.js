const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userModel } = require('../models/userModel');

// Register in database user
const registerUser = async (createUserJson) => {
    try {
        createUserJson.password = await encryptPassword(createUserJson.password)

        const createUser = {
            ...createUserJson,
            createDate: getDateNow(),
            updateDate: getDateNow()
        }
    
        var user = new userModel({...createUser});
        await user.save();
    } catch (error) {
        // Validate when user is not admin
        if(createUserJson.identificationNumber != '1234567890'){
            if (error.code === 11000 && error.keyPattern && error.keyPattern.identificationNumber >= 1) {
                throw { message: `Identification number ${createUserJson.identificationNumber} is already registered`, code: 11000 };
            }
            else{
                throw { message: `Error registering user`, code: 500 };
            }
        }
    }
}

// Get user from database
const loginAuth = async (identificationNumber) => {
    try {
        const user = await userModel.findOne({ identificationNumber});
        return user;
    } catch (error) {
        console.error(error.message);
        throw { message: `Error getting user from database`, code: 500 };
    }
}

// Encrypt password
const encryptPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        console.error(error.message);
        throw { message: `Error to encrypt password`, code: 500 };
    }
}

// Compare password with hash password
const comparePassword = async (password, hashPassword) => {
    try {
        const passwordMatch = await bcrypt.compare(password, hashPassword);
        return passwordMatch;
    } catch (error) {
        console.error(error.message);
        throw { message: `Error to compare password`, code: 500 };
    }
}

// Create token with the data
const createToken = (data) => {
    try {
        const secretKey = process.env.SECRET_KEY
        const token = jwt.sign(
            data,
            secretKey, {
                expiresIn: '1h',
            }
        );
        return token;
    } catch (error) {
        console.error(error.message);
        throw { message: `Error to create tooken`, code: 500 };
    }
}

const getDateNow = () => {
    try {
        let dateNow = new Date();

        let year = dateNow.getFullYear();
        let month = String(dateNow.getMonth() + 1).padStart(2, '0'); // Se agrega 1 al mes ya que los meses van de 0 a 11
        let day = String(dateNow.getDate()).padStart(2, '0');
    
        return `${year}-${month}-${day}`;
    } catch (error) {
        console.error(error.message);
        throw { message: `Error when trying to get current date`, code: 500 }
    }
}


module.exports = { registerUser, loginAuth, encryptPassword, comparePassword, createToken, getDateNow }