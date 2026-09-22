# Base Converter

Conversor de números entre diferentes sistemas de numeração, desenvolvido com **HTML, CSS e JavaScript puro**.

O projeto permite informar um número, selecionar sua base de origem e obter automaticamente sua representação equivalente em:

* Decimal
* Binário
* Octal
* Hexadecimal

A conversão é realizada no próprio navegador, sem bibliotecas ou frameworks externos.

---

## Funcionalidades

* Conversão entre bases numéricas.
* Suporte às bases:

  * Base 2 — Binário
  * Base 8 — Octal
  * Base 10 — Decimal
  * Base 16 — Hexadecimal
* Validação dos caracteres de acordo com a base selecionada.
* Suporte a números inteiros positivos e negativos.
* Suporte a números inteiros maiores que o limite seguro do `Number` através de `BigInt`.
* Conversão automática enquanto o usuário digita.
* Atualização automática quando a base de origem é alterada.
* Exibição simultânea dos resultados nas quatro bases.
* Interface responsiva.
* Não utiliza bibliotecas ou frameworks externos.

---

## Tecnologias

| Tecnologia | Utilização                       |
| ---------- | -------------------------------- |
| HTML5      | Estrutura da aplicação           |
| CSS3       | Estilização e interface          |
| JavaScript | Validação, conversão e interação |

---

## Estrutura

```text
base-converter/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## Funcionamento

O processo de conversão acontece inteiramente no JavaScript.

O usuário fornece:

1. O número que deseja converter.
2. A base em que o número está representado.

A conversão acontece automaticamente sempre que o número é alterado ou quando a base de origem é modificada.

Por exemplo:

```text
Número: FF
Base: Hexadecimal
```

O resultado será:

```text
Decimal:     255
Binário:     11111111
Octal:       377
Hexadecimal: FF
```

---

## Lógica do JavaScript

### 1. Captura dos elementos

O script obtém referências aos elementos da interface utilizando `getElementById()`:

```javascript
const numero = document.getElementById("numero");
const base = document.getElementById("base");

const decimal = document.getElementById("decimal");
const binario = document.getElementById("binario");
const octal = document.getElementById("octal");
const hexadecimal = document.getElementById("hexadecimal");
const erro = document.getElementById("erro");
```

Essas referências permitem que o JavaScript leia os dados informados pelo usuário e atualize os resultados exibidos na página.

---

## 2. Validação da base

A função `obterPadrao()` define quais caracteres são aceitos em cada sistema numérico.

```javascript
function obterPadrao(baseNumerica) {
    const padroes = {
        2: /^-?[01]+$/,
        8: /^-?[0-7]+$/,
        10: /^-?[0-9]+$/,
        16: /^-?[0-9a-fA-F]+$/
    };

    return padroes[baseNumerica] ?? null;
}
```

Cada expressão regular corresponde aos caracteres permitidos pela respectiva base:

| Base | Caracteres aceitos    |
| ---: | --------------------- |
|    2 | `0` e `1`             |
|    8 | `0` a `7`             |
|   10 | `0` a `9`             |
|   16 | `0` a `9` e `A` a `F` |

O sinal negativo também é aceito em todas as bases.

---

## 3. Conversão para decimal

Depois da validação, o valor é convertido para uma representação decimal utilizando `BigInt`.

A função `converterParaDecimal()` primeiro verifica se o número é negativo e separa o sinal dos dígitos:

```javascript
const negativo = valor.startsWith("-");
const digitos = negativo ? valor.slice(1) : valor;
```

Em seguida, cada caractere é convertido para seu respectivo valor numérico e incorporado ao resultado:

```javascript
let resultado = 0n;

