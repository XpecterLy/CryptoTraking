const jwt = require('jsonwebtoken');
const {userModel} = require('../models/userModel');

// Validate user rol
const checkRolAuth = (roles) => async (req, res, next) => {
    const secretKey = process.env.SECRET_KEY
    const token = req.header('Authorization');
    const tokenData = jwt.verify(token, secretKey);

    const user = await userModel.findById( tokenData.userId );
    if ([].concat(roles).includes(user.rol)){
        next()
    }else{
        res.status(409);
        res.send({error: 'you dont have permission'})
    }
}

module.exports = { checkRolAuth }