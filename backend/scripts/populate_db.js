const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

const { Client } = require('pg');

const createBrands = `
CREATE TABLE IF NOT EXISTS brands (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);
`;

const addBrands = `
INSERT INTO brands (name) VALUES
('Yonex'),
('Li-Ning'),
('Victor')
ON CONFLICT DO NOTHING;
`;

const createRacquets = `
CREATE TABLE IF NOT EXISTS racquets (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  racquet_name TEXT NOT NULL,
  brand_id INT REFERENCES brands(id) ON DELETE CASCADE,
  balance_point TEXT CHECK (balance_point IN ('head-light', 'even', 'head-heavy')),
  image_path TEXT NOT NULL
);
`;

const addRacquets = `
INSERT INTO racquets (racquet_name, brand_id, balance_point, image_path) VALUES
('Nanoflare Speed 7', 1, 'head-light', 'nanoflare_speed_7.jpg'),
('Axforce 90', 2, 'head-heavy', 'axforce_90.png'),
('Victor Thruster TK-Ryuga Metallic', 3, 'head-heavy', 'thruster_ryuga_metallic.jpg'),
('Arcsaber 2 Feel', 1, 'even', 'arcsaber_feel_2.png')
ON CONFLICT DO NOTHING;
`;

const createGrips = `
CREATE TABLE IF NOT EXISTS grip_options (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  racquet_id INT REFERENCES racquets(id) ON DELETE CASCADE,
  grip_size TEXT CHECK (grip_size IN ('G1', 'G2', 'G3', 'G4', 'G5', 'G6'))
);
`;

const grip_sizes = [
  ["G4"],
  ["G5"],
  ["G5"],
  ["G5", "G6"]
];

const createWeights = `
CREATE TABLE IF NOT EXISTS weight_options (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  racquet_id INT REFERENCES racquets(id) ON DELETE CASCADE,
  weight TEXT CHECK (weight IN ('F', '5U', '4U', '3U', '2U', 'U'))
);
`;

const weights = [
  ["4U"],
  ["3U", "4U", "5U"],
  ["3U", "4U"],
  ["4U"]
];

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URI,
    ssl: {
      rejectUnauthorized: false
    }
  });
  try {
    await client.connect();
    console.log("Connected to DB");

    await client.query(createBrands);
    await client.query(addBrands);
    await client.query(createRacquets);
    await client.query(addRacquets);

    await client.query(createGrips);
    for (let i = 0; i < grip_sizes.length; i++) {
      for (const grip of grip_sizes[i]) {
        await client.query(
          `INSERT INTO grip_options (racquet_id, grip_size) VALUES ($1, $2)`,
          [i + 1, grip]
        );
      }
    }

    await client.query(createWeights);
    for (let i = 0; i < weights.length; i++) {
      for (const weight of weights[i]) {
        await client.query(
          `INSERT INTO weight_options (racquet_id, weight) VALUES ($1, $2)`,
          [i + 1, weight]
        );
      }
    }

    console.log("All data inserted successfully.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.end();
    console.log("Connection closed.");
  }
}

main();

