const express = require('express');
const { authRequired } = require('../middleware/authMiddleware');

const router = express.Router();
const {
  obtenerDietas,
  crearDieta,
  actualizarDieta,
  eliminarDieta,
} = require('../controllers/dietaController');

router.get('/', authRequired, obtenerDietas);
router.post('/', authRequired, crearDieta);
router.put('/:id', authRequired, actualizarDieta);
router.delete('/:id', authRequired, eliminarDieta);

module.exports = router;
