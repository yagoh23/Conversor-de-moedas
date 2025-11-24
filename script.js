const convertButton = document.querySelector(".convert-button")
const currencyFromSelect = document.querySelector(".currency-from")
const currencyToSelect = document.querySelector(".currency-to")

function convertValues() {
    const inputValue = parseFloat(document.querySelector(".input-currency").value)
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert")
    const currencyValueConverted = document.querySelector(".currency-value")

    // taxas fixas em relação ao real
    const rates = {
        real: 1,
        dolar: 5.2,
        euro: 6.2,
        libra: 7.1
    }

    if (isNaN(inputValue)) {
        currencyValueConverted.innerHTML = "Valor inválido"
        return
    }

    // converte o valor para reais primeiro
    const valueInReal = inputValue * rates[currencyFromSelect.value]

    // depois converte para a moeda destino
    const convertedValue = valueInReal / rates[currencyToSelect.value]

    const localeMap = {
        real: "pt-BR",
        dolar: "en-US",
        euro: "de-DE",
        libra: "en-UK"
    }

    const currencyCodeMap = {
        real: "BRL",
        dolar: "USD",
        euro: "EUR",
        libra: "GBP"
    }

    currencyValueToConvert.innerHTML = new Intl.NumberFormat(localeMap[currencyFromSelect.value], {
        style: "currency",
        currency: currencyCodeMap[currencyFromSelect.value]
    }).format(inputValue)

    currencyValueConverted.innerHTML = new Intl.NumberFormat(localeMap[currencyToSelect.value], {
        style: "currency",
        currency: currencyCodeMap[currencyToSelect.value]
    }).format(convertedValue)
}

function updateFlags() {
    const flagFrom = document.querySelector(".currency-flag-from")
    const flagTo = document.querySelector(".currency-flag-to")
    const nameFrom = document.getElementById("currency-from-name")
    const nameTo = document.getElementById("currency-to-name")

    const flagMap = {
        real: "./assets/brasil.png",
        dolar: "./assets/estados-unidos.png",
        euro: "./assets/euro.png", 
        libra: "./assets/libra.png"
    }

    const nameMap = {
        real: "Real brasileiro",
        dolar: "Dólar americano",
        euro: "Euro",
        libra: "Libra esterlina"
    }

    flagFrom.src = flagMap[currencyFromSelect.value]
    flagTo.src = flagMap[currencyToSelect.value]
    nameFrom.innerHTML = nameMap[currencyFromSelect.value]
    nameTo.innerHTML = nameMap[currencyToSelect.value]
}

currencyFromSelect.addEventListener("change", updateFlags)
currencyToSelect.addEventListener("change", updateFlags)
convertButton.addEventListener("click", () => {
    updateFlags()
    convertValues()
})
