"use strict";
class Currency {
    constructor(from_USD, to_USD) {
        this.fromUSD = from_USD;
        this.toUSD = to_USD;
    }
}
var currencyes = new Map();
const nominalValue = 50;
function initCurrencies() {
    fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json')
        .then((response) => {
        const json = response.json();
        json.then((data) => {
            currencyes = currenciesToMap(data.usd);
        });
    });
}
function currenciesToMap(data) {
    const map = new Map();
    const keys = Object.keys(data);
    keys.forEach((key) => {
        map.set(key, new Currency((value) => { return parseFloat(data[key]) * value; }, (value) => { return value / parseFloat(data[key]); }));
    });
    return map;
}
//# sourceMappingURL=buy.js.map