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
function UUID4() {
    const randomString = (pattern) => {
        let str = "";
        const values = self.crypto.getRandomValues(new Uint8Array(pattern.length));
        for (let index = 0; index < pattern.length; index++) {
            const value = values[index];
            if (value) {
                switch (pattern[index]) {
                    case "x":
                        str += (value % 16).toString(16);
                        break;
                    case "y":
                        str += (8 + value % 8).toString(16); // 1???
                        break;
                    case "4":
                        str += "4";
                        break;
                    default:
                        break;
                }
            }
        }
        return str;
    };
    return `${randomString("xxxxxxxx")}-${randomString("xxxx")}-${randomString("4xxx")}-${randomString("yxxx")}-${randomString("xxxxxxxxxxxx")}`;
}
//# sourceMappingURL=buy.js.map