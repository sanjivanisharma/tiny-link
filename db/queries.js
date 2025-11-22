const pool = require('./pool');

async function getAllLinks() {
    const query = 'SELECT * FROM links ORDER BY created_at DESC';
    const { rows } = await pool.query(query);
    return rows;
}

async function getLinkByCode(code) {
    const query = 'SELECT * FROM links WHERE code = $1';
    const { rows } = await pool.query(query, [code]);
    return rows[0];
}

async function createLink({code, target_url, user_id}) {
    const query = `
    INSERT INTO links (code, target_url, click_count, user_id, created_at, timestamp) 
    VALUES ($1, $2, 0, $3, ${Date.now}, ${Date.now()}) 
    RETURNING *`;
    const { rows } = await pool.query(query, [code, target_url, user_id]);
    return rows[0];
}

async function deleteLink(code) {
    const query = 'DELETE FROM links WHERE code = $1';
    const result = await pool.query(query, [code]);
    return result
}

async function incrementClick(code) {
    const query = `
    UPDATE LINKS
    SET click_count = click_count + 1, timestamp = ${Date.now()}
    WHERE code = $1`
    const result = await pool.query(query, [code])
    return result
}

module.exports = {
    getAllLinks,
    getLinkByCode,
    createLink,
    deleteLink,
    incrementClick
};