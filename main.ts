interface SelectionChanged {
	(page: number): void;
}

var selectionChanged: SelectionChanged[] = [];

var selectedCategory = "";

var categories = ["main", "priceChart", "faq", "buy"];

function SelectCategory(targetId: string): void {

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
	if (page < categories.length) {
		SelectCategory(categories[page]);

		selectionChanged.forEach((value, index, array) => { value(page) });
	}
}

window.onload = () => {
	ChangedPage();

	var chart = GetChart({ width: 1000, height: 500, xRange: { min: 0, max: 10 }, yRange: { min: 0, max: 8 } });
	chart.style.width = "70%";

	var chartPage = document.getElementById("chartPage");
	if (chartPage) {
		chartPage.appendChild(chart);
	}
}

window.onscroll = () => {
	ChangedPage();
}

window.onresize = () => {
	ChangedPage();
}
