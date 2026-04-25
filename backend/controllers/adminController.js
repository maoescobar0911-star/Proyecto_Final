const userModel = require('../models/userModel');
const dietaModel = require('../models/dietaModel');
const {
  calcularPesoIdeal,
  calcularImc,
  clasificarImc,
  generarRecomendacion,
} = require('../utils/health');

const obtenerResumenAdmin = (req, res) => {
  userModel.findAll((usersError, usuarios) => {
    if (usersError) {
      return res.status(500).json({ error: 'Error al obtener usuarios' });
    }

    dietaModel.findAll(null, (dietasError, dietas) => {
      if (dietasError) {
        return res.status(500).json({ error: 'Error al obtener dietas' });
      }

      const usuariosConPerfil = usuarios.map((usuario) => {
        const imc = calcularImc(usuario.peso_actual, usuario.altura);
        const clasificacion = clasificarImc(imc);

        return {
          ...usuario,
          altura: Number(usuario.altura),
          peso_actual: Number(usuario.peso_actual),
          peso_ideal: calcularPesoIdeal(usuario.altura),
          imc,
          clasificacion_imc: clasificacion,
          recomendacion: generarRecomendacion({
            objetivo_personal: usuario.objetivo_personal,
            imc,
            clasificacion,
          }),
        };
      });

      return res.json({
        usuarios: usuariosConPerfil,
        dietas,
        resumen: {
          total_usuarios: usuarios.length,
          total_dietas: dietas.length,
          dietas_activas: dietas.filter((dieta) => !dieta.completada).length,
          dietas_completadas: dietas.filter((dieta) => Boolean(dieta.completada)).length,
        },
      });
    });
  });
};

module.exports = {
  obtenerResumenAdmin,
};
