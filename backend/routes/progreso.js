const express = require('express');
const { authRequired } = require('../middleware/authMiddleware');

const router = express.Router();
const {
  obtenerProgreso,
  crearRegistro,
  eliminarRegistro,
} = require('../controllers/progresoController');

router.get('/', authRequired, obtenerProgreso);
router.post('/', authRequired, crearRegistro);
router.delete('/:id', authRequired, eliminarRegistro);

module.exports = router;
