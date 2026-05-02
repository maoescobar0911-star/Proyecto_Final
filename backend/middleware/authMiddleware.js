const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'planeador_dietas_secret';

const authRequired = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  const token = header.split(' ')[1];

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch {
    return res.status(401).json({ error: 'Token invalido o expirado' });
  }
};

const adminRequired = (req, res, next) => {
  if (req.user?.rol !== 'admin') {
    return res.status(403).json({ error: 'Acceso solo para administrador' });
  }

  return next();
};

module.exports = {
  JWT_SECRET,
  authRequired,
  adminRequired,
};
