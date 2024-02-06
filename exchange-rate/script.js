var currencyEl_one = document.getElementById("currency-one");
var amountEl_one = document.getElementById("amount-one");
var currencyEl_two = document.getElementById("currency-two");
var amountEl_two = document.getElementById("amount-two");
var rateEl = document.getElementById("rate");
var swap = document.getElementById("swap");
// Fetch exchange rates and update the DOM
function calculate() {
    if (currencyEl_one && currencyEl_two) {
        var currency_one_1 = currencyEl_one.value;
        var currency_two_1 = currencyEl_two.value;
        axios
            .get("https://api.exchangerate-api.com/v4/latest/".concat(currency_one_1))
            .then(function (res) {
            if (amountEl_one && amountEl_two && rateEl) {
                var rate = res.data.rates[currency_two_1];
                rateEl.innerText = "1 ".concat(currency_one_1, " = ").concat(rate, " ").concat(currency_two_1);
                amountEl_two.value = (+amountEl_one.value * rate).toFixed(2);
            }
        });
    }
}
// Event listeners
if (currencyEl_one &&
    amountEl_one &&
    currencyEl_two &&
    amountEl_two &&
    rateEl &&
    swap) {
    currencyEl_one.addEventListener("change", calculate);
    amountEl_one.addEventListener("input", calculate);
    currencyEl_two.addEventListener("change", calculate);
    amountEl_two.addEventListener("input", calculate);
    swap.addEventListener("click", function () {
        var temp = currencyEl_one.value;
        currencyEl_one.value = currencyEl_two.value;
        currencyEl_two.value = temp;
        calculate();
    });
}
