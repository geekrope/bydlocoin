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
    generateFaq();
};
function generateFaq() {
    var faqPage = document.getElementById("faqPage");
    var content_1 = document.createElement("div");
    content_1.innerHTML = "<p style=\"color:white; font-family:Inter; font-size:18px; margin-left:30px\">\u042F \u0410\u0411\u041E\u0420\u0418\u0413\u0415\u041D \u042F \u042F \u0410\u0411\u041E\u0420\u0418\u0413\u0415\u041D \u042D\u0422\u041E \u0410 \u041F\u041E\u0422\u041E\u041C \u0411<p>";
    var content_2 = document.createElement("div");
    content_2.innerHTML = "<p style=\"color:white; font-family:Inter; font-size:18px; margin-left:30px\">\u0441\u043B\u043E\u043D<p>";
    var content_3 = document.createElement("div");
    content_3.innerHTML = "<p style=\"color:white; font-family:Inter; font-size:18px; margin-left:30px\">\u0440\u0430\u0431\u0430<p>";
    var discussion = createDiscussion([{ header: "хто я", content: content_1 }, { header: "сколько вести пять тонн", content: content_2 }, { header: "что можно купить на один быдло коин", content: content_3 }], "discussion");
    discussion.style.marginBottom = "67px";
    if (faqPage) {
        faqPage.appendChild(discussion);
    }
}
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