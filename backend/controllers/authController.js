const db = require('../config/db');

const register = (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
  }

  const checkSql = 'SELECT id FROM usuarios WHERE email = ? LIMIT 1';
  const insertSql = 'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)';

  db.query(checkSql, [email], (checkErr, results) => {
    if (checkErr) {
      return res.status(500).json({ msg: 'Error al validar el usuario' });
    }

    if (results.length > 0) {
      return res.status(409).json({ msg: 'El correo ya esta registrado' });
    }

    db.query(insertSql, [nombre, email, password], (insertErr, insertResult) => {
      if (insertErr) {
        return res.status(500).json({ msg: 'Error al registrar usuario' });
      }

      return res.status(201).json({
        msg: 'Usuario registrado correctamente',
        user: {
          id: insertResult.insertId,
          nombre,
          email,
        },
      });
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Email y contrasena son obligatorios' });
  }

  const sql = 'SELECT * FROM usuarios WHERE email = ? LIMIT 1';

  db.query(sql, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ msg: 'Error al iniciar sesion' });
    }

    if (results.length === 0) {
      return res.status(404).json({ msg: 'Usuario no existe' });
    }

    const user = results[0];

    if (user.password !== password) {
      return res.status(401).json({ msg: 'Contrasena incorrecta' });
    }

    return res.json({
      msg: 'Login exitoso',
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
      },
    });
  });
};

module.exports = { register, login };
