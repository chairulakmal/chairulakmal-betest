const express = require('express');
const { authenticateUser } = require('../utils/auth');
const controller = require('../controllers');

const router = express.Router();
const userRoutes = require('./userRoutes');

router.post('/register', controller.createUser);
router.post('/login', controller.login);
router.use('/users', authenticateUser, userRoutes);

module.exports = router;
