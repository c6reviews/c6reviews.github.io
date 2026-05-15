function generateYearColumn(startYear){

	const grid = document.getElementById('timelineGrid');
	
	for (let i = startYear, j = 1; i <= (startYear + 100); i++, j++) {
		
		var ele = document.createElement('div');
		ele.classList.add('yearBox');
		ele.textContent = i;
		ele.style.gridArea = (j + " / 1 / " + (j+1) + " / 2");
		grid.appendChild(ele);
	}
	
	if (window.location.hash) {
        const element = document.getElementById(window.location.hash.substring(1));
        if (element) {
            // A tiny timeout ensures the grid has fully settled
            setTimeout(() => {
                element.scrollIntoView();
            }, 100);
        }
    }

}

function generateHorizontalGridlines(){
	
	const grid = document.getElementById('timelineGrid');
	
	for (let i = 1; i <=100; i++) {
		var ele = document.createElement('div');
		ele.classList.add('hrule');
		ele.style.borderBottom = '1px dotted';
		if (i % 2 == 0) {
			ele.style.backgroundColor = '#1F1F1F';
		}
		ele.style.gridArea = (i + " / 1 / " + (i+1) + " / -1");
		grid.appendChild(ele);
	}
	
}

function openLegend(){
	
	let legend = document.getElementById('timelineLegendDiv');
	
	if (!legend){
	
			const legendDiv = document.createElement('div');
			legendDiv.id = "timelineLegendDiv";
			legendDiv.innerHTML = `<a href="javascript:void(0)" class="closebtn" onclick="closeLegend()">&times;</a> <span style="font-size: 72px;margin-left:25px">Timeline Legend</span>
				
				<div class="timelineFlex" id="legendFlex" style="width: 80%; margin: auto; text-align: center;">

					<div class="majorEventBox">Major Events</div>
					<div class="minorTimeTravel">❰ Past reference or minor role in story</div>
					<div class="minorTimeTravel">❱ Future reference or minor role in story</div>
					<div class="majorTimeTravel">❰❰ Past time travel or significant role in story</div>
					<div class="majorTimeTravel">❱❱ Future time travel or significant role in story</div>
					<div class="episodeBox">Single television episode</div>
					<div class="seriesBox">Television series</div>
					<div class="filmBox">Films</div>
					<div class="realLife">Real-Life Event</div>
					<div>&nbsp;</div>
					<div style="text-decoration:underline">Text colors</div>
					<div class="firstGen">1st generation Trek (1966-1991)</div>
					<div class="secondGen">2nd generation Trek (1987-2004)</div>
					<div class="thirdGen">3rd generation Trek (2017-Present)</div>
					<div class="kelvin">Kelvin Alternate Timeline</div>
					<div class="alternateReality">Other (Non-Kelvin) Alternate Timeline</div>
					<div class="apocryphal">Apocryphal information*</div>
					<div>&nbsp;</div>
					<div style="text-decoration:underline">Other</div>
					<div>≈ Approximate Date</div>
					<div><span>First time something happens (<span style="font-family:serif">I</span>)</span></div>
					<div><span>Second time something happens (<span style="font-family:serif">II</span>)</span></div>
					<div>&nbsp;</div>
				</div>`	
		
		document.body.appendChild(legendDiv);
		
		legend = document.getElementById('timelineLegendDiv');
	}
	
	legend.style.display="block";
}

function closeLegend(){
	document.getElementById('timelineLegendDiv').style.display="none";
}

document.addEventListener('DOMContentLoaded', function() {
	let grid = document.getElementById('timelineGrid');
	if (grid){
		let startYear = parseInt(grid.dataset.startyear, 10);
		generateHorizontalGridlines();
		generateYearColumn(startYear);
	}
});

function blink(elementIDs) {
	
	var elements = [];
	
	elementIDs = elementIDs.split(",");
	
	for (var i=0; i < elementIDs.length; i++) {
		elements.push(document.getElementById(elementIDs[i]));
	}

	elements.forEach(element => {
		element.classList.toggle("blinkBox");
		setTimeout(() => {
			element.classList.toggle("blinkBox");
			setTimeout(() => {
				element.classList.toggle("blinkBox");
				setTimeout(() => {
					element.classList.toggle("blinkBox");
					setTimeout(() => {
						element.classList.toggle("blinkBox");
						setTimeout(() => {
							element.classList.toggle("blinkBox");
							setTimeout(() => {
								element.classList.toggle("blinkBox");
								setTimeout(() => {
									element.classList.remove("blinkBox");
								}, 300);
							}, 300);
						}, 300);
					}, 300);
				}, 300);
			}, 300);
		}, 300);
	});	
}

window.onload = function() {
    
	if (!window.location.href.includes("simple.html")) {
		const afterhash = window.location.hash.substring(1);
		if (afterhash && afterhash != "bottom") {blink(afterhash);}
	}
};