const { Pool } = require('pg');
require('dotenv').config();

// Si existe DATABASE_URL (Neon) se usa con SSL; si no, la base local de Docker
const usaNube = Boolean(process.env.DATABASE_URL);

const pool = new Pool(
  usaNube
  ? {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  }
  : {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'novamarket'
  }
);

// Prueba de conexión al iniciar
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Error conectando a PostgreSQL:', err.message);
    return;
  }
  console.log(
    '✅ Conectado a PostgreSQL',
    usaNube ? '(Neon, nube)' : `(local, base: ${process.env.DB_NAME || 'novamarket'})`
  );
  release();
});

module.exports = pool;
