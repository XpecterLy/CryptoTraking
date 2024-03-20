const jwt = require('jsonwebtoken');

const decodeToken = (token) => {
    try {
        const secretKey = process.env.SECRET_KEY
        const decodeTokenRes = jwt.verify(token, secretKey);
        return {
            userId: decodeTokenRes.userId,
            firstName: decodeTokenRes.firstName,
            lastName: decodeTokenRes.lastName,
            rol: decodeTokenRes.rol
        }
    } catch (error) {
        console.error(error.message);
        throw {code: 500, message: "error decode token"}
    }
}

module.exports = {decodeToken}