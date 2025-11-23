const express = require('express');
const { redirectLink } = require('../controllers/links.controller');
const router = express.Router();

router.get('/:code', redirectLink);
router.get('/healthz', (req, res) => {
    res.status(200).json({ 'OK': true, 'version': '1.0' });
});

module.exports = router;