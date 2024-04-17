const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes for CRUD operations
router.post('/', userController.createUser);
router.get('/:userId', userController.getUserById);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

// Additional routes for retrieving users

// Get a user by account number
router.get('/account/:accountNumber', userController.getUserByAccountNumber);

// Get a user by identity number
router.get('/identity/:identityNumber', userController.getUserByIdentityNumber);

module.exports = router;
