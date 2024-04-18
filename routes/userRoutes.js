const express = require('express');

const router = express.Router();
const controller = require('../controllers');
const { authorizeUser } = require('../utils/auth');

// Routes for RUD operations
router.get('/:userId', controller.getUserById);
router.put('/:userId', authorizeUser, controller.updateUser);
router.delete('/:userId', authorizeUser, controller.deleteUser);

// Additional routes for retrieving users

// Get a user by account number
router.get('/account/:accountNumber', controller.getUserByAccountNumber);

// Get a user by identity number
router.get('/identity/:identityNumber', controller.getUserByIdentityNumber);

module.exports = router;
