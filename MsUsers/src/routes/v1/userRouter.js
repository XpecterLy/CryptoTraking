const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { RegisterUser, GetUser, GetAllUser, UpdateUser, DeleteUser } = require('../../controllers/userController');
const { checkRolAuth } = require('../../middleware/roleAuth');
const {checkAuth, verifyToken} = require('../../middleware/authMiddleware');
const {bodyValidationMiddleware, queryValidationMiddleware} = require('../routesValidate');

const schemaRegister = Joi.object({
    firstName:Joi.string().min(2).max(30).required(),
    lastName: Joi.string().min(2).max(30).required(),
    password: Joi.string().min(8).max(20).required(),
    identificationNumber: Joi.number().min(7).max(10).required(),
    birthDate: Joi.string().min(10).max(10).required()
});
router.post('/', checkAuth, verifyToken, checkRolAuth(["admin", "user"]), bodyValidationMiddleware(schemaRegister), RegisterUser);

const schemaGetUser = Joi.object({
    userId: Joi.string().min(24).max(24),
    identificationNumber: Joi.number().min(1000000).max(9000000000),
});
router.get('/', checkAuth, verifyToken, checkRolAuth(["admin", "user"]), queryValidationMiddleware(schemaGetUser), GetUser);

router.get('/all', checkAuth, verifyToken, checkRolAuth(["admin"]), GetAllUser);
router.put('/', checkAuth, verifyToken, checkRolAuth(["admin", "user"]), UpdateUser);
router.delete('/', checkAuth, verifyToken, checkRolAuth(["admin", "user"]), DeleteUser);




module.exports = router;