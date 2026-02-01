var marqueeInterval;
let pageIndex = 0;
const speed = 8000; // Time in milliseconds for each page
var pageIndicator;
var track;
var pages;
var year;

document.addEventListener('DOMContentLoaded', function() {

	track = document.getElementById('mainMarqueeTrack');

	// Get today's date and format as needed
	var today = new Date();
	var monthAndDate = today.toLocaleDateString("en-US", {month: 'long', day: 'numeric'});
	year = today.toLocaleDateString("en-US", {year: 'numeric'});

	// Add automatic marquee pages
	// Pages that appear later in this list appear sooner in the marquee (unless it doesn't follow the template)
	
	
	if (year == '2026' && monthAndDate != 'September 8') {
		track.innerHTML += marqueePage_60thYear;
	}
	
	if (monthAndDate.includes("October")) {
		track.innerHTML = marqueePage_SpookyOctober + track.innerHTML;
	}
	
	switch (monthAndDate) {
		case "January 3":
			track.innerHTML = marqueePage_DS9Premieres + track.innerHTML;
			break;
		case "January 15":
			track.innerHTML = marqueePage_SAPremieres + track.innerHTML;
			break;
		case "January 16":
			track.innerHTML = marqueePage_VOYPremieres + track.innerHTML;
			break;
		case "January 23":
			track.innerHTML = marqueePage_PICPremieres + track.innerHTML;
			break;
		case "January 24":
			track.innerHTML = marqueePage_S31Released + track.innerHTML;
			break;
		case "February 1":
			track.innerHTML = marqueePage_C6ReviewsDebut + track.innerHTML;
			break;
		case "March 22":
			track.innerHTML = marqueePage_KirkBirthday + track.innerHTML;
			break;
		case "April 5":
			track.innerHTML = marqueePage_DayOfHonor + track.innerHTML;
			break;
		case "April 22":
			track.innerHTML = marqueePage_AncestorsEve + track.innerHTML;
			break;
		case "May 5":
			track.innerHTML = marqueePage_SNWPremieres + track.innerHTML;
			break;
		case "May 8":
			track.innerHTML = marqueePage_startrek2009Released + track.innerHTML;
			break;
		case "May 16":
			track.innerHTML = marqueePage_intodarknessReleased + track.innerHTML;
			break;
		case "May 20":
			track.innerHTML = marqueePage_JanewayBirthday + track.innerHTML;
			break;
		case "June 1":
			track.innerHTML = marqueePage_tsfsReleased + track.innerHTML;
			break;
		case "June 4":
			track.innerHTML = marqueePage_twokReleased + track.innerHTML;
			break;
		case "June 9":
			track.innerHTML = marqueePage_tffReleased + track.innerHTML;
			break;
		case "June 16":
			track.innerHTML = marqueePage_CaptainPicardDay + track.innerHTML;
			break;
		case "July 13":
			track.innerHTML = marqueePage_PicardBirthday + track.innerHTML;
			break;
		case "July 22":
			track.innerHTML = marqueePage_beyondReleased + track.innerHTML;
			break;
		case "August 6":
			track.innerHTML = marqueePage_LOWPremieres + track.innerHTML;
			break;
		case "August 6":
			track.innerHTML = marqueePage_LOWPremieres + track.innerHTML;
			break;
		case "August 6":
			track.innerHTML = marqueePage_LOWPremieres + track.innerHTML;
			break;
		case "September 8":
			if (year == '2026') {
				track.innerHTML = marqueePage_STARTREK60TH + track.innerHTML;
			} else {
				track.innerHTML = marqueePage_StarTrekDay + track.innerHTML;
			}
			break;
		case "August 24":
			track.innerHTML = marqueePage_DISPremieres + track.innerHTML;
			break;
		case "September 26":
			track.innerHTML = marqueePage_ENTPremieres + track.innerHTML;
			break;
		case "September 28":
			track.innerHTML = marqueePage_TNGPremieres + track.innerHTML;
			break;
		case "October 28":
			track.innerHTML = marqueePage_PROPremieres + track.innerHTML;
			break;
		case "November 26":
			track.innerHTML = marqueePage_tvhReleased + track.innerHTML;
			break;
		case "December 6":
			track.innerHTML = marqueePage_tucReleased + track.innerHTML;
			break;
		case "December 7":
			track.innerHTML = marqueePage_tmpReleased + track.innerHTML;
			break;
		case "December 11":
			track.innerHTML = marqueePage_insurrectionReleased + track.innerHTML;
			break;
		case "December 13":
			track.innerHTML = marqueePage_nemesisReleased + track.innerHTML;
			break;
	}
	
	Array.from(document.querySelectorAll('.yearDiff')).forEach(div => {
		var diff = year - div.innerHTML;
		if (diff == 1) {
			diff += " year";
		} else {
			diff += " years";
		}	
		div.innerHTML = diff;
	});
		
		
	pages = track.querySelectorAll('.marquee-page');
	
	if (pages.length == 1) {
		document.getElementById('mainMarquee').querySelector('.marquee-controls').style.display = 'none';
	}
	
	pageIndicator = document.getElementById('mainMarquee').querySelector('.marquee-page-indicator');
	pageIndicator.innerHTML += "●";
	pageIndicator.innerHTML += "○".repeat(pages.length-1);
	
	marqueeInterval = setInterval(scrollPages, speed);

});


