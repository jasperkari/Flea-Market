const express = require('express');
const usersRoutes = require('./users');
const postsRoutes = require('./posts');

const router = express.Router();

// Use users routes for /users endpoint
router.use('/users', usersRoutes);

// Use posts routes for /posts endpoint
router.use('/posts', postsRoutes);

module.exports = router;
