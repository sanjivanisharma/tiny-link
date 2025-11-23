const express = require('express');
const { getLinks, createLink, deleteLink, getLinkByCode } = require('../controllers/links.controller');
const router = express.Router();

router.get('/', getLinks);
router.post('/', createLink);
router.get('/:code', getLinkByCode);
router.delete('/:code', deleteLink);

module.exports = router;