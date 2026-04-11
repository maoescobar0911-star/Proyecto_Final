const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1112044463',
  database: 'dietas'
});

db.connect(err => {
  if (err) {
    console.log('Error DB:', err);
  } else {
    console.log('MySQL conectado');
  }
});

module.exports = db;