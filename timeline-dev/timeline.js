
/* -------------------------------------------------- LEGEND -------------------------------------------------- */

function toggleLegend(){
	var button = document.getElementById("legendOpenButton");
	var style = getComputedStyle(button);
	if (style.right == "320px") {
		closeLegend();
	} else {
		openLegend();
	}
}

function openLegend() {
  document.getElementById("legend").style.width = "320px";
  document.getElementById("legendOpenButton").style.right = "320px";
}

function closeLegend() {
  var sidenavExists = document.getElementById("legend")
	if (!!sidenavExists){
		document.getElementById("legend").style.width = "0";
		document.getElementById("legendOpenButton").style.right = "0px";
	}
}

window.addEventListener('mouseup',function(event){
	var menu = document.getElementById("legend");
	if(event.target != menu && event.target.parentNode != menu){
            closeLegend();
        }
});

/* -------------------------------------------------- SPOILER MENU -------------------------------------------------- */

function toggleSpoilerMenu(){
	var button = document.getElementById("spoilerMenuOpenButton");
	var style = getComputedStyle(button);
	if (style.right == "320px") {
		closeSpoilerMenu();
	} else {
		openSpoilerMenu();
	}
}

function openSpoilerMenu() {
  document.getElementById("spoilerMenu").style.width = "320px";
  document.getElementById("spoilerMenuOpenButton").style.right = "320px";
}

function closeSpoilerMenu() {
  var sidenavExists = document.getElementById("spoilerMenu")
	if (!!sidenavExists){
		document.getElementById("spoilerMenu").style.width = "0";
		document.getElementById("spoilerMenuOpenButton").style.right = "0px";
	}
}

window.addEventListener('mouseup',function(event){
	var menu = document.getElementById("spoilerMenu");
	if(event.target != menu && event.target.parentNode != menu && event.target.parentNode.parentNode != menu){
            closeSpoilerMenu();
        }
});

/* -------------------------------------------------- SPOILER TOGGLES -------------------------------------------------- */

