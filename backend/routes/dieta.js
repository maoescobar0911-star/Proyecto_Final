const express = require('express');
const router = express.Router();
const { obtenerDietas, crearDieta } = require('../controllers/dietaController');

// GET /api/dietas - Obtener todas las dietas
router.get('/', obtenerDietas);

// POST /api/dietas - Crear nueva dieta
router.post('/', crearDieta);

module.exports = router;