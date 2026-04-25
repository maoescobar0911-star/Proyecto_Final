const userModel = require('../models/userModel');
const {
  calcularPesoIdeal,
  calcularImc,
  clasificarImc,
} = require('../utils/health');

const register = (req, res) => {
  const { nombre, email, password, altura, peso_actual } = req.body;

  if (!nombre || !email || !password || !altura || !peso_actual) {
    return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
  }

  const alturaNumero = Number(altura);
  const pesoActualNumero = Number(peso_actual);

  if (!alturaNumero || alturaNumero < 1 || alturaNumero > 2.5) {
    return res.status(400).json({ msg: 'La altura debe estar en metros y ser valida' });
  }

  if (!pesoActualNumero || pesoActualNumero < 25 || pesoActualNumero > 300) {
    return res.status(400).json({ msg: 'El peso actual debe ser valido en kilogramos' });
  }

  userModel.findByEmail(email, (checkErr, results) => {
    if (checkErr) {
      return res.status(500).json({ msg: 'Error al validar el usuario' });
    }

    if (results.length > 0) {
      return res.status(409).json({ msg: 'El correo ya esta registrado' });
    }

    userModel.createUser(
      { nombre, email, password, altura: alturaNumero, peso_actual: pesoActualNumero },
      (insertErr, insertResult) => {
      if (insertErr) {
        return res.status(500).json({ msg: 'Error al registrar usuario' });
      }

      const pesoIdeal = calcularPesoIdeal(alturaNumero);
      const imc = calcularImc(pesoActualNumero, alturaNumero);

      return res.status(201).json({
        msg: 'Usuario registrado correctamente',
        user: {
          id: insertResult.insertId,
          nombre,
          email,
          altura: alturaNumero,
          peso_actual: pesoActualNumero,
          peso_ideal: pesoIdeal,
          imc,
          clasificacion_imc: clasificarImc(imc),
        },
      });
      },
    );
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Email y contrasena son obligatorios' });
  }

  userModel.findByEmail(email, (err, results) => {
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
        altura: Number(user.altura),
        peso_actual: Number(user.peso_actual),
        peso_ideal: calcularPesoIdeal(user.altura),
        imc: calcularImc(user.peso_actual, user.altura),
        clasificacion_imc: clasificarImc(calcularImc(user.peso_actual, user.altura)),
      },
    });
  });
};

module.exports = { register, login };
