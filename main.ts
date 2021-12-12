interface SelectionChanged {
	(page: number): void;
}

var selectionChanged: SelectionChanged[] = [];

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
	return Math.round(window.scrollY / innerHeight);
}

function ScrollToPage(page: number): void {
	let newY = page * innerHeight;

	window.scrollTo({ top: newY, left: 0, behavior: "smooth" });
}

function ChangedPage() {
	var page = GetCurrentPage();
	SelectCategory(categories[page]);

	selectionChanged.forEach((value, index, array) => { value(page) });
}

window.onload = () => {
	ChangedPage();
}

window.onscroll = () => {
	ChangedPage();
}

window.onresize = () => {
	ChangedPage();
}
