
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
					cell = cell.replace("👺",'<span title="&quot;Fear&quot;">👺</span>');
					cell = cell.replace("🌌",'<span title="Iconic episode">🌌</span>');
					cell = cell.replace('[<span title="Iconic episode">🌌</span>]','[<span title="Iconically Bad episode">🌌</span>]');
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
		var link = "voy-s" + season + ".html#e" + episode;
		
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
	if (displayedRows != 168) {
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
1x01/02 [FL],Caretaker,,🕶 ‼ Must Watch/Bare Minimum,5.9
1x03,Parallax,🕖,✔ Recommended,4.5
1x04,Time and Again,🕖,-,6.6
1x05,Phage,,🕶 Must Watch,5.7
1x06,The Cloud,,-,4.2
1x07,Eye of the Needle,,✔ Recommended,7.3
1x08,Ex Post Facto,,-,4.3
1x09,Emanations,,-,5.0
1x10,Prime Factors,,-,6.0
1x11,State of Flux,,🕶 Must Watch,6.2
1x12,Heroes and Demons,🟨,-,4.3
1x13,Cathexis,,-,4.1
1x14,Faces,,✔ Recommended,6.2
1x15,Jatrel,,-,5.2
1x16,Learning Curve,,-,4.2
2x01,The 37's,,✔ Recommended,5.6
2x02,Initiations,,-,4.3
2x03,Projections,🟨,✔ Recommended,7.8
2x04,Elogium,,-,2.5
2x05,Non Sequitur,👬🌎,♦ Optional,4.3
2x06,Twisted,,-,3.9
2x07,Parturition,,-,4.0
2x08,Persistence of Vision,,-,4.8
2x09,Tattoo,,✖ Notably Bad,1.9
2x10,Cold Fire,,✔ Recommended,5.1
2x11,Maneuvers,,🕶 Must Watch,5.9
2x12,Resistance,♥️,-,5.8
2x13,Prototype,,✔ Recommended,6.1
2x14,Alliances,,✔ Recommended,6.0
2x15,Threshold,<span class="notablyBad">[🌌]</span>💩,✖ Notably Bad,0.5
2x16,Meld,,✔ Recommended,7.0
2x17,Dreadnought,♥️,-,7.4
2x18,Death Wish,Q⚖️,✔ Recommended,7.8
2x19,Lifesigns,,✔ Recommended,5.9
2x20,Investigations,,✔ Recommended,5.2
2x21,Deadlock,👬,✔ Recommended,7.3
2x22,Innocence,,-,2.9
2x23,The Thaw,👺V🟡🎖,✔+ Highly Recommended,6.8
2x24,Tuvix,,✔ Recommended,4.6
2x25,Resolutions,,-,4.8
2x26,"Basics, Part I",,🕶 ‼ Must Watch/Bare Minimum,6.2
3x01,"Basics, Part II",,🕶 ‼ Must Watch/Bare Minimum,6.2
3x02,Flashback,🕖♥️V🟡,🕶 Must Watch,7.3
3x03,The Chute,,-,4.5
3x04,The Swarm,,-,5.7
3x05,False Profits,,-,4.2
3x06,Remember,,-,5.9
3x07,Sacred Ground,,-,3.8
3x08 & 09,Future's End (Parts I and II),🌌🕖🌎A🟡,🕶 Must Watch,8.8
3x10,Warlord,♥️,-,5.6
3x11,The Q and the Grey,Q,♦ Optional,4.7
3x12,Macrocosm,,-,3.9
3x13,Fair Trade,,-,5.1
3x14,Alter Ego,,-,5.8
3x15,Coda,,-,2.7
3x16,Blood Fever,,-,4.5
3x17,Unity,(🤖),✔ Recommended,6.1
3x18,Darkling,,-,3.0
3x19,Rise,,-,5.2
3x20,Favorite Son,,-,3.0
3x21,Before and After,🕖,🕶 Must Watch,7.9
3x22,Real Life,,-,5.3
3x23,Distant Origin,,✔ Recommended,7.6
3x24,Displaced,,-,5.5
3x25,Worst Case Scenario,🟨,✔ Recommended,7.7
3x26,Scorpion (Part I),🌌🤖🥈A🟡,🕶 ‼ Must Watch/Bare Minimum,9.7
4x01,"Scorpion, Part II",🌌🤖🥈A🟡,🕶 ‼ Must Watch/Bare Minimum,9.7
4x02,The Gift,,🕶 Must Watch,6.3
4x03,Day of Honor,,✔ Recommended,7.1
4x04,Nemesis,,-,3.9
4x05,Revulsion,,-,5.0
4x06,The Raven,(🤖),🕶 Must Watch,6.1
4x07,Scientific Method,,-,6.2
4x08 & 09,Year of Hell (Parts I and II),🌌🕖🥇A🟡,🕶 ‼ Must Watch/Bare Minimum,9.6
4x10,Random Thoughts,,-,4.8
4x11,Concerning Flight,,-,5.7
4x12,Mortal Coil,,-,5.3
4x13,Waking Moments,,-,6.1
4x14,Message in a Bottle,♥️V🟡,🕶 ‼ Must Watch/Bare Minimum,8.6
4x15,Hunters,,✔ Recommended,6.6
4x16,Prey,,🕶 Must Watch,6.4
4x17,Retrospect,,-,4.2
4x18 & 19,The Killing Game (Parts I and II),🟨🌎V🟡,🕶 Must Watch,6.7
4x20,Vis à Vis,,-,4.7
4x21,The Omega Directive,,✔ Recommended,7.2
4x22,Unforgettable,,-,4.5
4x23,Living Witness,👬,✔+ Highly Recommended,9.2
4x24,Demon,,-,4.5
4x25,One,,✔ Recommended,7.1
4x26,Hope and Fear,,🕶 Must Watch,7.5
5x01,Night,,🕶 Must Watch,5.8
5x02,Drone,(🤖),✔ Recommended,6.5
5x03,Extreme Risk,,✔ Recommended,4.8
5x04,In the Flesh,🌎,-,5.0
5x05,Once Upon a Time,,-,4.5
5x06,Timeless,🌌🕖A🟡,🕶 Must Watch,9.0
5x07,Infinite Regress,,-,6.0
5x08,Nothing Human,,✔ Recommended,5.5
5x09,Thirty Days,,-,5.9
5x10,Counterpoint,V🟡,✔ Recommended,7.6
5x11,Latent Image,,✔ Recommended,7.4
5x12,Bride of Chaotica!,🟨🎭🎖,✔ Recommended,7.5
5x13,Gravity,♥️,-,6.5
5x14,Bliss,,-,5.9
5x15/16 [FL],Dark Frontier,🤖V🟡,🕶 ‼ Must Watch/Bare Minimum,9.1
5x17,The Disease,,-,3.4
5x18,Course: Oblivion,P⚑,-,5.1
5x19,The Fight,,✖ Notably Bad,1.4
5x20,Think Tank,,✔ Recommended,7.1
5x21,Juggernaut,,-,5.0
5x22,Someone to Watch Over Me,,✔ Recommended,6.4
5x23,11:59,P⚑,-,3.8
5x24,Relativity,🕖♥️🥉,✔+ Highly Recommended,9.2
5x25,Warhead,,-,6.6
5x26,Equinox (Part I),A🟡,🕶 Must Watch,7.5
6x01,"Equinox, Part II",A🟡,🕶 Must Watch,7.5
6x02,Survival Instinct,(🤖),✔ Recommended,6.8
6x03,Barge of the Dead,,-,5.3
6x04,Tinker Tenor Doctor Spy,,✔ Recommended,8.1
6x05,Alice,,-,4.8
6x06,Riddles,,-,6.3
6x07,Dragon's Teeth,,-,6.0
6x08,One Small Step,,✔ Recommended,6.7
6x09,The Voyager Conspiracy,,✔ Recommended,5.9
6x10,Pathfinder,🌎P⚑V🟡,🕶 ‼ Must Watch/Bare Minimum,7.6
6x11,Fair Haven,🟨,-,2.4
6x12,Blink of an Eye,🕖V🟡,✔ Recommended,7.7
6x13,Virtuoso,,-,5.2
6x14,Memorial,,-,5.1
6x15,Tsunkatse,,-,4.2
6x16,Collective,(🤖),✔ Recommended,5.0
6x17,Spirit Folk,🟨🎭,-,2.2
6x18,Ashes to Ashes,,-,5.5
6x19,Child's Play,,✔ Recommended,5.8
6x20,Good Shepherd,,-,4.0
6x21,Live Fast and Prosper,,-,5.6
6x22,Muse,,-,6.9
6x23,Fury,🕖,✔ Recommended,4.6
6x24,Life Line,🌎,🕶 Must Watch,8.3
6x25,The Haunting of Deck Twelve,,-,5.1
6x26,Unimatrix Zero (Part I),🤖,🕶 Must Watch,4.2
7x01,"Unimatrix Zero, Part II",🤖,🕶 Must Watch,4.2
7x02,Imperfection,(🤖),✔+ Highly Recommended,7.7
7x03,Drive,♥️,-,6.6
7x04,Repression,,-,4.3
7x05,Critical Care,♥️,✔ Recommended,7.2
7x06,Inside Man,🌎,✔ Recommended,6.5
7x07,Body and Soul,,-,5.9
7x08,Nightingale,,-,3.3
7x09/10 [FL],Flesh and Blood,🟨,✔ Recommended,6.4
7x11,Shattered,🕖,✔ Recommended,6.9
7x12,Lineage,,✔ Recommended,5.7
7x13,Repentance,,-,5.8
7x14,Prophecy,,-,4.8
7x15,The Void,V🟡,-,7.0
7x16 & 17,Workforce (Parts I and II),,✔ Recommended,7.3
7x18,Human Error,,-,3.8
7x19,Q2,Q,♦ Optional,5.2
7x20,"Author, Author",⚖️V🟡,✔ Recommended,7.4
7x21,Friendship One,,-,4.7
7x22,Natural Law,,-,5.5
7x23,Homestead,,🕶 Must Watch,6.0
7x24,Renaissance Man,,✔ Recommended,6.6
7x25/26 [FL],Endgame,🌌🕖🤖A🟡,🕶 ‼ Must Watch/Bare Minimum,7.4`;

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