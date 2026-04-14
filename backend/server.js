const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// RUTAS - DEBEN ESTAR ANTES DEL app.listen
app.use('/api/auth', require('./routes/auth'));
app.use('/api/dietas', require('./routes/dieta'));  // 👈 ESTA LÍNEA

app.get('/', (req, res) => {
    res.send('🍽️ Servidor Planificador de Dietas funcionando');
});
// RUTA DE PRUEBA
app.get('/api/test', (req, res) => {
    res.json({ mensaje: 'Ruta de prueba funcionando' });
});
app.listen(3000, () => {
    console.log('🔥 Servidor en http://localhost:3000');
    console.log('📡 API dietas: http://localhost:3000/api/dietas');
});