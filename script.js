const numero = document.getElementById("numero");
const base = document.getElementById("base");

const decimal = document.getElementById("decimal");
const binario = document.getElementById("binario");
const octal = document.getElementById("octal");
const hexadecimal = document.getElementById("hexadecimal");
const erro = document.getElementById("erro");

// Define quais caracteres são aceitos em cada base.
function obterPadrao(baseNumerica) {
    const padroes = {
        2: /^-?[01]+$/,
        8: /^-?[0-7]+$/,
        10: /^-?[0-9]+$/,
        16: /^-?[0-9a-fA-F]+$/
    };

    return padroes[baseNumerica] ?? null;
}

// Converte o valor informado para BigInt decimal.
// BigInt permite trabalhar com números inteiros maiores
// que o limite seguro do tipo Number.
function converterParaDecimal(valor, baseOrigem) {
    const negativo = valor.startsWith("-");
    const digitos = negativo ? valor.slice(1) : valor;

    let resultado = 0n;

    for (const caractere of digitos.toUpperCase()) {
        const digito = parseInt(caractere, 16);

        resultado =
            resultado * BigInt(baseOrigem) +
            BigInt(digito);
    }

    return negativo ? -resultado : resultado;
}

// Atualiza os quatro resultados usando o mesmo valor decimal.
function exibirResultados(valorDecimal) {
    decimal.textContent = valorDecimal.toString(10);
    binario.textContent = valorDecimal.toString(2);
    octal.textContent = valorDecimal.toString(8);
    hexadecimal.textContent = valorDecimal
        .toString(16)
        .toUpperCase();
}

// Limpa os resultados quando a entrada está vazia ou inválida.
function limparResultados() {
    decimal.textContent = "—";
    binario.textContent = "—";
    octal.textContent = "—";
    hexadecimal.textContent = "—";
}

// Realiza a conversão automaticamente sempre que
// o usuário altera o número ou a base.
function realizarConversao() {
    const valor = numero.value.trim();
    const baseOrigem = Number(base.value);

    erro.textContent = "";

    // Sem valor: apenas limpa os resultados.
    if (!valor) {
        limparResultados();
        return;
    }

    const padrao = obterPadrao(baseOrigem);

    // Verifica se os caracteres pertencem à base selecionada.
    if (!padrao || !padrao.test(valor)) {
        limparResultados();
        erro.textContent =
            "O valor informado não pertence à base selecionada.";
        return;
    }

    const valorDecimal = converterParaDecimal(valor, baseOrigem);

    exibirResultados(valorDecimal);
}

// A conversão acontece enquanto o usuário digita.
numero.addEventListener("input", realizarConversao);

// Também atualiza os resultados quando a base é alterada.
base.addEventListener("change", realizarConversao);