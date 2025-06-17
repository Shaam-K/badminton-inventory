const pool = require('./pool');

const getAllRacquets = async () => {
    const { rows } = await pool.query(`SELECT r.*, b.name as brand_name FROM racquets r JOIN brands b ON r.brand_id = b.id`);
    return rows;
}

const getRacquetById = async (id) => {
    const { rows } = await pool.query(`
    SELECT r.*, b.name as brand_name,
      json_agg(DISTINCT gr.grip_size) FILTER (WHERE gr.id IS NOT NULL) as grip_sizes,
      json_agg(DISTINCT wt.weight) FILTER (WHERE wt.id IS NOT NULL) as weights
    FROM racquets r
    JOIN brands b ON r.brand_id = b.id
    LEFT JOIN grip_options gr ON gr.racquet_id = r.id
    LEFT JOIN weight_options wt ON wt.racquet_id = r.id
    WHERE r.id = $1
    GROUP BY r.id, b.name
    `, [id]);

    return rows[0];
}

const filterRacquets = async (brand_id, weight_arr, grip_arr, balance_arr) => {
    const form_arrs = [brand_id, weight_arr, grip_arr, balance_arr]
    console.log(form_arrs);
    let fin;
    let query = `
        SELECT DISTINCT ON (r.id) r.*, b.name as brand_name
        FROM racquets r 
        JOIN brands b ON r.brand_id = b.id 
        LEFT JOIN grip_options gr ON r.id = gr.racquet_id 
        LEFT JOIN weight_options wt ON r.id = wt.racquet_id 
        WHERE
    `

    let query_add = []
    const constraints = []

    for (let i = 0; i < 4; i++) {
        if (form_arrs[i].length !== 0) {
            constraints.push(form_arrs[i])
        }
    }

    console.log("constraints: ", constraints);

    if (constraints.length == 0) {
        const data = await getAllRacquets();
        fin = data;
    } else {
        for (let i = 0; i < constraints.length; i++) {
            if (constraints[i] == brand_id) {
                query_add.push(`b.id = ANY($${i + 1})`)
            } else if (constraints[i] == weight_arr) {
                query_add.push(`wt.weight = ANY($${i + 1})`)
            } else if (constraints[i] == grip_arr) {
                query_add.push(`gr.grip_size = ANY($${i + 1})`)
            } else {
                query_add.push(`r.balance_point = ANY($${i + 1})`)
            }
        }

        query_add = query_add.join(" AND ")
        query += query_add;

        console.log(query);

        const { rows } = await pool.query(query, constraints)
        fin = rows;
    }

    return fin;
};

const insertRacquet = async (racquet_name, brand_id, balance_point, image_path, grip_sizes, weights) => {
    const { rows } = await pool.query(`
        INSERT INTO racquets (racquet_name, brand_id, balance_point, image_path) values ($1, $2, $3, $4) RETURNING *;
    `, [racquet_name, brand_id, balance_point, image_path])

    const created_id = rows[0].id;

    await addGripOptions(created_id, grip_sizes);
    await addWeightOptions(created_id, weights);

    return rows[0];
}

const updateRacquet = async (id, racquet_name, brand_id, balance_point, image_path, grip_sizes, weights) => {
    const { rows } = await pool.query(`
        UPDATE racquets SET racquet_name = $1, brand_id = $2, balance_point = $3, image_path = $4 WHERE id = $5 RETURNING *`, [racquet_name, brand_id, balance_point, image_path, id]);

    const created_id = rows[0].id

    await updateGripsRacquet(created_id, grip_sizes);
    await updateWeightsRacquet(created_id, weights);

    return rows[0];
}

const deleteRacquet = async (id) => {
    const { rows } = await pool.query(`DELETE FROM racquets WHERE id = $1 RETURNING *`, [id]);
    const racquet_id = rows[0].id;

    await deleteAllGripsRacquet(racquet_id);
    await deleteAllWeightOptions(racquet_id);


    return rows[0];
}

const addGripOptions = async (racquet_id, grip_sizes) => {
    const values = grip_sizes.map((_, i) => `($1, $${i + 2})`).join(', ');
    const params = [racquet_id, ...grip_sizes];

    const { rows } = await pool.query(
        `INSERT INTO grip_options (racquet_id, grip_size) VALUES ${values} RETURNING *`,
        params
    );
    return rows;
};

const deleteAllGripsRacquet = async (racquet_id) => {
    const { rows } = await pool.query(`DELETE FROM grip_options WHERE racquet_id = $1 RETURNING *`, [racquet_id]);
    return rows;
};

const updateGripsRacquet = async (racquet_id, grip_sizes) => {
    await deleteAllGripsRacquet(racquet_id);
    const rows = await addGripOptions(racquet_id, grip_sizes);
    return rows;
}

const addWeightOptions = async (racquet_id, weights) => {
    const values = weights.map((_, i) => `($1, $${i + 2})`).join(', ');
    const params = [racquet_id, ...weights];

    const { rows } = await pool.query(
        `INSERT INTO weight_options (racquet_id, weight) VALUES ${values} RETURNING *`,
        params
    );
    return rows;
};

const deleteAllWeightOptions = async (racquet_id) => {
    const { rows } = await pool.query(`DELETE FROM weight_options WHERE racquet_id = $1 RETURNING *`, [racquet_id]);
    return rows;
};

const updateWeightsRacquet = async (racquet_id, weights) => {
    await deleteAllWeightOptions(racquet_id);
    const rows = await addWeightOptions(racquet_id, weights);
    return rows;
}

const getWeights = async () => {
    const { rows } = await pool.query(`SELECT DISTINCT weight from weight_options ORDER BY weight`);
    return rows;
}

const getGrips = async () => {
    const { rows } = await pool.query(`SELECT DISTINCT grip_size from grip_options ORDER BY grip_size`);
    return rows;
}

const getBalancePoints = async () => {
    const { rows } = await pool.query(`SELECT DISTINCT balance_point from racquets ORDER BY balance_point`);
    return rows;
}

module.exports = {
    getAllRacquets,
    getRacquetById,
    insertRacquet,
    updateRacquet,
    deleteRacquet,
    addGripOptions,
    deleteAllGripsRacquet,
    updateGripsRacquet,
    addWeightOptions,
    deleteAllWeightOptions,
    updateWeightsRacquet,
    getWeights,
    getGrips,
    getBalancePoints,
    filterRacquets,
}