var openedBranches = new Map<string, string>();

function createDiscussion(questions: { header: string, content: HTMLElement }[], faqId: string) {
	let discussion = document.createElement("div");
	discussion.className = "columnContainer";
	discussion.id = faqId;
	discussion.style.width = "70%";
	discussion.style.borderTop = "3px solid white";

	questions.forEach((value, index) => {
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

		value.content.style.margin = "10px 0 10px 0";

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

function expand(iconId: string, contentId: string) {
	let icon = document.getElementById(iconId);
	let content = document.getElementById(contentId);
	if (icon && content) {
		if (openedBranches.has(iconId)) {
			icon.style.transform = "";
			content.style.display = "none";
			openedBranches.delete(iconId);
		}
		else {
			openedBranches.forEach((value, key) => {
				expand(key, value);
			});

			icon.style.transform = "rotate(45deg)";
			content.style.display = "block";
			openedBranches.set(iconId, contentId);
		}
	}
}