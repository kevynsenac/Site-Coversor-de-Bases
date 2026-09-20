const numero = document.getElementById("numero");
const base = document.getElementById("base");
const converter = document.getElementById("converter");

const decimal = document.getElementById("decimal");
const binario = document.getElementById("binario");
const octal = document.getElementById("octal");
const hexadecimal = document.getElementById("hexadecimal");
const erro = document.getElementById("erro");

function obterPadrao(base) {
    switch (base) {
        case 2:
            return /^-?[01]+$/;
        case 8:
            return /^-?[0-7]+$/;
        case 10:
            return /^-?[0-9]+$/;
        case 16:
            return /^-?[0-9a-fA-F]+$/;
        default:
            return null;
    }
}

function converterParaDecimal(valor, baseOrigem) {
    const negativo = valor.startsWith("-");
    const numeroLimpo = negativo ? valor.slice(1) : valor;

    let resultado = 0n;

    for (const caractere of numeroLimpo.toUpperCase()) {
        const digito = parseInt(caractere, 16);

        if (digito >= baseOrigem) {
            return null;
        }

        resultado = resultado * BigInt(baseOrigem) + BigInt(digito);
    }

    return negativo ? -resultado : resultado;
}

function exibirResultados(valorDecimal) {
    decimal.textContent = valorDecimal.toString(10);
    binario.textContent = valorDecimal.toString(2);
    octal.textContent = valorDecimal.toString(8);
    hexadecimal.textContent = valorDecimal.toString(16).toUpperCase();
}

function limparResultados() {
    decimal.textContent = "—";
    binario.textContent = "—";
    octal.textContent = "—";
    hexadecimal.textContent = "—";
}

function realizarConversao() {
    const valor = numero.value.trim();
    const baseOrigem = Number(base.value);

    erro.textContent = "";

    if (!valor) {
        limparResultados();
        return;
    }

    const padrao = obterPadrao(baseOrigem);

    if (!padrao.test(valor)) {
        limparResultados();
        erro.textContent = "O valor informado não pertence à base selecionada.";
        return;
    }

    const valorDecimal = converterParaDecimal(valor, baseOrigem);

    if (valorDecimal === null) {
        limparResultados();
        erro.textContent = "Não foi possível realizar a conversão.";
        return;
    }

    exibirResultados(valorDecimal);
}

converter.addEventListener("click", realizarConversao);

numero.addEventListener("input", realizarConversao);

numero.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        realizarConversao();
    }
});

base.addEventListener("change", realizarConversao);
