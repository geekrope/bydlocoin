"use strict";
var svgNamespace = "http://www.w3.org/2000/svg";
var xhtmlNamespace = "http://www.w3.org/1999/xhtml";
function GetChart(properties) {
    var svg = document.createElementNS(svgNamespace, "svg");
    var marginX = 100;
    var marginY = 40;
    var chartYPadding = 10;
    if (svg instanceof SVGElement) {
        svg.setAttribute("viewBox", "0 0 " + properties.width + " " + properties.height);
        var widthUnit = (properties.width - marginX) / (properties.xRange.max - properties.xRange.min);
        var heightUnit = (properties.height - marginY) / (properties.yRange.max - properties.yRange.min);
        var innerHeight_1 = properties.height - marginY - chartYPadding;
        var xScope = properties.xRange.max - properties.xRange.min;
        var yScope = properties.yRange.max - properties.yRange.min;
        var chartDy = yScope / xScope;
        var chartData = "M " + marginX + " " + (properties.height - marginY - chartYPadding);
        for (var x = properties.xRange.min; x < properties.xRange.max; x++) {
            var absoluteY = properties.height - marginY;
            var absoluteX = widthUnit * x + widthUnit / 2 + marginX;
            var text = GetText((x + 1) + " day", absoluteX, absoluteY, "translate(-50%,0)", "50% 0%");
            var nextYValue = x / xScope * yScope;
            var addedDistortion = Math.random() * chartDy;
            if (x < properties.xRange.max - 1) {
                chartData += " L " + absoluteX + " " + (innerHeight_1 - innerHeight_1 * (nextYValue + addedDistortion) / yScope);
            }
            else {
                chartData += " L " + absoluteX + " 0";
            }
            svg.appendChild(text);
        }
        var chart = document.createElementNS(svgNamespace, "path");
        chart.setAttribute("d", chartData);
        chart.setAttribute("stroke", "white");
        chart.setAttribute("stroke-width", "3");
        svg.appendChild(chart);
        for (var y = properties.yRange.min; y < properties.yRange.max; y++) {
            var absoluteY = heightUnit * y + heightUnit / 2;
            var absoluteX = marginX / 2;
            var price = Math.pow(20, properties.yRange.max - y);
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
    }
    return svg;
}
function GetText(text, x, y, transform, transformOrigin) {
    var textContaier = document.createElementNS(svgNamespace, "foreignObject");
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
        textContaier.style.transform = "translate(" + x + "px, " + y + "px)";
        textContaier.setAttribute("width", "100%");
        textContaier.setAttribute("height", "100%");
        textContaier.style.overflow = "visible";
    }
    return textContaier;
}
//# sourceMappingURL=chart.js.map