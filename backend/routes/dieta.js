const express = require('express');
const router = express.Router();

const { crearDieta } = require('../controllers/dietaController');

router.post('/crear', crearDieta);

module.exports = router;