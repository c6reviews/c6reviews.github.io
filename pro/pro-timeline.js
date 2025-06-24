/* -------------------------------------------------- GET ELEMENT POSITION (relative to page, not screen) -------------------------------------------------- */

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
	right: rect.right + window.scrollX,
    top: rect.top + window.scrollY,
	bottom: rect.bottom + window.scrollY
  };
}

/* ---------------------------------------------------------- DRAW LINES ---------------------------------------------------------- */

function drawLines(){
	
	var legendPink = getOffset(document.getElementById("legendPink"));
	var legendPinkx = (legendPink.right-((legendPink.right - legendPink.left)/2));
	var legendPinky = (legendPink.bottom-((legendPink.bottom - legendPink.top)/2));
	var legendPurple = getOffset(document.getElementById("legendPurple"));
	var legendPurplex = (legendPurple.right-((legendPurple.right - legendPurple.left)/2));
	var legendPurpley = (legendPurple.bottom-((legendPurple.bottom - legendPurple.top)/2));
	var legendBlue = getOffset(document.getElementById("legendBlue"));
	var legendBluex = (legendBlue.right-((legendBlue.right - legendBlue.left)/2));
	var legendBluey = (legendBlue.bottom-((legendBlue.bottom - legendBlue.top)/2));
	
	var VOY = getOffset(document.getElementById("VOY"));
	var event1 = getOffset(document.getElementById("event1"));
	var event1_1 = getOffset(document.getElementById("event1_1"));
	var event2 = getOffset(document.getElementById("event2"));
	var event3 = getOffset(document.getElementById("event3"));
	var event3x = (event3.right-((event3.right - event3.left)/2));
	var PLATL = getOffset(document.getElementById("ProtostarLostAtTarsLamora"));
	var event4a = getOffset(document.getElementById("event4a"));
	var event4b = getOffset(document.getElementById("event4b"));
	var event5 = getOffset(document.getElementById("event5"));
	var event6 = getOffset(document.getElementById("event6"));
	var event7 = getOffset(document.getElementById("event7"));
	var event8 = getOffset(document.getElementById("event8"));
	var event9 = getOffset(document.getElementById("event9"));
	var event9x = (event9.right-((event9.right - event9.left)/2));
	var event10 = getOffset(document.getElementById("event10"));
	var event10x = (event10.right-((event10.right - event10.left)/2));
	var event11 = getOffset(document.getElementById("event11"));
	var event12 = getOffset(document.getElementById("event12"));
	var event13 = getOffset(document.getElementById("event13"));
	var event14 = getOffset(document.getElementById("event14"));
	
	var AOT1 = getOffset(document.getElementById("AOT1"));
	var AOT2 = getOffset(document.getElementById("AOT2"));
	var AOT3 = getOffset(document.getElementById("AOT3"));
	var AOT4 = getOffset(document.getElementById("AOT4"));
	var AOT5 = getOffset(document.getElementById("AOT5"));
	var FT1 = getOffset(document.getElementById("FT1"));
	var FT2 = getOffset(document.getElementById("event14"));
	var FT3 = getOffset(document.getElementById("FT3"));
	
	var pageWidth = document.documentElement.scrollWidth;
	var pageHeight = document.documentElement.scrollHeight;
	
	var content = `<svg width="` + pageWidth + `" height="` + pageHeight + `" style="position:absolute;top:0;left:0px;z-index:50;pointer-events:none">
		
			<defs>
				<marker id="pinkarrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
					<path d="M 0 0 L 10 5 L 0 10 z" fill="#DF4982">
				</marker>
				<marker id="bluearrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
					<path d="M 0 0 L 10 5 L 0 10 z" fill="#27b9fd">
				</marker>
				<marker id="purplearrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
					<path d="M 0 0 L 10 5 L 0 10 z" fill="#9A65F6">
				</marker>
			</defs>

			<polygon points="` + (AOT1.left)+`,`+(AOT1.top)+` `+(AOT1.right)+`,`+(AOT1.top)+` `+(AOT2.left)+`,`+(AOT2.top)+` `+(AOT3.left)+`,`+(AOT3.top)+` `+(AOT4.left)+`,`+(AOT4.bottom)+` `+(AOT5.left)+`,`+(AOT5.bottom) + `" fill="#55005511" stroke="violet" stroke-width="3px" />
			
			<polygon points="` + (FT1.left)+`,`+(FT1.top)+` `+(FT1.right)+`,`+(FT1.top)+` `+(FT2.right)+`,`+(FT2.bottom)+` `+(FT3.left)+`,`+(FT3.bottom) + `" fill="#66330022" stroke="orange" stroke-width="3px" />
			
			<!--  _______________________________________________________________________________ -->
		
			<line x1="` + (legendPinkx-15) + `" y1="` + (legendPinky) + `" x2="` + (legendPinkx+15) + `" y2="` + (legendPinky) + `" stroke="#DF4982" stroke-width="2px" marker-end="url(#pinkarrow)"/>
			<line x1="` + (legendPurplex-15) + `" y1="` + (legendPurpley) + `" x2="` + (legendPurplex+15) + `" y2="` + (legendPurpley) + `" stroke="#9A65F6" stroke-width="2px" fill="none" stroke-dasharray="3" marker-end="url(#purplearrow)"/>
			<line x1="` + (legendBluex-15) + `" y1="` + (legendBluey) + `" x2="` + (legendBluex+15) + `" y2="` + (legendBluey) + `" stroke="#27b9fd" stroke-width="2px" fill="none" stroke-dasharray="3" marker-end="url(#bluearrow)"/>
			
			
			<path d="M `+ (event1.right-((event1.right - event1.left)/2)+100) + ` ` + (event1.bottom-8) + ` C ` + (event1.right+60) + ` ` + (event1.bottom) + `, ` + (event2.left+150) + ` ` + (event2.top-50) + `, ` + (event2.right-((event2.right - event2.left)/2)+20) + ` ` + (event2.top) + `" stroke="#9A65F6" stroke-width="2px" fill="none" stroke-dasharray="3" marker-end="url(#purplearrow)"/>
			
			<line x1="` + (event1.right-((event1.right - event1.left)/2)) + `" y1="` + (event1.bottom-5) + `" x2="` + (event1_1.right-((event1_1.right - event1_1.left)/2)) + `" y2="` + event1_1.top + `" stroke="#DF4982" stroke-width="2px" marker-end="url(#pinkarrow)"/>
			<line x1="` + (event1_1.right-((event1_1.right - event1_1.left)/2)) + `" y1="` + (event1_1.bottom-5) + `" x2="` + (event2.right-((event2.right - event2.left)/2)) + `" y2="` + event2.top + `" stroke="#DF4982" stroke-width="2px" marker-end="url(#pinkarrow)"/>
			
			<line x1="` + (event2.right-10) + `" y1="` + (event2.bottom-((event2.bottom - event2.top)/2)) + `" x2="` + (event3.left+5) + `" y2="` + (event3.bottom-((event3.bottom - event3.top)/2)) + `" stroke="#DF4982" stroke-width="2px" marker-end="url(#pinkarrow)"/>
			<line x1="` + (event2.right-50) + `" y1="` + (event2.top+3) + `" x2="` + (PLATL.right-((PLATL.right - PLATL.left)/2)) + `" y2="` + (PLATL.bottom-10) + `" stroke="#9A65F6" stroke-width="2px" stroke-dasharray="3" marker-end="url(#purplearrow)"/>
			
			
			<path d="M `+ event3x + ` ` + (event3.top+5) + ` C ` + (event3x+250) + ` ` + (event3.top-250) + `, ` + (event4a.left-100) + ` ` + (event4a.bottom+100) + `, ` + (event4a.left+20) + ` ` + (event4a.bottom-8) + `" stroke="#27b9fd" stroke-width="2px" fill="none" stroke-dasharray="3" marker-end="url(#bluearrow)"/>
			<path d="M `+ event3x + ` ` + (event3.top+5) + ` C ` + (event3x+250) + ` ` + (event3.top-250) + `, ` + (event4b.left-100) + ` ` + (event4b.bottom+100) + `, ` + (event4b.left+8) + ` ` + (event4b.bottom-8) + `" stroke="#27b9fd" stroke-width="2px" fill="none" stroke-dasharray="3" marker-end="url(#bluearrow)"/>
			
			<line x1="` + (event4a.right-((event4a.right - event4a.left)/2)) + `" y1="` + (event4a.bottom-5) + `" x2="` + (event5.right-((event5.right - event5.left)/2)) + `" y2="` + event5.top + `" stroke="#DF4982" stroke-width="2px" marker-end="url(#pinkarrow)"/>
			
			<line x1="` + (event5.right-((event5.right - event5.left)/2)) + `" y1="` + (event5.bottom-5) + `" x2="` + (VOY.right-((VOY.right - VOY.left)/2)) + `" y2="` + VOY.top + `" stroke="#DF4982" stroke-width="2px" marker-end="url(#pinkarrow)"/>
			<line x1="` + (VOY.right-((VOY.right - VOY.left)/2)) + `" y1="` + (VOY.bottom-5) + `" x2="` + (event4b.right-((event4b.right - event4b.left)/2)) + `" y2="` + event4b.top + `" stroke="#DF4982" stroke-width="2px" marker-end="url(#pinkarrow)"/>
			
			<line x1="` + (event4b.right-((event4b.right - event4b.left)/2)) + `" y1="` + (event4b.bottom-5) + `" x2="` + (event6.right-((event6.right - event6.left)/2)) + `" y2="` + event6.top + `" stroke="#DF4982" stroke-width="2px" marker-end="url(#pinkarrow)"/>
			<line x1="` + (event6.right-((event6.right - event6.left)/2)) + `" y1="` + (event6.bottom-5) + `" x2="` + (event7.right-((event7.right - event7.left)/2)) + `" y2="` + (event7.top+8) + `" stroke="#DF4982" stroke-width="2px" marker-end="url(#pinkarrow)"/>
			
			<line x1="` + (event7.right-15) + `" y1="` + (event7.bottom+3-((event7.bottom - event7.top)/2)) + `" x2="` + (event8.left+5) + `" y2="` + (event8.bottom+3-((event8.bottom - event8.top)/2)) + `" stroke="#DF4982" stroke-width="2px" marker-end="url(#pinkarrow)"/>
			
			<line x1="` + (event8.right-((event8.right - event8.left)/2)) + `" y1="` + (event8.bottom-5) + `" x2="` + (event9.right-((event9.right - event9.left)/2)) + `" y2="` + event9.top + `" stroke="#27b9fd" stroke-width="2px" stroke-dasharray="3" marker-end="url(#bluearrow)"/>
			
			<line x1="` + (event9.right-10) + `" y1="` + (event9.bottom-((event9.bottom - event9.top)/2)) + `" x2="` + (event10.left+10) + `" y2="` + (event10.bottom-((event10.bottom - event10.top)/2)) + `" stroke="#DF4982" stroke-width="2px" marker-end="url(#pinkarrow)"/>
			
			<path d="M `+ (event9x+50) + ` ` + (event9.top+5) + ` C ` + (event9x+200) + ` ` + (event9.top-250) + `, ` + (event11.left-20) + ` ` + (event11.bottom+100) + `, ` + (event11.left+50) + ` ` + (event11.bottom) + `" stroke="#9A65F6" stroke-width="2px" fill="none" stroke-dasharray="3" marker-end="url(#purplearrow)"/>
			
			<line x1="` + (event10.right-((event10.right - event10.left)/2)) + `" y1="` + (event10.top) + `" x2="` + (event12.right-((event12.right - event12.left)/2)) + `" y2="` + (event12.bottom) + `" stroke="#27b9fd" stroke-width="2px" stroke-dasharray="3"  marker-end="url(#bluearrow)"/>
			
			<line x1="` + (event11.right-((event11.right - event11.left)/2)) + `" y1="` + (event11.bottom-5) + `" x2="` + (event12.right-((event12.right - event12.left)/2)) + `" y2="` + event12.top + `" stroke="#DF4982" stroke-width="2px" marker-end="url(#pinkarrow)"/>
			
			<line x1="` + (event12.right-15) + `" y1="` + (event12.bottom+3-((event12.bottom - event12.top)/2)) + `" x2="` + (event13.left+5) + `" y2="` + (event13.bottom+3-((event13.bottom - event13.top)/2)) + `" stroke="#DF4982" stroke-width="2px" marker-end="url(#pinkarrow)"/>
			<line x1="` + (event13.right-((event13.right - event13.left)/2)) + `" y1="` + (event13.bottom-5) + `" x2="` + (event14.right-((event14.right - event14.left)/2)) + `" y2="` + (event14.top+8) + `" stroke="#DF4982" stroke-width="2px" marker-end="url(#pinkarrow)"/>
			
			<path d="M `+ (event14.left) + ` ` + (event14.top+30) + ` C ` + (event14.left-1000) + ` ` + (event14.top+250) + `, ` + (PLATL.left-20) + ` ` + (PLATL.bottom+100) + `, ` + (PLATL.left+50) + ` ` + (PLATL.bottom-10) + `" stroke="#9A65F6" stroke-width="2px" fill="none" stroke-dasharray="8" marker-end="url(#purplearrow)"/>
			
			
			

			
	</svg>`;
		
	document.getElementById("svgOverlay").innerHTML = content;
}

window.addEventListener('resize', function(event) {
    drawLines();
}, true);


window.onload = function() {

	// Draw the SVG overlay
	drawLines();
	
	var bottomBorder = document.getElementById('bottomBorder');
	setTimeout(function(){bottomBorder.style.width = '100%'},800);	
}