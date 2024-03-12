const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userModel } = require('../models/userModel');

// Register in database user
const registerUser = async (createUserJson) => {
    try {
        var user = new userModel({...createUserJson});
        await user.save();
    } catch (error) {
        console.error(error.message);
        throw { message: `Error registering user`, code: 500 };
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

module.exports = { registerUser, loginAuth, encryptPassword, comparePassword, createToken }