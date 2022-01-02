"use strict";
var selectionChanged = [];
var selectedCategory = "";
var categories = ["main", "priceChart", "faq", "buy"];
function SelectCategory(targetId) {
    if (selectedCategory != "") {
        let selectedElement = document.getElementById(selectedCategory);
        if (selectedElement) {
            selectedElement.style.textDecoration = "";
        }
    }
    let targetElement = document.getElementById(targetId);
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
    let newY = page * innerHeight;
    window.scrollTo({ top: newY, left: 0, behavior: "smooth" });
}
function ChangedPage() {
    let page = GetCurrentPage();
    if (page < categories.length) {
        let category = categories[page];
        if (category) {
            SelectCategory(category);
        }
        selectionChanged.forEach((value) => { value(page); });
    }
}
window.onload = () => {
    ChangedPage();
    let chart = GetChart({ width: 1000, height: 500, xRange: { min: 0, max: 10 }, yRange: { min: 0, max: 8 } });
    chart.style.width = "70%";
    let chartPage = document.getElementById("chartPage");
    if (chartPage) {
        chartPage.appendChild(chart);
    }
    generateFaq();
};
function generateFaq() {
    let faqPage = document.getElementById("faqPage");
    var content_1 = document.createElement("div");
    content_1.innerHTML = `<p style="color:white; font-family:Inter; font-size:18px; margin-left:30px">Я АБОРИГЕН Я Я АБОРИГЕН ЭТО А ПОТОМ Б<p>`;
    var content_2 = document.createElement("div");
    content_2.innerHTML = `<p style="color:white; font-family:Inter; font-size:18px; margin-left:30px">слон<p>`;
    var content_3 = document.createElement("div");
    content_3.innerHTML = `<p style="color:white; font-family:Inter; font-size:18px; margin-left:30px">хз<p>`;
    let discussion = createDiscussion([{ header: "хто я", content: content_1 }, { header: "сколько вести пять тонн", content: content_2 }, { header: "что можно купить на один быдло коин", content: content_3 }], "discussion");
    if (faqPage) {
        faqPage.appendChild(discussion);
    }
}
window.addEventListener("scroll", () => {
    ChangedPage();
});
window.addEventListener("mousewheel", (e) => {
    let wheelEvent = e;
    let body = document.body, html = document.documentElement;
    let height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    var newScrollPos = Math.min(Math.max(scrollY + wheelEvent.deltaY, 0), height);
    let distToPage = Math.min(newScrollPos % innerHeight, innerHeight - newScrollPos % innerHeight);
    if (distToPage < 10) {
        // fix scroll
        console.log(distToPage);
    }
}, { passive: false });
window.onresize = () => {
    ChangedPage();
};
//# sourceMappingURL=main.js.map