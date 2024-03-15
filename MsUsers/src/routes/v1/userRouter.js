const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { RegisterUser, GetUser, GetAllUser, PatchUser, DeleteUser } = require('../../controllers/userController');
const { checkRolAuth } = require('../../middleware/roleAuth');
const {checkAuth, verifyToken} = require('../../middleware/authMiddleware');
const {bodyValidationMiddleware, queryValidationMiddleware} = require('../routesValidate');

const schemaRegisterBody = Joi.object({
    firstName:Joi.string().min(2).max(30).required(),
    lastName: Joi.string().min(2).max(30).required(),
    password: Joi.string().min(8).max(20).required(),
    identificationNumber: Joi.number().min(1000000).max(9000000000).required(),
    birthDate: Joi.string().min(10).max(10).required()
});
router.post('/', checkAuth, verifyToken, checkRolAuth(["admin", "user"]), bodyValidationMiddleware(schemaRegisterBody), RegisterUser);

const schemaGetUserQuery = Joi.object({
    userId: Joi.string().min(24).max(24),
    identificationNumber: Joi.number().min(1000000).max(9000000000),
});
router.get('/', checkAuth, verifyToken, checkRolAuth(["admin", "user"]), queryValidationMiddleware(schemaGetUserQuery), GetUser);

const schemaGetAllUserQuery = Joi.object({
    rol: Joi.string().valid('admin', 'user'),
    activate: Joi.boolean(),
});
router.get('/all', checkAuth, verifyToken, checkRolAuth(["admin"]), queryValidationMiddleware(schemaGetAllUserQuery), GetAllUser);

const schemaUpdateQuery = Joi.object({
    userId: Joi.string().min(24).max(24).required()
});
const schemaUpdateBody = Joi.object({
    firstName:Joi.string().min(2).max(30),
    lastName: Joi.string().min(2).max(30),
    password: Joi.string().min(8).max(20),
    identificationNumber: Joi.number().min(1000000).max(9000000000),
    birthDate: Joi.string().min(10).max(10),
    activate: Joi.boolean()
});
router.patch('/', checkAuth, verifyToken, checkRolAuth(["admin", "user"]), queryValidationMiddleware(schemaUpdateQuery), bodyValidationMiddleware(schemaUpdateBody), PatchUser);

const schemaDeleteQuery = Joi.object({
    userId: Joi.string().min(24).max(24).required()
});
router.delete('/', checkAuth, verifyToken, checkRolAuth(["admin", "user"]), queryValidationMiddleware(schemaDeleteQuery), DeleteUser);

module.exports = router;