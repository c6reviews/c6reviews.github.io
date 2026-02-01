const synth = window.speechSynthesis;
let utterance = new SpeechSynthesisUtterance();
let currentUtteranceID = "";


document.addEventListener('DOMContentLoaded', function() {
	
	const trd = Array.from(document.getElementsByClassName('ttsrate'));

	trd.forEach(dropdown => {
		dropdown.addEventListener('change', (event) => {
			const selectedValue = event.target.value;

			// Update all other dropdowns
			trd.forEach(otherDropdown => {
				if (otherDropdown !== event.target) { // Don't update the dropdown that triggered the event
					otherDropdown.value = selectedValue;
				}
			});
			
		});
	});	
	
	// Add TTS Tool Tip content
	
	document.getElementById('TTDIV').innerHTML += `<div id="ttsToolTip" class="tooltip" onClick="closeToolTip(this)">Text To Speech rate is slower in Chrome-based browsers. Speech rate cannot be changed while speaking -- this is a browser limitation.<br><span class="xx-small" style="display:table;margin:0 auto;">click or scroll to close</span></div>`
	
	// Add TTS Tool Tip onclick
	for (const item of document.getElementsByClassName('ttsicon')) {
		item.onclick = function(e){
			var tooltip = document.getElementById('ttsToolTip');
			var x = e.clientX,
				y = e.clientY;
				tooltip.style.top = (y+20) + 'px';
				tooltip.style.left = (x+20) + 'px';
				tooltip.style.display = 'block';
				tooltip.style.position = 'fixed';
		}
	}
	
});


function textToSpeech(id,text) {
	
	if(!synth.speaking || id != currentUtteranceID)
	{
		synth.cancel();
		
		// ********************************* GLOBAL TEXT REPLACEMENT RULES *********************************
			
			// Species and Homeworlds
			text = text.
				replaceAll("Betazed","Beta-zed").
				replaceAll("Cardassian","Card-ass-ian").
				replaceAll("Ferengi","Fer-ren-gii").
				replaceAll("Ferenginar","Fer-ren-geh-narr").
				replaceAll("Qo'noS","Kro-nohs").
				replaceAll("Reman","Reemin").
				replaceAll("Risa","Ryza").
				replaceAll("Romulan","Rahmulin").
				replaceAll("Xahean","zah-HEyan");
			
			// Characters
			text = text.
				replaceAll("B'Elanna","Bull-on-uh").
				replaceAll("B'Etor","bay-tor").
				replaceAll("Data's","Dayta's").
				replaceAll("Duras","Duross").
				replaceAll("Gowron","Gow-ron").
				replaceAll("Guinan","Guynan").
				replaceAll("Gul Dukat","Gull Dukaat").
				replaceAll("Hikaru","Hik-are-ooh").
				replaceAll("Icheb","E-chehb").
				replaceAll("La Forge","LaForge").
				replaceAll("Locutus","locude-us").
				replaceAll("Martok","Martock").
				replaceAll("Nagus","Naygus").
				replaceAll("Sarek","Sareck").
				replaceAll("Shinzon","Shinzahn").
				replaceAll("Tuvok","Two-vock");


			// Actors
			text = text.replaceAll("Takei","Tuh-kay");
		
			// Misc
			text = text.
				replaceAll(/ensign/gi,"ensin").
				replaceAll("Enterprise‑D's", "Enterprise‑Deez").
				replaceAll("d'état","d'etat,").
				replaceAll(/mythos/gi,"myth-ohhs").
				replaceAll("ol'","oul").
				replaceAll("PADD","pad").
				replaceAll(/\bPart I\b/g,"Part 1").
				replaceAll(/\bParts I\b/g,"Parts 1").
				replaceAll(/tricorder/gi,"try-corder").
				replaceAll(/trilithium/gi,"try-lithium").
				replaceAll(/voyage/gi,"voyij");
			
		// *************************************************************************************************
		
		setTimeout(() => {
			
			utterance.lang = "en-US";
			
			var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
			if (isSafari){
				let voices = speechSynthesis.getVoices();
				for (const voice of voices) {
					if (voice.name == "Reed" && voice.lang == "en-US"){
						utterance.voice = voice;
						break;
					}
				}
			} else {
				utterance.voice = speechSynthesis.getVoices()[1];
			}
			
			utterance.text = text;
			utterance.volume = 1;
			utterance.rate = document.getElementById('ttsratemain').value;
			utterance.pitch = 0.9;
			currentUtteranceID = id;
			document.getElementById(id+'pb').style.color = "limegreen";
			
			utterance.addEventListener('end', () => {
				document.getElementById(currentUtteranceID+'pb').style.color = "#D0D0D0";
			});
			
			synth.speak(utterance);
		}, "300");
		
	} else if (id == currentUtteranceID) {
		if (synth.paused) {
			synth.resume();
			document.getElementById(id+'pb').style.color = "limegreen";
		} else {
			synth.pause();
			document.getElementById(id+'pb').style.color = "yellow";
		}
	}
	
}

function speechStop() {
	synth.cancel();
	document.getElementById(currentUtteranceID+'pb').style.color = '#D0D0D0';
}


window.addEventListener('beforeunload', function() {
    // Stop any ongoing speech synthesis when the page is unloaded
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
});