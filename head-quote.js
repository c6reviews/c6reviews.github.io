var quotebox;
var content;

const seriousQuotes = [

	["images/headquotes/hq-twok-1.png","A bloodied Khan","From hell's heart, I stab at thee. For hate's sake, I spit my last breath... at thee.","Khan Noonien Singh","films/ii-twok.html","<em>Star Trek II: The Wrath of Khan</em>"],
	
	["images/headquotes/hq-ent-1x01.png","Numerous spectators viewing a video recording of Zefram Cochrane speaking","Imagine it. Thousands of inhabited planets at our fingertips, and we'll be able to explore those strange new worlds and seek out new life and new civilizations. This engine will let us go boldly where no man has gone before.","Zefram Cochrane","ent/ent-s1.html#e01","ENT 1x01: Broken Bow"],
	
	["images/headquotes/hq-ds9-2x05.png","Garak having a conversation with Bashir over a cup of coffee","Truth, Doctor, is in the eye of the beholder. I never tell the truth because I don't believe there is such a thing. That's why I prefer the straight line simplicity of cutting cloth.","Garak","ds9/ds9-s2.html#e05","DS9 2x05: Cardassians"],
	
	["images/headquotes/hq-tng-2x09.png","Picard and Guinan having a discussion in Ten Forward","Consider that in the history of many worlds there have always been disposable creatures. They do the dirty work. They do the work that no one else wants to do because it's too difficult, or too hazardous. And an army of Datas, all disposable... you don't have to think about their welfare, you don't think about how they feel. Whole generations of disposable people.","Guinan","tng/tng-s2.html#e09","TNG 2x09: The Measure of a Man"],
	
	["images/headquotes/hq-tos-1x10.png","Kirk looking pensive as Spock taps controls in the background on the bridge","There's no such thing as the unknown, only things temporarily hidden, temporarily not understood.","Captain James T. Kirk","tos/tos-s1.html#e10","TOS 1x10: The Corbomite Maneuver"],
	
	["images/headquotes/hq-pic-2x04.png","Guinan, crying","This place is a pressure cooker. You know they’re actually killing the planet? Truth is whatever you want it to be; facts aren’t even facts anymore. A few folks have enough resources to fix all the problems for the rest, but they won’t &ndash; because their greatest fear is having less. They got one tiny ball in the entire galaxy, and all this species wants to do is fight.","Guinan","pic/pic-s2.html#e04","PIC 2x04: Watcher"],
	
	["images/headquotes/hq-tng-2x16.png","Q speaking to Picard on the bridge","If you can't take a little bloody nose, maybe you ought to go back home and crawl under your bed. It's not safe out here. It's wondrous, with treasures to satiate desires both subtle and gross, but it's not for the timid.","<span class='Q'>Q</span>","tng/tng-s2.html#e16","TNG 2x16: Q Who"],
	
	["images/headquotes/hq-voy-5x15.png","Captain Janeway crouching slightly to speak with young Naomi Wildman","There are three things to remember about being a starship captain: keep your shirt tucked in, go down with the ship, and never abandon a member of your crew.","Captain Kathryn Janeway","voy/voy-s5.html#e15","VOY 5x15/16: Dark Frontier"],
	
	["images/headquotes/hq-pic-2x05.png","Q speaking with Adam Soong at a booth in a diner","I am the evolution of stardust. I'm the gentle flutter of a butterfly. I am Death, destroyer of worlds. And I'm also a big fan of your work!","<span class='Q'>Q</span>","pic/pic-s2.html#e05","PIC 2x05: Fly Me to the Moon"],
	
	["images/headquotes/hq-gen-1.png","Picard and Riker conversing on the bridge of the Enterprise","I rather believe that time is a companion who goes with us on the journey, and reminds us to cherish every moment, because they'll never come again.","Captain Jean-Luc Picard","films/generations.html","<em>Star Trek Generations</em>"],
	
	["images/headquotes/hq-ds9-6x19.png","Captain Sisko performing a soliloquy directly into the camera","My father used to say that the road to Hell is paved with good intentions. I laid the first stone right there. I'd committed myself. I'd pay any price, go to any lengths, because my cause was righteous. My... intentions were good. In the beginning, that seemed like enough.","Captain Benjamin Sisko","ds9/ds9-s6.html#e19","DS9 6x19: In the Pale Moonlight"],
	
	["images/headquotes/hq-tng-3x16.png","Captain Picard in the Observation Lounge","There are times, sir, when men of good conscience cannot blindly follow orders. You acknowledge their sentience, but you ignore their personal liberties and freedom. Order a man to hand his child over to the state? Not while I am his captain.","Captain Jean-Luc Picard","tng/tng-s3.html#e16","TNG 3x16: The Offspring"],
	
	["images/headquotes/hq-tuc-1.png","Spock regarding Valeris in the reflection of his mirror","Logic is the beginning of wisdom... not the end.","Spock","films/vi-tuc.html","<em>Star Trek VI: The Undiscovered Country</em>"],
	
	["images/headquotes/hq-pic-2x09.png","Tallinn speaking with Picard in the solarium","Love can be a source of great grief and immense pain, of tremendous guilt, a reason to run from ourselves or away from each other. Love can be a curse, but always and completely... it's a gift.","Tallinn","pic/pic-s2.html#e09","PIC 2x09: Hide and Seek"],
	
	["images/headquotes/hq-tng-4x21.png","Captain Picard and Lieutenant Worf looking through the observation room windows on the Enterprise-D","Villains who twirl their mustaches are easy to spot; those who clothe themselves in good deeds are well-camouflaged. ...Someone like [that] will always be with us, waiting for the right climate in which to flourish, spreading fear in the name of righteousness. Vigilance, Mister Worf, that is the price we have to continually pay.","Captain Jean-Luc Picard","tng/tng-s4.html#e21","TNG 4x21: The Drumhead"]
]

