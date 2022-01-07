interface IConvertable
{
	(price: number): number;
}

class Currency
{
	public readonly fromUSD: IConvertable;
	public readonly toUSD: IConvertable;

	public constructor(from_USD: IConvertable, to_USD: IConvertable)
	{
		this.fromUSD = from_USD;
		this.toUSD = to_USD;
	}
}

var currencyes = new Map<string, Currency>();
const nominalValue = 50;

function initCurrencyes()
{
	const httpsRequest = new XMLHttpRequest();
	httpsRequest.onload = () =>
	{
		console.log(httpsRequest.response);
	};
	httpsRequest.open("GET", "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml");
	httpsRequest.responseType = "document";
	httpsRequest.send();
}