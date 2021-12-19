var selectionChanged = [];
var selectedCategory = "";
var categories = ["main", "priceChart", "faq", "buy"];
function SelectCategory(targetId) {
    if (selectedCategory != "") {
        var selectedElement = document.getElementById(selectedCategory);
        selectedElement.style.textDecoration = "";
    }
    var targetElement = document.getElementById(targetId);
    targetElement.style.textDecoration = "underline";
    selectedCategory = targetId;
}
function ScrollToCategory(targetId) {
    ScrollToPage(categories.indexOf(targetId));
}
function GetCurrentPage() {
    return Math.round(window.scrollY / innerHeight);
}
function ScrollToPage(page) {
    var newY = page * innerHeight;
    window.scrollTo({ top: newY, left: 0, behavior: "smooth" });
}
function ChangedPage() {
    var page = GetCurrentPage();
    SelectCategory(categories[page]);
    selectionChanged.forEach(function (value, index, array) { value(page); });
}
window.onload = function () {
    ChangedPage();
    GetChart({ width: 1000, height: 500, xRange: { min: 0, max: 10 }, yRange: { min: 0, max: 8 } });
};
window.onscroll = function () {
    ChangedPage();
};
window.onresize = function () {
    ChangedPage();
};
//# sourceMappingURL=main.js.map