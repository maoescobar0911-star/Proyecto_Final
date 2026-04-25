const db = require('../config/db');

const findAll = (usuarioId, callback) => {
  let sql = `
    SELECT
      d.id,
      d.usuario_id,
      u.nombre AS usuario,
      d.nombre,
      d.descripcion,
      d.objetivo,
      d.total_calorias,
      d.completada,
      d.fecha_creacion
    FROM dietas d
    JOIN usuarios u ON u.id = d.usuario_id
  `;

  const params = [];

  if (usuarioId) {
    sql += ' WHERE d.usuario_id = ?';
    params.push(usuarioId);
  }

  sql += ' ORDER BY d.fecha_creacion DESC, d.id DESC';
  db.query(sql, params, callback);
};

const create = ({ usuario_id, nombre, descripcion, objetivo, total_calorias }, callback) => {
  const sql = `
    INSERT INTO dietas (usuario_id, nombre, descripcion, objetivo, total_calorias, completada)
    VALUES (?, ?, ?, ?, ?, 0)
  `;

  db.query(sql, [usuario_id, nombre, descripcion, objetivo, total_calorias], callback);
};

const updateById = (id, { nombre, descripcion, objetivo, total_calorias, completada }, callback) => {
  const sql = `
    UPDATE dietas
    SET nombre = ?, descripcion = ?, objetivo = ?, total_calorias = ?, completada = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [nombre, descripcion, objetivo, total_calorias, completada ? 1 : 0, id],
    callback,
  );
};

const deleteById = (id, callback) => {
  db.query('DELETE FROM dietas WHERE id = ?', [id], callback);
};

module.exports = {
  findAll,
  create,
  updateById,
  deleteById,
};
