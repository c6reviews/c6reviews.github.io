
/* ----------------------------------------------------- GLOBAL VARIABLES ----------------------------------------------------- */

var G_sortcol = 0;
var G_sortdir = "asc";
var G_filterset = document.getElementsByClassName("filterableRow");


/* -------------------------------------------------- SCROLL TO TOP BUTTON -------------------------------------------------- */

function scrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
} 


/* -------------------------------------------------------- ONSCROLL -------------------------------------------------------- */
   
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

/* ----------------------------------------------------- CREATE THE TABLE ----------------------------------------------------- */

function csvToNestedArray(csvString) {
  // Split into rows
  const rows = csvString.split('\n');
  // Split each row into an array. This regex splits using a comma delimiter, but ignores commas that are within quotation marks.
  const nestedArray = rows.map(row => row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)); 
  return nestedArray;
}

async function createTable(showSpoiler) {

	const csvResponse = await fetch("q.csv");
	var csvString = await csvResponse.text();
	
	var array = csvToNestedArray(csvString);
	
	
	// ----------------- ADD CONTENT -----------------
	
	var columns = 9;
	if (showSpoiler == true) {
		var rows = '24';
	} else {
		var rows = '23';
	}
	var content = ``;
	
	document.getElementById("filterTotalbox").innerHTML = `Showing<br><span id="filterTotal">${rows}</span> of ${rows}<br>episodes`;
	
	array.slice(1).forEach(function(row) {
        	
		for (var i = 0; i < columns; i++) {
			
			//Set cell contents
			var cell = row[i];
			
			//Set cell class
			switch (i) {
				case 0:
					if (cell == "Y" && showSpoiler == false){
						content += '<tr class="spoilerRow">';
					} else {
						content += '<tr class="filterableRow">';
					}
					continue;
				case 1:
					cellClass = "col_releaseOrder";
					if (showSpoiler == false && cell == "24") {
						cell = "23";
					}
					break;
				case 2:
					cellClass = "col_timelineOrder";
					break;
				case 3:
					cellClass = "col_series";
						cell = cell.replace('TOS','<img src="../images/tos-abbr.png" style="height:20px;" alt="TOS" title="The Original Series">');
						cell = cell.replace('TNG','<img src="../images/tng-abbr.png" style="height:15px;" alt="TNG" title="The Next Generation">');
						cell = cell.replace('DS9','<img src="../images/ds9-abbr.png" style="height:15px;" alt="DS9" title="Deep Space Nine">');
						cell = cell.replace('VOY','<img src="../images/voy-abbr.png" style="height:15px;" alt="VOY" title="Voyager">');
						cell = cell.replace('LOW','<img src="../images/low-abbr.png" style="height:15px;" alt="LOW" title="Lower Decks">');
						cell = cell.replace('PIC','<img src="../images/pic-abbr.png" style="height:20px;" alt="PIC" title="Picard">');
						cell = cell.replace('SNW','<img src="../images/snw-abbr.png" style="height:20px;" alt="SNW" title="Strange New Worlds">');
					break;
				case 4:
					cellClass = "col_episodeNumber";
					break;
				case 5:
					cellClass = "col_episodeTitle";
					if (cell.startsWith('"') && cell.endsWith('"')){
						cell = cell.substring(1, cell.length-1);
					}
					break;
				case 6:
					cellClass = "col_notes";
					if (cell.startsWith('"') && cell.endsWith('"')){
						cell = cell.substring(1, cell.length-1);
					}
					if (cell == "-") {
						cell = "<span style='color:#858585;font-style:italic;font-size:small'>(Non-primary role)</span>";
					}
					break;
				case 7:
					cellClass = "col_episodeRecommendation";
					// Stylize certain entries
					cell = cell.replace("🕶 ‼ Must Watch/Bare Minimum",'<span class="mustWatch">🕶</span> <span class="bareMinimum">‼</span> Must Watch/Bare Minimum');
					cell = cell.replace("🕶 Must Watch",'<span class="mustWatch">🕶</span> Must Watch');
					cell = cell.replace("✖ Notably Bad",'<span class="notablyBad">✖</span> Notably Bad');
					cell = cell.replace("✔",'✔&#xFE0E;');
					break;
				case 8:
					cellClass = "col_episodeRating";
					break;
					
			}
			
            content += '<td class="' + cellClass + '">' + cell + "</td>" ;
		}
			
        content += "</tr>";
    });
    document.getElementById("episodeTable").innerHTML = content;
	
	// ----------------- ADD LINKS -----------------
	
	var epNumCells = Array.from(document.getElementsByClassName("col_episodeNumber"));
	
	epNumCells.forEach((cell) => {
		var cellContents = cell.innerHTML;
		var season = cellContents.substring(0,1);
		var episode = cellContents.substring(2,4);
		var series = cell.parentElement.querySelectorAll("td")[2].querySelector("img").alt.toLowerCase();
		var link = "../" + series + "/" + series + "-s" + season + ".html#e" + episode;
		
		var titleCell = cell.parentElement.querySelectorAll("td")[4];
		cellContents = titleCell.innerHTML;
		titleCell.innerHTML = '<a href="' + link + '">' + cellContents + '</a>';
		
	});
	
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
			case "N":
				rating.style.backgroundColor = '#A0A0A0BF';
				break;
		}
		
	});
	
	sortArrowOn = document.getElementById(G_sortcol + G_sortdir);
	sortArrowOn.style.color = "white";
	
	addSeasonSeparator();
	syncColumnWidths();
	
	document.getElementById('SquireNotes').onclick = function(e){
		var tooltip = document.getElementById('SquireToolTip');
		var x = e.clientX,
			y = e.clientY;
			tooltip.style.top = (y+20) + 'px';
			tooltip.style.left = (x+20) + 'px';
			tooltip.style.display = 'block';
			tooltip.style.position = 'fixed';
	}
}

