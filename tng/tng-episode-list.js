
/* ----------------------------------------------------- GLOBAL VARIABLES ----------------------------------------------------- */

var G_sortcol = 0;
var G_sortdir = "asc";
var G_filterset = document.getElementsByClassName("filterableRow");

/* ----------------------------------------------------- CREATE THE TABLE ----------------------------------------------------- */

function csvToNestedArray(csvString) {
  // Split into rows
  const rows = csvString.split('\n');
  // Split each row into an array. This regex splits using a comma delimiter, but ignores commas that are within quotation marks.
  const nestedArray = rows.map(row => row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)); 
  return nestedArray;
}

function createTable(array) {
    
	// ----------------- ADD CONTENT -----------------
	
	var columns = 5;
	var content = "";
	
	array.slice(1).forEach(function(row) {
        content += '<tr class="filterableRow">';
		
		for (var i = 0; i < columns; i++) {
			
			//Set cell contents
			var cell = row[i];
			
			//Set cell class
			switch (i) {
				case 0:
					cellClass = "col_episodeNumber";
					break;
				case 1:
					cellClass = "col_episodeTitle";
					if (cell.startsWith('"') && cell.endsWith('"')){
						cell = cell.substring(1, cell.length-1);
					}
					break;
				case 2:
					cellClass = "col_episodeTags";
					// Replace flags
					cell = cell.replace("R⚑",'<span style="color:red" title="Red Flag">⚑&#xFE0E;</span>');
					cell = cell.replace("P⚑",'<span style="color:yellow" title="Penalty Flag">⚑&#xFE0E;</span>');
					
					// Replace pips
					cell = cell.replace("A🟡",'<img alt="admiral insignia" title="Full Admiral Pips" src="images/admiral.png" width="29" >');
					cell = cell.replace("V🟡",'<img alt="vice admiral insignia" title="Vice Admiral Pips" src="images/vice_admiral.png" width="26" >');
					
					// Add titles to remaining tags
					cell = cell.replace("♥",'<span title="Personal Favorite">♥&#xFE0F;</span>');
					cell = cell.replace("🕖",'<span title="Time Travel Episode">🕖</span>');
					cell = cell.replace("🤖",'<span title="Borg Episode">🤖</span>');
					cell = cell.replace("Q",'<span title="Q Episode" class="Q">Q</span>');
					cell = cell.replace("31",'<span title="Section 31" style="border:1px solid #C0C0C0;border-radius:10px;">31</span>');
					cell = cell.replace("⚖",'<span title="Courtroom Episode">⚖&#xFE0F;</span>');
					cell = cell.replace("♊",'<span title="Mirror Universe episode">♊</span>');
					cell = cell.replace("🌎",'<span title="Episode takes place on Earth">🌎</span>');
					cell = cell.replace("🟨",'<span title="Holodeck Episode">🟨</span>');
					cell = cell.replace("👬",'<span title="Parallel / Alternate Reality">👬</span>');
					cell = cell.replace("🎭",'<span title="Lighthearted/Comedy">🎭</span>');
					cell = cell.replace("😱",'<span title="Scary">😱</span>');
					cell = cell.replace("😢",'<span title="Tear-jerker">😢</span>');
					cell = cell.replace("🥇",'<span title="1st place episode">🥇</span>');
					cell = cell.replace("🥈",'<span title="2nd place episode">🥈</span>');
					cell = cell.replace("🥉",'<span title="3rd place episode">🥉</span>');
					cell = cell.replace("🏅",'<span title="Special Award">🏅</span>');
					cell = cell.replace("🎖",'<span title="General Award">🎖&#xFE0F;</span>');
					cell = cell.replace("💩",'<span title="Worst episode of the series">💩</span>');
					cell = cell.replace("👺",'<span title="&quot;Fear&quot;">👺</span>');
					cell = cell.replace("🌌",'<span title="Iconic episode">🌌</span>');
					break;
				case 3:
					cellClass = "col_episodeRecommendation";
					// Stylize certain entries
					cell = cell.replace("✔",'✔&#xFE0E;');
					cell = cell.replace("♦",'♦&#xFE0E;');
					cell = cell.replace("🕶 ‼ Must Watch/Bare Minimum",'<span class="mustWatch">🕶&#xFE0E;</span> <span class="bareMinimum">‼&#xFE0E;</span> Must Watch/Bare Minimum');
					cell = cell.replace("🕶 Must Watch",'<span class="mustWatch">🕶&#xFE0E;</span> Must Watch');
					cell = cell.replace("✖ Notably Bad",'<span class="notablyBad">✖&#xFE0E;</span> Notably Bad');
					break;
				case 4:
					cellClass = "col_episodeRating";
					break;
			}
			
            content += '<td class="' + cellClass + '">' + cell + "</td>" ;
		}
			
        content += "</tr>";
    });
    document.getElementById("episodeTable").innerHTML += content;
	
	// ----------------- ADD LINKS -----------------
	
	var epNumCells = Array.from(document.getElementsByClassName("col_episodeNumber"));
	
	epNumCells.forEach((cell) => {
		var cellContents = cell.innerHTML;
		var season = cellContents.substring(0,1);
		var episode = cellContents.substring(2,4);
		var link = "tng-s" + season + ".html#e" + episode;
		
		var titleCell = cell.parentElement.querySelectorAll("td")[1];
		cellContents = titleCell.innerHTML;
		titleCell.innerHTML = '<a href="' + link + '">' + cellContents + '</a>';
		
	});
	
}