function scrollPages(dir = "next") {
	  if (dir == "next") {
		pageIndex++;
		if (pageIndex >= pages.length) {
			pageIndex = 0;
		}
	  } else {
		pageIndex--;
		if (pageIndex < 0) {
			pageIndex = pages.length-1;
		}
	  }
	  
	  if(marqueeInterval){
		  clearInterval(marqueeInterval);
		  marqueeInterval = null;
		  marqueeInterval = setInterval(scrollPages, speed);
	  }
	  
	  const offset = -pageIndex * 100;
	  track.style.transform = `translateX(${offset}%)`;
	  
	  pageIndicator.innerHTML = "○".repeat(pageIndex);
	  pageIndicator.innerHTML += "●";
	  pageIndicator.innerHTML += "○".repeat(pages.length-pageIndex-1);
}


function pauseMarquee(ele) {
	if(marqueeInterval){
		clearInterval(marqueeInterval);
		marqueeInterval = null;
		ele.style.color = "yellow";
	} else {
		marqueeInterval = setInterval(scrollPages, speed);
		ele.style.color = "";
	}
}




// **************************************************************************************************
//	SPECIAL PAGES
// **************************************************************************************************

var marqueePage_60thYear = `
	<div class="marquee-page">
		<img class="marqueeImg" src="images/main-header60.png">
		<div class="marqueeTitle">2026 is Star Trek's 60th Anniversary year!</div>
		<div class="marqueeSubtitle"></div>
		<div class="marqueeContent"><em>Star Trek</em> is celebrating it's 60th Anniversary all year long, in honor of September 8, 1966, when the first episode of <em>Star Trek: The Original Series</em> aired, bringing <em>Trek</em> to the world for the very first time!</div>
	</div>`

var marqueePage_STARTREK60TH = `
	<div class="marquee-page">
		<img class="marqueeImg" src="images/main-header60.png">
		<div class="marqueeTitle">STAR TREK 60<SUP style="font-size:20px">TH</SUP> ANNIVERSARY!</div>
		<div class="marqueeSubtitle">September 8, 2026</div>
		<div class="marqueeContent">60 years ago today, the first episode of the Original Series aired on television, bringing <em>Star Trek</em> to the world for the very first time!</div>
	</div>`

// **************************************************************************************************
//	SEASONAL PAGES
// **************************************************************************************************

var marqueePage_SpookyOctober = `
	<div class="marquee-page">
		<img class="marqueeImg" src="blog/images/2025-10-31/allthosewhowander.png">
		<div class="marqueeTitle">HALLOWEEN EPISODE WATCH-LIST</div>
		<div class="marqueeSubtitle">🎃👻🧛‍♂️</div>
		<div class="marqueeContent">Whether haunting or disturbing or downright chilling, <a href="blog/2025-10-31-Halloween_Episode_Watch-List.html">here are twelve</a> of the best episodes of the Star Trek franchise to watch for the Halloween spooky season!
		</div>
	</div>`


// **************************************************************************************************
//	ANNIVERSARY PAGES
// **************************************************************************************************


var marqueePage_DS9Premieres = `
	<div class="marquee-page">
		<img class="marqueeImg" src="ds9/images/ds9-1x01.png">
		<div class="marqueeTitle">January 3</div>
		<div class="marqueeSubtitle">ON THIS DAY</div>
		<div class="marqueeContent"><div class="yearDiff">1993</div> ago on January 3, 1993, <a href="ds9/ds9-s1.html#e01">&ldquo;Emissary&rdquo;</a>, the first episode of <a href="ds9/index.html"><em>Star Trek: Deep Space Nine</em></a> aired!</div>
	</div>`

