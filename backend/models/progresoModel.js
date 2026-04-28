const db = require('../config/db');

const findAllByUser = (usuarioId, callback) => {
  const sql = `
    SELECT id, usuario_id, peso, nota, fecha_registro
    FROM seguimiento_peso
    WHERE usuario_id = ?
    ORDER BY fecha_registro DESC, id DESC
  `;

  db.query(sql, [usuarioId], callback);
};

const create = ({ usuario_id, peso, nota, fecha_registro }, callback) => {
  const sql = `
    INSERT INTO seguimiento_peso (usuario_id, peso, nota, fecha_registro)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [usuario_id, peso, nota, fecha_registro], callback);
};

const deleteById = (id, callback) => {
  db.query('DELETE FROM seguimiento_peso WHERE id = ?', [id], callback);
};

module.exports = {
  findAllByUser,
  create,
  deleteById,
};
