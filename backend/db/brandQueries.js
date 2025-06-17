const pool = require('./pool');

const getAllBrands = async () => {
    const { rows } = await pool.query(`SELECT * FROM brands ORDER BY name`);
    return rows;
}

const insertBrand = async (brand_name) => {
    const { rows } = await pool.query(`INSERT INTO brands (name) VALUES ($1) RETURNING *`, [brand_name]);
    return rows[0];
}

const updateBrand = async (id, brand_name) => {
    const { rows } = await pool.query(`UPDATE brands SET name = $1 WHERE id = $2 RETURNING *`, [brand_name,id]);
    return rows[0];
}

const deleteBrand = async (id) => {
    const { rows } = await pool.query(`DELETE FROM brands WHERE id = $1 RETURNING *`, [id]);
    return rows[0];
}


module.exports = {
    getAllBrands,
    insertBrand,
    updateBrand,
    deleteBrand
}