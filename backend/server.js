const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});
app.use('/api/auth', require('./routes/auth'));
app.use('/api/dietas', require('./routes/dieta'));