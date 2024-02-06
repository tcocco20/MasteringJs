declare var axios: any;

const currencyEl_one = document.getElementById(
  "currency-one"
) as HTMLSelectElement | null;
const amountEl_one = document.getElementById(
  "amount-one"
) as HTMLInputElement | null;

const currencyEl_two = document.getElementById(
  "currency-two"
) as HTMLSelectElement | null;
const amountEl_two = document.getElementById(
  "amount-two"
) as HTMLInputElement | null;

const rateEl = document.getElementById("rate") as HTMLDivElement | null;
const swap = document.getElementById("swap") as HTMLButtonElement | null;

// Fetch exchange rates and update the DOM
function calculate(): void {
  if (currencyEl_one && currencyEl_two) {
    const currency_one: string = currencyEl_one.value;
    const currency_two: string = currencyEl_two.value;

    axios
      .get(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
      .then((res: any) => {
        if (amountEl_one && amountEl_two && rateEl) {
          const rate: number = res.data.rates[currency_two];

          rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

          amountEl_two.value = (+amountEl_one.value * rate).toFixed(2);
        }
      });
  }
}

// Event listeners
if (
  currencyEl_one &&
  amountEl_one &&
  currencyEl_two &&
  amountEl_two &&
  rateEl &&
  swap
) {
  currencyEl_one.addEventListener("change", calculate);
  amountEl_one.addEventListener("input", calculate);
  currencyEl_two.addEventListener("change", calculate);
  amountEl_two.addEventListener("input", calculate);

  swap.addEventListener("click", () => {
    const temp: string = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
  });
}