for (const caractere of digitos.toUpperCase()) {
    const digito = parseInt(caractere, 16);

    resultado =
        resultado * BigInt(baseOrigem) +
        BigInt(digito);
}
```

Por fim, o sinal negativo é restaurado quando necessário.

### Por que `BigInt`?

O `BigInt` permite trabalhar com números inteiros maiores do que aqueles que podem ser representados com segurança pelo tipo `Number`.

Isso permite que o conversor trabalhe com valores inteiros grandes sem depender do limite seguro do `Number`.

---

## 4. Exibição dos resultados

Depois que o valor é convertido para decimal, a função `exibirResultados()` gera sua representação nas quatro bases:

```javascript
function exibirResultados(valorDecimal) {
    decimal.textContent = valorDecimal.toString(10);
    binario.textContent = valorDecimal.toString(2);
    octal.textContent = valorDecimal.toString(8);
    hexadecimal.textContent =
        valorDecimal.toString(16).toUpperCase();
}
```

O método `toString()` recebe a base desejada:

| Código         | Base | Sistema     |
| -------------- | ---: | ----------- |
| `toString(2)`  |    2 | Binário     |
| `toString(8)`  |    8 | Octal       |
| `toString(10)` |   10 | Decimal     |
| `toString(16)` |   16 | Hexadecimal |

No hexadecimal, `toUpperCase()` é utilizado para exibir as letras em maiúsculas.

---

## 5. Limpeza dos resultados

Quando o campo está vazio ou o valor informado é inválido, os resultados são substituídos por `—`.

```javascript
function limparResultados() {
    decimal.textContent = "—";
    binario.textContent = "—";
    octal.textContent = "—";
    hexadecimal.textContent = "—";
}
```

Isso evita que resultados anteriores permaneçam visíveis depois que uma entrada deixa de ser válida.

---

## 6. Processo de conversão

A função `realizarConversao()` concentra o fluxo principal da aplicação.

Primeiro, o valor digitado é obtido e a base selecionada é convertida para `Number`:

```javascript
const valor = numero.value.trim();
const baseOrigem = Number(base.value);
```

Em seguida, o sistema verifica se o campo está vazio.

Caso esteja, os resultados são limpos e a função é encerrada.

Depois disso, o script obtém a expressão regular correspondente à base selecionada e verifica se o valor informado é válido:

```javascript
const padrao = obterPadrao(baseOrigem);

if (!padrao || !padrao.test(valor)) {
    limparResultados();
    erro.textContent =
        "O valor informado não pertence à base selecionada.";
    return;
}
```

Se a entrada for válida, o valor é convertido para decimal e os quatro resultados são exibidos.

---

## Fluxo da conversão

A lógica pode ser representada da seguinte forma:

```text
┌─────────────────────────┐
│ Usuário informa o       │
│ número                  │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Seleciona a base        │
│ de origem               │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Validação por regex     │
│ conforme a base         │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Conversão manual para   │
│ decimal utilizando      │
│ BigInt                  │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ toString()              │
│ gera as representações  │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Decimal | Binário       │
│ Octal   | Hexadecimal  │
└─────────────────────────┘
```

---

## Atualização automática

A conversão não depende de um botão para funcionar.

O script registra dois eventos:

```javascript
numero.addEventListener("input", realizarConversao);

base.addEventListener("change", realizarConversao);
```

Assim, a conversão é executada enquanto o usuário digita e também quando altera a base de origem.

---

## Exemplos

### Exemplo 1 — Hexadecimal

Entrada:

```text
Número: FF
Base: Hexadecimal
```

Saída:

```text
Decimal:     255
Binário:     11111111
Octal:       377
Hexadecimal: FF
```

### Exemplo 2 — Binário

Entrada:

```text
Número: 101010
Base: Binário
```

Saída:

```text
Decimal:     42
Binário:     101010
Octal:       52
Hexadecimal: 2A
```

### Exemplo 3 — Decimal

Entrada:

```text
Número: 42
Base: Decimal
```

Saída:

```text
Decimal:     42
Binário:     101010
Octal:       52
Hexadecimal: 2A
```

---

## Números negativos

O conversor também aceita números inteiros negativos.

Exemplo:

```text
Número: -42
Base: Decimal
```

O sinal negativo é identificado separadamente durante a conversão e aplicado novamente ao resultado decimal.

---

## Validação

Cada base possui regras específicas para os caracteres permitidos.

Por exemplo, com a base 2 selecionada:

```text
101010
```

é válido.

Já:

```text
101012
```

é inválido porque o dígito `2` não pertence à base binária.

Quando uma entrada inválida é detectada, os resultados são limpos e a mensagem de erro é exibida na interface.

---

## Como executar

O projeto não possui dependências externas.

Basta abrir o arquivo:

```text
index.html
```

em um navegador moderno.

Durante o desenvolvimento, também é possível utilizar uma extensão como **Live Server** no VS Code.

---

## 📁 Arquivos do projeto

### `index.html`

Responsável pela estrutura da interface, incluindo:

* Campo de entrada.
* Seleção da base.
* Resultados da conversão.
* Documentação.
* Informações sobre o funcionamento do conversor.

### `style.css`

Responsável pela aparência e responsividade da aplicação.

### `script.js`

Responsável pela:

* Validação das entradas.
* Conversão entre bases.
* Utilização de `BigInt`.
* Atualização dos resultados.
* Tratamento dos eventos de entrada.

---

## Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript
* BigInt
* Expressões regulares (RegExp)

Nenhuma biblioteca ou framework externo é utilizado.

---