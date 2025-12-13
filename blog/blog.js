
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

function closeToolTip(caller) {
	caller.style.display = 'none';
}

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


/* ------------------------------------------------------------------------------------------------------------
   -------------------------------------------------- ONLOAD --------------------------------------------------
   ------------------------------------------------------------------------------------------------------------ */

window.onload = function() {

	var bottomBorder = document.getElementById('bottomBorder');
	setTimeout(function(){bottomBorder.style.width = '100%'},800);
}