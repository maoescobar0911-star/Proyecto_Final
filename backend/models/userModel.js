const db = require('../config/db');

const findByEmail = (email, callback) => {
  const sql = 'SELECT * FROM usuarios WHERE email = ? LIMIT 1';
  db.query(sql, [email], callback);
};

const findAll = (callback) => {
  const sql = `
    SELECT
      id,
      nombre,
      email,
      altura,
      peso_actual,
      objetivo_personal
    FROM usuarios
    ORDER BY id DESC
  `;

  db.query(sql, callback);
};

const createUser = ({ nombre, email, password, altura, peso_actual, objetivo_personal }, callback) => {
  const sql = 'INSERT INTO usuarios (nombre, email, password, altura, peso_actual, objetivo_personal) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [nombre, email, password, altura, peso_actual, objetivo_personal], callback);
};

const updatePasswordById = (id, password, callback) => {
  const sql = 'UPDATE usuarios SET password = ? WHERE id = ?';
  db.query(sql, [password, id], callback);
};

module.exports = {
  findByEmail,
  findAll,
  createUser,
  updatePasswordById,
};
