

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
	let consent_ad_user_data = getCookie('consent_ad_user_data');
	let consent_ad_personalization = getCookie('consent_ad_personalization');
	let consent_ad_storage = getCookie('consent_ad_storage');
	let consent_analytics_storage = getCookie('consent_analytics_storage');
	
	if (consent_ad_user_data == '' || consent_ad_personalization == '' || consent_ad_storage == '' || consent_analytics_storage == '') {
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

function setConsent(consent_ad_user_data,consent_ad_personalization,consent_ad_storage,consent_analytics_storage){
	setCookie('consent_ad_user_data',consent_ad_user_data,365);
	setCookie('consent_ad_personalization',consent_ad_personalization,365);
	setCookie('consent_ad_storage',consent_ad_user_data,365);
	setCookie('consent_analytics_storage',consent_ad_user_data,365);
	checkConsent();	
}

function unsetConsent(){
	setCookie('consent_ad_user_data','',-1);
	setCookie('consent_ad_personalization','',-1);
	setCookie('consent_ad_storage','',-1);
	setCookie('consent_analytics_storage','',-1);
	checkConsent();	
}

function displayConsentDialogue(){
	const popupBox = document.createElement('div');
	popupBox.id = 'popup-box';
	popupBox.style.backgroundColor = '#181818';
	popupBox.style.padding = '10px';
	popupBox.style.borderRadius = '5px';
	popupBox.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
	popupBox.style.width = 'fit-content';
	popupBox.style.textAlign = 'center';
	popupBox.style.position = 'fixed';
	popupBox.style.bottom = '10px';
	popupBox.style.left = '20px';

	const title = document.createElement('div');
	title.textContent = 'Cookie Notice';
	popupBox.appendChild(title);

	const message = document.createElement('div');
	message.textContent = 'We use cookies.';
	popupBox.appendChild(message);

	const rejectButton = document.createElement('button');
	rejectButton.textContent = 'Reject all cookies';
	rejectButton.style.margin = '15px 3px 3px 3px';
	rejectButton.style.padding = '10px 20px';
	rejectButton.style.cursor = 'pointer';
	rejectButton.style.backgroundColor = '#181818';
	rejectButton.style.border = '1px solid #D0D0D0';
	rejectButton.style.borderRadius = '4px';
	rejectButton.style.color = '#D0D0D0';

	const acceptButton = document.createElement('button');
	acceptButton.textContent = 'Accept all cookies';
	acceptButton.style.margin = '15px 3px 3px 3px';
	acceptButton.style.padding = '10px 20px';
	acceptButton.style.cursor = 'pointer';
	acceptButton.style.borderRadius = '4px';
	
	rejectButton.onclick = function() {
		setConsent('denied','denied','denied','denied');
		document.body.removeChild(popupBox);
	};
	acceptButton.onclick = function() {
		setConsent('granted','granted','granted','granted');
		document.body.removeChild(popupBox);
	};
	popupBox.appendChild(rejectButton);
	popupBox.appendChild(acceptButton);

	document.body.appendChild(popupBox);
}