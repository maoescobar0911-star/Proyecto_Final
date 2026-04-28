const progresoModel = require('../models/progresoModel');

const obtenerProgreso = (req, res) => {
  const { usuario_id } = req.query;

  if (!usuario_id) {
    return res.status(400).json({ error: 'usuario_id es obligatorio' });
  }

  progresoModel.findAllByUser(usuario_id, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener el progreso' });
    }

    return res.json(results);
  });
};

const crearRegistro = (req, res) => {
  const { usuario_id, peso, nota, fecha_registro } = req.body;

  if (!usuario_id || !peso || !fecha_registro) {
    return res.status(400).json({ error: 'usuario_id, peso y fecha_registro son obligatorios' });
  }

  progresoModel.create(
    {
      usuario_id,
      peso,
      nota: nota || '',
      fecha_registro,
    },
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error al guardar el progreso' });
      }

      return res.status(201).json({
        msg: 'Registro de peso creado correctamente',
        id: result.insertId,
      });
    },
  );
};

const eliminarRegistro = (req, res) => {
  const { id } = req.params;

  progresoModel.deleteById(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar el registro' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    return res.json({ msg: 'Registro eliminado correctamente' });
  });
};

module.exports = {
  obtenerProgreso,
  crearRegistro,
  eliminarRegistro,
};