/* ------------------------------------------------------------ SYNC WIDTHS ------------------------------------------------------------ */

function syncColumnWidths() {
  const headerRows = document.querySelectorAll("#headerTable th");
  const bodyRows = document.querySelector("#episodeTable tr");

  if (!bodyRows) return;

  const bodyCols = bodyRows.children;

  headerRows.forEach((th, i) => {
    const width = bodyCols[i].getBoundingClientRect().width;
    th.style.width = width + "px";
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
		for (i = 0; i < (rows.length - 1); i++) {
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
				if (n == 4)
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
	if (displayedRows != document.querySelectorAll('.filterableRow').length) {
		document.getElementById("filterTotal").style.color = "yellow";
		document.getElementById("filterTotal").style.fontWeight = "bold";
	} else {
		document.getElementById("filterTotal").style.color = "";
		document.getElementById("filterTotal").style.fontWeight = "";
	}
}

function filterTitle(clear) {
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
	if (clear == "clear")
		{ input = "" }
	else
		{ input = document.getElementById("episodeSearchBox").value; }
	
	
	filter = input.toLowerCase();
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
		var checkCell = filterrow.getElementsByTagName("td")[6];
	
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
				
				// Show all rows
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
		}
		
		
	}
	else if (type=="rn") // A recommendation filter was checked or unchecked
	{
		var rnallfilter = document.getElementById("rnfilterall");
		rnallfilter.checked = false;
		setRnFilters();
		return;		
	}
	else if (type=="hideNonPrimary") {
		
		var hideNonPrimary = document.getElementById("hideNonPrimary").checked;
		
		if (hideNonPrimary) {
			
			filterTitle("clear");
			
			Array.from(G_filterset).forEach((filterrow) => {
			
				var checkCell = filterrow.getElementsByTagName("td")[5];
			
				if ((checkCell.innerHTML).includes("Non-primary")||(checkCell.innerHTML).includes("Minor appearance")){
					filterrow.style.display="none";
				}
			});
			
		} else {
			
			filterrows.forEach((filterrow) => {
				filterrow.style.display="";
			});
			
			var rnfilter = document.getElementById("recommendationFilterTextbox");
			
			if (rnfilter.value != "") {
				setRnFilters();
			}
				
			
		}
		
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
	
	var filterallcheckboxes = document.querySelectorAll("#rnfilterall");
	var filtercheckboxes = document.querySelectorAll(".rnfiltercheckbox");
	
	document.getElementById("recommendationFilterTextbox").value = "";
	document.getElementById("episodeSearchBox").value = "";
	
	Array.from(filterallcheckboxes).forEach((checkbox) => {
		checkbox.checked = true;
	})
	
	Array.from(filtercheckboxes).forEach((checkbox) => {
		checkbox.checked = false;
	})
	
	var andordefault = document.getElementById("andordefault");
	
	setFilters("rnall");
	toggleFilterBox('recommendationFilter');
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
	for (i = 0; i < (rows.length - 1); i++) {
		
		rowstyle = getComputedStyle(rows[i]);
		if (rowstyle.display == "none") {continue;};	
		x = rows[i].getElementsByTagName("TD")[2];
		
		for (j = i + 1; j < (rows.length - 1); j++) {
			
			y = rows[j].getElementsByTagName("TD")[2];
			rowstyle = getComputedStyle(rows[j]);
			if (rowstyle.display != "none") {break;};
			
		}
		
		if (x.innerHTML != y.innerHTML) {
			var rcells = y.parentElement.querySelectorAll("td");
			Array.from(rcells).forEach((rcell) => {
				// rcell.style.borderTop="solid #C0C0C0";
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



function closeToolTip(caller) {
	caller.style.display = 'none';
}

/* ------------------------------------------------------------------------------------------------------------
   -------------------------------------------------- ONLOAD --------------------------------------------------
   ------------------------------------------------------------------------------------------------------------ */

window.addEventListener("resize", syncColumnWidths);

window.onload = function() {
	
	createTable(false);
	
	var bottomBorder = document.getElementById('bottomBorder');
	setTimeout(function(){bottomBorder.style.width = '100%'},500);
}