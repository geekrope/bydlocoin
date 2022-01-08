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

function initCurrencies()
{
	fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json')
		.then((response) =>
		{
			const json = response.json();
			json.then((data) =>
			{
				currencyes = currenciesToMap(data.usd);
			});
		});
}

function currenciesToMap(data: any): Map<string, Currency>
{
	const map = new Map<string, Currency>();
	const keys = Object.keys(data);
	keys.forEach((key) =>
	{
		map.set(key, new Currency(
			(value: number) => { return parseFloat(data[key]) * value; },
			(value: number) => { return value / parseFloat(data[key]); }
		));
	});

	return map;
}

function UUID4()
{
	const randomString = (pattern: string) =>
	{
		let str = "";

		const values = self.crypto.getRandomValues<Uint8Array>(new Uint8Array(pattern.length));

		for (let index = 0; index < pattern.length; index++)
		{
			const value = values[index];
			if (value)
			{
				switch (pattern[index])
				{
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
	}

	return `${randomString("xxxxxxxx")}-${randomString("xxxx")}-${randomString("4xxx")}-${randomString("yxxx")}-${randomString("xxxxxxxxxxxx")}`;
}