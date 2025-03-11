﻿/* File version 1.0.0 */

/* ----------------------------------------------------- GLOBAL VARIABLES ----------------------------------------------------- */

var G_sortcol = 0;
var G_sortdir = "asc";


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
					cell = cell.replace("R⚑",'<span style="color:red" title="Red Flag">⚑</span>');
					cell = cell.replace("P⚑",'<span style="color:yellow" title="Penalty Flag">⚑</span>');
					
					// Replace pips
					cell = cell.replace("A🟡",'<img alt="admiral insignia" title="Full Admiral Pips" src="images/admiral.png" width="29" >');
					cell = cell.replace("V🟡",'<img alt="vice admiral insignia" title="Vice Admiral Pips" src="images/vice_admiral.png" width="26" >');
					
					// Add titles to remaining tags
					cell = cell.replace("♥",'<span title="Personal Favorite">♥</span>');
					cell = cell.replace("🕖",'<span title="Time Travel episode">🕖</span>');
					cell = cell.replace("🤖",'<span title="Borg episode">🤖</span>');
					cell = cell.replace("Q",'<span title="Q Episode">Q</span>');
					cell = cell.replace("31",'<span title="Section 31" style="border:1px solid #C0C0C0;border-radius:10px;">31</span>');
					cell = cell.replace("⚖",'<span title="Courtroom Episode">⚖</span>');
					cell = cell.replace("♊",'<span title="Mirror Universe episode">♊</span>');
					cell = cell.replace("🌎",'<span title="Episode takes place on Earth">🌎</span>');
					cell = cell.replace("🟨",'<span title="Holodeck episode">🟨</span>');
					cell = cell.replace("👨🏻‍🤝‍👨🏻",'<span title="Parallel / Alternate Reality">👨🏻‍🤝‍👨🏻</span>');
					cell = cell.replace("🎭",'<span title="Lighthearted/Comedy">🎭</span>');
					cell = cell.replace("😱",'<span title="Scary">😱</span>');
					cell = cell.replace("🥇",'<span title="1st place episode">🥇</span>');
					cell = cell.replace("🥈",'<span title="2nd place episode">🥈</span>');
					cell = cell.replace("🥉",'<span title="3rd place episode">🥉</span>');
					cell = cell.replace("🏅",'<span title="Special Award">🏅</span>');
					cell = cell.replace("🎖",'<span title="General Award">🎖</span>');
					cell = cell.replace("💩",'<span title="Worst episode of the series">💩</span>');
					cell = cell.replace("👺",'<span title="&quot;Fear&quot;">👺</span>');
					break;
				case 3:
					cellClass = "col_episodeRecommendation";
					// Stylize certain entries
					cell = cell.replace("🕶 ‼ Must Watch/Bare Minimum",'<span class="mustWatch">🕶</span> <span class="bareMinimum">‼</span> Must Watch/Bare Minimum');
					cell = cell.replace("🕶 Must Watch",'<span class="mustWatch">🕶</span> Must Watch');
					cell = cell.replace("✖ Notably Bad",'<span class="notablyBad">✖</span> Notably Bad');
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