const comedicQuotes = [

	["images/headquotes/hq-tng-1x03.png","A drunken Data looking quizzically at Picard","If you prick me, do I not... leak?","Data","tng/tng-s1.html#e03","TNG 1x03: The Naked Now"],
	
	["images/headquotes/hq-ds9-3x03.png","Grilka and Quark laughing together","I really am very grateful for all you have done, Quark. That is why I'm going to let you take your hand off my thigh, instead of shattering every bone in your body.","Grilka","ds9/ds9-s3.html#e03","DS9 3x03: The House of Quark"],
	
	["images/headquotes/hq-voy-1x06.png","The Doctor and Torres having a discussion in sickbay","Now there's an interesting concept: a hologram that programs himself. What would I do with that ability? Create a family... raise an army...","The Doctor","voy/voy-s1.html#e06","VOY 1x06: The Cloud"],
	
	["images/headquotes/hq-low-1x04.png","Lieutenant J.G. O'Connor turning a translucent-blue color while levitating and surrounded by the image of a large bird","The universe is balanced on the back of a giant koala! Why is he smiling? WHAT DOES HE KNOW?!","Lt. J.G. O'Connor","low/low-s1.html#e04","LOW 1x04: Moist Vessel"],
	
	["images/headquotes/hq-tng-4x05.png","Dr. Crusher alone on the bridge, tapping controls at the Ops station and looking concerned","If there's nothing wrong with <em>me</em>, maybe there's something wrong with the <em>universe</em>!","Doctor Beverly Crusher","tng/tng-s4.html#e05","TNG 4x05: Remember Me"],
	
	["images/headquotes/hq-tos-2x11.png","McCoy helping a pregnant woman climb a craggy incline","I'm a doctor, not an escalator!","Leonard &ldquo;Bones&rdquo; McCoy","tos/tos-s2.html#e11","TOS 2x11: Friday's Child"],
	
	["images/headquotes/hq-voy-1x16.png","Neelix, Torres, and Tuvok examining a lump of cheese sealed in a clear container","Get the cheese to sickbay.","B'Elanna Torres","voy/voy-s1.html#e16","VOY 1x16: Learning Curve"],
	
	["images/headquotes/hq-pic-1x02.png","Jurati and Picard, in his study","I never cared for science fiction. I guess I just didn't get it.","Jean-Luc Picard","pic/pic-s1.html#e02","PIC 1x02: Maps and Legends"],
	
	["images/headquotes/hq-tng-4x20.png","Worf, dressed as Will Scarlet, looking angry","Sir, I protest! I am not a merry man!","Worf","tng/tng-s4.html#e20","TNG 4x20: Qpid"],
	
	["images/headquotes/hq-ds9-1x18.png","Dax enjoying a colorful drink as Kira looks confused","You know what they say &ndash; put the shoe on the right foot first, but put the left foot first into the bathtub.","Jadzia Dax","ds9/ds9-s1.html#e18","DS9 1x18: Dramatis Personae"],
	
	["images/headquotes/hq-voy-6x18.png","Seven of Nine in the mess hall","Fun will now commence.","Seven of Nine","voy/voy-s6.html#e18","VOY 6x18: Ashes to Ashes"],
	
	["images/headquotes/hq-tng-5x23.png","The Borg drone known as Hugh","We are Hugh.","Hugh","tng/tng-s5.html#e23","TNG 5x23: I Borg"],
	
	["images/headquotes/hq-voy-6x24.png","The Doctor and Lewis Zimmerman being distracted by a talking iguana","Computer, deactivate iguana.","The Doctor","voy/voy-s6.html#e24","VOY 6x24: Life Line"],
	
	["images/headquotes/hq-ds9-5x25.png","Jake Sisko making an impassioned plea","The entire future of the galaxy may depend on us tracking down Willie Mays and stopping him.","Jake Sisko","ds9/ds9-s5.html#e25","DS9 5x25: In the Cards"],
	
	["images/headquotes/hq-pic-3x03.png","Worf returning a weapon to Raffi","I am Worf, son of Mogh, House of Martok, son of Sergey, House of Rozhenko, bane to the Duras family, slayer of Gowron. I have made some chamomile tea. Do you take sugar?","Worf","pic/pic-s3.html#e03","PIC 3x03: Seventeen Seconds"],
	
	["images/headquotes/hq-fc-2.png","A drunken Troi speaking to Riker","<strong>Timeline</strong>?! This is no <strong>time</strong> to argue about <strong>time</strong>... we don't... have... the <strong>time</strong>!","Deanna Troi","films/firstcontact.html","<em>Star Trek: First Contact</em>"]
	
]

