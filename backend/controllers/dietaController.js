const dietaModel = require('../models/dietaModel');

const obtenerDietas = (req, res) => {
  const { usuario_id } = req.query;

  dietaModel.findAll(usuario_id, (err, results) => {
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

  dietaModel.create(
    { usuario_id, nombre, descripcion, objetivo, total_calorias },
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

  dietaModel.updateById(
    id,
    { nombre, descripcion, objetivo, total_calorias, completada },
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

  dietaModel.deleteById(id, (err, result) => {
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
