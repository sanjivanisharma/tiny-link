const {v4} = require('uuid');
const db = require('../db/queries');


// Controllers for user management


// Create a new user

async function createUser(req, res) {
    const { username, password } = req.body;
    const uuid = v4();
    const newUser = await db.createUser({ uuid, username, password });
    if (!newUser) {
        return res.status(500).json({ message: 'Error creating user' });
    }
    res.status(201).json(newUser);
}


// User login

async function loginUser(req, res) {
    const { username, password } = req.body;
    const user = await db.loginUser({username, password});
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
}


module.exports = {
    createUser,
    loginUser
}