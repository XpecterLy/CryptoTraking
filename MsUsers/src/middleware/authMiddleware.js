const jwt = require('jsonwebtoken');

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

const  checkAuth = (req, res, next) => {
    try {
        const secretKey = process.env.SECRET_KEY
        const token = req.header('Authorization');
        const tokenData = jwt.verify(token, secretKey);
        console.log('tokenData' + tokenData);
        if (tokenData.userId) {
            next();
        }
    } catch (error) {
        res.status(404)
        res.send({error: 'Token no valido'})
    }
}

module.exports = {verifyToken, checkAuth};