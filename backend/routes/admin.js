const express = require('express');

const router = express.Router();
const { obtenerResumenAdmin } = require('../controllers/adminController');

router.get('/resumen', obtenerResumenAdmin);

module.exports = router;
