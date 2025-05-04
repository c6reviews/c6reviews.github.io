
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
				rating.style.color = '#F8393BBF';
				break;
			case "1":
				if (Array.from(rating.innerHTML)[1] == "0") {
					rating.style.color = '#03BE4BBF';
				} else {
					rating.style.color = '#F95350BF';
				}
				break;
			case "2":
				rating.style.color = '#FA6D55BF';
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

function closeToolTip(caller) {
	caller.style.display = 'none';
}

function showTimeline(id){
	obj = document.getElementById(id);
	
	obj.style.transform = "translateX(0%) translateY(-50%)";
}

function hideTimeline(id){
	obj = document.getElementById(id);
	
	obj.style.transform = "translateX(-100%) translateY(-50%)";
}

/* -------------------------------------------------- NAVIGATION MENU -------------------------------------------------- */

function toggleNav(){
	var button = document.getElementById("leftNavOpenButton");
	var style = getComputedStyle(button);
	if (style.left == "320px") {
		closeNav();
	} else {
		openNav();
	}
}

function openNav() {
  document.getElementById("mainSidenav").style.width = "320px";
  document.getElementById("leftNavOpenButton").style.left = "320px";
}

function closeNav() {
  var sidenavExists = document.getElementById("mainSidenav")
	if (!!sidenavExists){
		document.getElementById("mainSidenav").style.width = "0";
		document.getElementById("leftNavOpenButton").style.left = "0px";
	}
}

window.addEventListener('mouseup',function(event){
	var menu = document.getElementById("mainSidenav");
	if(event.target != menu && event.target.parentNode != menu){
            closeNav();
        }
});

/* -------------------------------------------------- SCROLL TO TOP BUTTON -------------------------------------------------- */

function scrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
}

/* -------------------------------------------------- SPOILERS -------------------------------------------------- */

function displaySpoiler(caller) {
	
	var content = caller.parentNode.querySelector('.spoilerContent');
	var style = getComputedStyle(content);

	if (style.filter === "blur(6px)") {
		content.style.filter = "none";
		content.style.userSelect = "auto";
		content.style.pointerEvents = "auto";
	} else {
		content.style.filter = "blur(6px)";
		content.style.userSelect = "none";
		content.style.pointerEvents = "none";
	}
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


/* ------------------------------------------------------------------------------------------------------------
   -------------------------------------------------- ONLOAD --------------------------------------------------
   ------------------------------------------------------------------------------------------------------------ */

window.onload = function() {
	
	if (window.location.href.includes("openNav")) {
		openNav();
	};

	// Franchise Episode Tool Tip
	for (const item of document.getElementsByClassName('FepisodeNumberBox')) {
		item.onclick = function(e){
			var tooltip = document.getElementById('FepisodeToolTip');
			var x = e.clientX,
				y = e.clientY;
				tooltip.style.top = (y+20) + 'px';
				tooltip.style.left = (x+20) + 'px';
				tooltip.style.display = 'block';
				tooltip.style.position = 'fixed';
		}
	}
	
	// Red Flag Tool Tip
	for (const item of document.getElementsByClassName('redFlag')) {
		item.onclick = function(e){
			var tooltip = document.getElementById('redFlagToolTip');
			var x = e.clientX,
				y = e.clientY;
				tooltip.style.top = (y+20) + 'px';
				tooltip.style.left = (x+20) + 'px';
				tooltip.style.display = 'block';
				tooltip.style.position = 'fixed';
		}
	}
	
	// Penalty Flag Tool Tip
	for (const item of document.getElementsByClassName('penaltyFlag')) {
		item.onclick = function(e){
			var tooltip = document.getElementById('penaltyFlagToolTip');
			var x = e.clientX,
				y = e.clientY;
				tooltip.style.top = (y+20) + 'px';
				tooltip.style.left = (x+20) + 'px';
				tooltip.style.display = 'block';
				tooltip.style.position = 'fixed';
		}
	}
	
	// Show Award Tool Tip
	for (const item of document.getElementsByClassName('showAward')) {
		item.onclick = function(e){
			var tooltip = document.getElementById('showAwardToolTip');
			var x = e.clientX,
				y = e.clientY;
				tooltip.style.top = (y+20) + 'px';
				tooltip.style.left = (x+20) + 'px';
				tooltip.style.display = 'block';
				tooltip.style.position = 'fixed';
		}
	}	

	var bottomBorder = document.getElementById('bottomBorder');
	setTimeout(function(){bottomBorder.style.width = '100%'},800);
}