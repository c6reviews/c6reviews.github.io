
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

/* -------------------------------------------------- TAG FILTER -------------------------------------------------- */

function toggleFilterBox(id) {
	var box = document.getElementById(id);

	if (box.style.display != "block") {
		box.style.display = "block";
	} else {
		box.style.display = "none";
	}
}

function setFilters(type,closeBox = true) {
	
	const grid = document.getElementById('blogGrid');
	const posts = Array.from(grid.children);
	
	if (type == "tags") { // Check if all Tag boxes were unchecked, then recheck "all" and change the filter type
		var checkedTagsFilters = document.querySelectorAll(".tagsfiltercheckbox:checked");
		if (checkedTagsFilters.length == 0) {
			document.getElementById('tagsfilterall').checked = true;
			type = 'tagsall';
			closeBox = false;
		}
	}
	
	if (type == "tagsall") { // "All Tags" was checked or unchecked
		var tagsallfilter = document.getElementById("tagsfilterall");
		var tagsfilters = document.getElementsByClassName("tagsfiltercheckbox");
		
		if (!tagsallfilter.checked) { // "All Tags" was unchecked: re-check it
			tagsallfilter.checked = true;
			return;
		}
		else // "All Tags" was checked
		{
			// Uncheck all other Tags selections
			Array.from(tagsfilters).forEach((filter) => {
				filter.checked = false;
			})
			
			// Clear the filter textbox
			document.getElementById("tagFilterTextbox").value = "";
			
			if (closeBox) {toggleFilterBox('tagFilter');}
			
			posts.forEach(post => {
				post.style.display = "";
			});
		}
	}	
	else // A selection was made that WASN'T the "all" option
	{
		var tagsallfilter = document.getElementById("tagsfilterall");
		
		if (type=="tags") { // A tags filter was checked or unchecked
			tagsallfilter.checked = false;
		}
		
			posts.forEach(post => {
				
				var checkedTagsFilters = document.querySelectorAll(".tagsfiltercheckbox:checked");
				let activeTagsFilters = [];
				
				Array.from(checkedTagsFilters).forEach((filter) => {
					const filterItem = filter.value.split('|');
					filterItem.forEach((item) => {
						activeTagsFilters.push(item);
					});
				});

				document.getElementById("tagFilterTextbox").value = activeTagsFilters;

				posts.forEach(post => {

					post.style.display="none";
					
					Array.from(activeTagsFilters).forEach((tagsfilter) => {
						
						if (!!post.dataset.tags && post.dataset.tags.includes(tagsfilter)){
							post.style.display="";			
						}
					});
				});	
			});
	
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

	var bottomBorder = document.getElementById('bottomBorder');
	setTimeout(function(){bottomBorder.style.width = '100%'},800);
}