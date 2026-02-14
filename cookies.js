

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
}

function displayConsentDialogue(){
	const popupBox = document.createElement('div');
	popupBox.id = 'popup-box';
	popupBox.style.backgroundColor = '#181818';
	popupBox.style.padding = '10px';
	popupBox.style.border = '1px solid #BB4C1C';
	popupBox.style.borderRadius = '5px';
	popupBox.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
	popupBox.style.height = '300px';
	popupBox.style.width = '300px';
	popupBox.style.textAlign = 'center';
	popupBox.style.position = 'fixed';
	popupBox.style.bottom = '10px';
	popupBox.style.left = '20px';
	popupBox.style.zIndex = '9999';

	const title = document.createElement('div');
	title.textContent = 'Cookie Notice';
	title.style.fontWeight = 'bold';
	popupBox.appendChild(title);

	const message = document.createElement('div');
	message.textContent = "This site uses cookies to save your preferences, like whether you want to see spoilers or not! The site also uses Google Analytics, which uses cookies to tell me things like how people use my site and which of the pages are most popular. Settings can be changed at any time by using the 'Reset Cookie Preferences' link at the bottom of any page.";
	message.style.fontSize='small';
	popupBox.appendChild(message);

	const detailLink = document.createElement('a');
	detailLink.textContent = 'Manage preferences';
	detailLink.style.fontSize='small';
	detailLink.style.cursor = 'pointer';
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
		essentialCheckLabel.setAttribute('for', 'essentialCheck');
		essentialCheckLabel.textContent = 'Essential cookies';
		essentialCheckLabel.style.marginLeft = '10px';
		essentialCheckLabel.style.pointerEvents = 'none';
		checkboxDiv.appendChild(essentialCheckLabel);
		const essentialExplanation = document.createElement('div');
		essentialExplanation.textContent = 'Strictly necessary cookies needed to make the site function correctly.';
		essentialExplanation.style.marginLeft = '40px';
		essentialExplanation.style.fontSize = 'x-small';
		checkboxDiv.appendChild(essentialExplanation);
		const preferencesCheck = document.createElement('input');
		preferencesCheck.type = 'checkbox';
		preferencesCheck.id = 'preferencesCheck';
		preferencesCheck.checked = true;
		checkboxDiv.appendChild(preferencesCheck);
		const preferencesCheckLabel = document.createElement('label');
		preferencesCheckLabel.setAttribute('for', 'preferencesCheck');
		preferencesCheckLabel.textContent = 'Site preferences';
		preferencesCheckLabel.style.marginLeft = '10px';
		checkboxDiv.appendChild(preferencesCheckLabel);
		const preferencesExplanation = document.createElement('div');
		preferencesExplanation.textContent = 'Save settings like whether or not you want to see spoilers on the timeline.';
		preferencesExplanation.style.marginLeft = '40px';
		preferencesExplanation.style.fontSize = 'x-small';
		checkboxDiv.appendChild(preferencesExplanation);
		const analyticsCheck = document.createElement('input');
		analyticsCheck.type = 'checkbox';
		analyticsCheck.id = 'analyticsCheck';
		analyticsCheck.checked = true;
		checkboxDiv.appendChild(analyticsCheck);
		const analyticsCheckLabel = document.createElement('label');
		analyticsCheckLabel.setAttribute('for', 'analyticsCheck');
		analyticsCheckLabel.textContent = 'Analytics';
		analyticsCheckLabel.style.marginLeft = '10px';
		checkboxDiv.appendChild(analyticsCheckLabel);
		const analyticsExplanation = document.createElement('div');
		analyticsExplanation.textContent = 'Google Analytics collects anonymous information that helps me understand how visitors use my site — like which pages are most popular and how people navigate — so that I can improve performance and content.';
		analyticsExplanation.style.marginLeft = '40px';
		analyticsExplanation.style.fontSize = 'x-small';
		checkboxDiv.appendChild(analyticsExplanation);
		const marketingCheck = document.createElement('input');
		marketingCheck.type = 'checkbox';
		marketingCheck.id = 'marketingCheck';
		marketingCheck.checked = true;
		checkboxDiv.appendChild(marketingCheck);
		const marketingCheckLabel = document.createElement('label');
		marketingCheckLabel.setAttribute('for', 'marketingCheck');
		marketingCheckLabel.textContent = 'Marketing';
		marketingCheckLabel.style.marginLeft = '10px';
		checkboxDiv.appendChild(marketingCheckLabel);
		const marketingExplanation = document.createElement('div');
		marketingExplanation.textContent = 'Google Analytics may use these to show relevant ads on other websites.';
		marketingExplanation.style.marginLeft = '40px';
		marketingExplanation.style.fontSize = 'x-small';
		checkboxDiv.appendChild(marketingExplanation);
		
		const saveButton = document.createElement('button');
		saveButton.textContent = 'Save Preferences';
		saveButton.style.margin = '15px 3px 3px 3px';
		saveButton.style.padding = '10px 20px';
		saveButton.style.cursor = 'pointer';
		saveButton.style.borderRadius = '4px';
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
	rejectButton.textContent = 'Essential cookies only';
	rejectButton.style.display = 'block';
	rejectButton.style.margin = '3px auto 3px auto';
	rejectButton.style.padding = '10px 20px';
	rejectButton.style.cursor = 'pointer';
	rejectButton.style.backgroundColor = '#181818';
	rejectButton.style.border = '1px solid #D0D0D0';
	rejectButton.style.borderRadius = '4px';
	rejectButton.style.color = '#D0D0D0';
	rejectButton.style.width = '200px';

	const acceptButton = document.createElement('button');
	acceptButton.textContent = 'Accept all cookies';
	acceptButton.style.display = 'block';
	acceptButton.style.margin = '15px auto 3px auto';
	acceptButton.style.padding = '10px 20px';
	acceptButton.style.cursor = 'pointer';
	acceptButton.style.borderRadius = '4px';
	acceptButton.style.width = '200px';
	
	rejectButton.onclick = function() {
		setConsent('denied','denied','denied','denied','denied');
		document.body.removeChild(popupBox);
	};
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