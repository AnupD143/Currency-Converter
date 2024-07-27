// const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/"
// const api = ` cur_live_fYN1wO2jU1HolS9qJSBuze8MbXVOp4dTJDuLL9rA`;

const dropdowns = document.querySelectorAll(".dropdown select");

const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const flag1 = document.querySelector(".from-flags");
const flag2 = document.querySelector(".to-flags");

const fromDropDown = document.getElementById("from-select-container");
const toDropDown = document.getElementById("to-select-container");

const exchangeTxt = document.querySelector(".msg");
// console.log(msg)

let btn = document.querySelector("button");
var input_currency = document.getElementById('input_currency');

const img = document.querySelector("img");

// for (let key in countryList) {
//     console.log(key);
// }

for (let select of dropdowns) {

  select.addEventListener('change', (event) => {
    updateFlag(event.target)
  })

}
const updateFlag = (element) => {
  const currcode = element.value;
  const countrycode = countryList[currcode];
  let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`
  let img = element.parentElement.querySelector("img");
  img.src = newSrc
  img.style.display = "block"
}

btn.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeValue();
});


async function getExchangeValue() {
  const amount = document.querySelector("form input");
  let amountVal = amount.value;
  if (flag1.value == "" || flag2.value == "") {
    alert("Please select the countries")
  }
  else if (flag1.value === flag2.value) {
    alert("Please select different countries")
  }
  else if (amountVal == "") {
    alert("Please enter the amount")
  }
  else if (amountVal < 1) {
    alert("Please enter the valid amount")
  }

  else {
    exchangeTxt.innerText = "Getting exchange rate...";
    exchangeTxt.style.display = "block"
    let url = `https://v6.exchangerate-api.com/v6/64260569e69e4649a0cc520b/latest/${fromCurrency.value}`;


// USING PROMISE CHAIN

    // fetch(url)
    //   .then((response) => response.json())
    //   .then((result) => {
    //     let exchangeRate = result.conversion_rates[toCurrency.value];
    //     let total = (amountVal * exchangeRate).toFixed(2);
    //     exchangeTxt.innerText = `${amountVal} ${fromCurrency.value} = ${total} ${toCurrency.value}`;
    //   })
    //   .catch(() => {
    //     exchangeTxt.innerText = "something went wrong";
    //   });


// USING ASYNC-AWAIT FUNCTION
    let promise = await fetch(url)
    // console.log(promise);
    let data = await promise.json();
    // console.log(data);
    let exchangeRate = data.conversion_rates[toCurrency.value];
    // console.log(exchangeRate);
    let total = (amountVal * exchangeRate).toFixed(2);
    exchangeTxt.innerText = `${amountVal} ${fromCurrency.value} = ${total} ${toCurrency.value}`;
  }


}

window.addEventListener("load", () => {
  // getExchangeValue();
});