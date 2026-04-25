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

module.exports = {
  calcularPesoIdeal,
  calcularImc,
  clasificarImc,
  IDEAL_BMI,
};