/* ------------------------------------------------------------ TABLE SORT ------------------------------------------------------------ */

async function sortTable(n,event) {

	if (event.target.className.startsWith("radio")) {
		return;
	}
	
	sortArrowOff = document.getElementById(G_sortcol + G_sortdir);
	sortArrowOff.style.color = "#555";
	
	var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
	var sorttype = document.querySelector('input[name="sorttype"]:checked').value;
	table = document.getElementById("episodeTable");
	switching = true;
	// Set the sorting direction to ascending:
	dir = "asc";
	// Clear the title search
	document.getElementById("episodeSearchBox").value = "";
	await filterTitle();
	
	/* Make a loop that will continue until
	no switching has been done: */
	while (switching) {
		// Start by saying: no switching is done:
		switching = false;
		rows = table.rows;
		/* Loop through all table rows (except the
		first two, which contains table headers): */
		for (i = 2; i < (rows.length - 1); i++) {
			// Start by saying there should be no switching:
			shouldSwitch = false;
			/* Get the two elements you want to compare,
			one from current row and one from the next: */
			x = rows[i].getElementsByTagName("TD")[n];
			y = rows[i + 1].getElementsByTagName("TD")[n];
			/* Check if the two rows should switch place,
			based on the direction, asc or desc: */
			
			var isNumber = x.innerHTML.match(/[0-9]\.[0-9]/);
			if (!!isNumber){
				if (dir == "asc") {
					if (Number(x.innerHTML) > Number(y.innerHTML)) {
						// If so, mark as a switch and break the loop:
						shouldSwitch = true;
						break;
					}
				} else if (dir == "desc") {
					if (Number(x.innerHTML) < Number(y.innerHTML)) {
						// If so, mark as a switch and break the loop:
						shouldSwitch = true;
						break;
					}
				}
			  
			} else {
				
				// Ignore link
				if (x.innerHTML.startsWith("<a")) {
					x = x.querySelectorAll("a")[0];
					y = y.querySelectorAll("a")[0];
				}
				
				// If sorting by Title
				if (n == 1)
				{
					
					if (sorttype == "title"){
						//	x = x.replace(/^('|a\s|an\s|the\s)/, '')
						//	y = y.replace(/^('|a\s|an\s|the\s)/, '')
						
						// Move "the" "a" "an" to the end	
						var words = x.innerHTML.trim().split(/\s+/);
						//if (words.length <= 1) {break}
						
						if (words[0].toLowerCase() === "the" || words[0].toLowerCase() === "a" || words[0].toLowerCase() === "an")
						{
							const wordToMove = words.shift();
							x.innerHTML = words.join(" ") + ", " + wordToMove;
						}
						
						var words = y.innerHTML.trim().split(/\s+/);
						//if (words.length <= 1) {break}
						
						if (words[0].toLowerCase() === "the" || words[0].toLowerCase() === "a" || words[0].toLowerCase() === "an")
						{
							const wordToMove = words.shift();
							y.innerHTML = words.join(" ") + ", " + wordToMove;
						}
					}
					
					if (sorttype == "strictaz"){
						//	x = x.replace(/^('|a\s|an\s|the\s)/, '')
						//	y = y.replace(/^('|a\s|an\s|the\s)/, '')
						
						// Move "the" "a" "an" to the beginning
						var words = x.innerHTML.trim().split(/\s+/);
						//if (words.length <= 1) {break}
						
						
						if (words[words.length-1].toLowerCase() === "the" || words[words.length-1].toLowerCase() === "a" || words[words.length-1].toLowerCase() === "an")
						{
							const wordToMove = words.pop();
							x.innerHTML = (wordToMove + " " + words.join(" ")).slice(0, -1);
						}
						
						var words = y.innerHTML.trim().split(/\s+/);
						//if (words.length <= 1) {break}
						
						if (words[words.length-1].toLowerCase() === "the" || words[words.length-1].toLowerCase() === "a" || words[words.length-1].toLowerCase() === "an")
						{
							const wordToMove = words.pop();
							y.innerHTML = (wordToMove + " " + words.join(" ")).slice(0, -1);
						}
					}
					
				}
				
				// Ignore leading '
				x = x.innerHTML.toLowerCase().replace(/^(')/, '');
				y = y.innerHTML.toLowerCase().replace(/^(')/, '');
				if (dir == "asc") {
					if (x > y) {
						// If so, mark as a switch and break the loop:
						shouldSwitch = true;
						break;
					}
				} else if (dir == "desc") {
					if (x < y) {
						// If so, mark as a switch and break the loop:
						shouldSwitch = true;
						break;
					}
				}
			  
			}
		}
		if (shouldSwitch) {
			/* If a switch has been marked, make the switch
			and mark that a switch has been done: */
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			// Each time a switch is done, increase this count by 1:
			switchcount ++;
		} else {
			/* If no switching has been done AND the direction is "asc",
			set the direction to "desc" and run the while loop again. */
			if (switchcount == 0 && dir == "asc") {
				dir = "desc";
				switching = true;
			}
		}
	}
	
	G_sortcol = n;
	G_sortdir = dir;
	
	removeSeasonSeparator();
	
	if (G_sortcol == 0) {
		addSeasonSeparator();
	}
	
	sortArrowOn = document.getElementById(G_sortcol + G_sortdir);
	sortArrowOn.style.color = "white";

}

/* ------------------------------------------------------------ TABLE FILTERS ------------------------------------------------------------ */

function updateFilterCount() {
	const filterrows = Array.from(document.getElementsByClassName("filterableRow"));
	var displayedRows = 0;

	filterrows.forEach((filterrow) => {
		if (filterrow.style.display != "none") {
			displayedRows += 1;
			if (filterrow.querySelector(".col_episodeNumber").innerHTML.match("&")){
				displayedRows += 1;
			}
		}
	});
	
	document.getElementById("filterTotal").innerHTML = displayedRows;
	if (displayedRows != 176) {
		document.getElementById("filterTotal").style.color = "yellow";
		document.getElementById("filterTotal").style.fontWeight = "bold";
	} else {
		document.getElementById("filterTotal").style.color = "";
		document.getElementById("filterTotal").style.fontWeight = "";
	}
}

function filterTitle() {
	const filterrows = G_filterset;
	
	//Clear all yellow highlights
	for (i = 0; i < filterrows.length; i++) {
		td = filterrows[i].getElementsByClassName("col_episodeTitle")[0];
		if (td) {
			td.innerHTML = td.innerHTML.replaceAll('<span style="color:yellow">',"")
			td.innerHTML = td.innerHTML.replaceAll('</span>',"")
		}
	}
	
	var input, filter, table, td, i, txtValue;
	input = document.getElementById("episodeSearchBox");
	filter = input.value.toLowerCase();
	table = document.getElementById("episodeTable");
	
	for (i = 0; i < filterrows.length; i++) {
		td = filterrows[i].getElementsByClassName("col_episodeTitle")[0];
		if (td) {
			txtValue = td.textContent || td.innerText;
			if (txtValue.toLowerCase().indexOf(filter) > -1) {
				filterrows[i].style.display = "";
				const regEx = new RegExp(filter, 'gi');
				if (filter != "") {
					var link = td.querySelector('a');
					var linktext = link.innerText;
					link.innerHTML = linktext.replace(regEx, '<span style="color:yellow">$&</span>');
				}
			} else {
				filterrows[i].style.display = "none";
			}
		}
	}

	updateFilterCount();
	removeSeasonSeparator();
	if (G_sortcol == 0) {
		addSeasonSeparator();
	}
	
	return;
}

function toggleFilterBox(id) {
	var box = document.getElementById(id);

	if (box.style.display != "block") {
		box.style.display = "block";
	} else {
		box.style.display = "none";
	}
}

window.addEventListener('mouseup',function(event){
	var filterBox = document.getElementById("tagFilter");
	if(event.target != filterBox && event.target.parentNode != filterBox && event.target.parentNode.parentNode != filterBox && event.target.parentNode != filterBox.parentNode){
        filterBox.style.display = "none";
    }
});

window.addEventListener('mouseup',function(event){
	var filterBox = document.getElementById("recommendationFilter");
	if(event.target != filterBox && event.target.parentNode != filterBox && event.target.parentNode.parentNode != filterBox && event.target.parentNode != filterBox.parentNode){
        filterBox.style.display = "none";
    }
});

function setRnFilters() {
	const filterrows = Array.from(document.getElementsByClassName("filterableRow"));
	var checkedRnFilters = document.querySelectorAll(".rnfiltercheckbox:checked");
	let activeRnFilters = [];
	var activeIcons = "";
	
	Array.from(checkedRnFilters).forEach((filter) => {
		activeRnFilters.push(filter.value);
		var rnIcon = filter.parentElement.querySelector("span.icon").innerHTML
		activeIcons += rnIcon + "   ";
	})
	
	document.getElementById("recommendationFilterTextbox").value = activeIcons;

	filterrows.forEach((filterrow) => {
		
		filterrow.style.display="none";
		var checkCell = filterrow.getElementsByTagName("td")[3];
	
		Array.from(activeRnFilters).forEach((rnfilter) => {
			if ((checkCell.innerHTML).includes(rnfilter)){
				filterrow.style.display="";
			}
		})
		
	})
	
	updateFilterCount();
	removeSeasonSeparator();
	if (G_sortcol == 0) {
		addSeasonSeparator();
	}
	G_filterset = filterrows.filter(function(ele) {
		return window.getComputedStyle(ele).display !== 'none';
	});
	filterTitle();
}

function setTagsFilters() {
	const filterrows = Array.from(document.getElementsByClassName("filterableRow"));
	var checkedTagsFilters = document.querySelectorAll(".tagsfiltercheckbox:checked");
	let activeTagsFilters = [];
	var activeIcons = "";
	
	Array.from(checkedTagsFilters).forEach((filter) => {
		const filterItem = filter.value.split('|');
		filterItem.forEach((item) => {
			activeTagsFilters.push(item);
		});
		activeIcons += filter.parentElement.querySelector("span.icon").innerHTML;
	});

	document.getElementById("tagFilterTextbox").value = activeIcons;

	filterrows.forEach((filterrow) => {

		filterrow.style.display="none";
		var checkCell = filterrow.getElementsByTagName("td")[2];
		
		Array.from(activeTagsFilters).forEach((tagsfilter) => {
			
			if ((checkCell.innerHTML).includes(tagsfilter)){
				filterrow.style.display="";
			}
			
			/*Array.from(checkCell.innerHTML).forEach((tag) => {
				Array.from(tagsfilter).forEach((filter) => {
					if (tag == filter){
						filterrow.style.display="";
					}
				});
			});*/
			
		});
		
		
	});
	
	updateFilterCount();
	removeSeasonSeparator();
	if (G_sortcol == 0) {
		addSeasonSeparator();
	}
	G_filterset = filterrows.filter(function(ele) {
		return window.getComputedStyle(ele).display !== 'none';
	});
	filterTitle();
}

function setFilters(type) {
	const filterrows = Array.from(document.getElementsByClassName("filterableRow"));

	if (type.endsWith("all")) { // "All Tags" or "All Recommendations" was checked or unchecked
		
		if (type == "rnall") { // "All Recommendations" was checked or unchecked
			var rnallfilter = document.getElementById("rnfilterall");
			var rnfilters = document.getElementsByClassName("rnfiltercheckbox");
			
			if (!rnallfilter.checked) { // "All Recommendations" was unchecked: re-check it
				rnallfilter.checked = true;
				return;
			}
			else // "All Recommendations" was checked
			{
				// Uncheck all other Recommendation selections
				Array.from(rnfilters).forEach((filter) => {
					filter.checked = false;
				})
				
				// Clear the filter textbox
				document.getElementById("recommendationFilterTextbox").value = "";
				
				toggleFilterBox('recommendationFilter');
				
				if (tagsfilterall.checked) { // If "All Tags" is also selected, show all rows
					filterrows.forEach((filterrow) => {
						filterrow.style.display = "";
					})
					updateFilterCount();
					removeSeasonSeparator();
					if (G_sortcol == 0) {
						addSeasonSeparator();
					}
					G_filterset = filterrows.filter(function(ele) {
						return window.getComputedStyle(ele).display !== 'none';
					});
					filterTitle();
					return;
				}
				else // Else if "All Tags" is not selected, filter by Tags
				{
					setTagsFilters();
					return;
				}
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
				
				toggleFilterBox('tagFilter');
				
				if (rnfilterall.checked) { // If "All Recommendations" is also selected, show all rows
					filterrows.forEach((filterrow) => {
						filterrow.style.display = "";
					})
					updateFilterCount();
					removeSeasonSeparator();
					if (G_sortcol == 0) {
						addSeasonSeparator();
					}
					G_filterset = filterrows.filter(function(ele) {
						return window.getComputedStyle(ele).display !== 'none';
					});
					filterTitle();
					return;
				}
				else // Else if "All Recommendations" is not selected, filter by Tags
				{
					setRnFilters();
					return;
				}
			}
		}
	}
	else // A selection was made that WASN'T of of the "All" options
	{
		var rnallfilter = document.getElementById("rnfilterall");
		var tagsallfilter = document.getElementById("tagsfilterall");
		

		if (type=="rn") { // A recommendation filter was checked or unchecked
			rnallfilter.checked = false;
			
			if (tagsallfilter.checked) { // All Tags is checked: just filter by Recommendation
				setRnFilters();
				return;
			}
		}
		if (type=="tags") { // A tags filter was checked or unchecked
			tagsallfilter.checked = false;
			
			if (rnallfilter.checked) { // All Recommendations is checked: just filter by Tags
				setTagsFilters();
				return;
			}
		}
		if (type=="andor") { // The and/or selector was changed
			if (rnallfilter.checked && tagsallfilter.checked) { // Both Tags and Recommendations are set to "All": Show all rows
				filterrows.forEach((filterrow) => {
					filterrow.style.display = "";
				})
				updateFilterCount();
				removeSeasonSeparator();
				if (G_sortcol == 0) {
					addSeasonSeparator();
				}
				G_filterset = filterrows.filter(function(ele) {
						return window.getComputedStyle(ele).display !== 'none';
					});		
				filterTitle();
				return;
			}
			if (rnallfilter.checked && !tagsallfilter.checked) { // Recommendations is set to "All": filter by Tags
				setTagsFilters();
				return;
			}
			if (!rnallfilter.checked && tagsallfilter.checked) { // Tags is set to "All": filter by Recommendation
				setRnFilters();
				return;
			}
		}
		
	// ********** A SELECTION WAS MADE THAT REQUIRES FILTERING BY BOTH FILTERS **********
		
		var checkedRnFilters = document.querySelectorAll(".rnfiltercheckbox:checked");
		let activeRnFilters = [];
		var activeRnIcons = "";
		var checkedTagsFilters = document.querySelectorAll(".tagsfiltercheckbox:checked");
		let activeTagsFilters = [];
		var activeTagsIcons = "";
		var andorradio = document.querySelector(".andorradio:checked");
		var andor = andorradio.value;
	
		Array.from(checkedRnFilters).forEach((filter) => {
			activeRnFilters.push(filter.value);
			activeRnIcons += filter.parentElement.querySelector("span.icon").innerHTML + "   ";
		});

		document.getElementById("recommendationFilterTextbox").value = activeRnIcons;
		
		
		Array.from(checkedTagsFilters).forEach((filter) => {
			activeTagsFilters.push(filter.value);
			activeTagsIcons += filter.parentElement.querySelector("span.icon").innerHTML;
		});
		
		document.getElementById("tagFilterTextbox").value = activeTagsIcons;
		
		filterrows.forEach((filterrow) => {
			
			var partmatch = false;
			
			filterrow.style.display="none";
			
			
			Array.from(activeRnFilters).forEach((rnfilter) => {
				if ((filterrow.innerHTML).includes(rnfilter)){
					if (andor == "and"){
						partmatch = true;
					} else {
						filterrow.style.display="";
					}
				}
			})
			
			if (partmatch || andor == "or"){
				var checkCell = filterrow.getElementsByTagName("td")[2];
				Array.from(activeTagsFilters).forEach((tagsfilter) => {
					if ((checkCell.innerHTML).includes(tagsfilter)){
						filterrow.style.display="";
					}
				})
			}
			
		
		})
	}
	
	updateFilterCount();
	removeSeasonSeparator();
	if (G_sortcol == 0) {
		addSeasonSeparator();
	}
	G_filterset = filterrows.filter(function(ele) {
		return window.getComputedStyle(ele).display !== 'none';
	});
	filterTitle();
}


function resetFilters() {
	
	var filterallcheckboxes = document.querySelectorAll("#rnfilterall,#tagsfilterall");
	var filtercheckboxes = document.querySelectorAll(".rnfiltercheckbox,.tagsfiltercheckbox");
	
	document.getElementById("recommendationFilterTextbox").value = "";
	document.getElementById("tagFilterTextbox").value = "";
	document.getElementById("episodeSearchBox").value = "";
	
	Array.from(filterallcheckboxes).forEach((checkbox) => {
		checkbox.checked = true;
	})
	
	Array.from(filtercheckboxes).forEach((checkbox) => {
		checkbox.checked = false;
	})
	
	var andordefault = document.getElementById("andordefault");
	andordefault.checked = true;
	
	setFilters("andor");
	updateFilterCount();
	removeSeasonSeparator();
	if (G_sortcol == 0) {
		addSeasonSeparator();
	}
}
/* ------------------------------------------------------------ (End TABLE FILTERS) ------------------------------------------------------------ */


/* ------------------------------------------------------------ SEASON SEPARATOR ------------------------------------------------------------ */

function addSeasonSeparator() {
	table = document.getElementById("episodeTable");
	rows = table.rows;
	
	/* Loop through all table rows (except the
		first and second, which contains filters and table headers): */
	for (i = 2; i < (rows.length - 1); i++) {
		
		rowstyle = getComputedStyle(rows[i]);
		if (rowstyle.display == "none") {continue;};	
		x = rows[i].getElementsByTagName("TD")[0];
		
		for (j = i + 1; j < (rows.length - 1); j++) {
			
			y = rows[j].getElementsByTagName("TD")[0];
			rowstyle = getComputedStyle(rows[j]);
			if (rowstyle.display != "none") {break;};
			
		}
		
		if (Array.from(x.innerHTML)[0] != Array.from(y.innerHTML)[0]) {
			var rcells = y.parentElement.querySelectorAll("td");
			Array.from(rcells).forEach((rcell) => {
				rcell.style.borderTop="thick double #C0C0C0";
			});
		}	
	}
}

function removeSeasonSeparator() {
	var allCells = document.getElementById("episodeTable").querySelectorAll("td");
	Array.from(allCells).forEach((cell) => {
		cell.style.borderTop="";
	});
}

/* ------------------------------------------------------------------------------------------------------------
   -------------------------------------------------- ONLOAD --------------------------------------------------
   ------------------------------------------------------------------------------------------------------------ */

window.onload = function() {

var csvString = `Episode,Title,Tags,Recommendation,Rating
1x01/02 [FL],Encounter at Farpoint,Q,🕶 ‼ Must Watch/Bare Minimum,5.5
1x03,The Naked Now,🎭,-,3.6
1x04,Code of Honor,R⚑,✖ Notably Bad,1.3
1x05,The Last Outpost,,-,2.0
1x06,Where No One Has Gone Before,,✔ Recommended,5.5
1x07,Lonely Among Us,,-,3.3
1x08,Justice,,-,2.3
1x09,The Battle,,✔ Recommended,4.1
1x10,Hide and Q,Q,✔ Recommended,4.8
1x11,Haven,,-,3.2
1x12,The Big Goodbye,🟨,-,4.6
1x13,Datalore,,🕶 Must Watch,5.1
1x14,Angel One,,-,2.3
1x15,11001001,,✔ Recommended,6.3
1x16,Too Short a Season,,-,3.0
1x17,When the Bough Breaks,,-,3.5
1x18,Home Soil,,-,4.7
1x19,Coming of Age,,-,3.8
1x20,Heart of Glory,,✔ Recommended,5.5
1x21,The Arsenal of Freedom,,-,5.3
1x22,Symbiosis,,-,3.7
1x23,Skin of Evil,,✔ Recommended,3.5
1x24,We'll Always Have Paris,🕖,-,4.5
1x25,Conspiracy,🌎,✔ Recommended,5.9
1x26,The Neutral Zone,,-,3.0
2x01,The Child,,-,3.5
2x02,Where Silence Has Lease,,-,5.7
2x03,"Elementary, Dear Data",🟨,✔ Recommended,6.4
2x04,The Outrageous Okona,,-,2.4
2x05,Loud as a Whisper,,-,4.9
2x06,The Schizoid Man,,-,3.7
2x07,Unnatural Selection,,-,4.5
2x08,A Matter of Honor,,✔ Recommended,6.3
2x09,The Measure of a Man,🌌⚖️V🟡,🕶 Must Watch,8.6
2x10,The Dauphin,,-,3.0
2x11,Contagion,,✔ Recommended,7.0
2x12,The Royale,,✖ Notably Bad,2.5
2x13,Time Squared,🕖,-,5.9
2x14,The Icarus Factor,,-,3.0
2x15,Pen Pals,,-,5.4
2x16,Q Who,Q🤖A🟡,🕶 ‼ Must Watch/Bare Minimum,8.4
2x17,Samaritan Snare,,-,2.9
2x18,Up the Long Ladder,R⚑,✖ Notably Bad,1.5
2x19,Manhunt,,-,3.3
2x20,The Emissary,,✔ Recommended,5.7
2x21,Peak Performance,,-,5.9
2x22,Shades of Gray,,✖ Notably Bad,0.4
3x01,Evolution,,-,4.5
3x02,The Ensigns of Command,♥️,-,5.5
3x03,The Survivors,,-,4.2
3x04,Who Watches the Watchers,♥️V🟡,✔+ Highly Recommended,8.0
3x05,The Bonding,,-,3.6
3x06,Booby Trap,,✔ Recommended,6.9
3x07,The Enemy,,✔ Recommended,6.6
3x08,The Price,,-,3.2
3x09,The Vengeance Factor,,-,4.6
3x10,The Defector,,✔ Recommended,7.7
3x11,The Hunted,,-,5.7
3x12,The High Ground,,-,4.8
3x13,Deja Q,Q,✔ Recommended,6.6
3x14,A Matter of Perspective,⚖️♥️,-,7.1
3x15,Yesterday's Enterprise,🌌👬🥇A🟡,🕶 ‼ Must Watch/Bare Minimum,9.7
3x16,The Offspring,,✔ Recommended,6.9
3x17,Sins of the Father,,🕶 Must Watch,7.8
3x18,Allegiance,,-,4.8
3x19,Captain's Holiday,,♦ Optional,4.7
3x20,Tin Man,,-,4.0
3x21,Hollow Pursuits,,✔ Recommended,5.0
3x22,The Most Toys,,-,6.3
3x23,Sarek,V🟡,✔+ Highly Recommended,8.7
3x24,Ménage à Troi,,-,3.4
3x25,Transfigurations,,-,4.8
3x26,The Best of Both Worlds (Part I),🌌🤖🥈A🟡,🕶 ‼ Must Watch/Bare Minimum,9.9
4x01,"The Best of Both Worlds, Part II",🌌🤖🥈A🟡,🕶 ‼ Must Watch/Bare Minimum,9.9
4x02,Family,🌎,✔+ Highly Recommended,6.8
4x03,Brothers,,🕶 Must Watch,6.8
4x04,Suddenly Human,,-,4.8
4x05,Remember Me,👬♥️,✔ Recommended,7.3
4x06,Legacy,,-,5.2
4x07,Reunion,,🕶 Must Watch,7.7
4x08,Future Imperfect,👬♥️,-,7.5
4x09,Final Mission,,-,5.1
4x10,The Loss,,-,3.2
4x11,Data's Day,🎭,✔ Recommended,6.7
4x12,The Wounded,,✔ Recommended,6.7
4x13,Devil's Due,(⚖),-,5.3
4x14,Clues,,✔ Recommended,7.6
4x15,First Contact,,✔ Recommended,7.8
4x16,Galaxy's Child,,♦ Optional,4.4
4x17,Night Terrors,😱,-,4.7
4x18,Identity Crisis,,-,5.5
4x19,The Nth Degree,,-,6.2
4x20,Qpid,Q🎭,✔ Recommended,4.5
4x21,The Drumhead,⚖️🎖♥️V🟡,✔+ Highly Recommended,8.2
4x22,Half a Life,,-,5.4
4x23,The Host,,-,3.1
4x24,The Mind's Eye,,-,5.9
4x25,In Theory,,-,4.2
4x26,Redemption,,🕶 Must Watch,8.1
5x01,Redemption II,,🕶 Must Watch,8.1
5x02,Darmok,🌌V🟡,✔+ Highly Recommended,8.0
5x03,Ensign Ro,,🕶 Must Watch,6.7
5x04,Silicon Avatar,,-,4.2
5x05,Disaster,♥️,✔ Recommended,7.3
5x06,The Game,,-,5.8
5x07,Unification I,A🟡,🕶 ‼ Must Watch/Bare Minimum,8.4
5x08,Unification II,A🟡,🕶 ‼ Must Watch/Bare Minimum,8.4
5x09,A Matter of Time,,-,4.4
5x10,New Ground,,-,3.7
5x11,Hero Worship,,-,3.5
5x12,Violations,,-,2.3
5x13,The Masterpiece Society,,-,4.5
5x14,Conundrum,,✔ Recommended,7.6
5x15,Power Play,,-,6.3
5x16,Ethics,,-,5.0
5x17,The Outcast,,-,5.0
5x18,Cause and Effect,🕖♥️,✔+ Highly Recommended,8.7
5x19,The First Duty,🌎,✔ Recommended,7.7
5x20,Cost of Living,,-,3.8
5x21,The Perfect Mate,,-,4.8
5x22,Imaginary Friend,,-,3.0
5x23,I Borg,🤖,🕶 ‼ Must Watch/Bare Minimum,7.9
5x24,The Next Phase,♥️,-,7.5
5x25,The Inner Light,🌌😢♥️A🟡,🕶 Must Watch,9.8
5x26,Time's Arrow (Part I),🕖🌎♥️,🕶 Must Watch,8.0
6x01,"Time's Arrow, Part II",🕖🌎♥️,🕶 Must Watch,8.0
6x02,Realm of Fear,,-,4.2
6x03,Man of the People,,-,1.7
6x04,Relics,,✔ Recommended,8.1
6x05,Schisms,,-,7.0
6x06,True Q,Q,✔ Recommended,5.4
6x07,Rascals,,-,4.9
6x08,A Fistful of Datas,🎭🟨,-,5.2
6x09,The Quality of Life,V🟡,✔ Recommended,5.6
6x10,"Chain of Command, Part I",🌌🥉A🟡,🕶 Must Watch,9.3
6x11,"Chain of Command, Part II",🌌🥉A🟡,🕶 Must Watch,9.3
6x12,Ship in a Bottle,🟨,✔ Recommended,7.9
6x13,Aquiel,,-,4.1
6x14,Face of the Enemy,,✔ Recommended,7.5
6x15,Tapestry,🕖QV🟡,🕶 Must Watch,8.5
6x16,"Birthright, Part I",,✔ Recommended,7.0
6x17,"Birthright, Part II",,✔ Recommended,7.0
6x18,Starship Mine,♥️,-,7.7
6x19,Lessons,,✔ Recommended,6.2
6x20,The Chase,,✔ Recommended,7.8
6x21,Frame of Mind,👬,-,8.6
6x22,Suspicions,,✔ Recommended,7.0
6x23,Rightful Heir,,-,4.5
6x24,Second Chances,,✔ Recommended,6.1
6x25,Timescape,🕖♥️,✔ Recommended,9.0
6x26,Descent (Part I),🤖,🕶 ‼ Must Watch/Bare Minimum,8.2
7x01,"Descent, Part II",🤖,🕶 ‼ Must Watch/Bare Minimum,8.2
7x02,Liaisons,,-,3.8
7x03,Interface,,-,3.1
7x04,"Gambit, Part I",,✔ Recommended,6.7
7x05,"Gambit, Part II",,✔ Recommended,6.7
7x06,Phantasms,,-,5.0
7x07,Dark Page,😢,-,5.1
7x08,Attached,,✔ Recommended,5.3
7x09,Force of Nature,,-,4.4
7x10,Inheritance,,✔ Recommended,6.7
7x11,Parallels,👬♥️,✔+ Highly Recommended,8.7
7x12,The Pegasus,,✔ Recommended,8.1
7x13,Homeward,,-,3.4
7x14,Sub Rosa,💩,✖ Notably Bad,1.2
7x15,Lower Decks,,✔+ Highly Recommended,7.8
7x16,Thine Own Self,,-,6.2
7x17,Masks,,-,3.4
7x18,Eye of the Beholder,,-,5.1
7x19,Genesis,😱,-,5.0
7x20,Journey's End,,♦ Optional,2.7
7x21,Firstborn,,-,5.1
7x22,Bloodlines,,-,3.5
7x23,Emergence,,-,4.6
7x24,Preemptive Strike,,✔ Recommended,6.0
7x25/26 [FL],All Good Things…,🌌🕖Q♥️,🕶 ‼ Must Watch/Bare Minimum,9.7`;

	var array = csvToNestedArray(csvString);
	
	createTable(array);
	
	// Add episode rating colors
	Array.from(document.getElementsByClassName("col_episodeRating")).forEach(rating => {
		
		rating.style.color = 'black';
		
		switch (Array.from(rating.innerHTML)[0]) {
			case "0":
				rating.style.backgroundColor = '#F8393BBF';
				break;
			case "1":
				if (Array.from(rating.innerHTML)[1] == "0") {
					rating.style.backgroundColor = '#03BE4BBF';
				} else {
					rating.style.backgroundColor = '#F95350BF';
				}
				break;
			case "2":
				rating.style.backgroundColor = '#FA6D55BF';
				break;
			case "3":
				rating.style.backgroundColor = '#FC975ABF';
				break;
			case "4":
				rating.style.backgroundColor = '#FDC16FBF';
				break;
			case "5":
				rating.style.backgroundColor = '#FFEB74BF';
				break;
			case "6":
				rating.style.backgroundColor = '#C0E373BF';
				break;
			case "7":
				rating.style.backgroundColor = '#91DA71BF';
				break;
			case "8":
				rating.style.backgroundColor = '#72D06FBF';
				break;
			case "9":
				rating.style.backgroundColor = '#43C75DBF';
				break;
		}
		
	});
	
	sortArrowOn = document.getElementById(G_sortcol + G_sortdir);
	sortArrowOn.style.color = "white";
	
	addSeasonSeparator();
	
	var bottomBorder = document.getElementById('bottomBorder');
	setTimeout(function(){bottomBorder.style.width = '100%'},500);
}