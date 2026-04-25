const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/dietas', require('./routes/dieta'));
app.use('/api/admin', require('./routes/admin'));

app.get('/', (req, res) => {
  res.send('Servidor del Planeador de Dietas funcionando');
});

app.get('/api/test', (req, res) => {
  res.json({ mensaje: 'Ruta de prueba funcionando', api: 'dietas' });
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
  console.log(`API auth: http://localhost:${PORT}/api/auth`);
  console.log(`API dietas: http://localhost:${PORT}/api/dietas`);
});
