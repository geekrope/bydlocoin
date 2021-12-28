"use strict";
var selectionChanged = [];
var selectedCategory = "";
var categories = ["main", "priceChart", "faq", "buy"];
function SelectCategory(targetId) {
    if (selectedCategory != "") {
        var selectedElement = document.getElementById(selectedCategory);
        if (selectedElement) {
            selectedElement.style.textDecoration = "";
        }
    }
    var targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.style.textDecoration = "underline";
    }
    selectedCategory = targetId;
}
function ScrollToCategory(targetId) {
    ScrollToPage(categories.indexOf(targetId));
}
function GetCurrentPage() {
    return GetPage(window.scrollY);
}
function GetPage(scroll) {
    return Math.round(scroll / innerHeight);
}
function ScrollToPage(page) {
    var newY = page * innerHeight;
    window.scrollTo({ top: newY, left: 0, behavior: "smooth" });
}
function ChangedPage() {
    var page = GetCurrentPage();
    if (page < categories.length) {
        SelectCategory(categories[page]);
        selectionChanged.forEach(function (value, index, array) { value(page); });
    }
}
window.onload = function () {
    ChangedPage();
    var chart = GetChart({ width: 1000, height: 500, xRange: { min: 0, max: 10 }, yRange: { min: 0, max: 8 } });
    chart.style.width = "70%";
    var chartPage = document.getElementById("chartPage");
    if (chartPage) {
        chartPage.appendChild(chart);
    }
};
window.addEventListener("scroll", function (e) {
    ChangedPage();
});
window.addEventListener("mousewheel", function (e) {
    var wheelEvent = e;
    var body = document.body, html = document.documentElement;
    var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    var newScrollPos = Math.min(Math.max(scrollY + wheelEvent.deltaY, 0), height);
    var distToPage = Math.min(newScrollPos % innerHeight, innerHeight - newScrollPos % innerHeight);
    if (distToPage < 10) {
        // fix scroll
        console.log(distToPage);
    }
}, { passive: false });
window.onresize = function () {
    ChangedPage();
};
//# sourceMappingURL=main.js.map