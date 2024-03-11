const express = require('express');
const router = express.Router();
const {checkAuth, verifyToken} = require('../../middleware/authMiddleware');
const { checkRolAuth } = require('../../middleware/roleAuth');
const { RegisterUser } = require('../../controllers/userController');

router.post('/', checkAuth, verifyToken, checkRolAuth(["admin"]), RegisterUser);

module.exports = router;