

function setCookie(cname, cvalue, exdays, path = '/') {
	const d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=" + path;
}

function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function checkConsent(){	
	let consent_preferences = getCookie('consent_preferences');
	let consent_ad_user_data = getCookie('consent_ad_user_data');
	let consent_ad_personalization = getCookie('consent_ad_personalization');
	let consent_ad_storage = getCookie('consent_ad_storage');
	let consent_analytics_storage = getCookie('consent_analytics_storage');
		
	if (consent_preferences == '' || consent_ad_user_data == '' || consent_ad_personalization == '' || consent_ad_storage == '' || consent_analytics_storage == '') {
		// Display consent banner
		displayConsentDialogue();
		
	} else if (consent_ad_user_data == 'granted' || consent_ad_personalization == 'granted' || consent_ad_storage == 'granted' || consent_analytics_storage == 'granted') {
		// Update Google
		window.dataLayer = window.dataLayer || [];
		function gtag() { dataLayer.push(arguments); }
	
		const payloadJSON = `{
			"ad_user_data": "${consent_ad_user_data}",
			"ad_personalization": "${consent_ad_personalization}",
			"ad_storage": "${consent_ad_storage}",
			"analytics_storage": "${consent_analytics_storage}"
		}`
		const payload = JSON.parse(payloadJSON);
		gtag('consent', 'update', payload);
		
	}
}

function setConsent(consent_preferences,consent_ad_user_data,consent_ad_personalization,consent_ad_storage,consent_analytics_storage){
	setCookie('consent_preferences',consent_preferences,365);
	setCookie('consent_ad_user_data',consent_ad_user_data,365);
	setCookie('consent_ad_personalization',consent_ad_personalization,365);
	setCookie('consent_ad_storage',consent_ad_storage,365);
	setCookie('consent_analytics_storage',consent_analytics_storage,365);
	checkConsent();	
}

function unsetAllCookies(){
	setCookie('consent_preferences','',-1);
	setCookie('consent_ad_user_data','',-1);
	setCookie('consent_ad_personalization','',-1);
	setCookie('consent_ad_storage','',-1);
	setCookie('consent_analytics_storage','',-1);
	setConsent('','','','','');
	
	setCookie('PICallSpoilers','',-1);
	setCookie('timelineTOSspoilers','',-1);
	setCookie('timelineTNGspoilers','',-1);
	setCookie('timelineDS9spoilers','',-1);
	setCookie('timelineVOYspoilers','',-1);
	setCookie('timelineENTspoilers','',-1);
	setCookie('timelineKELVINspoilers','',-1);
	setCookie('timelineDISspoilers','',-1);
	setCookie('timelinePICspoilers','',-1);
	setCookie('timelineLOWspoilers','',-1);
	setCookie('timelinePROspoilers','',-1);
	setCookie('timelineSNWspoilers','',-1);
	setCookie('timelineDEATHspoilers','',-1);
	setCookie('timelineALLspoilers','',-1);
	
	const cookies = document.cookie.split(";");

	cookies.forEach(cookie => {
		const name = cookie.split("=")[0].trim();

		if (name.startsWith("_ga")) {
		  // Delete for current domain
		  document.cookie = name + "=; Max-Age=0; path=/";

		  // Delete for root domain (important!)
		  document.cookie = name + "=; Max-Age=0; path=/; domain=" + location.hostname;

		  // Also try removing subdomain prefix
		  const domainParts = location.hostname.split('.');
		  if (domainParts.length > 2) {
			const rootDomain = '.' + domainParts.slice(-2).join('.');
			document.cookie = name + "=; Max-Age=0; path=/; domain=" + rootDomain;
		  }
		}
	  });
	
}

