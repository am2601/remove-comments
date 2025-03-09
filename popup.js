document.addEventListener("DOMContentLoaded", async () => {
	const checkbox = document.getElementById("toggleCheckbox");
	const text = document.getElementById("toggleText");
	let data = await chrome.storage.local.get("enabled");
	let isEnabled = data.enabled ?? false;
	updateUI(isEnabled);
	checkbox.addEventListener("change", async () => {
		isEnabled = checkbox.checked;
		await chrome.storage.local.set({ enabled: isEnabled });
		updateUI(isEnabled);
	});
	function updateUI(enabled) {
		checkbox.checked = enabled;
		text.textContent = enabled ? "YES" : "NO";
		text.className = enabled ? "text yes" : "text no";
	}
});
