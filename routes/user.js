const express = require('express');
const { createUser, getUserByUsername } = require('../controllers/userController');
const router = express.Router();

router.post('/create', createUser);
router.get('/login', getUserByUsername);

module.exports = router;