function toggleSpoilers() {
	
	const TOSSpoilerToggle = document.getElementById("TOSSpoilerToggle");
	const TOSSpoilers = Array.from(document.getElementsByClassName("TOSSpoiler"));
	const TNGSpoilerToggle = document.getElementById("TNGSpoilerToggle");
	const TNGSpoilers = Array.from(document.getElementsByClassName("TNGSpoiler"));
	const DS9SpoilerToggle = document.getElementById("DS9SpoilerToggle");
	const DS9Spoilers = Array.from(document.getElementsByClassName("DS9Spoiler"));
	const VOYSpoilerToggle = document.getElementById("VOYSpoilerToggle");
	const VOYSpoilers = Array.from(document.getElementsByClassName("VOYSpoiler"));
	const ENTSpoilerToggle = document.getElementById("ENTSpoilerToggle");
	const ENTSpoilers = Array.from(document.getElementsByClassName("ENTSpoiler"));
	const kelvinSpoilerToggle = document.getElementById("kelvinSpoilerToggle");
	const kelvinSpoilers = Array.from(document.getElementsByClassName("kelvinSpoiler"));
	const DISSpoilerToggle = document.getElementById("DISSpoilerToggle");
	const DISSpoilers = Array.from(document.getElementsByClassName("DISSpoiler"));
	const PICSpoilerToggle = document.getElementById("PICSpoilerToggle");
	const PICSpoilers = Array.from(document.getElementsByClassName("PICSpoiler"));
	
	
	const characterDeathToggle = document.getElementById("characterDeathToggle");
	const characterDeathSpoilers = Array.from(document.getElementsByClassName("characterDeath"));
	

	TOSSpoilers.forEach((spoiler) => {
		var display = "inline-block";
		if (TOSSpoilerToggle.checked) {
			if (spoiler.classList.contains("TNGSpoiler") && spoiler.classList.contains("characterDeath")){
				if (TNGSpoilerToggle.checked && characterDeathToggle.checked) {display = "none";}
			} else if (spoiler.classList.contains("TNGSpoiler")){
				if (TNGSpoilerToggle.checked) {display = "none";}
			} else if (spoiler.classList.contains("characterDeath")){
				if (characterDeathToggle.checked) {display = "none";}
			} else {
				display = "none";
			}				
		}
		spoiler.style.setProperty("--spoilerDisplay", display);
	});
	
	TNGSpoilers.forEach((spoiler) => {
		var display = "inline-block";
		if (TNGSpoilerToggle.checked) {
			if (spoiler.classList.contains("TOSSpoiler")){
				return;
			} else if (spoiler.classList.contains("characterDeath")){
				if (characterDeathToggle.checked) {display = "none";}
			} else {
				display = "none";
			}				
		}
		spoiler.style.setProperty("--spoilerDisplay", display);
	});
	
	DS9Spoilers.forEach((spoiler) => {
		var display = "inline-block";
		if (DS9SpoilerToggle.checked) {
			if (spoiler.classList.contains("characterDeath")){
				if (characterDeathToggle.checked) {display = "none";}
			} else {
				display = "none";
			}				
		}
		spoiler.style.setProperty("--spoilerDisplay", display);
	});
	
	VOYSpoilers.forEach((spoiler) => {
		var display = "inline-block";
		if (VOYSpoilerToggle.checked) {
			if (spoiler.classList.contains("characterDeath")){
				if (characterDeathToggle.checked) {display = "none";}
			} else {
				display = "none";
			}				
		}
		spoiler.style.setProperty("--spoilerDisplay", display);
	});
	
	ENTSpoilers.forEach((spoiler) => {
		var display = "inline-block";
		if (ENTSpoilerToggle.checked) {
			if (spoiler.classList.contains("characterDeath")){
				if (characterDeathToggle.checked) {display = "none";}
			} else {
				display = "none";
			}				
		}
		spoiler.style.setProperty("--spoilerDisplay", display);
	});
	
	kelvinSpoilers.forEach((spoiler) => {
		var display = "inline-block";
		if (kelvinSpoilerToggle.checked) {
			if (spoiler.classList.contains("characterDeath")){
				if (characterDeathToggle.checked) {display = "none";}
			} else {
				display = "none";
			}				
		}
		spoiler.style.setProperty("--spoilerDisplay", display);
	});
	
	DISSpoilers.forEach((spoiler) => {
		var display = "inline-block";
		if (DISSpoilerToggle.checked) {
			if (spoiler.classList.contains("characterDeath")){
				if (characterDeathToggle.checked) {display = "none";}
			} else {
				display = "none";
			}				
		}
		spoiler.style.setProperty("--spoilerDisplay", display);
	});
	
	PICSpoilers.forEach((spoiler) => {
		var display = "inline-block";
		if (PICSpoilerToggle.checked) {
			if (spoiler.classList.contains("characterDeath")){
				if (characterDeathToggle.checked) {display = "none";}
			} else {
				display = "none";
			}				
		}
		spoiler.style.setProperty("--spoilerDisplay", display);
	});
}

/* -------------------------------------------------- ROW HIGHLIGHT -------------------------------------------------- */

function toggleHighlight(caller) {
	
	const row = caller.parentNode;
	
	if (row.classList.contains("highlighted")) {
		row.classList.remove("highlighted");
	} else {
		row.classList.add("highlighted");
	}
}

/* -------------------------------------------------- TOOL TIPS -------------------------------------------------- */

function openToolTip(e,id){
			var tooltip = document.getElementById(id);
			var x = e.clientX,
				y = e.clientY;
				tooltip.style.top = (y+20) + 'px';
				tooltip.style.left = (x+20) + 'px';
				tooltip.style.display = 'block';
				tooltip.style.position = 'fixed';
}

function closeToolTip(caller) {
	caller.style.display = 'none';
}

window.onscroll = function scrollFunction() {
	 
	// Hide all Tool Tips
		for (const item of document.getElementsByClassName('tooltip')) {
			closeToolTip(item);
		}
}

/* -------------------------------------------------- GET ELEMENT POSITION (relative to page, not screen) -------------------------------------------------- */

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
	right: rect.right + window.scrollX,
    top: rect.top + window.scrollY,
	bottom: rect.bottom + window.scrollY
  };
}

