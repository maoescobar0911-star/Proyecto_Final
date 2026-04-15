const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'planeador_dietas',
});

db.connect((err) => {
  if (err) {
    console.log('Error DB:', err.message);
  } else {
    console.log('MySQL conectado');
  }
});

module.exports = db;
