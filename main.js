"use strict";
var selectionChanged = [];
var selectedCategory = "";
var categories = ["main", "priceChart", "faq", "buy"];
function selectCategory(targetId) {
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
function scrollToCategory(targetId) {
    scrollToPage(categories.indexOf(targetId));
}
function getCurrentPage() {
    return getPage(window.scrollY);
}
function getPage(scroll) {
    return Math.round(scroll / innerHeight);
}
function scrollToPage(page) {
    let newY = page * innerHeight;
    window.scrollTo({ top: newY, left: 0, behavior: "smooth" });
}
function changedPage() {
    let page = getCurrentPage();
    if (page < categories.length) {
        let category = categories[page];
        if (category) {
            selectCategory(category);
        }
        selectionChanged.forEach((value) => { value(page); });
    }
}
window.onload = () => {
    changedPage();
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
    content_1.innerHTML = `<p style="color:white; font-family:Inter; font-size:18px; margin:00px 0px 00px 30px">Я АБОРИГЕН Я Я АБОРИГЕН ЭТО А ПОТОМ Б<p>`;
    var content_2 = document.createElement("div");
    content_2.innerHTML = `<p style="color:white; font-family:Inter; font-size:18px; margin:00px 0px 0px 30px">слон<p>`;
    var content_3 = document.createElement("div");
    content_3.innerHTML = ` <div style="display:flex; flex-direction:row; justify-content:space-around; width:100%">
                    <div class="columnContainer" style="width: 280px; border-radius: var(--block--rounding); border: 3px solid white">
                        <img src="Resources/bKrRF-CKr-I.jpg" class="nftImage" />
                        <div class="twoColumnsHeader">
                            <p class="nftHeaderText">Name</p>
                            <p class="nftHeaderText">Price</p>
                        </div>
                    </div>
                    <div class="columnContainer" style="width: 280px; border-radius: var(--block--rounding); border: 3px solid white">
                        <img src="Resources/bKrRF-CKr-I.jpg" class="nftImage" />
                        <div class="twoColumnsHeader">
                            <p class="nftHeaderText">Name</p>
                            <p class="nftHeaderText">Price</p>
                        </div>
                    </div>
                    <div class="columnContainer" style="width: 280px; border-radius: var(--block--rounding); border: 3px solid white">
                        <img src="Resources/bKrRF-CKr-I.jpg" class="nftImage" />
                        <div class="twoColumnsHeader">
                            <p class="nftHeaderText">Name</p>
                            <p class="nftHeaderText">Price</p>
                        </div>
                    </div>
                </div>`;
    let discussion = createDiscussion([{ header: "хто я", content: content_1 }, { header: "сколько вести пять тонн", content: content_2 }, { header: "что можно купить на один быдло коин", content: content_3 }], "discussion");
    if (faqPage) {
        faqPage.appendChild(discussion);
    }
}
window.addEventListener("scroll", () => {
    changedPage();
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
    changedPage();
};
//# sourceMappingURL=main.js.map