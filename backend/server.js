const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/auth', require('./routes/auth'));
app.use('/api/dietas', require('./routes/dieta'));

app.get('/', (req, res) => {
  res.send('🍽️ Servidor Planificador de Dietas funcionando');
});


app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
  console.log('API dietas: http://localhost:3000/api/dietas');
});