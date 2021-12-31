function createDiscussion(questions: { header: string, content: HTMLElement }[], faqId: string) {
	let discussion = document.createElement("div");
	discussion.className = "columnContainer";
	discussion.id = faqId;
	discussion.style.width = "70%";
	discussion.style.borderTop = "3px solid white";

	questions.forEach((value, index, array) => {
		let faqItem = document.createElement("div");
		faqItem.className = "faqItem";
		faqItem.id = faqId + "_item_" + index;

		let faqHeader = document.createElement("div");
		faqHeader.className = "twoColumnsHeader";
		faqItem.id = faqId + "_header_" + index;

		let plusId = faqId + "_expand_" + index;

		let contentId = value.content.id == "" ? faqId + "_content_" + index : value.content.id;

		value.content.id = contentId;
		value.content.style.display = "none";

		faqHeader.innerHTML = `
			<p style="font-family: Inter; font-size: 24px; font-weight: 500; color: white">${value.header}</p>
			<img src="Resources/plus.svg" id="${plusId}" style="width: 25px; height: 25px; transition: 0.2s" onclick="expand('${plusId}','${contentId}')"/>
		`;

		faqItem.appendChild(faqHeader);
		faqItem.appendChild(value.content);

		discussion.appendChild(faqItem);
	});

	return discussion;
}

function countInstances(string: string, word: string) {
	return string.split(word).length - 1;
}

function expand(iconId: string, contentId: string) {
	let icon = document.getElementById(iconId);
	let content = document.getElementById(contentId);
	if (icon && content) {
		const transform = "rotate(45deg)";

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