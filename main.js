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
    return Math.round(window.scrollY / screen.height);
}
function ScrollToPage(page) {
    var newY = page * screen.height;
    window.scrollTo({ top: newY, left: 0, behavior: "smooth" });
}
window.onscroll = function () {
    var page = GetCurrentPage();
    SelectCategory(categories[page]);
};
//# sourceMappingURL=main.js.map