"use strict";
class Currency {
    constructor(from_USD, to_USD) {
        this.fromUSD = from_USD;
        this.toUSD = to_USD;
    }
}
var currencyes = new Map();
const nominalValue = 50;
function initCurrencyes() {
    const httpsRequest = new XMLHttpRequest();
    httpsRequest.onload = () => {
        console.log(httpsRequest.response);
    };
    httpsRequest.open("GET", "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml");
    httpsRequest.responseType = "document";
    httpsRequest.send();
}
//# sourceMappingURL=buy.js.map