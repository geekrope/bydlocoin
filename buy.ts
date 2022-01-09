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

var currencies = new Map<string, Currency>();
const bydCurrency = new Currency(
	(value: number) => { return value / nominalValue; },
	(value: number) => { return value * nominalValue; }
);
const nominalValue = 50;
const rounding = 0.001;

var selectedCurrency: string = "";

const currenciesSource = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json';

function initExchangeRates()
{
	fetch(currenciesSource)
		.then((response) =>
		{
			const json = response.json();
			json.then((data) =>
			{
				currencies = exchangeRatesToMap(data.usd);
				selectedCurrency = currencies.keys().next().value;
				currenciesSelectorInit("currenciesSelector");
				initCurrenciesConverter();
			});
		});
}

function exchangeRatesToMap(data: any): Map<string, Currency>
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

function initCurrenciesConverter()
{
	const currencyInput = document.getElementById("currencyInput");
	if (currencyInput)
	{
		currencyInput.oninput = () =>
		{
			convert();
		}
	}
}

function currenciesSelectorInit(id: string)
{
	const element = document.getElementById(id);
	if (element)
	{
		element.addEventListener("click", () =>
		{
			if (element instanceof HTMLSelectElement && element.selectedOptions[0])
			{
				selectedCurrency = element.selectedOptions[0].text;
				convert();
			}
		});

		for (let currency of currencies)
		{
			const option = document.createElement("option");
			option.innerHTML = currency[0];
			option.style.fontFamily = "Inter";
			element.appendChild(option)
		}
	}
}

function convert()
{
	const currencyInput = document.getElementById("currencyInput");
	const currencyOutput = document.getElementById("currencyOutput");
	if (currencyInput && currencyOutput && currencyInput instanceof HTMLInputElement && currencyOutput instanceof HTMLInputElement)
	{
		if (!isNaN(Number(currencyInput.value)))
		{
			const toConvert = parseFloat(currencyInput.value);
			if (currencies.has(selectedCurrency))
			{
				const converted = bydCurrency.fromUSD(currencies.get(selectedCurrency)!.toUSD(toConvert));
				if (!isNaN(converted))
				{
					const truncated = (Math.floor(converted * (1 / rounding)) / (1 / rounding));
					if (truncated >= rounding)
					{
						currencyOutput.value = truncated.toString();
					}
					else
					{
						currencyOutput.value = "too small investment";
					}
				}
			}
		}
	}
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