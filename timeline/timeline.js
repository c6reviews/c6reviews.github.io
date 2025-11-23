var G_searchterm = "";
var G_searchresulti = 0;

/* -------------------------------------------------- NAV MENU -------------------------------------------------- */

function toggleNav(){
	var menu = document.getElementById("nav");
	var style = getComputedStyle(menu);
	if (style.width == "320px") {
		closeNav();
	} else {
		openNav();
	}
}

function openNav() {
  document.getElementById("nav").style.width = "320px";
  Array.from(document.getElementsByClassName("sideButton")).forEach(button => {
	  button.style.right = "320px";
  });
  document.getElementById("navOpenButton").style.backgroundColor = "#124054";
}

function closeNav() {
  var sidenavExists = document.getElementById("nav");
	if (!!sidenavExists){
		document.getElementById("nav").style.width = "0";
		Array.from(document.getElementsByClassName("sideButton")).forEach(button => {
			button.style.right = "0px";
		});
		document.getElementById("navOpenButton").style.backgroundColor = "";
	}
}

window.addEventListener('mouseup',function(event){
	var menu = document.getElementById("nav");
	if(menu.style.width == "320px" && !menu.contains(event.target)){
            closeNav();
    }
});


/* -------------------------------------------------- LEGEND MENU -------------------------------------------------- */

function toggleLegend(){
	var menu = document.getElementById("legend");
	var style = getComputedStyle(menu);
	if (style.width == "320px") {
		closeLegend();
	} else {
		openLegend();
	}
}

function openLegend() {
  document.getElementById("legend").style.width = "320px";
  Array.from(document.getElementsByClassName("sideButton")).forEach(button => {
	  button.style.right = "320px";
  });
  document.getElementById("legendOpenButton").style.backgroundColor = "#124054";
}

function closeLegend() {
  var sidenavExists = document.getElementById("legend");
	if (!!sidenavExists){
		document.getElementById("legend").style.width = "0";
		Array.from(document.getElementsByClassName("sideButton")).forEach(button => {
			button.style.right = "0px";
		});
		document.getElementById("legendOpenButton").style.backgroundColor = "";
	}
}

window.addEventListener('mouseup',function(event){
	var menu = document.getElementById("legend");
	var legendtooltip = document.getElementById("ExampleTT");
	if(menu.style.width == "320px" && !menu.contains(event.target) && !legendtooltip.contains(event.target)){
            closeLegend();
			closeToolTip(legendtooltip);
        }
});

/* -------------------------------------------------- SPOILER MENU -------------------------------------------------- */

function toggleSpoilerMenu(){
	var menu = document.getElementById("spoilerMenu");
	var style = getComputedStyle(menu);
	if (style.width == "320px") {
		closeSpoilerMenu();
	} else {
		openSpoilerMenu();
	}
}

function openSpoilerMenu() {
  document.getElementById("spoilerMenu").style.width = "320px";
  Array.from(document.getElementsByClassName("sideButton")).forEach(button => {
	  button.style.right = "320px";
  });
  document.getElementById("spoilerMenuOpenButton").style.backgroundColor = "#124054";
}

function closeSpoilerMenu() {
  var sidenavExists = document.getElementById("spoilerMenu")
	if (!!sidenavExists){
		document.getElementById("spoilerMenu").style.width = "0";
		Array.from(document.getElementsByClassName("sideButton")).forEach(button => {
			button.style.right = "0px";
		});
		document.getElementById("spoilerMenuOpenButton").style.backgroundColor = "";
	}
}

window.addEventListener('mouseup',function(event){
	var menu = document.getElementById("spoilerMenu");
	if(menu.style.width == "320px" && !menu.contains(event.target)){
            closeSpoilerMenu();
    }
});

/* -------------------------------------------------- SPOILER TOGGLES -------------------------------------------------- */

