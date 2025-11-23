const db = require('../db/queries');

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (err) {
        return false;
    }
}

function generateCode() {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const length = Math.floor(Math.random() * 3) + 6
  let code = ""
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

// Controllers for link management


// Get all links for a user

async function getLinks(req, res) { 
    const user_id = req.body.user_id;
    const links = await db.getAllLinks(user_id);
    if(links.length === 0) {
        return res.status(404).json({ message: 'No links found' });
    }
    return res.status(200).json(links);
}


// Get a link by its code

async function getLinkByCode(req, res) {
    const { code } = req.params;
    const link = await db.getLinkByCode(code);
    if (!link) {
        return res.status(404).json({ message: 'Link not found' });
    }
    return res.status(200).json(link);
}


// Create a new link

async function createLink(req, res) { 
    const { code, target_url, user_id } = req.body;
    if (!isValidUrl(target_url)) {
        return res.status(400).json({ message: 'Invalid URL' });
    }
    const url_code = code || generateCode();
    const existingLink = await db.getLinkByCode(url_code);
    if (existingLink) {
        return res.status(409).json({ message: 'Code already exists' });
    }
    const newLink = await db.createLink({ code: url_code, target_url, user_id });
    if (!newLink) {
        return res.status(500).json({ message: 'Error creating link' });
    }
    return res.status(201).json(newLink);
}


// Delete a link

async function deleteLink(req, res) {
    const { code } = req.params;
    const rowCount = await db.deleteLink(code);
    if (rowCount === 0) {
        return res.status(404).json({ message: 'Link not found' });
    }
    return res.status(200).json({ message: 'Link deleted successfully' });
}


// Redirect to the target URL

async function redirectLink(req, res) {
    const { code } = req.params;
    const link = await db.getLinkByCode(code);
    if (!link) {
        return res.status(404).json({ message: 'Link not found' });
    }
    await db.incrementClick(code);
    return res.status(302).redirect(link.target_url);
}


module.exports = {
    getLinks,
    getLinkByCode,
    createLink,
    deleteLink,
    redirectLink,
};