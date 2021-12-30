"use strict";
function createDiscussion(questions, faqId) {
    var discussion = document.createElement("div");
    discussion.className = "faqContainer";
    discussion.id = faqId;
    questions.forEach(function (value, index, array) {
        var faqItem = document.createElement("div");
        faqItem.className = "faqItem";
        faqItem.id = faqId + "_item_" + index;
        var faqHeader = document.createElement("div");
        faqHeader.className = "faqHeader";
        faqItem.id = faqId + "_header_" + index;
        var plusId = faqId + "_expand_" + index;
        var contentId = value.content.id == "" ? faqId + "_content_" + index : value.content.id;
        value.content.id = contentId;
        value.content.style.display = "none";
        faqHeader.innerHTML = "\n\t\t\t<p style=\"font-family: Inter; font-size: 24px; font-weight: 500; color: white\">" + value.header + "</p>\n\t\t\t<img src=\"Resources/plus.svg\" id=\"" + plusId + "\" style=\"width: 25px; height: 25px; transition: 0.2s\" onclick=\"expand('" + plusId + "','" + contentId + "')\"/>\n\t\t";
        faqItem.appendChild(faqHeader);
        faqItem.appendChild(value.content);
        discussion.appendChild(faqItem);
    });
    return discussion;
}
function countInstances(string, word) {
    return string.split(word).length - 1;
}
function expand(iconId, contentId) {
    var icon = document.getElementById(iconId);
    var content = document.getElementById(contentId);
    if (icon && content) {
        var transform = "rotate(45deg)";
        var count = countInstances(icon.style.transform, transform);
        if (count % 2 == 0) {
            while (icon.style.transform.indexOf(transform) != -1) {
                icon.style.transform = icon.style.transform.replace(transform, "");
            }
        }
        content.style.display = (count + 1) % 2 == 1 ? "block" : "none";
        icon.style.transform += transform;
    }
}
//# sourceMappingURL=faq.js.map