const express = require('express');
const { getLinks, createLink, deleteLink, redirectLink, getLinkByCode } = require('../controllers/linksController');
const router = express.Router();

router.get('/', getLinks);
router.post('/', createLink);
router.get('/:code', getLinkByCode);
router.delete('/:code', deleteLink);

module.exports = router;