const express = require('express');

const router = express.Router();
const {
  obtenerProgreso,
  crearRegistro,
  eliminarRegistro,
} = require('../controllers/progresoController');

router.get('/', obtenerProgreso);
router.post('/', crearRegistro);
router.delete('/:id', eliminarRegistro);

module.exports = router;
