const pool = require('./pool');

async function getAllLinks(user_id) {
    try {
        const query = 'SELECT * FROM links WHERE user_id = $1 ORDER BY created_at DESC';
        const { rows } = await pool.query(query, [user_id]);
        return rows;
    } catch (error) {
        console.error('Error fetching links:', error);
        throw error;
    }
}

async function getLinkByCode(code) {
    try {
        const query = 'SELECT * FROM links WHERE code = $1';
        const { rows } = await pool.query(query, [code]);
        return rows[0];
    } catch (error) {
        console.error('Error fetching link by code:', error);
        throw error;
    }
}

async function createLink({code, target_url, user_id}) {
    try {
        const query = `
        INSERT INTO links (code, target_url, click_count, user_id, created_at, timestamp) 
        VALUES ($1, $2, 0, $3, ${Date.now()}, ${Date.now()}) 
        RETURNING *`;
        const { rows } = await pool.query(query, [code, target_url, user_id]);
        return rows[0];
    } catch (error) {
        console.error('Error creating link:', error);
        throw error;
    }
}

async function deleteLink(code) {
    try {
        const query = 'DELETE FROM links WHERE code = $1';
        const { rowCount } = await pool.query(query, [code]);
        return rowCount;
    } catch (error) {
        console.error('Error deleting link:', error);
        throw error;
    }
}

async function incrementClick(code) {
    try {
        const query = `
        UPDATE LINKS
        SET click_count = click_count + 1, timestamp = ${Date.now()}
        WHERE code = $1`
        const result = await pool.query(query, [code])
        return result
    } catch (error) {
        console.error('Error incrementing click count:', error);
        throw error;
    }
}

module.exports = {
    getAllLinks,
    getLinkByCode,
    createLink,
    deleteLink,
    incrementClick
};