function displayConsentDialogue(){
	const popupBox = document.createElement('div');
	popupBox.id = 'cookiePopup';

	const title = document.createElement('div');
	title.id = 'cPtitle';
	title.textContent = 'Cookie Notice';
	popupBox.appendChild(title);

	const message = document.createElement('div');
	message.id = 'cPmessage';
	message.textContent = "This site uses cookies to save your preferences, like whether you want to see spoilers or not! The site also uses Google Analytics, which uses cookies to tell me things like how people use my site and which of the pages are most popular. Settings can be changed at any time by using the 'Reset Cookie Preferences' link at the bottom of any page.";
	popupBox.appendChild(message);

	const detailLink = document.createElement('a');
	detailLink.id = "cPlink";
	detailLink.textContent = 'Manage preferences';

	detailLink.onclick = function() {
		popupBox.removeChild(message);
		popupBox.removeChild(detailLink);
		popupBox.removeChild(rejectButton);
		popupBox.removeChild(acceptButton);
		
		const checkboxDiv = document.createElement('div');
		checkboxDiv.style.textAlign = 'left';
		checkboxDiv.style.margin = 'auto';
		popupBox.appendChild(checkboxDiv);
		
		const essentialCheck = document.createElement('input');
		essentialCheck.type = 'checkbox';
		essentialCheck.id = 'essentialCheck';
		essentialCheck.checked = true;
		essentialCheck.style.pointerEvents = 'none';
		essentialCheck.style.accentColor = 'dimgray';
		checkboxDiv.appendChild(essentialCheck);
		const essentialCheckLabel = document.createElement('label');
		essentialCheckLabel.classList.add('cookieLabel');
		essentialCheckLabel.setAttribute('for', 'essentialCheck');
		essentialCheckLabel.textContent = 'Essential cookies';
		essentialCheckLabel.style.pointerEvents = 'none';
		checkboxDiv.appendChild(essentialCheckLabel);
		const essentialExplanation = document.createElement('div');
		essentialExplanation.classList.add('cookieExplanation');
		essentialExplanation.textContent = 'Strictly necessary cookies needed to make the site function correctly.';
		checkboxDiv.appendChild(essentialExplanation);
		const preferencesCheck = document.createElement('input');
		preferencesCheck.type = 'checkbox';
		preferencesCheck.id = 'preferencesCheck';
		preferencesCheck.checked = true;
		checkboxDiv.appendChild(preferencesCheck);
		const preferencesCheckLabel = document.createElement('label');
		preferencesCheckLabel.classList.add('cookieLabel');
		preferencesCheckLabel.setAttribute('for', 'preferencesCheck');
		preferencesCheckLabel.textContent = 'Site preferences';
		checkboxDiv.appendChild(preferencesCheckLabel);
		const preferencesExplanation = document.createElement('div');
		preferencesExplanation.classList.add('cookieExplanation');
		preferencesExplanation.textContent = 'Save settings like whether or not you want to see spoilers on the timeline.';
		checkboxDiv.appendChild(preferencesExplanation);
		const analyticsCheck = document.createElement('input');
		analyticsCheck.type = 'checkbox';
		analyticsCheck.id = 'analyticsCheck';
		analyticsCheck.checked = true;
		checkboxDiv.appendChild(analyticsCheck);
		const analyticsCheckLabel = document.createElement('label');
		analyticsCheckLabel.classList.add('cookieLabel');
		analyticsCheckLabel.setAttribute('for', 'analyticsCheck');
		analyticsCheckLabel.textContent = 'Analytics';
		checkboxDiv.appendChild(analyticsCheckLabel);
		const analyticsExplanation = document.createElement('div');
		analyticsExplanation.classList.add('cookieExplanation');
		analyticsExplanation.textContent = 'Google Analytics collects anonymous information that helps me understand how visitors use my site — like which pages are most popular and how people navigate — so that I can improve performance and content.';
		checkboxDiv.appendChild(analyticsExplanation);
		const marketingCheck = document.createElement('input');
		marketingCheck.type = 'checkbox';
		marketingCheck.id = 'marketingCheck';
		marketingCheck.checked = true;
		checkboxDiv.appendChild(marketingCheck);
		const marketingCheckLabel = document.createElement('label');
		marketingCheckLabel.classList.add('cookieLabel');
		marketingCheckLabel.setAttribute('for', 'marketingCheck');
		marketingCheckLabel.textContent = 'Marketing';
		checkboxDiv.appendChild(marketingCheckLabel);
		const marketingExplanation = document.createElement('div');
		marketingExplanation.classList.add('cookieExplanation');
		marketingExplanation.textContent = 'Google Analytics may use these to show relevant ads on other websites.';
		checkboxDiv.appendChild(marketingExplanation);
		
		const saveButton = document.createElement('button');
		saveButton.id = "cPsave";
		saveButton.textContent = 'Save Preferences';	
		saveButton.onclick = function() {
			var prefs = 'denied';
			var ads = 'denied';
			var stats = 'denied';
			if (document.getElementById('preferencesCheck').checked == true) { prefs = 'granted';}
			if (document.getElementById('marketingCheck').checked == true) { ads = 'granted';}
			if (document.getElementById('analyticsCheck').checked == true) { stats = 'granted';}	
			setConsent(prefs, ads, ads, ads, stats);
			document.body.removeChild(popupBox);
		};
		popupBox.appendChild(saveButton);
	};
	popupBox.appendChild(detailLink);
	

	const rejectButton = document.createElement('button');
	rejectButton.id = "cPreject";
	rejectButton.textContent = 'Essential cookies only';
	rejectButton.onclick = function() {
		setConsent('denied','denied','denied','denied','denied');
		document.body.removeChild(popupBox);
	};

	const acceptButton = document.createElement('button');
	acceptButton.id = "cPaccept";
	acceptButton.textContent = 'Accept all cookies';
	acceptButton.onclick = function() {
		setConsent('granted','granted','granted','granted','granted');
		document.body.removeChild(popupBox);
	};
	
	popupBox.appendChild(acceptButton);
	popupBox.appendChild(rejectButton);
	
	document.body.appendChild(popupBox);
}

document.addEventListener('DOMContentLoaded', function() {
	checkConsent();
});