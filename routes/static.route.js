const express = require('express');
const { redirectLink, getLinkByCode, getLinks } = require('../controllers/links.controller');
const router = express.Router();

router.get('/', getLinks);

router.get('/code/:code', async (req, res) => {
    console.log(req.params);
    const {code} = req.params;
    const details = await getLinkByCode(code);
    if(!details) {
        res.status(404).render('notfound');
    }
    res.render('stats', { details });
});

router.get('/healthz', (req, res) => {
    res.status(200).json({ 'OK': true, 'version': '1.0' });
});

// router.get('/:code', redirectLink);

module.exports = router;