function sortTable(n) {
	
	sortArrowOff = document.getElementById(G_sortcol + G_sortdir);
	sortArrowOff.style.color = "#555";
	
	var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
	var sorttype = document.querySelector('input[name="sorttype"]:checked').value;
	table = document.getElementById("episodeTable");
	switching = true;
	// Set the sorting direction to ascending:
	dir = "asc";
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
				
				if (x.innerHTML.startsWith("<a")) {
					x = x.querySelectorAll("a")[0];
					y = y.querySelectorAll("a")[0];
				}
				
				x = x.innerHTML.toLowerCase().replace(/^(')/, '');
				y = y.innerHTML.toLowerCase().replace(/^(')/, '');
				
				if (sorttype == "title"){
					x = x.replace(/^('|a\s|an\s|the\s)/, '')
					y = y.replace(/^('|a\s|an\s|the\s)/, '')
				}


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
}

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
	
}


function resetFilters() {
	
	var filterallcheckboxes = document.querySelectorAll("#rnfilterall,#tagsfilterall");
	var filtercheckboxes = document.querySelectorAll(".rnfiltercheckbox,.tagsfiltercheckbox");
	
	document.getElementById("recommendationFilterTextbox").value = "";
	document.getElementById("tagFilterTextbox").value = "";
	
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
1x01/02 [FL],Caretaker,, 🕶 ‼ Must Watch/Bare Minimum,6.0
1x03,Parallax,🕖, ✔ Recommended,4.3
1x04,Time and Again,🕖,-,6.4
1x05,Phage,, 🕶 Must Watch,5.8
1x06,The Cloud,,-,3.9
1x07,Eye of the Needle,, ✔ Recommended,7.2
1x08,Ex Post Facto,,-,4.0
1x09,Emanations,,-,4.8
1x10,Prime Factors,,-,6.2
1x11,State of Flux,, 🕶 Must Watch,6.3
1x12,Heroes and Demons,🟨,-,4.5
1x13,Cathexis,,-,3.8
1x14,Faces,, ✔ Recommended,6.4
1x15,Jatrel,,-,5.1
1x16,Learning Curve,,-,4.4
2x01,The 37's,, ✔ Recommended,5.9
2x02,Initiations,,-,4.0
2x03,Projections,🟨, ✔+ Highly Recommended,7.8
2x04,Elogium,,-,2.3
2x05,Non Sequitur,🕖🌎,-,4.5
2x06,Twisted,,-,3.4
2x07,Partuition,,-,3.7
2x08,Persistence of Vision,,-,4.6
2x09,Tattoo,, ✖ Notably Bad,2.1
2x10,Cold Fire,, ✔ Recommended,5.0
2x11,Maneuvers,, 🕶 Must Watch,6.1
2x12,Resistance,♥️,-,5.3
2x13,Prototype,,-,6.3
2x14,Alliances,, ✔ Recommended,6.1
2x15,Threshold,💩, ✖ Notably Bad,0.6
2x16,Meld,, ✔ Recommended,6.8
2x17,Dreadnought,♥️,-,7.3
2x18,Death Wish,Q⚖️, ✔ Recommended,7.8
2x19,Lifesigns,, ✔ Recommended,6.0
2x20,Investigations,, ✔ Recommended,5.1
2x21,Deadlock,👨🏻‍🤝‍👨🏻, ✔ Recommended,7.2
2x22,Innocence,,-,2.8
2x23,The Thaw,👺🎖V🟡, ✔+ Highly Recommended,6.6
2x24,Tuvix,, ♦ Optional,5.5
2x25,Resolutions,,-,4.6
2x26,Basics (Part I),, 🕶 ‼ Must Watch/Bare Minimum,6.4
3x01,Basics (Part II),, 🕶 ‼ Must Watch/Bare Minimum,6.4
3x02,Flashback,🕖♥️, 🕶 Must Watch,7.2
3x03,The Chute,,-,4.3
3x04,The Swarm,,-,5.8
3x05,False Profits,,-,4.4
3x06,Remember,,-,5.7
3x07,Sacred Ground,,-,3.3
3x08 & 09,Future's End (Parts I and II),🕖🌎A🟡, 🕶 Must Watch,8.5
3x10,Warlord,♥️,-,5.1
3x11,The Q and the Grey,Q, ✔ Recommended,4.6
3x12,Macrocosm,,-,4.1
3x13,Fair Trade,,-,5.0
3x14,Alter Ego,,-,5.8
3x15,Coda,,-,3.1
3x16,Blood Fever,,-,4.3
3x17,Unity,🤖, ✔ Recommended,6.2
3x18,Darkling,,-,3.0
3x19,Rise,,-,5.1
3x20,Favorite Son,,-,2.9
3x21,Before and After,🕖, 🕶 Must Watch,7.9
3x22,Real Life,,-,5.9
3x23,Distant Origin,, ✔ Recommended,8.1
3x24,Displaced,,-,5.5
3x25,Worst Case Scenario,🟨, ✔ Recommended,7.6
3x26,Scorpion (Part I),🤖🥈A🟡, 🕶 ‼ Must Watch/Bare Minimum,9.7
4x01,Scorpion (Part II),🤖🥈A🟡, 🕶 ‼ Must Watch/Bare Minimum,9.7
4x02,The Gift,, 🕶 Must Watch,6.5
4x03,Day of Honor,, ✔ Recommended,7.0
4x04,Nemesis,,-,4.1
4x05,Revulsion,,-,4.9
4x06,The Raven,, 🕶 Must Watch,6.3
4x07,Scientific Method,,-,6.3
4x08 & 09,Year of Hell (Parts I and II),🕖🥇A🟡, 🕶 ‼ Must Watch/Bare Minimum,9.6
4x10,Random Thoughts,,-,4.6
4x11,Concerning Flight,, ✔ Recommended,5.1
4x12,Mortal Coil,,-,5.2
4x13,Waking Moments,,-,6.3
4x14,Message in a Bottle,♥️, 🕶 ‼ Must Watch/Bare Minimum,8.3
4x15,Hunters,, 🕶 Must Watch,6.8
4x16,Prey,, ✔ Recommended,6.6
4x17,Retrospect,,-,4.4
4x18 & 19,The Killing Game (Parts I and II),🟨🌎V🟡, 🕶 Must Watch,6.4
4x20,Vis à Vis,,-,4.5
4x21,The Omega Directive,, ✔ Recommended,7.0
4x22,Unforgettable,,-,4.3
4x23,Living Witness,👨🏻‍🤝‍👨🏻, ✔ Recommended,9.0
4x24,Demon,,-,4.3
4x25,One,, ✔ Recommended,6.9
4x26,Hope and Fear,, 🕶 Must Watch,7.4
5x01,Night,, ✔ Recommended,5.3
5x02,Drone,, ✔ Recommended,7.3
5x03,Extreme Risk,, 🕶 ‼ Must Watch/Bare Minimum,4.6
5x04,In the Flesh,🌎, ✔ Recommended,5.4
5x05,Once Upon a Time,,-,4.3
5x06,Timeless,🕖V🟡, 🕶 Must Watch,8.8
5x07,Infinite Regress,,-,6.1
5x08,Nothing Human,,-,5.6
5x09,Thirty Days,,-,6.1
5x10,Counterpoint,, ✔ Recommended,7.6
5x11,Latent Image,, ✔ Recommended,7.3
5x12,Bride of Chaotica!,🟨,-,6.9
5x13,Gravity,♥️,-,6.2
5x14,Bliss,,-,6.0
5x15/16 [FL],Dark Frontier,🤖V🟡, 🕶 Must Watch,8.9
5x17,The Disease,,-,3.5
5x18,Course: Oblivion,,-,5.0
5x19,The Fight,,-,1.5
5x20,Think Tank,, ✔ Recommended,6.9
5x21,Juggernaut,,-,4.8
5x22,Someone to Watch Over Me,, ✔ Recommended,6.6
5x23,11:59,🌌P⚑V🟡,-,3.2
5x24,Relativity,🕖♥️, ✔ Recommended,9.0
5x25,Warhead,,-,6.4
5x26,Equinox (Part I),, 🕶 Must Watch,7.5
6x01,Equinox (Part II),, 🕶 Must Watch,7.5
6x02,Survival Instinct,, ✔ Recommended,7.1
6x03,Barge of the Dead,,-,5.2
6x04,Tinker Tenor Doctor Spy,, ✔ Recommended,7.6
6x05,Alice,,-,4.6
6x06,Riddles,,-,6.5
6x07,Dragon's Teeth,,-,6.1
6x08,One Small Step,🌎,-,6.4
6x09,The Voyager Conspiracy,, ✔ Recommended,6.0
6x10,Pathfinder,🌎P⚑V🟡, 🕶 ‼ Must Watch/Bare Minimum,7.6
6x11,Fair Haven,🟨,-,2.2
6x12,Blink of an Eye,🕖,-,7.1
6x13,Virtuoso,,-,6.3
6x14,Memorial,,-,4.9
6x15,Tsunkatse,,-,4.5
6x16,Collective,, ✔ Recommended,4.9
6x17,Spirit Folk,🟨,-,2.5
6x18,Ashes to Ashes,,-,5.4
6x19,Child's Play,, ✔ Recommended,5.8
6x20,Good Shepherd,,-,4.2
6x21,Live Fast and Prosper,,-,6.2
6x22,Muse,,-,6.6
6x23,Fury,🕖, ✔ Recommended,3.9
6x24,Life Line,🌎, ✔ Recommended,8.4
6x25,The Haunting of Deck Twelve,,-,5.6
6x26,Unimatrix Zero (Part I),🤖, ✔ Recommended,4.4
7x01,Unimatrix Zero (Part II),🤖, ✔ Recommended,4.4
7x02,Imperfection,, ✔ Recommended,7.7
7x03,Drive,♥️,-,6.3
7x04,Repression,,-,4.0
7x05,Critical Care,♥️,-,7.0
7x06,Inside Man,🌎, ✔ Recommended,6.2
7x07,Body and Soul,,-,6.0
7x08,Nightingale,,-,3.6
7x09/10 [FL],Flesh and Blood,🟨, ✔ Recommended,6.6
7x11,Shattered,🕖, ✔ Recommended,6.2
7x12,Lineage,, ✔ Recommended,5.8
7x13,Repentance,,-,5.9
7x14,Prophecy,,-,4.6
7x15,The Void,,-,7.3
7x16 & 17,Workforce (Parts I and II),, ✔ Recommended,7.2
7x18,Human Error,, ✔ Recommended,4.0
7x19,Q2,Q,-,5.2
7x20,"Author, Author",⚖️V🟡, ✔ Recommended,7.3
7x21,Friendship One,🌎,-,4.6
7x22,Natural Law,,-,5.5
7x23,Homestead,, 🕶 Must Watch,5.6
7x24,Renaissance Man,, ✔ Recommended,6.3
7x25/26 [FL],Endgame,🕖🤖, 🕶 ‼ Must Watch/Bare Minimum,6.7`;

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