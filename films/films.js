
var G_sortdir = "asc";

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
	
	// Color the rating numbers
	Array.from(document.getElementsByClassName("ratingNumber")).forEach(rating => {
		
		switch (Array.from(rating.innerHTML)[0]) {
			case "0":
				rating.style.color = '#F8393BF6';
				break;
			case "1":
				if (Array.from(rating.innerHTML)[1] == "0") {
					rating.style.color = '#03BE4BBF';
				} else {
					rating.style.color = '#F95350E3';
				}
				break;
			case "2":
				rating.style.color = '#FA6D55D0';
				break;
			case "3":
				rating.style.color = '#FC975ABF';
				break;
			case "4":
				rating.style.color = '#FDC16FBF';
				break;
			case "5":
				rating.style.color = '#FFEB74BF';
				break;
			case "6":
				rating.style.color = '#C0E373BF';
				break;
			case "7":
				rating.style.color = '#91DA71BF';
				break;
			case "8":
				rating.style.color = '#72D06FBF';
				break;
			case "9":
				rating.style.color = '#43C75DBF';
				break;
		}
		
	});
	
	// Color the Score Boxes
	Array.from(document.getElementsByClassName("ScoreBox")).forEach(box => {
		
		var score = box.querySelector(".xx-large").innerHTML;

		switch (Array.from(score)[0]) {
			case "0":
				box.style.backgroundColor = '#F8393BBF';
				break;
			case "1":
				if (Array.from(score)[1] == "0") {
					box.style.backgroundColor = '#03BE4BBF';
				} else {
					box.style.backgroundColor = '#F95350BF';
				}
				break;
			case "2":
				box.style.backgroundColor = '#FA6D55BF';
				break;
			case "3":
				box.style.backgroundColor = '#FC975ABF';
				break;
			case "4":
				box.style.backgroundColor = '#FDC16FBF';
				break;
			case "5":
				box.style.backgroundColor = '#FFEB74BF';
				break;
			case "6":
				box.style.backgroundColor = '#C0E373BF';
				break;
			case "7":
				box.style.backgroundColor = '#91DA71BF';
				break;
			case "8":
				box.style.backgroundColor = '#72D06FBF';
				break;
			case "9":
				box.style.backgroundColor = '#43C75DBF';
				break;
		}
		
	});
});


/* -------------------------------------------------- SCROLL TO TOP BUTTON -------------------------------------------------- */