var marqueePage_SAPremieres = `
	<div class="marquee-page">
		<img class="marqueeImg" src="images/marquee/SAPremieres.png">
		<div class="marqueeTitle">January 15</div>
		<div class="marqueeSubtitle">ON THIS DAY</div>
		<div class="marqueeContent"><div class="yearDiff">2026</div> ago on January 15, 2026, <a href="sa/sa-s1.html#e01">&ldquo;Kids These Days&rdquo;</a>, the first episode of <a href="sa/index.html"><em>Star Trek: Starfleet Academy</em></a> aired!</div>
	</div>`
	
var marqueePage_VOYPremieres = `
	<div class="marquee-page">
		<img class="marqueeImg" src="voy/images/voy-1x01.png">
		<div class="marqueeTitle">January 16</div>
		<div class="marqueeSubtitle">ON THIS DAY</div>
		<div class="marqueeContent"><div class="yearDiff">1995</div> ago on January 16, 1995, <a href="voy/voy-s1.html#e01">&ldquo;Caretaker&rdquo;</a>, the first episode of <a href="voy/index.html"><em>Star Trek: Voyager</em></a> aired!</div>
	</div>`
	
var marqueePage_PICPremieres = `
	<div class="marquee-page">
		<img class="marqueeImg" src="images/marquee/pic1x01-43.png">
		<div class="marqueeTitle">January 23</div>
		<div class="marqueeSubtitle">ON THIS DAY</div>
		<div class="marqueeContent"><div class="yearDiff">2020</div> ago on January 23, 2020, <a href="pic/pic-s1.html#e01">&ldquo;Remembrance&rdquo;</a>, the first episode of <a href="pic/index.html"><em>Star Trek: Picard</em></a> aired!</div>
	</div>`
	
var marqueePage_S31Released = `
	<div class="marquee-page">
		<img class="marqueeImg" src="images/marquee/section31.png">
		<div class="marqueeTitle">January 24</div>
		<div class="marqueeSubtitle">ON THIS DAY</div>
		<div class="marqueeContent"><div class="yearDiff">2025</div> ago on January 24, 2025, the straight-to-streaming film <a href="films/section31.html"><em>Star Trek: Section 31</em></a> was released.</div>
	</div>`

var marqueePage_C6ReviewsDebut = `
	<div class="marquee-page">
		<img class="marqueeImg" src="images/marquee/c6-anniversary.png">
		<div class="marqueeTitle">February 1</div>
		<div class="marqueeSubtitle">ON THIS DAY</div>
		<div class="marqueeContent">C6Reviews &ndash; this website &ndash; is <div class="yearDiff">2025</div> old today!</div>
	</div>`
	
var marqueePage_KirkBirthday = `
	<div class="marquee-page">
		<img class="marqueeImg" src="images/marquee/kirk.png" style="margin-left:60px;">
		<div class="marqueeTitle">March 22 &ndash; James T. Kirk's Birthday</div>
		<div class="marqueeSubtitle">ON THIS DAY</div>
		<div class="marqueeContent">On March 22, 2233, James T. Kirk is born! Happy Birthday!</div>
	</div>`

var marqueePage_FirstContactDay = `
	<div class="marquee-page">
		<img class="marqueeImg" src="images/marquee/FirstContactDay.png">
		<div class="marqueeTitle">April 5 &ndash; First Contact Day</div>
		<div class="marqueeSubtitle">ON THIS DAY</div>
		<div class="marqueeContent">On April 5th, 2063, the Vulcans make First Contact with Earth. This story is told in the film <a href="films/firstcontact.html"><em>Star Trek: First Contact</em></a>.</div>
	</div>`
	
var marqueePage_AncestorsEve = `
	<div class="marquee-page">
		<img class="marqueeImg" src="voy/images/voy-5x23.png">
		<div class="marqueeTitle">April 22 - Ancestors' Eve</div>
		<div class="marqueeSubtitle">ON THIS DAY</div>
		<div class="marqueeContent">Ancestors' Eve was an impromptu holiday created by the <em>Voyager</em> crew on April 22, 2375, celebrating those who have come before. The holiday was conceived after Janeway told the story of her ancestor, Shannon O'Donnel, in <a href="voy/voy-s5.html#e23">VOY 5x23: 11:59</a>.</div>
	</div>`
	
