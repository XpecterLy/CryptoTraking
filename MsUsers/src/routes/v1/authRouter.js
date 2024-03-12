const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { register, login } = require('../../controllers/authControler');
const {checkAuth, verifyToken} = require('../../middleware/authMiddleware');
const { checkRolAuth } = require('../../middleware/roleAuth');

const schemaRegister = Joi.object({
    firstName:Joi.string().min(2).max(30).required(),
    lastName: Joi.string().min(2).max(30).required(),
    password: Joi.string().min(8).max(20).required(),
    identificationNumber: Joi.string().min(7).max(10).required(),
    birthDate: Joi.string().min(10).max(10).required(),
    rol: Joi.string().required().valid('admin', 'user'),
});

const validateRegister = (req, res, next) => {
    const { error } = schemaRegister.validate(req.body);
    if (error) {
        return res.status(400).send({'error': error.details[0].message});
    }
    next();
};

router.post('/register', checkAuth, verifyToken, checkRolAuth(["admin"]), validateRegister, register);
router.post('/login', login);

module.exports = router;