const express = require('express');
const usersRoutes = require('./users');

const router = express.Router();

// Use users routes for /users endpoint
router.use('/users', usersRoutes);

module.exports = router;