var marqueePage_SNWPremieres = `
	<div class="marquee-page">
		<img class="marqueeImg" src="images/marquee/snw1x01-43.png">
		<div class="marqueeTitle">May 5</div>
		<div class="marqueeSubtitle">ON THIS DAY</div>
		<div class="marqueeContent"><div class="yearDiff">2022</div> ago on May 5, 2022, <a href="snw/snw-s1.html#e01">&ldquo;Strange New Worlds&rdquo;</a>, the first episode of <a href="snw/index.html"><em>Star Trek: Strange New Worlds</em></a> aired!</div>
	</div>`
	
var marqueePage_startrek2009Released = `
	<div class="marquee-page">
		<img class="marqueeImg" src="films/images/cover-11.webp" style="margin-left:60px;mask-image:unset;">
		<div class="marqueeTitle">May 8</div>
		<div class="marqueeSubtitle">ON THIS DAY</div>
		<div class="marqueeContent"><div class="yearDiff">2009</div> ago on May 8, 2009, the film <a href="films/startrek2009.html"><em>Star Trek</em></a> was released, bringing the alternate &ldquo;Kelvin Timeline&rdquo; to the big screen for the first time.</div>
	</div>`
	
var marqueePage_intodarknessReleased = `
	<div class="marquee-page">
		<img class="marqueeImg" src="films/images/cover-12.webp" style="margin-left:60px;mask-image:unset;">
		<div class="marqueeTitle">May 16</div>
		<div class="marqueeSubtitle">ON THIS DAY</div>
		<div class="marqueeContent"><div class="yearDiff">2013</div> ago on May 16, 2013, the film <a href="films/intodarkness.html"><em>Star Trek Into Darkness</em></a> was released. It's the 2nd of the &ldquo;Kelvin Timeline&rdquo; films.</div>
	</div>`
	
var marqueePage_JanewayBirthday = `
	<div class="marquee-page">
		<img class="marqueeImg"  src="images/marquee/janeway.png" style="margin-left:60px;mask-image:unset">
		<div class="marqueeTitle">May 20 &ndash; Kathryn Janeway's Birthday</div>
		<div class="marqueeSubtitle">ON THIS DAY</div>
		<div class="marqueeContent">On May 20, sometime in the 2330s, Kathryn Janeway is born! Happy Birthday!</div>
	</div>`
	
var marqueePage_tsfsReleased = `
	<div class="marquee-page">
		<img class="marqueeImg" src="films/images/cover-3.webp" style="margin-left:60px;mask-image:unset;">
		<div class="marqueeTitle">June 1</div>
		<div class="marqueeSubtitle">ON THIS DAY</div>
		<div class="marqueeContent"><div class="yearDiff">1984</div> ago on June 1, 1984, the film <a href="films/iii-tsfs.html"><em>Star Trek III: The Search for Spock</em></a> was released.</div>
	</div>`	
	
var marqueePage_twokReleased = `
	<div class="marquee-page">
		<img class="marqueeImg" src="films/images/cover-2.webp" style="margin-left:60px;mask-image:unset;">
		<div class="marqueeTitle">June 4</div>
		<div class="marqueeSubtitle">ON THIS DAY</div>
		<div class="marqueeContent"><div class="yearDiff">1982</div> ago on June 4, 1982, the film <a href="films/ii-twok.html"><em>Star Trek II: The Wrath of Khan</em></a> was released.</div>
	</div>`	
	
var marqueePage_tffReleased = `
	<div class="marquee-page">
		<img class="marqueeImg" src="films/images/cover-5.webp" style="margin-left:60px;mask-image:unset;">
		<div class="marqueeTitle">June 9</div>
		<div class="marqueeSubtitle">ON THIS DAY</div>
		<div class="marqueeContent"><div class="yearDiff">1989</div> ago on June 9, 1989, the film <a href="films/v-tff.html"><em>Star Trek V: The Final Frontier</em></a> was released.</div>
	</div>`	

var marqueePage_CaptainPicardDay = `
	<div class="marquee-page">
		<img class="marqueeImg" src="images/marquee/CaptainPicardDay.png">
		<div class="marqueeTitle">June 16 &ndash; Captain Picard Day</div>
		<div class="marqueeSubtitle">ON THIS DAY*</div>
		<div class="marqueeContent"><p>Happy Captain Picard Day! This was an annual event held aboard the Enterprise-D for the ship's children, as seen in <a href="tng/tng-s7.html#e12">TNG 7x12: The Pegasus</a>.</p><p style="font-size:small;font-style:italic">* Although the date is not officially confirmed by a canon source, fans calculated the stardate given in the episode &ldquo;The Pegasus&rdquo; to be equivalent to June 16.</div>
	</div>`	
	
