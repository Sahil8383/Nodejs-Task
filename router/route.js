const express = require('express');
const router = express.Router();

const { 
    SignUp, 
    LoginIn,
    authMiddleware,
} = require('../controllers/UserController');

// User Routes

router.post('/signup', SignUp);
router.post('/login', LoginIn);

module.exports = router;