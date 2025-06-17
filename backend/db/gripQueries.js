const pool = require('./pool');

// const addGripOptions = async (racquet_id, grip_sizes) => {
//     const values = grip_sizes.map((_, i) => `($1, $${i + 2})`).join(', ');
//     const params = [racquet_id, ...grip_sizes];

//     const { rows } = await pool.query(
//         `INSERT INTO grip_options (racquet_id, grip_size) VALUES ${values} RETURNING *`,
//         params
//     );

//     return rows;
// };

// module.exports = {
//     addGripOptions,
// }
