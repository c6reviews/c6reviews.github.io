
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
					cell = cell.replace("♥",'<span title="Personal Favorite">♥</span>');
					cell = cell.replace("🕖",'<span title="Time Travel Episode">🕖</span>');
					cell = cell.replace("🤖",'<span title="Proper Borg Episode">🤖</span>');
					cell = cell.replace('(<span title="Proper Borg Episode">🤖</span>)','<span title="Episode involves the Borg">(🤖)</span>');
					cell = cell.replace("Q",'<span title="Q Episode" class="Q">Q</span>');
					cell = cell.replace("31",'<span title="Section 31" style="border:1px solid #C0C0C0;border-radius:10px;">31</span>');
					cell = cell.replace("⚖",'<span title="Courtroom Episode">⚖&#xFE0F;</span>');
					cell = cell.replace("♊",'<span title="Mirror Universe episode">♊</span>');
					cell = cell.replace("🌎",'<span title="Episode takes place on Earth">🌎</span>');
					cell = cell.replace("🟨",'<span title="Holodeck Episode">🟨</span>');
					cell = cell.replace("👬",'<span title="Parallel / Alternate Reality">👬</span>');
					cell = cell.replace("🎭",'<span title="Lighthearted/Comedy">🎭</span>');
					cell = cell.replace("😱",'<span title="Scary">😱</span>');
					cell = cell.replace("🥇",'<span title="1st place episode">🥇</span>');
					cell = cell.replace("🥈",'<span title="2nd place episode">🥈</span>');
					cell = cell.replace("🥉",'<span title="3rd place episode">🥉</span>');
					cell = cell.replace("🏅",'<span title="Special Award">🏅</span>');
					cell = cell.replace("🎖",'<span title="General Award">🎖&#xFE0F;</span>');
					cell = cell.replace("💩",'<span title="Worst episode of the series">💩</span>');
					break;
				case 3:
					cellClass = "col_episodeRecommendation";
					// Stylize certain entries
					cell = cell.replace("✔",'✔&#xFE0E;');
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
		var link = "pro-s" + season + ".html#e" + episode;
		
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
	if (displayedRows != 39) {
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
1x01/02,Lost and Found,,🕶 ‼ Must Watch/Bare Minimum,5.0
1x03,Starstruck,,✔ Recommended,4.0
1x04,Dream Catcher,,🕶 Must Watch,4.7
1x05,Terror Firma,,🕶 ‼ Must Watch/Bare Minimum,5.9
1x06,Kobayashi,,-,5.9
1x07,First Con-tact,,-,4.1
1x08,Time Amok,🕖♥️🥉,✔ Recommended,7.3
1x09,"A Moral Star, Part 1",,🕶 ‼ Must Watch/Bare Minimum,5.9
1x10,"A Moral Star, Part 2",,🕶 ‼ Must Watch/Bare Minimum,7.3
1x11,Asylum,,🕶 Must Watch,4.1
1x12,Let Sleeping Borg Lie,🤖,-,3.9
1x13,All the World's a Stage,♥️,✔ Recommended,7.2
1x14,Crossroads,,✔ Recommended,5.5
1x15,Masquerade,,-,5.0
1x16,Preludes,,🕶 Must Watch,5.1
1x17,Ghost in the Machine,🟨,-,3.3
1x18,Mindwalk,,✔ Recommended,5.3
1x19,"Supernova, Part 1",,🕶 ‼ Must Watch/Bare Minimum,6.6
1x20,"Supernova, Part 2",,🕶 ‼ Must Watch/Bare Minimum,7.8
2x01,"Into the Breach, Part I",,✔ Recommended,4.3
2x02,"Into the Breach, Part II",,🕶 ‼ Must Watch/Bare Minimum,4.3
2x03,Who Saves the Saviors,,🕶 ‼ Must Watch/Bare Minimum,6.0
2x04,Temporal Mechanics 101,,✔ Recommended,5.3
2x05,Observer's Paradox,,✔ Recommended,4.9
2x06,Imposter Syndrome,,-,5.9
2x07,The Fast and the Curious,,-,2.4
2x08,Is There in Beauty No Truth?,,-,5.1
2x09,"The Devourer of All Things, Part I",♥️🥈,🕶 ‼ Must Watch/Bare Minimum,7.9
2x10,"The Devourer of All Things, Part II",,🕶 ‼ Must Watch/Bare Minimum,6.9
2x11,"Last Flight of the Protostar, Part I",,✔ Recommended,7.4
2x12,"Last Flight of the Protostar, Part II",️,✔ Recommended,7.4
2x13,A Tribble Called Quest,,-,4.5
2x14,Cracked Mirror,♊👬,✔ Recommended,7.1
2x15,"Ascension, Part I",,🕶 Must Watch,6.1
2x16,"Ascension, Part II",,♦ Optional,7.3
2x17,Brink,️,✔ Recommended,5.9
2x18,Touch of Grey,️,🕶 Must Watch,6.1
2x19,"Ouroboros, Part I",,🕶 ‼ Must Watch/Bare Minimum,7.7
2x20,"Ouroboros, Part II",🥇,🕶 ‼ Must Watch/Bare Minimum,9.0`;

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