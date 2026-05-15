function toggleMobileMenu(button) {
	
	let menu = document.getElementById("mobileMenu");
	
	if (button.innerText == "☰") {
		button.innerHTML = "&times;";
		//button.style.fontSize = "3.5rem";
		button.style.fontWeight = "normal";
		button.style.transform = "scale(1.4) translate(8px,4px)";
		menu.style.display = "block";
	} else {
		button.innerHTML = "☰"
		//button.style.fontSize = "3rem";
		button.style.fontWeight = "bold";
		button.style.transform = "scale(1) translate(0px,0px)";
		menu.style.display = "none";
	}

}

function toggleKofi() {
	const frame = document.getElementById('kofiframe');
	const div = document.getElementById('kofiframediv');

	if (frame.src !== 'https://ko-fi.com/c6reviews/?hidefeed=true&widget=true&embed=true&preview=true') {
		frame.src = 'https://ko-fi.com/c6reviews/?hidefeed=true&widget=true&embed=true&preview=true';
	}

	if (getComputedStyle(div).height === '0px') {
		div.style.height = '700px';
		div.style.border = '1px solid white';
	} else {
		div.style.height = '0px';
		div.style.border = 'none';
	}
}