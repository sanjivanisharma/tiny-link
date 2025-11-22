const express = require('express');
const { redirectLink, getLinkByCode } = require('../controllers/linksController');
const router = express.Router();

router.get('/:code', redirectLink);
router.get('/healthz', (req, res) => {
    res.status(200).json({ 'OK': true, 'version': '1.0' });
});

module.exports = router;