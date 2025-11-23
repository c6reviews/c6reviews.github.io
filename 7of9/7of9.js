
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
	 
}


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
	
	var columns = 7;
	var content = "";
	
	array.slice(1).forEach(function(row) {
        content += '<tr class="filterableRow">';
		
		for (var i = 0; i < columns; i++) {
			
			//Set cell contents
			var cell = row[i];
			
			//Set cell class
			switch (i) {
				case 0:
					cellClass = "col_releaseAndTimelineOrder";
					break;
				case 1:
					cellClass = "col_series";
						cell = cell.replace('VOY','<img src="../images/voy-abbr.png" style="height:15px;" alt="VOY">').replace('PIC','<img src="../images/pic-abbr.png" style="height:20px;" alt="PIC">');
					break;
				case 2:
					cellClass = "col_episodeNumber";
					break;
				case 3:
					cellClass = "col_episodeTitle";
					if (cell.startsWith('"') && cell.endsWith('"')){
						cell = cell.substring(1, cell.length-1);
					}
					break;
				case 4:
					cellClass = "col_notes";
					if (cell.startsWith('"') && cell.endsWith('"')){
						cell = cell.substring(1, cell.length-1);
					}
					if (cell == "-") {
						cell = "<span style='color:#858585;font-style:italic;font-size:small'>(Non-primary role)</span>";
					}
					break;
				case 5:
					cellClass = "col_episodeRecommendation";
					// Stylize certain entries
					cell = cell.replace("✔",'✔&#xFE0E;');
					cell = cell.replace("♦",'♦&#xFE0E;');
					cell = cell.replace("🕶 ‼ Must Watch/Bare Minimum",'<span class="mustWatch">🕶&#xFE0E;</span> <span class="bareMinimum">‼&#xFE0E;</span> Must Watch/Bare Minimum');
					cell = cell.replace("🕶 Must Watch",'<span class="mustWatch">🕶&#xFE0E;</span> Must Watch');
					cell = cell.replace("✖ Notably Bad",'<span class="notablyBad">✖&#xFE0E;</span> Notably Bad');
					break;
				case 6:
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
		var series = cell.parentElement.querySelectorAll("td")[1].querySelector("img").alt.toLowerCase();
		var link = "../" + series + "/" + series + "-s" + season + ".html#e" + episode;
		
		var titleCell = cell.parentElement.querySelectorAll("td")[3];
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
				if (n == 3)
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
	if (displayedRows != 125) {
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
		var checkCell = filterrow.getElementsByTagName("td")[5];
	
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
			
				var checkCell = filterrow.getElementsByTagName("td")[4];
			
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
	document.getElementById("hideNonPrimary").checked = false;
	
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
	for (i = 2; i < (rows.length - 1); i++) {
		
		rowstyle = getComputedStyle(rows[i]);
		if (rowstyle.display == "none") {continue;};	
		x = rows[i].getElementsByTagName("TD")[1];
		
		for (j = i + 1; j < (rows.length - 1); j++) {
			
			y = rows[j].getElementsByTagName("TD")[1];
			rowstyle = getComputedStyle(rows[j]);
			if (rowstyle.display != "none") {break;};
			
		}
		
		if (x.innerHTML != y.innerHTML) {
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

var csvString = `ReleaseAndTimelineOrder,Series,Episode,Title,Notes,Recommendation,Rating
001,VOY,4x01,"Scorpion, Part II","⭐Seven of Nine's first appearance &ndash; you should probably watch Part I first, though",🕶 Must Watch,9.7
002,VOY,4x02,The Gift,"A direct follow-up to the previous story, Seven struggles to cope",🕶 Must Watch,6.3
003,VOY,4x03,Day of Honor,Seven considers helping another species who were devastated by the Borg,-,7.1
004,VOY,4x05,Revulsion,Harry is super awkward when he is assigned to work with Seven,-,5
005,VOY,4x06,The Raven,⭐Seven's assimilation story,🕶 Must Watch,6.1
006,VOY,4x07,Scientific Method,The crew rely on Seven to save the ship from aliens,-,6.2
007 & 008,VOY,4x08 & 09,Year of Hell (Parts I and II),-,-,9.6
009,VOY,4x10,Random Thoughts,-,-,4.8
010,VOY,4x11,Concerning Flight,-,-,5.7
011,VOY,4x12,Mortal Coil,-,-,5.3
012,VOY,4x13,Waking Moments,-,-,6.1
013,VOY,4x14,Message in a Bottle,-,-,8.6
014,VOY,4x15,Hunters,-,-,6.6
015,VOY,4x16,Prey,Seven disobeys orders and gives a member of Species 8472 over to the Hirogen,-,6.4
016,VOY,4x17,Retrospect,Seven gets upset when she believes she was violated by a weapons merchant,-,4.2
017 & 018,VOY,4x18 & 19,The Killing Game (Parts I and II),Seven helps save the ship from Hirogen running a WWII program on their holodeck,-,6.7
019,VOY,4x20,Vis à Vis,-,-,4.7
020,VOY,4x21,The Omega Directive,Seven goes on a quest for the &ldquo;Borg Holy Grail&rdquo;,✔ Recommended,7.2
021,VOY,4x22,Unforgettable,-,-,4.5
022,VOY,4x23,Living Witness,-,-,9.2
023,VOY,4x24,Demon,-,-,4.5
024,VOY,4x25,One,Seven faces her fear of solitude when the rest of the crew must go into stasis,✔ Recommended,7.1
025,VOY,4x26,Hope and Fear,Seven butts heads with Janeway and is apprehensive about returning to Earth,🕶 Must Watch,7.5
026,VOY,5x01,Night,-,-,5.8
027,VOY,5x02,Drone,Seven tries to teach a new drone how to be an individual,✔ Recommended,6.5
028,VOY,5x03,Extreme Risk,-,-,4.8
029,VOY,5x04,In the Flesh,-,-,5
030,VOY,5x05,Once Upon a Time,-,-,4.5
031,VOY,5x06,Timeless,-,-,9
032,VOY,5x07,Infinite Regress,"When one of her implants malfunctions, Seven experiences multiple personalities",✔ Recommended,6
033,VOY,5x08,Nothing Human,-,-,5.5
034,VOY,5x09,Thirty Days,-,-,5.9
035,VOY,5x10,Counterpoint,-,-,7.6
036,VOY,5x11,Latent Image,-,-,7.4
037,VOY,5x12,Bride of Chaotica!,-,-,7.5
038,VOY,5x13,Gravity,-,-,6.5
039,VOY,5x14,Bliss,Seven is the only one not excited at the prospect of getting back to Earth,✔ Recommended,5.9
040,VOY,5x15/16 [FL],Dark Frontier,⭐Seven falters on Janeway's mission to steal a Borg trans-warp coil,🕶 Must Watch,9.1
041,VOY,5x17,The Disease,-,-,3.4
042,VOY,5x18,Course: Oblivion,-,-,5.1
043,VOY,5x19,The Fight,-,-,1.4
044,VOY,5x20,Think Tank,A &ldquo;Think Tank&rdquo; takes interest in Seven; she consideres joining them,-,7.1
045,VOY,5x21,Juggernaut,-,-,5
046,VOY,5x22,Someone to Watch Over Me,The Doctor tutors Seven when she expresses interest in exploring romance,✔ Recommended,6.4
047,VOY,5x23,11:59,-,-,3.8
048,VOY,5x24,Relativity,Seven is recruited by time travelers to thwart an attack on Voyager,✔ Recommended,9.2
049,VOY,5x25,Warhead,-,-,6.6
050,VOY,5x26,Equinox (Part I),-,-,7.5
051,VOY,6x01,"Equinox, Part II",-,-,7.5
052,VOY,6x02,Survival Instinct,Seven remembers a difficult time when she was separated from the Borg,✔ Recommended,6.8
053,VOY,6x03,Barge of the Dead,-,-,5.3
054,VOY,6x04,Tinker Tenor Doctor Spy,-,-,8.1
055,VOY,6x05,Alice,-,-,4.8
056,VOY,6x06,Riddles,-,-,6.3
057,VOY,6x07,Dragon's Teeth,-,-,6
058,VOY,6x08,One Small Step,"While investigating a derelict Earth ship, Seven comes to appreciate its history",-,6.7
059,VOY,6x09,The Voyager Conspiracy,"After assimilating too much data, Seven goes all conspiracy-theorist",-,5.9
060,VOY,6x10,Pathfinder,-,-,7.6
061,VOY,6x11,Fair Haven,-,-,2.4
062,VOY,6x12,Blink of an Eye,-,-,7.7
063,VOY,6x13,Virtuoso,-,-,5.2
064,VOY,6x14,Memorial,-,-,5.1
065,VOY,6x15,Tsunkatse,Seven is kidnapped and force to fight Dwayne 'The Rock' Johnson,-,4.2
066,VOY,6x16,Collective,Seven rescues a group of Borg children,🕶 Must Watch,5
067,VOY,6x17,Spirit Folk,-,-,2.2
068,VOY,6x18,Ashes to Ashes,Seven figures out how to take care of the Borg children,-,5.5
069,VOY,6x19,Child's Play,Seven finds herself feeling very protective of Icheb,✔ Recommended,5.8
070,VOY,6x20,Good Shepherd,-,-,4
071,VOY,6x21,Live Fast and Prosper,-,-,5.6
072,VOY,6x22,Muse,-,-,6.9
073,VOY,6x23,Fury,-,-,4.6
074,VOY,6x24,Life Line,-,-,8.3
075,VOY,6x25,The Haunting of Deck Twelve,-,-,5.1
076,VOY,6x26,Unimatrix Zero (Part I),Seven experiences human individuality in Unimatrix Zero,✔ Recommended,4.2
077,VOY,7x01,"Unimatrix Zero, Part II",Seven experiences human individuality in Unimatrix Zero,✔ Recommended,4.2
078,VOY,7x02,Imperfection,⭐Seven needs a new cortical implant,🕶 Must Watch,7.7
079,VOY,7x03,Drive,-,-,6.6
080,VOY,7x04,Repression,-,-,4.3
081,VOY,7x05,Critical Care,-,-,7.2
082,VOY,7x06,Inside Man,-,-,6.5
083,VOY,7x07,Body and Soul,"The Doctor &ldquo;hides&rdquo; in Seven's implants, effectively controlling her body",-,5.9
084,VOY,7x08,Nightingale,-,-,3.3
085,VOY,7x09/10 [FL],Flesh and Blood,-,-,6.4
086,VOY,7x11,Shattered,-,-,6.9
087,VOY,7x12,Lineage,-,-,5.7
088,VOY,7x13,Repentance,"When Voyager ferries a group of inmates, Seven feels guilt for her actions as a drone",-,5.8
089,VOY,7x14,Prophecy,-,-,4.8
090,VOY,7x15,The Void,-,-,7
091 & 092,VOY,7x16 & 17,Workforce (Parts I and II),-,-,7.3
093,VOY,7x18,Human Error,Seven explores romantic emotions on the holodeck,♦ Optional,3.8
094,VOY,7x19,Q2,-,-,5.2
095,VOY,7x20,"Author, Author",-,-,7.4
096,VOY,7x21,Friendship One,-,-,4.7
097,VOY,7x22,Natural Law,Seven is endeared by a primitive society,-,5.5
098,VOY,7x23,Homestead,-,-,6
099,VOY,7x24,Renaissance Man,-,-,6.6
100,VOY,7x25/26 [FL],Endgame,⭐Seven pursues a relationship with Chakotay while aiding Janeway with a daring plan to cripple the Borg,✔ Recommended,7.4
101,PIC,1x04,Absolute Candor<sup> ‡</sup>,<span style='color:#858585;font-style:italic;font-size:small'>(Minor appearance)</span> Seven just shows up at the end and collapses,-,3.0
102,PIC,1x05,Stardust City Rag<sup> ‡</sup>,⭐Seven avenges her adopted son's death in an all-out assault on Bjayzl,🕶 Must Watch,5.5
103,PIC,1x08,Broken Pieces<sup> ‡</sup>,Seven takes control of a Borg cube and its inhabitants in order to expel the Romulans,✔ Recommended,6.1
104,PIC,1x09,"Et in Arcadia Ego, Part I<sup> ‡</sup>",<span style='color:#858585;font-style:italic;font-size:small'>(Minor appearance)</span> Seven survives the cube crash and stays behind to clean things up,-,4.5
105,PIC,1x10,"Et in Arcadia Ego, Part II<sup> ‡</sup>",<span style='color:#858585;font-style:italic;font-size:small'>(Minor appearance)</span> Seven fights Narissa and mourns the death of a colleague,-,5.7
106,PIC,2x01,The Star Gazer<sup> ‡</sup>,<span style='color:#858585;font-style:italic;font-size:small'>(Minor appearance)</span> Seven joins Rios and Picard on the Stargazer after an anomaly appears,-,7.0
107,PIC,2x02,Penance<sup> ‡</sup>,Seven awakes as Annika &ndash; President of a totalitarian xenophobic human empire,✔ Recommended,5.7
108,PIC,2x03,Assimilation<sup> ‡</sup>,"Seven accompanies Raffi to find the Watcher, and enjoys what it feels like to be human",-,5.7
109,PIC,2x04,Watcher<sup> ‡</sup>,Seven drives a stolen police car in a high-stakes chase,-,5.3
110,PIC,2x05,Fly Me to the Moon<sup> ‡</sup>,<span style='color:#858585;font-style:italic;font-size:small'>(Minor appearance)</span> Seven helps to free Rios from ICE custody,-,3.9
111,PIC,2x06,Two of One<sup> ‡</sup>,<span style='color:#858585;font-style:italic;font-size:small'>(Minor appearance)</span> Seven attends the gala but only has three lines,-,5.4
112,PIC,2x07,Monsters<sup> ‡</sup>,"<span style='color:#858585;font-style:italic;font-size:small'>(Minor appearance)</span> In a minor story line, Seven and Raffi start to track down Jurati",-,5.4
113,PIC,2x08,Mercy<sup> ‡</sup>,Seven gets a bit upset with Raffi while they search for Queen Jurati,-,3.5
114,PIC,2x09,Hide and Seek<sup> ‡</sup>,"Seven fights the Borg army and the Queen, then has her own Borg implants replaced after being mortally wounded",-,5.3
115,PIC,2x10,Farewell<sup> ‡</sup>,Seven makes some peace with her past and is given a field commission by Picard,-,7.3
116,PIC,3x01,The Next Generation<sup> ‡</sup>,Seven helps Picard get to the Ryton system against orders,✔ Recommended,6.1
117,PIC,3x02,Disengage<sup> ‡</sup>,Seven convinces Shaw to rescue Picard and Riker and is then relieved of duty for insubordination,-,5.5
118,PIC,3x03,Seventeen Seconds<sup> ‡</sup>,Seven broods while confined to quarters until she escapes to help track down a verterium leak,-,6.7
119,PIC,3x04,No Win Scenario<sup> ‡</sup>,Seven launches an investigation to find the Changeling saboteur,-,8.5
120,PIC,3x05,Imposters<sup> ‡</sup>,<span style='color:#858585;font-style:italic;font-size:small'>(Minor appearance)</span> Seven doesn't really do much in this episode,-,8.8
121,PIC,3x06,The Bounty<sup> ‡</sup>,<span style='color:#858585;font-style:italic;font-size:small'>(Minor appearance)</span> Seven reminisces about Voyager but otherwise doesn't do much here,-,7.2
122,PIC,3x07,Dominion<sup> ‡</sup>,<span style='color:#858585;font-style:italic;font-size:small'>(Minor appearance)</span> Seven reaches out to an old friend,-,7.7
123,PIC,3x08,Surrender<sup> ‡</sup>,Seven mostly gets angry about being a prisoner on her own ship and then finally delivers the line &ldquo;Get off my bridge!&rdquo;,-,8.6
124,PIC,3x09,Võx<sup> ‡</sup>,<span style='color:#858585;font-style:italic;font-size:small'>(Minor appearance)</span> Seven helps the gang escape,-,7.3
125,PIC,3x10,The Last Generation<sup> ‡</sup>,Seven takes command of the Titan and inspires a skeleton crew to do their best work,✔ Recommended,7.1`;

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