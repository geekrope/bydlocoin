function GetChart(properties) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    if (svg instanceof SVGElement) {
        svg.setAttribute("viewBox", "0 0 " + properties.width + " " + properties.height);
        var points = null;
        var rangeX = properties.xRange.max - properties.xRange.min;
        var deltaY = properties.height / rangeX;
        for (var x = properties.xRange.min; x < properties.xRange.max; x++) {
            var yCoord = properties.height - Math.min(Math.max((x - properties.xRange.min + Math.random() * Math.log(rangeX) / Math.log(10)) * deltaY, 0), properties.height);
            var xCoord = (x - properties.xRange.min) / rangeX * properties.width;
            if (points) {
                points += "L " + xCoord + " " + yCoord;
            }
            else {
                points = "M  " + xCoord + " " + yCoord;
            }
        }
        var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("stroke", "white");
        path.setAttribute("stroke-width", "3");
        path.setAttribute("d", points);
        svg.appendChild(path);
    }
    document.body.appendChild(svg);
}
//# sourceMappingURL=chart.js.map