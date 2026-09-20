const numero = document.getElementById("numero");
const base = document.getElementById("base");
const converter = document.getElementById("converter");

const decimal = document.getElementById("decimal");
const binario = document.getElementById("binario");
const octal = document.getElementById("octal");
const hexadecimal = document.getElementById("hexadecimal");
const erro = document.getElementById("erro");

converter.addEventListener("click", () => {
  const valor = numero.value.trim();
  const baseOrigem = Number(base.value);

  erro.textContent = "";

  if (!valor) {
    erro.textContent = "Digite um número.";
    return;
  }

  const valorDecimal = parseInt(valor, baseOrigem);

  if (Number.isNaN(valorDecimal)) {
    erro.textContent = "Número inválido para a base selecionada.";
    return;
  }

  decimal.textContent = valorDecimal.toString(10);
  binario.textContent = valorDecimal.toString(2);
  octal.textContent = valorDecimal.toString(8);
  hexadecimal.textContent = valorDecimal.toString(16).toUpperCase();
});

numero.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    converter.click();
  }
});