var marqueePage_PicardBirthday = `
	<div class="marquee-page">
		<img class="marqueeImg"  src="images/marquee/picard.png" style="margin-left:60px;mask-image:unset">
		<div class="marqueeTitle">July 13 &ndash; Jean-Luc Picard's Birthday</div>
		<div class="marqueeSubtitle">ON THIS DAY</div>
		<div class="marqueeContent">On July 13, 2305, Jean-Luc Picard is born! Happy Birthday!</div>
	</div>`
	
var marqueePage_beyondReleased = `
	<div class="marquee-page">
		<img class="marqueeImg" src="films/images/cover-13.webp" style="margin-left:60px;mask-image:unset;">
		<div class="marqueeTitle">July 22</div>
		<div class="marqueeSubtitle">ON THIS DAY</div>
		<div class="marqueeContent"><div class="yearDiff">2016</div> ago on July 22, 2016, the film <a href="films/beyond.html"><em>Star Trek Beyond</em></a> was released. It's the 3rd of the &ldquo;Kelvin Timeline&rdquo; films.</div>
	</div>`	

var marqueePage_LOWPremieres = `
	<div class="marquee-page">
		<img class="marqueeImg" src="images/marquee/low1x01-43.png">
		<div class="marqueeTitle">August 6</div>
		<div class="marqueeSubtitle">ON THIS DAY</div>
		<div class="marqueeContent"><div class="yearDiff">2020</div> ago on August 6, 2020, <a href="low/low-s1.html#e01">&ldquo;Second Contact&rdquo;</a>, the first episode of <a href="low/index.html"><em>Star Trek: Lower Decks</em></a> aired!</div>
	</div>`	
	
var marqueePage_StarTrekDay = `
	<div class="marquee-page">
		<img class="marqueeImg" src="images/main-header.png">
		<div class="marqueeTitle">STAR TREK DAY!</div>
		<div class="marqueeSubtitle">September 8, 1966</div>
		<div class="marqueeContent"><div class="yearDiff">1966</div> ago today, the first episode of <a href="tos/index.html"><em>Star Trek: The Original Series</em></a> aired on television, bringing <em>Star Trek</em> to the world for the first time. Also, <div class="yearDiff">1973</div> ago today, on September 8, 1973, the first episode of <a href="tas/index.html"><em>Star Trek: The Animated Series</em></a> aired.</div>
	</div>`
	
var marqueePage_DISPremieres = `
	<div class="marquee-page">
		<img class="marqueeImg" src="images/marquee/dis1x01-43.png">
		<div class="marqueeTitle">August 24</div>
		<div class="marqueeSubtitle">ON THIS DAY</div>
		<div class="marqueeContent"><div class="yearDiff">2017</div> ago on August 24, 2017, <a href="dis/dis-s1.html#e01">&ldquo;The Vulcan Hello&rdquo;</a>, the first episode of <a href="dis/index.html"><em>Star Trek: Discovery</em></a> aired, bringing <em>Star Trek</em> back to the small screen for the first time since 2005!</div>
	</div>`
	
var marqueePage_ENTPremieres = `
	<div class="marquee-page">
		<img class="marqueeImg" src="images/marquee/ent1x01-43.png">
		<div class="marqueeTitle">September 26</div>
		<div class="marqueeSubtitle">ON THIS DAY</div>
		<div class="marqueeContent"><div class="yearDiff">2001</div> ago on September 26, 2001, <a href="ent/ent-s1.html#e01">&ldquo;Broken Bow&rdquo;</a>, the first episode of <a href="ent/index.html"><em>Star Trek: Enterprise</em></a> aired!</div>
	</div>`
	
var marqueePage_TNGPremieres = `
	<div class="marquee-page">
		<img class="marqueeImg" src="tng/images/tng-1x01.png">
		<div class="marqueeTitle">September 28</div>
		<div class="marqueeSubtitle">ON THIS DAY</div>
		<div class="marqueeContent"><div class="yearDiff">1987</div> ago on September 28, 1987, <a href="tng/tng-s1.html#e01">&ldquo;Encounter at Farpoint&rdquo;</a>, the first episode of <a href="tng/index.html"><em>Star Trek: The Next Generation</em></a> aired!</div>
	</div>`	
	
