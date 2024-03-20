const jwt = require('jsonwebtoken');
const {verifyUser} = require('../api/apiUser')

// Validate user rol
const checkRolAuth = (roles) => async (req, res, next) => {
    const secretKey = process.env.SECRET_KEY
    const token = req.header('Authorization');
    const tokenData = jwt.verify(token, secretKey);

    //const user = await userModel.findById( tokenData.userId );

    verifyUser(token, tokenData.userId)
    .then(userData => {
        if ([].concat(roles).includes(userData.rol)){
            next()
        }else{
            res.status(409);
            res.send({error: 'you dont have permission'})
        }
    })
    .catch(error => {
        if(error.response){
            console.error('Error al verificar el usuario:', error.response);
        }
        console.error('Error al verificar el usuario:', error);
        res.status(500);
        res.send({error: 'Internal server error'})
    });

  
}

module.exports = { checkRolAuth }