let isEnabled = true;
chrome.storage.local.get("enabled", (data) => {
	isEnabled = data.enabled ?? true;
});
chrome.storage.onChanged.addListener((changes) => {
	if (changes.enabled) {
		isEnabled = changes.enabled.newValue;
	}
});

document.addEventListener("copy", (event) => {
	if (!isEnabled) return;
	event.preventDefault();
	navigator.clipboard.readText().then((text) => {
		let modifiedText = cleanText(text);
		event.clipboardData.setData("text/plain", modifiedText);
		navigator.clipboard.writeText(modifiedText);
	});
});

document.addEventListener("click", (event) => {
	if (!isEnabled) return;
	const target = event.target.closest("button");
	if (!target) return;
	setTimeout(() => {
		navigator.clipboard.readText().then((text) => {
			let modifiedText = cleanText(text);
			navigator.clipboard.writeText(modifiedText);
		});
	}, 100);
});

function cleanText(text) {
	return text
		.replace(/\/\*[^]*?\*\//g, "")
		.replace(/(^|[^:])\/\/\s.*$/gm, "$1")
		.replace(/#\s.*$/gm, "")
		.replace(/--\s.*$/gm, "")
		.replace(/<!--\s.*?-->/gs, "")
		.replace(/\s+$/gm, "")
		.replace(/^\n+/, "");
}
