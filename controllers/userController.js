const {v4} = require('uuid');
const db = require('../db/queries');

async function createUser(req, res) {
    const { username, password } = req.body;
    const uuid = v4();
    const newUser = await db.createUser({ uuid, username, password });
    if (!newUser) {
        return res.status(500).json({ message: 'Error creating user' });
    }
    res.status(201).json(newUser);
}

async function getUserByUsername(req, res) {
    const { username, password } = req.body;
    const user = await db.getUserByUsername({username, password});
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
}

module.exports = {
    createUser,
    getUserByUsername
}