function scrollToTop() {
	window.scrollTo({
		top: 0,
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
	 
	// Hide all Tool Tips
		for (const item of document.getElementsByClassName('tooltip')) {
			closeToolTip(item);
		}
}

function closeToolTip(caller) {
	caller.style.display = 'none';
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

/* -------------------------------------------------- FILM SORT -------------------------------------------------- */

function sort(by) {
	
	var sortableElements = Array.from(document.getElementsByClassName("sortableElement"));
	var newOrder = [];
	
	sortableElements.forEach((ele) => {
		ele.style.transform = '';
	});
	
	// Film list order: I, II, III, IV, V, VI, LINEBREAK, Gen, FC, Ins, Nem, LINEBREAK, ST, ID, B, LINEBREAK, S31
	
	if (G_sortdir == "asc") {
		if (by == "alpha") {
			newOrder = [7,14,9,13,2,12,15,4,3,5,8,16,11,6,1,17,10,9998,9999];
		} else if (by == "release") {
			newOrder = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,9998,9999];
		} else if (by == "score") {
			newOrder = ['x','x','x','x','x','x',0,-3,'x','x',-5,16,-1,-4,-2,17,-6,9998,9999]
		} else if (by == "chron") {
			newOrder = [4,5,6,7,8,9,15,11,12,13,14,16,1,2,3,17,10];
		}
	} else if (G_sortdir == "desc") {
		if (by == "alpha") {
			newOrder = [8,1,6,2,13,3,15,11,12,10,7,16,4,9,14,17,5,9998,9999];
		} else if (by == "release") {
			newOrder = [17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,9998,9999];
		} else if (by == "score") {
			newOrder = ['x','x','x','x','x','x',0,-4,'x','x',-2,16,-6,-3,-5,17,-1,9998,9999]
		} else if (by == "chron") {
			newOrder = [11,10,9,8,7,6,15,4,3,2,1,16,14,13,12,17,5];
		}
	}
	
	for (let i=0; i < sortableElements.length; i++) {
		sortableElements[i].style.order = newOrder[i];
	}
		
}

async function aniSort(by) {
	
	var sortableElements = Array.from(document.getElementsByClassName("sortableElement"));
	var currentOrder = [];
	var currentOffset = [];
	var newOffset = [];
	
	/* Get Current Order and Offset for all items */
	sortableElements.forEach((ele) => {
		currentOrder.push(ele.style.order);
		currentOffset.push(getOffset(ele));
	});
		
	/* Sort by new order */
	await sort(by);
	
	/* Get the new Offset for all items */
	sortableElements.forEach((ele) => {
		newOffset.push(getOffset(ele));
	});
	
	/* Re-sort by the original Order */
	for (let i=0; i < sortableElements.length; i++) {
		sortableElements[i].style.order = currentOrder[i];
	}

	/* Animate to new positions */
	for (let i=0; i < sortableElements.length; i++) {
		sortableElements[i].style.transition = 'transform 0.5s ease-in-out';
		sortableElements[i].style.transform = 'translate(' + (newOffset[i].left-currentOffset[i].left) + 'px, ' + (newOffset[i].top-currentOffset[i].top) + 'px)';
	}
	
	/* Finally, sort again by the New order */
	setTimeout(() => {
		sortableElements.forEach((ele) => {
			ele.style.transition = '';
		});
		sort(by);
	}, 550);
}

function reverseSort() {
	
	if (G_sortdir == 'asc') {
		document.getElementById('0asc').style.color = "#555";
		document.getElementById('0desc').style.color = "white";
		G_sortdir = 'desc';
	} else {
		document.getElementById('0asc').style.color = "white";
		document.getElementById('0desc').style.color = "#555";
		G_sortdir = 'asc';
	}
	
	aniSort(document.getElementById('sortSelector').value);
}

/* ------------------------------------------------------------------------------------------------------------
   -------------------------------------------------- ONLOAD --------------------------------------------------
   ------------------------------------------------------------------------------------------------------------ */

window.onload = function() {

	// ************************* TOOL TIPS *************************
			
			// SFDebris Tool Tip
			for (const item of document.getElementsByClassName('SFDratingDescriptionBox')) {
				item.onclick = function(e){
					var tooltip = document.getElementById('SFDToolTip');
					var x = e.clientX,
						y = e.clientY;
						tooltip.style.top = (y+20) + 'px';
						tooltip.style.left = (x+20) + 'px';
						tooltip.style.display = 'block';
						tooltip.style.position = 'fixed';
				}
			}
			
			// EAS Tool Tip
			for (const item of document.getElementsByClassName('EASratingDescriptionBox')) {
				item.onclick = function(e){
					var tooltip = document.getElementById('EASToolTip');
					var x = e.clientX,
						y = e.clientY;
						tooltip.style.top = (y+20) + 'px';
						tooltip.style.left = (x+20) + 'px';
						tooltip.style.display = 'block';
						tooltip.style.position = 'fixed';
				}
			}
			
			// RT Tool Tip
			for (const item of document.getElementsByClassName('RTratingDescriptionBox')) {
				item.onclick = function(e){
					var tooltip = document.getElementById('RTToolTip');
					var x = e.clientX,
						y = e.clientY;
						tooltip.style.top = (y+20) + 'px';
						tooltip.style.left = (x+20) + 'px';
						tooltip.style.display = 'block';
						tooltip.style.position = 'fixed';
				}
			}
			
			// NIMDb Tool Tip
			for (const item of document.getElementsByClassName('NIMDBratingDescriptionBox')) {
				item.onclick = function(e){
					var tooltip = document.getElementById('IMDbToolTip');
					var x = e.clientX,
						y = e.clientY;
						tooltip.style.top = (y+20) + 'px';
						tooltip.style.left = (x+20) + 'px';
						tooltip.style.display = 'block';
						tooltip.style.position = 'fixed';
				}
			}
			
	// *************************  *************************



	var bottomBorder = document.getElementById('bottomBorder');
	setTimeout(function(){bottomBorder.style.width = '100%'},800);
}