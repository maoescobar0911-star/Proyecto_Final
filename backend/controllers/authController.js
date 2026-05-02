const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  calcularPesoIdeal,
  calcularImc,
  clasificarImc,
  generarRecomendacion,
} = require('../utils/health');
const { JWT_SECRET } = require('../middleware/authMiddleware');

const register = (req, res) => {
  const { nombre, email, password, altura, peso_actual, objetivo_personal } = req.body;

  if (!nombre || !email || !password || !altura || !peso_actual || !objetivo_personal) {
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

    const passwordHash = bcrypt.hashSync(password, 10);
    const rol = email === 'admin@planeador.com' ? 'admin' : 'usuario';

    userModel.createUser(
      {
        nombre,
        email,
        password: passwordHash,
        altura: alturaNumero,
        peso_actual: pesoActualNumero,
        objetivo_personal,
      },
      (insertErr, insertResult) => {
        if (insertErr) {
          console.error('Error al registrar usuario en MySQL:', insertErr);
          return res.status(500).json({ msg: 'Error al registrar usuario' });
        }

        const pesoIdeal = calcularPesoIdeal(alturaNumero);
        const imc = calcularImc(pesoActualNumero, alturaNumero);
        const clasificacion = clasificarImc(imc);

        return res.status(201).json({
          msg: 'Usuario registrado correctamente',
          token: jwt.sign(
            {
              id: insertResult.insertId,
              email,
              rol,
            },
            JWT_SECRET,
            { expiresIn: '8h' },
          ),
          user: {
            id: insertResult.insertId,
            nombre,
            email,
            rol,
            altura: alturaNumero,
            peso_actual: pesoActualNumero,
            objetivo_personal,
            peso_ideal: pesoIdeal,
            imc,
            clasificacion_imc: clasificacion,
            recomendacion: generarRecomendacion({
              objetivo_personal,
              imc,
              clasificacion,
            }),
          },
        });
      },
    );
  });
};

function responderLogin(res, user, rol) {
  const imc = calcularImc(user.peso_actual, user.altura);
  const clasificacion = clasificarImc(imc);

  return res.json({
    msg: 'Login exitoso',
    token: jwt.sign(
      {
        id: user.id,
        email: user.email,
        rol,
      },
      JWT_SECRET,
      { expiresIn: '8h' },
    ),
    user: {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol,
      altura: Number(user.altura),
      peso_actual: Number(user.peso_actual),
      objetivo_personal: user.objetivo_personal,
      peso_ideal: calcularPesoIdeal(user.altura),
      imc,
      clasificacion_imc: clasificacion,
      recomendacion: generarRecomendacion({
        objetivo_personal: user.objetivo_personal,
        imc,
        clasificacion,
      }),
    },
  });
}

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
    const rol = user.email === 'admin@planeador.com' ? 'admin' : 'usuario';
    const pareceHashBcrypt = typeof user.password === 'string' && user.password.startsWith('$2');

    if (pareceHashBcrypt) {
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ msg: 'Contrasena incorrecta' });
      }

      return responderLogin(res, user, rol);
    }

    if (user.password !== password) {
      return res.status(401).json({ msg: 'Contrasena incorrecta' });
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    user.password = passwordHash;

    return userModel.updatePasswordById(user.id, passwordHash, () =>
      responderLogin(res, user, rol),
    );
  });
};

module.exports = { register, login };