function toggleALLSpoilers() {
	
	const ALLSpoilerToggle = document.getElementById("ALLSpoilerToggle");
	const spoilerToggles = Array.from(document.getElementsByClassName("spoilerToggle"));
	
	if (ALLSpoilerToggle.checked) {
		spoilerToggles.forEach((toggle) => {
			toggle.checked = true;
		});
		toggleSpoilers();
		return
	} else {
		spoilerToggles.forEach((toggle) => {
			toggle.checked = false;
		});
		toggleSpoilers();
		return
	}
}

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
	const LOWSpoilerToggle = document.getElementById("LOWSpoilerToggle");
	const LOWSpoilers = Array.from(document.getElementsByClassName("LOWSpoiler"));
	const PROSpoilerToggle = document.getElementById("PROSpoilerToggle");
	const PROSpoilers = Array.from(document.getElementsByClassName("PROSpoiler"));
	const SNWSpoilerToggle = document.getElementById("SNWSpoilerToggle");
	const SNWSpoilers = Array.from(document.getElementsByClassName("SNWSpoiler"));
	
	const characterDeathToggle = document.getElementById("characterDeathToggle");
	const characterDeathSpoilers = Array.from(document.getElementsByClassName("characterDeath"));
	
	const ALLSpoilerToggle = document.getElementById("ALLSpoilerToggle");

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
		} else {
			ALLSpoilerToggle.checked = false;
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
		} else {
			ALLSpoilerToggle.checked = false;
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
		} else {
			ALLSpoilerToggle.checked = false;
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
		} else {
			ALLSpoilerToggle.checked = false;
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
		} else {
			ALLSpoilerToggle.checked = false;
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
		} else {
			ALLSpoilerToggle.checked = false;
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
		} else {
			ALLSpoilerToggle.checked = false;
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
		} else {
			ALLSpoilerToggle.checked = false;
		}
		spoiler.style.setProperty("--spoilerDisplay", display);
	});
	
	LOWSpoilers.forEach((spoiler) => {
		var display = "inline-block";
		if (LOWSpoilerToggle.checked) {
			if (spoiler.classList.contains("characterDeath")){
				if (characterDeathToggle.checked) {display = "none";}
			} else {
				display = "none";
			}				
		} else {
			ALLSpoilerToggle.checked = false;
		}
		spoiler.style.setProperty("--spoilerDisplay", display);
	});
	
	PROSpoilers.forEach((spoiler) => {
		var display = "inline-block";
		if (PROSpoilerToggle.checked) {
			if (spoiler.classList.contains("characterDeath")){
				if (characterDeathToggle.checked) {display = "none";}
			} else {
				display = "none";
			}				
		} else {
			ALLSpoilerToggle.checked = false;
		}
		spoiler.style.setProperty("--spoilerDisplay", display);
	});
	
	SNWSpoilers.forEach((spoiler) => {
		var display = "inline-block";
		if (SNWSpoilerToggle.checked) {
			if (spoiler.classList.contains("characterDeath")){
				if (characterDeathToggle.checked) {display = "none";}
			} else {
				display = "none";
			}				
		} else {
			ALLSpoilerToggle.checked = false;
		}
		spoiler.style.setProperty("--spoilerDisplay", display);
	});
	
	/* Catches for toggles without spoilers */
	if (!ENTSpoilerToggle.checked || !LOWSpoilerToggle.checked || !SNWSpoilerToggle.checked)
	{
		ALLSpoilerToggle.checked = false;
	}
	
	autocompleteUpdate(document.getElementById("tableSearch"), compileSuggestions());
}


/* -------------------------------------------------- ROW HIGHLIGHT -------------------------------------------------- */

function toggleHighlight(caller) {
	
	const row = caller.parentNode;	
	row.classList.toggle("highlighted");

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

/* -------------------------------------------------- SCROLL TO TOP/BOTTOM BUTTONS -------------------------------------------------- */

function scrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
}

function scrollToBottom() {
	window.scrollTo({
		top: document.body.scrollHeight,
		behavior: "smooth",
	});
}

/* -------------------------------------------------- ONSCROLL -------------------------------------------------- */

window.onscroll = function scrollFunction() {
	
	// Show or Hide "Scroll to top" button
		let toTopButton = document.getElementById("toTopButton");
		
		if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
			toTopButton.style.display = "block";
		} else {
			toTopButton.style.display = "none";
		}
		
		let toBottomButton = document.getElementById("toBottomButton");

		if (document.body.scrollTop > (document.body.scrollHeight - 1000) || document.documentElement.scrollTop > (document.documentElement.scrollHeight - 1000) ) {
			toBottomButton.style.display = "none";
		} else {
			toBottomButton.style.display = "block";
		}
	
	// Hide all Tool Tips
		for (const item of document.getElementsByClassName('tooltip')) {
			closeToolTip(item);
		}
}

/* -------------------------------------------------- BLINK -------------------------------------------------- */

function blink(elementIDs) {
	
	var elements = [];
	
	elementIDs = elementIDs.split(",");
	
	for (var i=0; i < elementIDs.length; i++) {
		elements.push(document.getElementById(elementIDs[i]));
	}

	elements.forEach(element => {
		element.classList.toggle("blinkBox");
		setTimeout(() => {
			element.classList.toggle("blinkBox");
			setTimeout(() => {
				element.classList.toggle("blinkBox");
				setTimeout(() => {
					element.classList.toggle("blinkBox");
					setTimeout(() => {
						element.classList.toggle("blinkBox");
						setTimeout(() => {
							element.classList.toggle("blinkBox");
							setTimeout(() => {
								element.classList.toggle("blinkBox");
								setTimeout(() => {
									element.classList.remove("blinkBox");
								}, 300);
							}, 300);
						}, 300);
					}, 300);
				}, 300);
			}, 300);
		}, 300);
	});	
}

