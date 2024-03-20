const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {checkAuth, verifyToken} = require('../../middleware/authMiddleware');
const { checkRolAuth } = require('../../middleware/roleAuth');
const { bodyValidationMiddleware } = require('../routesValidate');
const { addSubscriber, getSubscriber, getAllSubscriber, deleteSubscriber } = require('../../controllers/subscriberController');

const schemaAdd = Joi.object({
    cryptoId:Joi.number().required()
});
router.post('/', checkAuth, verifyToken, checkRolAuth(["admin", "user"]), bodyValidationMiddleware(schemaAdd), addSubscriber);

const schemaSearch = Joi.object({
    cryptoId:Joi.number().required()
});
router.get('/', checkAuth, verifyToken, checkRolAuth(["admin", "user"]), bodyValidationMiddleware(schemaSearch), getSubscriber);

router.get('/all', checkAuth, verifyToken, checkRolAuth(["admin"]), getAllSubscriber);


const schemaDelete = Joi.object({
    cryptoId:Joi.number().required()
});
router.delete('/', checkAuth, verifyToken, checkRolAuth(["admin"]), bodyValidationMiddleware(schemaDelete), deleteSubscriber);

module.exports = router;