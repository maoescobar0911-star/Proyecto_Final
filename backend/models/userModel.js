const db = require('../config/db');

const findByEmail = (email, callback) => {
  const sql = 'SELECT * FROM usuarios WHERE email = ? LIMIT 1';
  db.query(sql, [email], callback);
};

const createUser = ({ nombre, email, password, altura, peso_actual }, callback) => {
  const sql = 'INSERT INTO usuarios (nombre, email, password, altura, peso_actual) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [nombre, email, password, altura, peso_actual], callback);
};

module.exports = {
  findByEmail,
  createUser,
};
