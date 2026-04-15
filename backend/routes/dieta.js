const express = require('express');

const router = express.Router();
const {
  obtenerDietas,
  crearDieta,
  actualizarDieta,
  eliminarDieta,
} = require('../controllers/dietaController');

router.get('/', obtenerDietas);
router.post('/', crearDieta);
router.put('/:id', actualizarDieta);
router.delete('/:id', eliminarDieta);

module.exports = router;
