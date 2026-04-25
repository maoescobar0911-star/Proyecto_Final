const IDEAL_BMI = 22;

function calcularPesoIdeal(altura) {
  const alturaNumero = Number(altura);

  if (!alturaNumero || alturaNumero <= 0) {
    return null;
  }

  return Number((IDEAL_BMI * alturaNumero * alturaNumero).toFixed(1));
}

function calcularImc(pesoActual, altura) {
  const pesoNumero = Number(pesoActual);
  const alturaNumero = Number(altura);

  if (!pesoNumero || !alturaNumero || pesoNumero <= 0 || alturaNumero <= 0) {
    return null;
  }

  return Number((pesoNumero / (alturaNumero * alturaNumero)).toFixed(1));
}

function clasificarImc(imc) {
  const valor = Number(imc);

  if (!valor || valor <= 0) {
    return null;
  }

  if (valor < 18.5) {
    return 'Bajo peso';
  }

  if (valor < 25) {
    return 'Peso saludable';
  }

  if (valor < 30) {
    return 'Sobrepeso';
  }

  return 'Obesidad';
}

function generarRecomendacion({ objetivo_personal, imc, clasificacion }) {
  const objetivo = objetivo_personal || 'Mantener peso';

  if (objetivo === 'Bajar peso') {
    if (imc >= 25) {
      return 'Te conviene un plan con deficit calorico moderado y seguimiento semanal.';
    }

    return 'Puedes bajar peso con cuidado, priorizando una alimentacion equilibrada.';
  }

  if (objetivo === 'Ganar masa') {
    if (clasificacion === 'Bajo peso') {
      return 'Te conviene aumentar calorias y proteina con control del progreso.';
    }

    return 'Puedes enfocarte en ganar masa con un superavit moderado y buena proteina.';
  }

  if (clasificacion === 'Peso saludable') {
    return 'Tu perfil va bien para mantener peso con habitos constantes y buena distribucion de comidas.';
  }

  if (clasificacion === 'Sobrepeso' || clasificacion === 'Obesidad') {
    return 'Un plan de mantenimiento con mejor calidad alimenticia puede ayudarte a estabilizar el progreso.';
  }

  return 'Mantener una rutina alimenticia ordenada te ayudara a ver mejor tu progreso.';
}

module.exports = {
  calcularPesoIdeal,
  calcularImc,
  clasificarImc,
  generarRecomendacion,
  IDEAL_BMI,
};
