const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// ==> Conexão com a Base de Dados:
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('Conexão com a base de dados PostgreSQL realizada com sucesso !');
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  terminate: () => pool.end().then(() => console.log('Conexão com a base de dadode encerrada !'))
};