/* -------------------------------------------------- DRAW LINES -------------------------------------------------- */

function drawLines(){
	
	var yar1 = document.getElementById("altYar1");
	yar1 = getOffset(yar1);
	var yar1x = yar1.left - 100 + ((yar1.right - yar1.left)/2) +10;
	var yar1y = yar1.top;
	
	var yar2 = document.getElementById("altYar2");
	yar2 = getOffset(yar2);
	var yar2x = yar2.left - 100 + ((yar2.right - yar2.left)/2) +50;
	var yar2y = yar2.bottom+4;
	
	var yar3 = document.getElementById("altYar3");
	yar3 = getOffset(yar3);
	var yar3x = yar3.left - 100 + ((yar3.right - yar3.left)/2);
	var yar3y = yar3.top-3;
	
	var voyHome1 = document.getElementById("voyHome1");
	voyHome1 = getOffset(voyHome1);
	var voyHome1x = voyHome1.right - 100;
	var voyHome1y = voyHome1.top + ((voyHome1.bottom - voyHome1.top)/2);
	
	var voyHome2 = document.getElementById("voyHome2");
	voyHome2 = getOffset(voyHome2);
	var voyHome2x = voyHome2.right - 100;
	var voyHome2y = voyHome2.top;
	
	var voyHome3 = document.getElementById("voyHome3");
	voyHome3 = getOffset(voyHome3);
	var voyHome3x = voyHome3.left - 100 + ((voyHome3.right - voyHome3.left)/2);
	var voyHome3y = voyHome3.bottom;
	
	var content = `<svg width="1600" height="8000" style="position:absolute;top:0;left:100px;z-index:50;pointer-events:none">
		<defs>
			<marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="10" markerHeight="10" orient="auto-start-reverse">
				<path d="M 0 0 L 10 5 L 0 10 z" fill="#C0C0C077">
			</marker>
		</defs>
		<line x1="` + yar1x + `" y1="` + yar1y + `" x2="` + yar2x + `" y2="` + yar2y + `" stroke="#C0C0C077" stroke-dasharray="3" marker-end="url(#arrow)"/>
		<line x1="` + (yar2x-50) + `" y1="` + yar2y + `" x2="` + yar3x + `" y2="` + yar3y + `" stroke="#C0C0C077" stroke-dasharray="3" marker-end="url(#arrow)"/>
		<path d="M `+ voyHome1x + ` ` + voyHome1y + ` C ` + (voyHome1x+30) + ` ` + (voyHome1y+30) + `, ` + (voyHome2x+30) + ` ` + (voyHome2y-30) + `, ` + (voyHome2x+3) + ` ` + (voyHome2y-3) + `" stroke="#C0C0C077" fill="none" stroke-dasharray="3" marker-end="url(#arrow)"/>
		<path d="M `+ voyHome2x + ` ` + (voyHome2y+10) + ` C ` + (voyHome2x+80) + ` ` + (voyHome2y-20) + `, ` + (voyHome3x) + ` ` + (voyHome3y+50) + `, ` + voyHome3x + ` ` + voyHome3y + `" stroke="#C0C0C077" fill="none" stroke-dasharray="3" marker-end="url(#arrow)"/>
		
	</svg>`;
	
	document.getElementById("svgOverlay").innerHTML = content;
}

window.addEventListener('resize', function(event) {
    drawLines();
}, true);

/* ------------------------------------------------------------------------------------------------------------
   -------------------------------------------------- ONLOAD --------------------------------------------------
   ------------------------------------------------------------------------------------------------------------ */

window.onload = function() {
	

	drawLines();
	
	document.getElementById("TOSSpoilerToggle").checked = false;
	document.getElementById("TNGSpoilerToggle").checked = false;
	document.getElementById("DS9SpoilerToggle").checked = false;
	document.getElementById("VOYSpoilerToggle").checked = false;
	document.getElementById("ENTSpoilerToggle").checked = false;
	document.getElementById("kelvinSpoilerToggle").checked = false;
	document.getElementById("DISSpoilerToggle").checked = false;
	document.getElementById("PICSpoilerToggle").checked = false;
	document.getElementById("characterDeathToggle").checked = false;
}