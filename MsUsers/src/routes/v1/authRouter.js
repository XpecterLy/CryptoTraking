const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { register, login } = require('../../controllers/authControler');
const {checkAuth, verifyToken} = require('../../middleware/authMiddleware');
const { checkRolAuth } = require('../../middleware/roleAuth');
const {bodyValidationMiddleware} = require('../routesValidate');

const schemaRegister = Joi.object({
    firstName:Joi.string().min(2).max(30).required(),
    lastName: Joi.string().min(2).max(30).required(),
    password: Joi.string().min(8).max(20).required(),
    identificationNumber: Joi.number().min(1000000).max(9000000000).required(),
    birthDate: Joi.string().min(10).max(10).required(),
    rol: Joi.string().required().valid('admin', 'user'),
});
router.post('/register', checkAuth, verifyToken, checkRolAuth(["admin"]), bodyValidationMiddleware(schemaRegister), register);

const schemaLogin = Joi.object({
    identificationNumber: Joi.string().min(7).max(10).required(),
    password: Joi.string().min(4).max(20).required()
});
router.post('/login', bodyValidationMiddleware(schemaLogin), login);

module.exports = router;