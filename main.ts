var selectedCategory = "";

var categories = ["main", "priceChart", "faq", "buy"];

function SelectCategory(targetId: string): void {
	if (selectedCategory != "") {
		let selectedElement = document.getElementById(selectedCategory);
		selectedElement.style.textDecoration = "";
	}

	let targetElement = document.getElementById(targetId);
	targetElement.style.textDecoration = "underline";

	selectedCategory = targetId;
}

function ScrollToCategory(targetId: string): void {
	ScrollToPage(categories.indexOf(targetId));
}

function GetCurrentPage(): number {
	return Math.round(window.scrollY / screen.height);
}

function ScrollToPage(page: number): void {
	let newY = page * screen.height;

	window.scrollTo({ top: newY, left: 0, behavior: "smooth" });
}

window.onscroll = () => {
	var page = GetCurrentPage();
	SelectCategory(categories[page]);
}
