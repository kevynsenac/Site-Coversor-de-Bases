# ⚡ Base Converter

Conversor de números entre diferentes sistemas de numeração, desenvolvido com **HTML, CSS e JavaScript puro**.

O projeto permite informar um número, selecionar sua base de origem e convertê-lo automaticamente para:

* 🔢 Decimal
* 💻 Binário
* 🧮 Octal
* 🔷 Hexadecimal

---

## 📸 Preview

Interface minimalista com **Dark Mode** e elementos em estilo **Neon**.

---

## 🚀 Funcionalidades

* Conversão entre bases numéricas.
* Suporte às bases:

  * Base 2 — Binário
  * Base 8 — Octal
  * Base 10 — Decimal
  * Base 16 — Hexadecimal
* Validação de entradas inválidas.
* Conversão através do botão ou da tecla `Enter`.
* Interface responsiva.
* Não utiliza bibliotecas ou frameworks externos.

---

## 🛠️ Tecnologias

| Tecnologia | Utilização                      |
| ---------- | ------------------------------- |
| HTML5      | Estrutura da aplicação          |
| CSS3       | Estilização e interface         |
| JavaScript | Lógica de conversão e interação |

---

## 📁 Estrutura

```text
base-converter/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## 🧠 Funcionamento

O processo de conversão acontece inteiramente no JavaScript.

O usuário fornece três informações principais:

1. O número que deseja converter.
2. A base em que esse número está atualmente.
3. A ação de conversão.

Por exemplo:

```text
Número: FF
Base: Hexadecimal
```

O JavaScript interpreta `FF` como um número de base 16 e converte seu valor para as demais bases:

```text
Decimal:     255
Binário:     11111111
Octal:       377
Hexadecimal: FF
```

---

## ⚙️ Lógica do JavaScript

### 1. Captura dos elementos

Primeiro, o script obtém referências aos elementos HTML através de `getElementById()`:

```javascript
const numero = document.getElementById("numero");
const base = document.getElementById("base");
const converter = document.getElementById("converter");
```

Isso permite que o JavaScript leia os valores digitados pelo usuário e altere os resultados exibidos na página.

---

### 2. Identificação da base de origem

O `<select>` possui valores correspondentes às bases:

```html
<option value="2">Binário</option>
<option value="8">Octal</option>
<option value="10">Decimal</option>
<option value="16">Hexadecimal</option>
```

O valor selecionado é convertido para um número:

```javascript
const baseOrigem = Number(base.value);
```

Assim, o JavaScript sabe como interpretar o número informado.

---

### 3. Conversão para decimal

A função `parseInt()` é utilizada para interpretar o número de acordo com sua base:

```javascript
const valorDecimal = parseInt(valor, baseOrigem);
```

Por exemplo:

```javascript
parseInt("FF", 16);
```

resulta em:

```text
255
```

O resultado dessa etapa é sempre um número decimal.

---

### 4. Validação

Antes da conversão, o script verifica se o usuário digitou alguma coisa:

```javascript
if (!valor) {
    erro.textContent = "Digite um número.";
    return;
}
```

Depois, verifica se o valor pode ser interpretado na base selecionada:

```javascript
if (Number.isNaN(valorDecimal)) {
    erro.textContent = "Número inválido para a base selecionada.";
    return;
}
```

Isso impede que valores inválidos sejam utilizados na conversão.

---

### 5. Conversão para as demais bases

Depois que o valor é convertido para decimal, o método `toString()` é utilizado para representar esse número em outra base:

```javascript
valorDecimal.toString(2);
valorDecimal.toString(8);
valorDecimal.toString(10);
valorDecimal.toString(16);
```

Cada parâmetro representa a base desejada:

| Código         | Base | Sistema     |
| -------------- | ---: | ----------- |
| `toString(2)`  |    2 | Binário     |
| `toString(8)`  |    8 | Octal       |
| `toString(10)` |   10 | Decimal     |
| `toString(16)` |   16 | Hexadecimal |

No hexadecimal, o resultado é convertido para letras maiúsculas:

```javascript
valorDecimal.toString(16).toUpperCase();
```

Assim:

```text
ff
```

torna-se:

```text
FF
```

---

## 🔄 Fluxo da conversão

A lógica pode ser representada da seguinte forma:

```text
┌─────────────────────┐
│ Usuário informa     │
│ um número           │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Seleciona a base    │
│ de origem           │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ parseInt()          │
│ converte para       │
│ decimal             │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ toString()          │
│ converte para       │
│ as demais bases     │
└──────────┬──────────┘
           │
           ▼
┌──────────────────────────────┐
│ Decimal | Binário | Octal |  │
│ Hexadecimal                  │
└──────────────────────────────┘
```

---

## ⌨️ Atalho

Além do botão **Converter**, o usuário pode pressionar `Enter` dentro do campo de número.

O evento é tratado pelo JavaScript:

```javascript
numero.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        converter.click();
    }
});
```

Quando `Enter` é pressionado, o código simula um clique no botão de conversão.

---

## 📐 Exemplo

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

Outro exemplo:

```text
Número: 2A
Base: Hexadecimal
```

Resultado:

```text
Decimal:     42
Binário:     101010
Octal:       52
Hexadecimal: 2A
```

---

## ▶️ Como executar

Não é necessário instalar dependências.

Basta clonar o repositório:

```bash
git clone https://github.com/SEU-USUARIO/base-converter.git
```

Entrar na pasta:

```bash
cd base-converter
```

E abrir o arquivo:

```text
index.html
```

Também é possível utilizar uma extensão como **Live Server** no VS Code para executar o projeto durante o desenvolvimento.

---

## 📌 Observações

A conversão utiliza os recursos nativos do JavaScript:

* `parseInt()` para interpretar o número de acordo com sua base.
* `toString()` para representar o valor em outra base.
* `Number.isNaN()` para verificar resultados inválidos.
* `addEventListener()` para tratar as interações do usuário.

Não são utilizadas bibliotecas externas.

---