const express = require('express');
const { adminRequired, authRequired } = require('../middleware/authMiddleware');

const router = express.Router();
const { obtenerResumenAdmin } = require('../controllers/adminController');

router.get('/resumen', authRequired, adminRequired, obtenerResumenAdmin);

module.exports = router;
