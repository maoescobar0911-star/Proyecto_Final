const db = require('../config/db');

// REGISTRO
const register = (req, res) => {
  const { nombre, email, password } = req.body;

  const sql = 'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)';

  db.query(sql, [nombre, email, password], (err) => {
    if (err) return res.status(500).json({ msg: 'Error' });

    res.json({ msg: 'Usuario registrado correctamente 🔥' });
  });
};

// LOGIN
const login = (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM usuarios WHERE email = ?';

  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length === 0) {
      return res.json({ msg: 'Usuario no existe' });
    }

    const user = results[0];

    if (user.password !== password) {
      return res.json({ msg: 'Contraseña incorrecta' });
    }

    res.json({ msg: 'Login exitoso' });
  });
};

module.exports = { register, login };