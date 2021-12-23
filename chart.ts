﻿const svgNamespace = "http://www.w3.org/2000/svg";
const xhtmlNamespace = "http://www.w3.org/1999/xhtml";

function GetChart(properties: { width: number, height: number, xRange: { min: number, max: number }, yRange: { min: number, max: number } }): SVGElement {
	let svg = document.createElementNS(svgNamespace, "svg");

	const marginX = 100;
	const marginY = 40;
	const chartYPadding = 10;

	if (svg instanceof SVGElement) {
		svg.setAttribute("viewBox", `0 0 ${properties.width} ${properties.height}`);

		const widthUnit = (properties.width - marginX) / (properties.xRange.max - properties.xRange.min);
		const heightUnit = (properties.height - marginY) / (properties.yRange.max - properties.yRange.min);

		const innerHeight = properties.height - marginY - chartYPadding;

		const xScope = properties.xRange.max - properties.xRange.min;
		const yScope = properties.yRange.max - properties.yRange.min;

		const chartDy = yScope / xScope;

		let chartData = `M ${marginX} ${properties.height - marginY - chartYPadding}`;

		for (let x: number = properties.xRange.min; x < properties.xRange.max; x++) {
			const absoluteY = properties.height - marginY;
			const absoluteX = widthUnit * x + widthUnit / 2 + marginX;

			var text = GetText((x + 1) + " day", absoluteX, absoluteY, "translate(-50%,0)", "50% 0%");

			var nextYValue = x / xScope * yScope;
			var addedDistortion = Math.random() * chartDy;
			if (x < properties.xRange.max - 1) {
				chartData += ` L ${absoluteX} ${innerHeight - innerHeight * (nextYValue + addedDistortion) / yScope}`;
			}
			else {
				chartData += ` L ${absoluteX} 0`;
			}

			svg.appendChild(text);
		}		

		for (let y: number = properties.yRange.min; y < properties.yRange.max; y++) {
			const absoluteY = heightUnit * y + heightUnit / 2;
			const absoluteX = marginX / 2;

			let price = Math.pow(20, properties.yRange.max - y);

			var priceToText = "";

			if (y == properties.yRange.min) {
				priceToText = "∞";
			}
			else if (price < 10000) {
				priceToText = price.toString();
			}
			else {
				var log = Math.floor(Math.log(price) / Math.log(10));
				priceToText = (price / Math.pow(10, log)).toString() + "+E" + log;
			}

			var text = GetText(priceToText + "$", absoluteX, absoluteY, "translate(-50%,-50%)", "50% 50%");

			var horizontalLine = document.createElementNS(svgNamespace, "line");

			horizontalLine.setAttribute("x1", marginX.toString());
			horizontalLine.setAttribute("x2", properties.width.toString());
			horizontalLine.setAttribute("y1", absoluteY.toString());
			horizontalLine.setAttribute("y2", absoluteY.toString());

			horizontalLine.setAttribute("stroke", "rgba(255,255,255,0.1)");
			horizontalLine.setAttribute("stroke-width", "3");

			svg.appendChild(text);
			svg.appendChild(horizontalLine);
		}

		let chart = document.createElementNS(svgNamespace, "path");
		chart.setAttribute("d", chartData);
		chart.setAttribute("stroke", "white");
		chart.setAttribute("stroke-width", "3");
		chart.setAttribute("fill", "none");
		svg.appendChild(chart);
	}

	return svg;
}

function GetText(text: string, x: number, y: number, transform: string, transformOrigin: string): SVGForeignObjectElement {
	let textContaier = document.createElementNS(svgNamespace, "foreignObject");
	if (textContaier instanceof SVGForeignObjectElement) {
		var div = document.createElement("div");

		div.innerHTML = text;

		div.style.background = "white";
		div.style.borderRadius = "100px";
		div.style.padding = "4px 8px 4px 8px";
		div.style.transformOrigin = transformOrigin;
		div.style.fontFamily = "Inter";
		div.style.fontWeight = "500";
		div.style.fontSize = "16px";
		div.style.transform = transform;

		div.setAttribute("xmlns", xhtmlNamespace);

		div.style.width = "max-content";
		div.style.height = "min-content";

		textContaier.appendChild(div);

		textContaier.style.transform = `translate(${x}px, ${y}px)`;
		textContaier.setAttribute("width", "100%");
		textContaier.setAttribute("height", "100%");

		textContaier.style.overflow = "visible";
	}
	return textContaier;
}