var marqueePage_PROPremieres = `
	<div class="marquee-page">
		<img class="marqueeImg" src="images/marquee/pro1x01-43.png">
		<div class="marqueeTitle">October 28</div>
		<div class="marqueeSubtitle">ON THIS DAY</div>
		<div class="marqueeContent"><div class="yearDiff">2021</div> ago on October 28, 2021, <a href="pro/pro-s1.html#e01">&ldquo;Lost and Found&rdquo;</a>, the first episode of <a href="pro/index.html"><em>Star Trek: Prodigy</em></a> aired!</div>
	</div>`
	
var marqueePage_generationsReleased = `
	<div class="marquee-page">
		<img class="marqueeImg" src="films/images/cover-7.webp" style="margin-left:60px;mask-image:unset;">
		<div class="marqueeTitle">November 18</div>
		<div class="marqueeSubtitle">ON THIS DAY</div>
		<div class="marqueeContent"><div class="yearDiff">1994</div> ago on November 18, 1994, the film <a href="films/generations.html"><em>Star Trek Generations</em></a> was released, bringing two legendary captains together to save the galaxy!</div>
	</div>`
	
var marqueePage_firstcontactReleased = `
	<div class="marquee-page">
		<img class="marqueeImg" src="films/images/cover-8.webp" style="margin-left:60px;mask-image:unset;">
		<div class="marqueeTitle">November 22</div>
		<div class="marqueeSubtitle">ON THIS DAY</div>
		<div class="marqueeContent"><div class="yearDiff">1996</div> ago on November 22, 1996, the film <a href="films/firstcontact.html"><em>Star Trek: First Contact</em></a> was released, revealing the Borg Queen to us for the first time!</div>
	</div>`
	
var marqueePage_tvhReleased = `
	<div class="marquee-page">
		<img class="marqueeImg" src="films/images/cover-4.webp" style="margin-left:60px;mask-image:unset;">
		<div class="marqueeTitle">November 26</div>
		<div class="marqueeSubtitle">ON THIS DAY</div>
		<div class="marqueeContent"><div class="yearDiff">1986</div> ago on November 26, 1986, the film <a href="films/iv-tvh.html"><em>Star Trek IV: The Voyage Home</em></a> was released!</div>
	</div>`
	
var marqueePage_tucReleased = `
	<div class="marquee-page">
		<img class="marqueeImg" src="films/images/cover-6.webp" style="margin-left:60px;mask-image:unset;">
		<div class="marqueeTitle">December 6</div>
		<div class="marqueeSubtitle">ON THIS DAY</div>
		<div class="marqueeContent"><div class="yearDiff">1991</div> ago on December 6, 1991, the film <a href="films/vi-tuc.html"><em>Star Trek VI: The Undiscovered Country</em></a> was released!</div>
	</div>`
	
var marqueePage_tmpReleased = `
	<div class="marquee-page">
		<img class="marqueeImg" src="films/images/cover-1.webp" style="margin-left:60px;mask-image:unset;">
		<div class="marqueeTitle">December 7</div>
		<div class="marqueeSubtitle">ON THIS DAY</div>
		<div class="marqueeContent"><div class="yearDiff">1979</div> ago on December 7, 1979, the film <a href="films/tmp.html"><em>Star Trek: The Motion Picture</em></a> was released!</div>
	</div>`
	
var marqueePage_insurrectionReleased = `
	<div class="marquee-page">
		<img class="marqueeImg" src="films/images/cover-9.webp" style="margin-left:60px;mask-image:unset;">
		<div class="marqueeTitle">December 11</div>
		<div class="marqueeSubtitle">ON THIS DAY</div>
		<div class="marqueeContent"><div class="yearDiff">1998</div> ago on December 11, 1998, the film <a href="films/insurrection.html"><em>Star Trek: Insurrection</em></a> was released!</div>
	</div>`
	
var marqueePage_nemesisReleased = `
	<div class="marquee-page">
		<img class="marqueeImg" src="films/images/cover-10.webp" style="margin-left:60px;mask-image:unset;">
		<div class="marqueeTitle">December 13</div>
		<div class="marqueeSubtitle">ON THIS DAY</div>
		<div class="marqueeContent"><div class="yearDiff">2002</div> ago on December 13, 2002, the film <a href="films/nemesis.html"><em>Star Trek: Nemesis</em></a> was released!</div>
	</div>`