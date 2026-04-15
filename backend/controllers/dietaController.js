const db = require('../config/db');

const obtenerDietas = (req, res) => {
  const { usuario_id } = req.query;

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

  if (usuario_id) {
    sql += ' WHERE d.usuario_id = ?';
    params.push(usuario_id);
  }

  sql += ' ORDER BY d.fecha_creacion DESC, d.id DESC';

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error('Error al obtener dietas:', err);
      return res.status(500).json({ error: 'Error al obtener dietas' });
    }

    return res.json(results);
  });
};

const crearDieta = (req, res) => {
  const {
    usuario_id,
    nombre,
    descripcion,
    objetivo = 'Mantenimiento',
    total_calorias,
  } = req.body;

  if (!usuario_id || !nombre || !descripcion || !total_calorias) {
    return res.status(400).json({
      error: 'usuario_id, nombre, descripcion y total_calorias son obligatorios',
    });
  }

  const sql = `
    INSERT INTO dietas (usuario_id, nombre, descripcion, objetivo, total_calorias, completada)
    VALUES (?, ?, ?, ?, ?, 0)
  `;

  db.query(
    sql,
    [usuario_id, nombre, descripcion, objetivo, total_calorias],
    (err, result) => {
      if (err) {
        console.error('Error al crear dieta:', err);
        return res.status(500).json({ error: 'Error al crear dieta' });
      }

      return res.status(201).json({
        msg: 'Dieta creada exitosamente',
        id: result.insertId,
      });
    },
  );
};

const actualizarDieta = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, objetivo, total_calorias, completada } = req.body;

  const sql = `
    UPDATE dietas
    SET nombre = ?, descripcion = ?, objetivo = ?, total_calorias = ?, completada = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [nombre, descripcion, objetivo, total_calorias, completada ? 1 : 0, id],
    (err, result) => {
      if (err) {
        console.error('Error al actualizar dieta:', err);
        return res.status(500).json({ error: 'Error al actualizar dieta' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Dieta no encontrada' });
      }

      return res.json({ msg: 'Dieta actualizada correctamente' });
    },
  );
};

const eliminarDieta = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM dietas WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar dieta:', err);
      return res.status(500).json({ error: 'Error al eliminar dieta' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Dieta no encontrada' });
    }

    return res.json({ msg: 'Dieta eliminada correctamente' });
  });
};

module.exports = {
  obtenerDietas,
  crearDieta,
  actualizarDieta,
  eliminarDieta,
};
