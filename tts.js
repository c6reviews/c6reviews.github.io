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
		text = text.replaceAll(/\bPart I\b/g,"Part 1").replaceAll(/\bParts I\b/g,"Parts 1");
		// *************************************************************************************************
		
		setTimeout(() => {
			var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
			if (isSafari){
				utterance.voice = speechSynthesis.getVoices()[0];
			} else {
				utterance.voice = speechSynthesis.getVoices()[1];
			}
			
			utterance.text = text;
			utterance.volume = 1;
			utterance.rate = document.getElementById('ttsratemaster').value;
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