// Alternate quotes from both lists into one big list
const quotePool = [];
const maxLength = Math.max(seriousQuotes.length, comedicQuotes.length);
for (let i=0; i<maxLength; i++) {
	if (i < seriousQuotes.length) {
		quotePool.push(seriousQuotes[i]);
	}
	if (i < comedicQuotes.length) {
		quotePool.push(comedicQuotes[i]);
	}
}

// Totals
// TOS: 03 + 01  =  4
// TNG: 05 + 05  = 10
// DS9: 02 + 03  =  5
// VOY: 01 + 04  =  5
// ENT: 01 + 00  =  1
// PIC: 03 + 02  =  5
// LOW: 00 + 01  =  1
// PRO: 00 + 00  =  0
// SNW: 00 + 00  =  0
// SFA: 00 + 00  =  0
//
// Total: 15 + 16  = 31


document.addEventListener('DOMContentLoaded', function() {

	quoteBox = document.getElementById('headquote');

	var today = new Date();
	var monthAndDate = today.toLocaleDateString("en-US", {month: 'long', day: 'numeric'});
	var year = today.toLocaleDateString("en-US", {year: 'numeric'});
	
	const laborDay = (function() {
		const sep1 = new Date(year, 8, 1);
		const sep1DOW = sep1.getDay();
		var daysToAdd = 0;
		if (sep1DOW != 1) {
			daysToAdd = (8 - sep1DOW) % 7;
		}
		return "September " + (sep1.getDate() + daysToAdd);
	})();
	const indigenousPeoplesDay = (function() {
		const oct1 = new Date(year, 9, 1);
		const oct1DOW = oct1.getDay();
		var daysToAdd = 0;
		if (oct1DOW != 1) {
			daysToAdd = (8 - oct1DOW) % 7;
		}
		return "October " + (oct1.getDate() + daysToAdd + 7);
	})();
	const thanksgiving = (function() {
		const nov1 = new Date(year, 10, 1);
		const nov1DOW = nov1.getDay();
		var daysToAdd = 0;
		if (nov1DOW != 4) {
			daysToAdd = (11 - nov1DOW) % 7;
		}
		return "November " + (nov1.getDate() + daysToAdd + 21);
	})();

	var easter = "";
	switch (year) {
		case "2026":
			easter = "April 5";
			break;
		case "2027":
			easter = "March 28";
			break;
		case "2028":
			easter = "April 16";
			break;
		case "2029":
			easter = "April 1";
			break;
		case "2030":
			easter = "April 21";
			break;
		case "2031":
			easter = "April 13";
			break;
		case "2032":
			easter = "March 28";
			break;
		case "2033":
			easter = "April 17";
			break;
		case "2034":
			easter = "April 9";
			break;
		case "2035":
			easter = "March 25";
			break;
	}
	
	var quote = [];

	switch (monthAndDate) {
		case "January 6":
			quote = ["images/headquotes/hq-snw-1x01.png","Captain Pike giving a speech with a video of the Capitol building burning in the background","You'll use competing ideas of liberty to bomb each other to rubble, just like we did, and then your last day will look just like this. Perhaps, somewhere, all your ends are written as indelibly as mine. But I choose to believe that your destinies are still your own. Maybe that's why I'm here &ndash; to remind you of the power of possibility. Maybe that's the good in seeing my future &ndash; that I might remind you that, right up until the very end, life is to be worn gloriously. Because, 'til our last moment, the future's what we make it. So... go to war with each other, or... join our Federation of Planets and reach for the stars. The choice is yours.","Captain Christopher Pike","snw/snw-s1.html#e01","SNW 1x01: Strange New Worlds"];
			break;
		case "February 14":
			quote = ["images/headquotes/hq-voy-3x11.png","Janeway and Q standing in front of a bed with red satin sheets and heart-shaped pillows","The night is young, and the sheets are satin.","<span class='Q'>Q</span>","voy/voy-s3.html#e11","VOY 3x11: The Q and the Grey"];
			break;
		case "April 1":
			quote = ["images/headquotes/hq-aprilfools.png","Patrick Stewart","Use the force, Harry.","Gandalf",'https://tardis.fandom.com/wiki/Genesis_of_the_Daleks_(TV_story)" target="_blank"',"DW 12x04: Genesis of the Daleks"];
			break;
		case "April 5":
			quote = ["images/headquotes/hq-fc-1.png","A Vulcan performing the traditional Vulcan salute","Live long and prosper.","Unnamed Vulcan","../films/firstcontact.html","<em>Star Trek: First Contact</em>"];
			break;	
		case easter:
			quote = ["images/headquotes/hq-tos-1x15.png","A human-sized white rabbit with a plaid jacket and pocket watch","Oh, my paws and whiskers! I'll be late!","Rabbit","../tos/tos-s1.html#e15","TOS 1x15: Shore Leave"];
			break;
		case laborDay:
			quote = ["images/headquotes/hq-ds9-4x16.png","Rom reading from a PADD and quoting Karl Marx","Workers of the world, unite! You have nothing to lose but your chains!","Rom","ds9/ds9-s4.html#e16","DS9 4x16: Bar Association"];
			break;
		case indigenousPeoplesDay:
			quote = ["images/headquotes/hq-tng-7x20.png","Wesley Crusher in his cadet's uniform","What you are doing down there is wrong. These people are not some random group of colonists; they are a unique culture with a history that predates the Federation and Starfleet.","Wesley Crusher","tng/tng-s7.html#e20","TNG 7x20: Journey's End"];
			break;
		case "October 31":
			quote = ["images/headquotes/hq-voy-2x23.png","A clown standing in shadows","I'm afraid.","The Clown","../voy/voy-s2.html#e23","VOY 2x23: The Thaw"];
			break;
		case thanksgiving:
			quote = ["images/headquotes/hq-snw-1x02.png","Pike, Spock, Una Chin-Riley, Ortegas, Uhura, and Chapel feasting at the dinner table","Sometimes, Mr. Spock, things go so badly you just have to laugh.","Captain Christopher Pike","../snw/snw-s1.html#e02","SNW 1x02: Children of the Comet"];
			break;
		case "December 31":
			quote = ["images/headquotes/hq-voy-5x23.png","Shannon O'Donnel, holding a cold pint of beer","Last year, when 2000 arrived? Everyone was convinced it was the dawn of a new era. But when the world didn't end and the flying saucers didn't land and the Y2K bug didn't turn off a single light bulb, you'd think everybody would have realized it was a number on a calendar. But, oh, no, they had to listen to all those hucksters who told them the real millennium was 2001. So this New Year's Eve will be as boring as last year.","Shannon O'Donnel","voy/voy-s5.html#e23","VOY 5x23: 11:59"];
			break;	
			
		default:
			var dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
			quoteNumber = (dayOfYear - 1) % quotePool.length;
			quote = quotePool[quoteNumber];
	}

	//quote = quotePool[0];   // <-- For testing only

	content = `
		<img src="${quote[0]}" alt="${quote[1]}">
		<div style="margin:0px 4px;">
			<span id="headquoteText">&ldquo;${quote[2]}&rdquo;</span>
			<br>&mdash; ${quote[3]},
			<br><a href="${quote[4]}" style="font-family:Exo,Roboto,sans-serif;font-weight:bold;white-space:normal">${quote[5]}</a>
			<br><span style="font-size:x-small;font-family:Exo,Roboto,sans-serif;border-top: 1px solid #909090">QUOTE OF THE DAY</span>
		</div>
	`

	quoteBox.innerHTML = content;

});