function blinkElement(element) {
	
		element.classList.toggle("blinkBox");
		setTimeout(() => {
			element.classList.toggle("blinkBox");
			setTimeout(() => {
				element.classList.toggle("blinkBox");
				setTimeout(() => {
					element.classList.toggle("blinkBox");
					setTimeout(() => {
						element.classList.toggle("blinkBox");
						setTimeout(() => {
							element.classList.toggle("blinkBox");
							setTimeout(() => {
								element.classList.toggle("blinkBox");
								setTimeout(() => {
									element.classList.remove("blinkBox");
								}, 300);
							}, 300);
						}, 300);
					}, 300);
				}, 300);
			}, 300);
		}, 300);
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

/* ---------------------------------------------------------- DRAW LINES ---------------------------------------------------------- */

function drawLines(){
	
	var TOSTAS = getOffset(document.getElementById("TOSTAS"));
	
	var yar1 = getOffset(document.getElementById("altYar1"));
	var yar1x = yar1.left + ((yar1.right - yar1.left)/2) +10;
	var yar1y = yar1.top;
	
	var yar2 = getOffset(document.getElementById("altYar2"));
	var yar2x = yar2.left + ((yar2.right - yar2.left)/2) +50;
	var yar2y = yar2.bottom+4;
	
	var yar3 = getOffset(document.getElementById("altYar3"));
	var yar3x = yar3.left + ((yar3.right - yar3.left)/2);
	var yar3y = yar3.top-3;
	
	var voyHome1 = getOffset(document.getElementById("voyHome1"));
	var voyHome1x = voyHome1.right;
	var voyHome1y = voyHome1.top + ((voyHome1.bottom - voyHome1.top)/2);
	
	var voyHome2 = getOffset(document.getElementById("voyHome2"));
	var voyHome2x = voyHome2.right;
	var voyHome2y = voyHome2.top;
	
	var voyHome3 = getOffset(document.getElementById("voyHome3"));
	var voyHome3x = voyHome3.left + ((voyHome3.right - voyHome3.left)/2);
	var voyHome3y = voyHome3.bottom;
	
	var futuresEnd1 = getOffset(document.getElementById("futuresEnd1"));
	var futuresEnd1x = futuresEnd1.left + ((futuresEnd1.right - futuresEnd1.left)/2);
	var futuresEnd1y = futuresEnd1.bottom;
	
	var futuresEnd2 = getOffset(document.getElementById("futuresEnd2"));
	var futuresEnd2x = futuresEnd2.left + ((futuresEnd2.right - futuresEnd2.left)/2);
	var futuresEnd2y = futuresEnd2.top - 3;
	
	var SF1 = getOffset(document.getElementById("SFFounded1"));
	var SF2 = getOffset(document.getElementById("SFFounded2"));
	var SF3 = getOffset(document.getElementById("SFFounded3"));
	
	var ZC1 = getOffset(document.getElementById("ZCMissing1"));
	var ZC2 = getOffset(document.getElementById("ZCMissing2"));
	var ZC3 = getOffset(document.getElementById("ZCMissing3"));
	
	var TGWMTS1 = getOffset(document.getElementById("TGWMTS1"));
	var TGWMTS2 = getOffset(document.getElementById("TGWMTS2"));
	var TGWMTS3 = getOffset(document.getElementById("TGWMTS3"));
	
	var kelvin1 = getOffset(document.getElementById("kelvin1"));
	var kelvin2 = getOffset(document.getElementById("kelvin2"));
	var kelvin3a = getOffset(document.getElementById("kelvin3a"));
	var kelvin3b = getOffset(document.getElementById("kelvin3b"));
	var kelvin4a = getOffset(document.getElementById("kelvin4a"));
	var kelvin4b = getOffset(document.getElementById("kelvin4b"));
	
	var ZCBorn1 = getOffset(document.getElementById("ZCBorn1"));
	var ZCBorn2 = getOffset(document.getElementById("ZCBorn2"));
	var ZCBorn3 = getOffset(document.getElementById("ZCBorn3"));
	
	var y2250s1 = getOffset(document.getElementById("2250s1"));
	var y2250s2 = getOffset(document.getElementById("2250s2"));
	var y2250s3 = getOffset(document.getElementById("2250s3"));
	var y2250s4 = getOffset(document.getElementById("2250s4"));
	
	var YPDeath1 = getOffset(document.getElementById("YPDeath1"));
	var YPDeath2 = getOffset(document.getElementById("YPDeath2"));
	var YPDeath3 = getOffset(document.getElementById("YPDeath3"));
	
	var S31 = getOffset(document.getElementById("S31"));
	var warp1 = getOffset(document.getElementById("warp1"));
	var twok = getOffset(document.getElementById("TWOK"));
	var stb = getOffset(document.getElementById("STB"));
	var calypso = getOffset(document.getElementById("calypso"));
	var times_arrow = getOffset(document.getElementById("time's_arrow"));
	var tcoteof = getOffset(document.getElementById("tcoteof"));
	var generationsPast = getOffset(document.getElementById("GenerationsPast"));
	var FC = getOffset(document.getElementById("FC"));
	
	var pageWidth = document.documentElement.scrollWidth;
	var pageHeight = document.documentElement.scrollHeight;
	
	var content = `<svg width="` + pageWidth + `" height="` + pageHeight + `" style="position:absolute;top:0;left:0px;z-index:50;pointer-events:none">
		
			<defs>
				<marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="10" markerHeight="10" orient="auto-start-reverse">
					<path d="M 0 0 L 10 5 L 0 10 z" fill="#C0C0C077">
				</marker>
				<marker id="greenarrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="10" markerHeight="10" orient="auto-start-reverse">
					<path d="M 0 0 L 10 5 L 0 10 z" fill="#00B757DD">
				</marker>
				<radialGradient id="vignette">
					<stop offset="0%" stop-color="black" stop-opacity="1"/>
					<stop offset="70%" stop-color="black" stop-opacity="1"/>
					<stop offset="100%" stop-color="black" stop-opacity="0"/>
				</radialGradient>
			</defs>
		
		<!-- TOS/TAS diagonal line divider -->	
			<line x1="` + TOSTAS.left + `" y1="` + TOSTAS.bottom + `" x2="` + TOSTAS.right + `" y2="` + TOSTAS.top + `" stroke="#C0C0C0"/>
		
		<!-- Two straight arrows for Tasha Yar alternate timeline -->	
			<line x1="` + yar1x + `" y1="` + yar1y + `" x2="` + yar2x + `" y2="` + yar2y + `" stroke="#C0C0C077" stroke-dasharray="3" marker-end="url(#arrow)"/>
			<line x1="` + (yar2x-50) + `" y1="` + yar2y + `" x2="` + yar3x + `" y2="` + yar3y + `" stroke="#C0C0C077" stroke-dasharray="3" marker-end="url(#arrow)"/>
		
		<!-- Two curved arrows for VOY Endgame alternate timeline -->
			<path d="M `+ voyHome1x + ` ` + voyHome1y + ` C ` + (voyHome1x+30) + ` ` + (voyHome1y+30) + `, ` + (voyHome2x+30) + ` ` + (voyHome2y-30) + `, ` + (voyHome2x+3) + ` ` + (voyHome2y-3) + `" stroke="#C0C0C077" fill="none" stroke-dasharray="3" marker-end="url(#arrow)"/>
			<path d="M `+ voyHome2x + ` ` + (voyHome2y+10) + ` C ` + (voyHome2x+80) + ` ` + (voyHome2y-20) + `, ` + (voyHome3x) + ` ` + (voyHome3y+50) + `, ` + voyHome3x + ` ` + voyHome3y + `" stroke="#C0C0C077" fill="none" stroke-dasharray="3" marker-end="url(#arrow)"/>
			<line x1="` + futuresEnd1x + `" y1="` + futuresEnd1y + `" x2="` + futuresEnd2x + `" y2="` + futuresEnd2y + `" stroke="#C0C0C077" stroke-dasharray="3" marker-end="url(#arrow)"/>
			
		<!-- Large bracket for Starfleet Founded year -->
			<polyline points="` + (SF1.right-40) + `,` + (SF1.top + ((SF1.bottom-SF1.top)/2)) + ` ` + (SF1.right-20) + `,` + (SF1.top + ((SF1.bottom-SF1.top)/2)) + ` ` + (SF2.left-20) + `,` + (SF2.top - 5 + ((SF2.bottom-SF2.top)/2)) + ` ` + (SF2.left) + `,` + (SF2.top + ((SF2.bottom-SF2.top)/2)) + ` ` + (SF2.left-20) + `,` + (SF2.top + 5 + ((SF2.bottom-SF2.top)/2)) + ` ` + (SF3.right-20) + `,` + (SF3.top + ((SF3.bottom-SF3.top)/2)) + ` ` + (SF3.right-40) + `,` + (SF3.top + ((SF3.bottom-SF3.top)/2)) + `" style="fill:none;stroke:#C0C0C0AA;"/>
			
		<!-- Small bracket for Zefram Cochrane goes missing -->
			<polyline points="` + (ZC1.right-20) + `,` + (ZC1.top + ((ZC1.bottom-ZC1.top)/2)) + ` ` + (ZC1.right-10) + `,` + (ZC1.top + ((ZC1.bottom-ZC1.top)/2)) + ` ` + (ZC2.left-10) + `,` + (ZC2.top - 5 + ((ZC2.bottom-ZC2.top)/2)) + ` ` + (ZC2.left) + `,` + (ZC2.top + ((ZC2.bottom-ZC2.top)/2)) + ` ` + (ZC2.left-10) + `,` + (ZC2.top + 5 + ((ZC2.bottom-ZC2.top)/2)) + ` ` + (ZC3.right-10) + `,` + (ZC3.top + ((ZC3.bottom-ZC3.top)/2)) + ` ` + (ZC3.right-20) + `,` + (ZC3.top + ((ZC3.bottom-ZC3.top)/2)) + `" style="fill:none;stroke:#C0C0C0AA;"/>
		
		<!-- Large bracket for SHO: The Girl Who Made The Stars -->
			<polyline points="` + (TGWMTS1.right-40) + `,` + (TGWMTS1.top + ((TGWMTS1.bottom-TGWMTS1.top)/2)) + ` ` + (TGWMTS1.right-20) + `,` + (TGWMTS1.top + ((TGWMTS1.bottom-TGWMTS1.top)/2)) + ` ` + (TGWMTS2.left-20) + `,` + (TGWMTS2.top - 5 + ((TGWMTS2.bottom-TGWMTS2.top)/2)) + ` ` + (TGWMTS2.left) + `,` + (TGWMTS2.top + ((TGWMTS2.bottom-TGWMTS2.top)/2)) + ` ` + (TGWMTS2.left-20) + `,` + (TGWMTS2.top + 5 + ((TGWMTS2.bottom-TGWMTS2.top)/2)) + ` ` + (TGWMTS3.right-20) + `,` + (TGWMTS3.top + ((TGWMTS3.bottom-TGWMTS3.top)/2)) + ` ` + (TGWMTS3.right-40) + `,` + (TGWMTS3.top + ((TGWMTS3.bottom-TGWMTS3.top)/2)) + `" style="fill:none;stroke:#C0C0C0AA;"/>
		
		<!-- Green dotted line for Kevlin timeline -->
			<line x1="` + kelvin1.right + `" y1="` + (kelvin1.top + ((kelvin1.bottom-kelvin1.top)/2)) + `" x2="` + (kelvin2.right - 10) + `" y2="` + (kelvin2.top + ((kelvin2.bottom-kelvin2.top)/2)) + `" stroke="#00B757DD" stroke-dasharray="3" />
			<line x1="` + (kelvin2.right - 10) + `" y1="` + (kelvin2.top + ((kelvin2.bottom-kelvin2.top)/2)) + `" x2="` + (kelvin4a.right - 10) + `" y2="` + (kelvin4a.top + ((kelvin4a.bottom-kelvin4a.top)/2)) + `" stroke="#00B757DD" stroke-dasharray="3" />
			<path d="M `+ (kelvin3a.right - 10) + ` ` + (kelvin3a.top + ((kelvin3a.bottom-kelvin3a.top)/2)) + ` C ` + (kelvin3a.right - 60) + ` ` + (kelvin3a.top - 50 + ((kelvin3a.bottom-kelvin3a.top)/2)) + `, ` + (kelvin3b.right+43) + ` ` + (kelvin3b.top-43) + `, ` + (kelvin3b.right+3) + ` ` + (kelvin3b.top) + `" stroke="#00B757DD" fill="none" stroke-dasharray="3" marker-end="url(#greenarrow)"/>
			<path d="M `+ (kelvin4a.right - 10) + ` ` + (kelvin4a.top + ((kelvin4a.bottom-kelvin4a.top)/2)) + ` C ` + (kelvin4a.right - 60) + ` ` + (kelvin4a.top - 50 + ((kelvin4a.bottom-kelvin4a.top)/2)) + `, ` + (kelvin4b.right+43) + ` ` + (kelvin4b.top-43) + `, ` + (kelvin4b.right+3) + ` ` + (kelvin4b.top) + `" stroke="#00B757DD" fill="none" stroke-dasharray="3" marker-end="url(#greenarrow)"/>
		
		<!-- Small bracket for Zefram Cochrane birthdate -->
			<polyline points="` + (ZCBorn1.right-20) + `,` + (ZCBorn1.top + ((ZCBorn1.bottom-ZCBorn1.top)/2)) + ` ` + (ZCBorn1.right-10) + `,` + (ZCBorn1.top + ((ZCBorn1.bottom-ZCBorn1.top)/2)) + ` ` + (ZCBorn2.left-10) + `,` + (ZCBorn2.top - 5 + ((ZCBorn2.bottom-ZCBorn2.top)/2)) + ` ` + (ZCBorn2.left) + `,` + (ZCBorn2.top + ((ZCBorn2.bottom-ZCBorn2.top)/2)) + ` ` + (ZCBorn2.left-10) + `,` + (ZCBorn2.top + 5 + ((ZCBorn2.bottom-ZCBorn2.top)/2)) + ` ` + (ZCBorn3.right-10) + `,` + (ZCBorn3.top + ((ZCBorn3.bottom-ZCBorn3.top)/2)) + ` ` + (ZCBorn3.right-20) + `,` + (ZCBorn3.top + ((ZCBorn3.bottom-ZCBorn3.top)/2)) + `" style="fill:none;stroke:#C0C0C0AA;"/>
		
		<!-- Small double-bracket for 3 episodes of SHO in the 2250s -->
			<polyline points="` + (y2250s1.right-40) + `,` + (y2250s1.top + ((y2250s1.bottom-y2250s1.top)/2)) + ` ` + (y2250s1.right-30) + `,` + (y2250s1.top + ((y2250s1.bottom-y2250s1.top)/2)) + ` ` + (y2250s2.left-30) + `,` + (y2250s2.top - 5 + ((y2250s2.bottom-y2250s2.top)/2)) + ` ` + (y2250s2.left-20) + `,` + (y2250s2.top + ((y2250s2.bottom-y2250s2.top)/2)) + ` ` + (y2250s2.left-30) + `,` + (y2250s2.top + 5 + ((y2250s2.bottom-y2250s2.top)/2)) + ` ` + (y2250s3.right-30) + `,` + (y2250s3.top + ((y2250s3.bottom-y2250s3.top)/2)) + ` ` + (y2250s3.right-40) + `,` + (y2250s3.top + ((y2250s3.bottom-y2250s3.top)/2)) + `" style="fill:none;stroke:#C0C0C0AA;"/>
			<polyline points="` + (y2250s1.right) + `,` + (y2250s1.top + ((y2250s1.bottom-y2250s1.top)/2)) + ` ` + (y2250s1.right-10) + `,` + (y2250s1.top + ((y2250s1.bottom-y2250s1.top)/2)) + ` ` + (y2250s2.left-10) + `,` + (y2250s2.top - 5 + ((y2250s2.bottom-y2250s2.top)/2)) + ` ` + (y2250s2.left-20) + `,` + (y2250s2.top + ((y2250s2.bottom-y2250s2.top)/2)) + ` ` + (y2250s2.left-10) + `,` + (y2250s2.top + 5 + ((y2250s2.bottom-y2250s2.top)/2)) + ` ` + (y2250s4.left-10) + `,` + (y2250s4.top + ((y2250s4.bottom-y2250s4.top)/2)) + ` ` + (y2250s4.left) + `,` + (y2250s4.top + ((y2250s4.bottom-y2250s4.top)/2)) + `" style="fill:none;stroke:#C0C0C0AA;"/>
			
		<!-- Large bracket for Yvette Picard death -->
			<polyline points="` + (YPDeath1.right-40) + `,` + (YPDeath1.top + ((YPDeath1.bottom-YPDeath1.top)/2)) + ` ` + (YPDeath1.right-20) + `,` + (YPDeath1.top + ((YPDeath1.bottom-YPDeath1.top)/2)) + ` ` + (YPDeath2.left-20) + `,` + (YPDeath2.top - 5 + ((YPDeath2.bottom-YPDeath2.top)/2)) + ` ` + (YPDeath2.left) + `,` + (YPDeath2.top + ((YPDeath2.bottom-YPDeath2.top)/2)) + ` ` + (YPDeath2.left-20) + `,` + (YPDeath2.top + 5 + ((YPDeath2.bottom-YPDeath2.top)/2)) + ` ` + (YPDeath3.right-20) + `,` + (YPDeath3.top + ((YPDeath3.bottom-YPDeath3.top)/2)) + ` ` + (YPDeath3.right-40) + `,` + (YPDeath3.top + ((YPDeath3.bottom-YPDeath3.top)/2)) + `" style="fill:none;stroke:#C0C0C0AA;"/>
			
			<image href="images/times_arrow.png" x="` + (times_arrow.right - ((times_arrow.right-times_arrow.left)/2) - 104) + `" y="` + (times_arrow.top - 140) + `" opacity="0.9"/>
			<image href="images/cochrane.png" x="` + (warp1.right - ((warp1.right-warp1.left)/2) - 115) + `" y="` + (warp1.top - 192) + `" opacity="0.9"/>
			<image href="images/tcoteof.png" x="` + (tcoteof.right - ((tcoteof.right-tcoteof.left)/2) - 93) + `" y="` + (tcoteof.top - 140) + `" opacity="0.8"/>
			<image href="images/kelvinkirkandspock.png" x="` + (stb.right + 20) + `" y="` + (stb.bottom - 109) + `" opacity="1"/>
			<image href="images/khan.png" x="` + (twok.right - ((twok.right-twok.left)/2) - 62) + `" y="` + (twok.top - 126) + `" opacity="0.9"/>
			<image href="images/georgiou.png" x="` + (S31.right - ((S31.right-S31.left)/2) - 55) + `" y="` + (S31.top - 113) + `" opacity="0.8"/>
			<image href="images/garrett.png" x="` + (yar2.left - 5) + `" y="` + (yar2.top - 82) + `" opacity="0.9"/>
			<image href="images/calypso.png" x="` + (calypso.right - ((calypso.right-calypso.left)/2) - 28) + `" y="` + (calypso.top - 95) + `" opacity="0.9"/>
			<image href="images/generations.png" x="` + (generationsPast.left + 5) + `" y="` + (generationsPast.top - 100) + `"/>
			<image href="images/borgqueen.png" x="` + (FC.right - 60) + `" y="` + (FC.bottom - 106) + `" opacity="0.9"/>
				
	</svg>`;
		
	document.getElementById("svgOverlay").innerHTML = content;
}

window.addEventListener('resize', function(event) {
    drawLines();
}, true);


/* ---------------------------------------------- SEARCH SUGGESTIONS ------------------------------------------*/
function compileSuggestions(){

	const rows = Array.from(document.getElementsByClassName("contentRow"));
	const cells = [];
	const ALLSpoilerToggle = document.getElementById("ALLSpoilerToggle");
	
	if (ALLSpoilerToggle.checked)
	{		
		rows.forEach(row => {
				cells.push(Array.from(row.querySelectorAll('tr:scope > td')).filter(item => !item.innerHTML.includes("<table") && !item.innerHTML.includes("E<br>R<br>A")));
		});
	} else {
			rows.forEach(row => {
				cells.push(Array.from(row.querySelectorAll('tr:scope > td:not(.spoiler)')).filter(item => !item.innerHTML.includes("<table") && !item.innerHTML.includes("E<br>R<br>A")));
		});
	}
		
		// 1. Remove line breaks, tabs, and leading ≈
		// 2. Remove leading and trailing whitespace
		// 3. Remove leading < and >
		// 4. Replace nbsp with standard space
		// 5. Remove leading and trailing whitespace again
		var searchSuggestions = cells.flat().map(cell => cell.textContent.replace(/(\r\n|\n|\r|\t|^\u2248)/gm, "").replace(/^\s+|\s+$/g, "").replace(/(^❰+|^❱+)/g, "").replace(/\u00a0/g, ' ').replace(/^\s+|\s+$/g, ""));
		// 6. Remove duplicates
		searchSuggestions = [...new Set(searchSuggestions)];
		
		return searchSuggestions.flat();
}

function autocompleteSetup(inp, arr) {
	  /*the autocomplete function takes two arguments,
	  the text field element and an array of possible autocompleted values:*/
	  var currentFocus;
	  /*execute a function when someone writes in the text field:*/
	  inp.addEventListener("input", function(e) {
		  var a, b, i, val = this.value;
		  /*close any already open lists of autocompleted values*/
		  closeAllLists();
		  document.getElementById("resultCount").innerHTML="";
		  document.getElementById("tableSearch").style.backgroundColor="#333";
		  if (!val || val.length < 2)
		  {
				return false;
		  }
		  currentFocus = -1;
		  /*create a DIV element that will contain the items (values):*/
		  a = document.createElement("DIV");
		  a.setAttribute("id", this.id + "autocomplete-list");
		  a.setAttribute("class", "autocomplete-items");
		  /*append the DIV element as a child of the autocomplete container:*/
		  this.parentNode.appendChild(a);
		  /*for each item in the array...*/
		  for (i = 0; i < arr.length; i++) {
			/*check if the item starts with the same letters as the text field value:*/
			if (arr[i].toUpperCase().includes(val.toUpperCase())) {
			  /*create a DIV element for each matching element:*/
			  b = document.createElement("DIV");
			  /*Highlight matching characters*/
			  const regEx = new RegExp(val, 'gi');
			  b.innerHTML = arr[i].replace(regEx, '<span style="color:yellow">$&</span>');
			  /*insert a input field that will hold the current array item's value:*/
			  b.innerHTML += "<input type='hidden' value='" + arr[i].replace(/'/g, "&#39;") + "'>";
			  /*execute a function when someone clicks on the item value (DIV element):*/
			  b.addEventListener("click", function(e) {
				  /*insert the value for the autocomplete text field:*/
				  inp.value = this.getElementsByTagName("input")[0].value;
				  /*close the list of autocompleted values,
				  (or any other open lists of autocompleted values:*/
				  closeAllLists();
				  document.getElementById("tableSearch").focus();
				  search("down");
			  });
			  a.appendChild(b);
			}
		  }
	  });
	  /*execute a function presses a key on the keyboard:*/
	  inp.addEventListener("keydown", function(e) {
		  var x = document.getElementById(this.id + "autocomplete-list");
		  if (x) x = x.getElementsByTagName("div");
		  if (e.keyCode == 40) {
				/*If the arrow DOWN key is pressed,
				increase the currentFocus variable:*/
				currentFocus++;
				/*and and make the current item more visible:*/
				addActive(x);
		  } else if (e.keyCode == 38) { //up
				/*If the arrow UP key is pressed,
				decrease the currentFocus variable:*/
				currentFocus--;
				/*and and make the current item more visible:*/
				addActive(x);
		  } else if (e.keyCode == 13) {
				/*If the ENTER key is pressed, prevent the form from being submitted,*/
				e.preventDefault();
				if (currentFocus > -1) {
				  /*and simulate a click on the "active" item:*/
				  if (x) x[currentFocus].click();
				  currentFocus = -1;
				} else {
				  closeAllLists();
				  search('down');
				}
		  } else if (e.keyCode == 27 || e.keyCode == 9) {
				/*If the ESC or TAB key is pressed, close suggestions,*/
				closeAllLists();
		  }
	  });
	  function addActive(x) {
		/*a function to classify an item as "active":*/
		if (!x) return false;
		/*start by removing the "active" class on all items:*/
		removeActive(x);
		if (currentFocus >= x.length) currentFocus = 0;
		if (currentFocus < 0) currentFocus = (x.length - 1);
		/*add class "autocomplete-active":*/
		x[currentFocus].classList.add("autocomplete-active");
	  }
	  function removeActive(x) {
		/*a function to remove the "active" class from all autocomplete items:*/
		for (var i = 0; i < x.length; i++) {
		  x[i].classList.remove("autocomplete-active");
		}
	  }
	  function closeAllLists(elmnt) {
		/*close all autocomplete lists in the document,
		except the one passed as an argument:*/
		var x = document.getElementsByClassName("autocomplete-items");
		for (var i = 0; i < x.length; i++) {
		  if (elmnt != x[i] && elmnt != inp) {
			x[i].parentNode.removeChild(x[i]);
		  }
		}
	  }
	  /*execute a function when someone clicks in the document:*/
	  document.addEventListener("click", function (e) {
		  closeAllLists(e.target);
	  });
}

function autocompleteUpdate(inp, arr) {
	  /*the autocomplete function takes two arguments,
	  the text field element and an array of possible autocompleted values:*/
	  var currentFocus;
	  /*execute a function when someone writes in the text field:*/
	  inp.addEventListener("input", function(e) {
		  var a, b, i, val = this.value;
		  /*close any already open lists of autocompleted values*/
		  closeAllLists();
		  if (!val) { return false;}
		  currentFocus = -1;
		  /*create a DIV element that will contain the items (values):*/
		  a = document.createElement("DIV");
		  a.setAttribute("id", this.id + "autocomplete-list");
		  a.setAttribute("class", "autocomplete-items");
		  /*append the DIV element as a child of the autocomplete container:*/
		  this.parentNode.appendChild(a);
		  /*for each item in the array...*/
		  for (i = 0; i < arr.length; i++) {
			/*check if the item starts with the same letters as the text field value:*/
			if (arr[i].toUpperCase().includes(val.toUpperCase())) {
			  /*create a DIV element for each matching element:*/
			  b = document.createElement("DIV");
			  /*x*/
			  b.innerHTML = arr[i];
			  /*insert a input field that will hold the current array item's value:*/
			  b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
			  /*execute a function when someone clicks on the item value (DIV element):*/
			  b.addEventListener("click", function(e) {
				  /*insert the value for the autocomplete text field:*/
				  inp.value = this.getElementsByTagName("input")[0].value;
				  /*close the list of autocompleted values,
				  (or any other open lists of autocompleted values:*/
				  closeAllLists();
			  });
			  a.appendChild(b);
			}
		  }
	  });
	 
	  function closeAllLists(elmnt) {
		/*close all autocomplete lists in the document,
		except the one passed as an argument:*/
		var x = document.getElementsByClassName("autocomplete-items");
		for (var i = 0; i < x.length; i++) {
		  if (elmnt != x[i] && elmnt != inp) {
			x[i].parentNode.removeChild(x[i]);
		  }
		}
	  }

}

/* ---------------------------------------------- SEARCH FUNCTION --------------------------------------------- */

function search(dir) {

	searchTerm = document.getElementById("tableSearch").value.toLowerCase();
	if (searchTerm == "")
	{
		document.getElementById("resultCount").innerHTML="";
		return;
	}
		
	const ALLSpoilerToggle = document.getElementById("ALLSpoilerToggle");
	if (ALLSpoilerToggle.checked)
	{		
		cells = Array.from(document.querySelectorAll('.contentRow > td')).filter(element => element.textContent.toLowerCase().replace(/(\r\n|\n|\r)/gm, " ").replace(/\u00a0/g, ' ').includes(searchTerm) && !element.innerHTML.includes("<table") && !element.innerHTML.includes("E<br>R<br>A"));
	} else {
		cells = Array.from(document.querySelectorAll('.contentRow > td:not(.spoiler)')).filter(element => element.textContent.toLowerCase().replace(/(\r\n|\n|\r)/gm, " ").replace(/\u00a0/g, ' ').includes(searchTerm) && !element.innerHTML.includes("<table") && !element.innerHTML.includes("E<br>R<br>A"));
	}
	if (cells.length == 0)
	{
		document.getElementById("tableSearch").style.backgroundColor="#FF000040";
		document.getElementById("resultCount").innerHTML="0 results";
	}
	else if (searchTerm != G_searchterm)
	{
		G_searchterm = searchTerm
		
		if (dir == "up")
		{
			cells[cells.length-1].scrollIntoView({behavior:"smooth"});
			blinkElement(cells[cells.length-1]);
			G_searchresulti = cells.length-1;
		}
		else
		{
			cells[0].scrollIntoView({behavior:"smooth"});
			blinkElement(cells[0]);
			G_searchresulti = 0;
		}
		
		document.getElementById("resultCount").innerHTML="Result " + (G_searchresulti+1) + " of " + cells.length;
	}
	else if (searchTerm == G_searchterm)
	{
		if (dir == "up")
		{
			G_searchresulti--;
			if (G_searchresulti < 0) {G_searchresulti = cells.length-1;}
		}
		else
		{
			G_searchresulti++;
			if (G_searchresulti > cells.length-1) {G_searchresulti = 0;}
		}
		
		cells[G_searchresulti].scrollIntoView({behavior:"smooth"});
		blinkElement(cells[G_searchresulti]);	
		
		document.getElementById("resultCount").innerHTML="Result " + (G_searchresulti+1) + " of " + cells.length;
	}

}


/* ------------------------------------------------------------------------------------------------------------
   -------------------------------------------------- ONLOAD --------------------------------------------------
   ------------------------------------------------------------------------------------------------------------ */

document.addEventListener('DOMContentLoaded', function() {
	var bottomBorder = document.getElementById('bottomBorder');
	setTimeout(function() {bottomBorder.style.width = '74%';}, 100);
	setTimeout(function() {if(bottomBorder.style.width != '100%'){bottomBorder.style.width = '75%';}}, 1000);
	setTimeout(function() {if(bottomBorder.style.width != '100%'){bottomBorder.style.width = '76%';}}, 2000);
	setTimeout(function() {if(bottomBorder.style.width != '100%'){bottomBorder.style.width = '77%';}}, 3500);
	setTimeout(function() {if(bottomBorder.style.width != '100%'){bottomBorder.style.width = '78%';}}, 5000);
	setTimeout(function() {if(bottomBorder.style.width != '100%'){bottomBorder.style.width = '79%';}}, 6500);
	setTimeout(function() {if(bottomBorder.style.width != '100%'){bottomBorder.style.width = '80%';}}, 8500);
	setTimeout(function() {if(bottomBorder.style.width != '100%'){bottomBorder.style.width = '81%';}}, 10500);
	setTimeout(function() {if(bottomBorder.style.width != '100%'){bottomBorder.style.width = '82%';}}, 12500);
	setTimeout(function() {if(bottomBorder.style.width != '100%'){bottomBorder.style.width = '83%';}}, 14500);
	setTimeout(function() {if(bottomBorder.style.width != '100%'){bottomBorder.style.width = '84%';}}, 16500);
	setTimeout(function() {if(bottomBorder.style.width != '100%'){bottomBorder.style.width = '85%';}}, 19000);
	setTimeout(function() {if(bottomBorder.style.width != '100%'){bottomBorder.style.width = '86%';}}, 21500);
	setTimeout(function() {if(bottomBorder.style.width != '100%'){bottomBorder.style.width = '87%';}}, 24000);
	setTimeout(function() {if(bottomBorder.style.width != '100%'){bottomBorder.style.width = '88%';}}, 26500);
	setTimeout(function() {if(bottomBorder.style.width != '100%'){bottomBorder.style.width = '89%';}}, 29000);
	setTimeout(function() {if(bottomBorder.style.width != '100%'){bottomBorder.style.width = '90%';}}, 33000);
});


window.onload = function() {

	// Draw the SVG overlay
	drawLines();
	
	// Add shake animation to spoiler elements
	for (const item of document.getElementsByClassName('spoiler')) {
		item.onmousedown = function(){
			item.style.setProperty("--spoilerTransition", "4s");
			item.style.setProperty("--spoilerAnimation", "shake 1.3s 1");
			item.style.setProperty("--spoilerOpacity", "0%");
		}
		item.onmouseup = function(){
			item.style.setProperty("--spoilerTransition", "0s");
			item.style.setProperty("--spoilerAnimation", "none");
			item.style.setProperty("--spoilerOpacity", "100%");
		}
		item.onmouseout = function(){
			item.style.setProperty("--spoilerTransition", "0s");
			item.style.setProperty("--spoilerAnimation", "none");
			item.style.setProperty("--spoilerOpacity", "100%");
		}
	}
	
	// Uncheck all spoiler toggles
	Array.from(document.getElementsByClassName("spoilerToggle")).forEach((toggle) => {
		toggle.checked = false;
	});
	
	//Get cell contents for search suggestions
	autocompleteSetup(document.getElementById("tableSearch"), compileSuggestions());
	
	
	const afterhash = window.location.hash.substring(1);
	if (afterhash) {blink(afterhash);}
	
	var bottomBorder = document.getElementById('bottomBorder');
	setTimeout(function(){bottomBorder.style.width = '100%'},800);
}