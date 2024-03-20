const jwt = require('jsonwebtoken');

// Validate if token is correct
function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });
        try {
            const secretKey = process.env.SECRET_KEY
            console.log(secretKey);
            const decoded = jwt.verify(token, secretKey);
            req.userId = decoded.userId;
            next();
        } catch (error) {
            res.status(401).json({ error: 'Invalid token' });
        }
};

// Validate if token is valid in this app
const  checkAuth = (req, res, next) => {
    try {
        const secretKey = process.env.SECRET_KEY
        const token = req.header('Authorization');

        if(!token){
            res.status(401 )
            res.send({error: 'Token not found'})
        }

        const tokenData = jwt.verify(token, secretKey);
        console.log('tokenData' + tokenData);
        if (tokenData.userId) {
            next();
        }
    } catch (error) {
        res.status(401 )
        res.send({error: 'The token is invalid'})
    }
}

module.exports = {verifyToken, checkAuth};