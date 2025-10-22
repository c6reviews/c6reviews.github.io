const reviews = [
	'ds9/ds9-s1.html#e01','ds9/ds9-s1.html#e03','ds9/ds9-s1.html#e04','ds9/ds9-s1.html#e05','ds9/ds9-s1.html#e06','ds9/ds9-s1.html#e07','ds9/ds9-s1.html#e08','ds9/ds9-s1.html#e09','ds9/ds9-s1.html#e10','ds9/ds9-s1.html#e11','ds9/ds9-s1.html#e12','ds9/ds9-s1.html#e13','ds9/ds9-s1.html#e14','ds9/ds9-s1.html#e15','ds9/ds9-s1.html#e16','ds9/ds9-s1.html#e17','ds9/ds9-s1.html#e18','ds9/ds9-s1.html#e19','ds9/ds9-s1.html#e20',
	'ds9/ds9-s2.html#e01','ds9/ds9-s2.html#e02','ds9/ds9-s2.html#e03','ds9/ds9-s2.html#e04','ds9/ds9-s2.html#e05','ds9/ds9-s2.html#e06','ds9/ds9-s2.html#e07','ds9/ds9-s2.html#e08','ds9/ds9-s2.html#e09','ds9/ds9-s2.html#e10','ds9/ds9-s2.html#e11','ds9/ds9-s2.html#e12','ds9/ds9-s2.html#e13','ds9/ds9-s2.html#e14','ds9/ds9-s2.html#e15','ds9/ds9-s2.html#e16','ds9/ds9-s2.html#e17','ds9/ds9-s2.html#e18','ds9/ds9-s2.html#e19','ds9/ds9-s2.html#e20','ds9/ds9-s2.html#e22','ds9/ds9-s2.html#e23','ds9/ds9-s2.html#e24','ds9/ds9-s2.html#e25','ds9/ds9-s2.html#e26',
	'ds9/ds9-s3.html#e01','ds9/ds9-s3.html#e03','ds9/ds9-s3.html#e04','ds9/ds9-s3.html#e05','ds9/ds9-s3.html#e06','ds9/ds9-s3.html#e07','ds9/ds9-s3.html#e08','ds9/ds9-s3.html#e09','ds9/ds9-s3.html#e10','ds9/ds9-s3.html#e11','ds9/ds9-s3.html#e13','ds9/ds9-s3.html#e14','ds9/ds9-s3.html#e15','ds9/ds9-s3.html#e16','ds9/ds9-s3.html#e17','ds9/ds9-s3.html#e18','ds9/ds9-s3.html#e19','ds9/ds9-s3.html#e20','ds9/ds9-s3.html#e21','ds9/ds9-s3.html#e22','ds9/ds9-s3.html#e23','ds9/ds9-s3.html#e24','ds9/ds9-s3.html#e25','ds9/ds9-s3.html#e26',
	'ds9/ds9-s4.html#e01','ds9/ds9-s4.html#e03','ds9/ds9-s4.html#e04','ds9/ds9-s4.html#e05','ds9/ds9-s4.html#e06','ds9/ds9-s4.html#e07','ds9/ds9-s4.html#e08','ds9/ds9-s4.html#e09','ds9/ds9-s4.html#e10','ds9/ds9-s4.html#e11','ds9/ds9-s4.html#e12','ds9/ds9-s4.html#e13','ds9/ds9-s4.html#e14','ds9/ds9-s4.html#e15','ds9/ds9-s4.html#e16','ds9/ds9-s4.html#e17','ds9/ds9-s4.html#e18','ds9/ds9-s4.html#e19','ds9/ds9-s4.html#e20','ds9/ds9-s4.html#e21','ds9/ds9-s4.html#e22','ds9/ds9-s4.html#e23','ds9/ds9-s4.html#e24','ds9/ds9-s4.html#e25','ds9/ds9-s4.html#e26',
	'ds9/ds9-s5.html#e01','ds9/ds9-s5.html#e02','ds9/ds9-s5.html#e03','ds9/ds9-s5.html#e04','ds9/ds9-s5.html#e05','ds9/ds9-s5.html#e06','ds9/ds9-s5.html#e07','ds9/ds9-s5.html#e08','ds9/ds9-s5.html#e09','ds9/ds9-s5.html#e10','ds9/ds9-s5.html#e11','ds9/ds9-s5.html#e12','ds9/ds9-s5.html#e13','ds9/ds9-s5.html#e14','ds9/ds9-s5.html#e15','ds9/ds9-s5.html#e16','ds9/ds9-s5.html#e17','ds9/ds9-s5.html#e18','ds9/ds9-s5.html#e19','ds9/ds9-s5.html#e20','ds9/ds9-s5.html#e21','ds9/ds9-s5.html#e22','ds9/ds9-s5.html#e23','ds9/ds9-s5.html#e24','ds9/ds9-s5.html#e25','ds9/ds9-s5.html#e26',
	'ds9/ds9-s6.html#e01','ds9/ds9-s6.html#e02','ds9/ds9-s6.html#e03','ds9/ds9-s6.html#e04','ds9/ds9-s6.html#e05','ds9/ds9-s6.html#e06','ds9/ds9-s6.html#e07','ds9/ds9-s6.html#e08','ds9/ds9-s6.html#e09','ds9/ds9-s6.html#e10','ds9/ds9-s6.html#e11','ds9/ds9-s6.html#e12','ds9/ds9-s6.html#e13','ds9/ds9-s6.html#e14','ds9/ds9-s6.html#e15','ds9/ds9-s6.html#e16','ds9/ds9-s6.html#e17','ds9/ds9-s6.html#e18','ds9/ds9-s6.html#e19','ds9/ds9-s6.html#e20','ds9/ds9-s6.html#e21','ds9/ds9-s6.html#e22','ds9/ds9-s6.html#e23','ds9/ds9-s6.html#e24','ds9/ds9-s6.html#e25','ds9/ds9-s6.html#e26',
	'ds9/ds9-s7.html#e01','ds9/ds9-s7.html#e02','ds9/ds9-s7.html#e03','ds9/ds9-s7.html#e04','ds9/ds9-s7.html#e05','ds9/ds9-s7.html#e06','ds9/ds9-s7.html#e07','ds9/ds9-s7.html#e08','ds9/ds9-s7.html#e09','ds9/ds9-s7.html#e10','ds9/ds9-s7.html#e11','ds9/ds9-s7.html#e12','ds9/ds9-s7.html#e13','ds9/ds9-s7.html#e14','ds9/ds9-s7.html#e15','ds9/ds9-s7.html#e16','ds9/ds9-s7.html#e17','ds9/ds9-s7.html#e18','ds9/ds9-s7.html#e19','ds9/ds9-s7.html#e20','ds9/ds9-s7.html#e21','ds9/ds9-s7.html#e22','ds9/ds9-s7.html#e23','ds9/ds9-s7.html#e24','ds9/ds9-s7.html#e25',
	'voy/voy-s1.html#e01','voy/voy-s1.html#e03','voy/voy-s1.html#e04','voy/voy-s1.html#e05','voy/voy-s1.html#e06','voy/voy-s1.html#e07','voy/voy-s1.html#e08','voy/voy-s1.html#e09','voy/voy-s1.html#e10','voy/voy-s1.html#e11','voy/voy-s1.html#e12','voy/voy-s1.html#e13','voy/voy-s1.html#e14','voy/voy-s1.html#e15','voy/voy-s1.html#e16',
	'voy/voy-s2.html#e01','voy/voy-s2.html#e02','voy/voy-s2.html#e03','voy/voy-s2.html#e04','voy/voy-s2.html#e05','voy/voy-s2.html#e06','voy/voy-s2.html#e07','voy/voy-s2.html#e08','voy/voy-s2.html#e09','voy/voy-s2.html#e10','voy/voy-s2.html#e11','voy/voy-s2.html#e12','voy/voy-s2.html#e13','voy/voy-s2.html#e14','voy/voy-s2.html#e15','voy/voy-s2.html#e16','voy/voy-s2.html#e17','voy/voy-s2.html#e18','voy/voy-s2.html#e19','voy/voy-s2.html#e20','voy/voy-s2.html#e21','voy/voy-s2.html#e22','voy/voy-s2.html#e23','voy/voy-s2.html#e24','voy/voy-s2.html#e25','voy/voy-s2.html#e26',
	'voy/voy-s3.html#e01','voy/voy-s3.html#e02','voy/voy-s3.html#e03','voy/voy-s3.html#e04','voy/voy-s3.html#e05','voy/voy-s3.html#e06','voy/voy-s3.html#e07','voy/voy-s3.html#e08','voy/voy-s3.html#e10','voy/voy-s3.html#e11','voy/voy-s3.html#e12','voy/voy-s3.html#e13','voy/voy-s3.html#e14','voy/voy-s3.html#e15','voy/voy-s3.html#e16','voy/voy-s3.html#e17','voy/voy-s3.html#e18','voy/voy-s3.html#e19','voy/voy-s3.html#e20','voy/voy-s3.html#e21','voy/voy-s3.html#e22','voy/voy-s3.html#e23','voy/voy-s3.html#e24','voy/voy-s3.html#e25','voy/voy-s3.html#e26',
	'voy/voy-s4.html#e01','voy/voy-s4.html#e02','voy/voy-s4.html#e03','voy/voy-s4.html#e04','voy/voy-s4.html#e05','voy/voy-s4.html#e06','voy/voy-s4.html#e07','voy/voy-s4.html#e08','voy/voy-s4.html#e10','voy/voy-s4.html#e11','voy/voy-s4.html#e12','voy/voy-s4.html#e13','voy/voy-s4.html#e14','voy/voy-s4.html#e15','voy/voy-s4.html#e16','voy/voy-s4.html#e17','voy/voy-s4.html#e18','voy/voy-s4.html#e20','voy/voy-s4.html#e21','voy/voy-s4.html#e22','voy/voy-s4.html#e23','voy/voy-s4.html#e24','voy/voy-s4.html#e25','voy/voy-s4.html#e26',
	'voy/voy-s5.html#e01','voy/voy-s5.html#e02','voy/voy-s5.html#e03','voy/voy-s5.html#e04','voy/voy-s5.html#e05','voy/voy-s5.html#e06','voy/voy-s5.html#e07','voy/voy-s5.html#e08','voy/voy-s5.html#e09','voy/voy-s5.html#e10','voy/voy-s5.html#e11','voy/voy-s5.html#e12','voy/voy-s5.html#e13','voy/voy-s5.html#e14','voy/voy-s5.html#e15','voy/voy-s5.html#e17','voy/voy-s5.html#e18','voy/voy-s5.html#e19','voy/voy-s5.html#e20','voy/voy-s5.html#e21','voy/voy-s5.html#e22','voy/voy-s5.html#e23','voy/voy-s5.html#e24','voy/voy-s5.html#e25','voy/voy-s5.html#e26',
	'voy/voy-s6.html#e01','voy/voy-s6.html#e02','voy/voy-s6.html#e03','voy/voy-s6.html#e04','voy/voy-s6.html#e05','voy/voy-s6.html#e06','voy/voy-s6.html#e07','voy/voy-s6.html#e08','voy/voy-s6.html#e09','voy/voy-s6.html#e10','voy/voy-s6.html#e11','voy/voy-s6.html#e12','voy/voy-s6.html#e13','voy/voy-s6.html#e14','voy/voy-s6.html#e15','voy/voy-s6.html#e16','voy/voy-s6.html#e17','voy/voy-s6.html#e18','voy/voy-s6.html#e19','voy/voy-s6.html#e20','voy/voy-s6.html#e21','voy/voy-s6.html#e22','voy/voy-s6.html#e23','voy/voy-s6.html#e24','voy/voy-s6.html#e25','voy/voy-s6.html#e26',
	'voy/voy-s7.html#e01','voy/voy-s7.html#e02','voy/voy-s7.html#e03','voy/voy-s7.html#e04','voy/voy-s7.html#e05','voy/voy-s7.html#e06','voy/voy-s7.html#e07','voy/voy-s7.html#e08','voy/voy-s7.html#e09','voy/voy-s7.html#e11','voy/voy-s7.html#e12','voy/voy-s7.html#e13','voy/voy-s7.html#e14','voy/voy-s7.html#e15','voy/voy-s7.html#e16','voy/voy-s7.html#e18','voy/voy-s7.html#e19','voy/voy-s7.html#e20','voy/voy-s7.html#e21','voy/voy-s7.html#e22','voy/voy-s7.html#e23','voy/voy-s7.html#e24','voy/voy-s7.html#e25',
	'pro/pro-s1.html#e01','pro/pro-s1.html#e03','pro/pro-s1.html#e04','pro/pro-s1.html#e05','pro/pro-s1.html#e06','pro/pro-s1.html#e07','pro/pro-s1.html#e08','pro/pro-s1.html#e09','pro/pro-s1.html#e10','pro/pro-s1.html#e11','pro/pro-s1.html#e12','pro/pro-s1.html#e13','pro/pro-s1.html#e14','pro/pro-s1.html#e15','pro/pro-s1.html#e16','pro/pro-s1.html#e17','pro/pro-s1.html#e18','pro/pro-s1.html#e19','pro/pro-s1.html#e20',
	'pro/pro-s2.html#e01','pro/pro-s2.html#e02','pro/pro-s2.html#e03','pro/pro-s2.html#e04','pro/pro-s2.html#e05','pro/pro-s2.html#e06','pro/pro-s2.html#e07','pro/pro-s2.html#e08','pro/pro-s2.html#e09','pro/pro-s2.html#e10','pro/pro-s2.html#e11','pro/pro-s2.html#e12','pro/pro-s2.html#e13','pro/pro-s2.html#e14','pro/pro-s2.html#e15','pro/pro-s2.html#e16','pro/pro-s2.html#e17','pro/pro-s2.html#e18','pro/pro-s2.html#e19','pro/pro-s2.html#e20',
	'pic/pic-s1.html#e01','pic/pic-s1.html#e02','pic/pic-s1.html#e03','pic/pic-s1.html#e04','pic/pic-s1.html#e05','pic/pic-s1.html#e06','pic/pic-s1.html#e07','pic/pic-s1.html#e08','pic/pic-s1.html#e09','pic/pic-s1.html#e10',
	'pic/pic-s2.html#e01','pic/pic-s2.html#e02','pic/pic-s2.html#e03','pic/pic-s2.html#e04','pic/pic-s2.html#e05','pic/pic-s2.html#e06','pic/pic-s2.html#e07','pic/pic-s2.html#e08','pic/pic-s2.html#e09','pic/pic-s2.html#e10',
	'pic/pic-s3.html#e01','pic/pic-s3.html#e02','pic/pic-s3.html#e03','pic/pic-s3.html#e04','pic/pic-s3.html#e05','pic/pic-s3.html#e06','pic/pic-s3.html#e07','pic/pic-s3.html#e08','pic/pic-s3.html#e09','pic/pic-s3.html#e10'
];
//const reviews = ['pro/pro-s2.html#e02'];

// Select random Review
var randomReview = reviews[Math.floor(Math.random() * reviews.length)];
var selectedPage = randomReview.substring(0,randomReview.indexOf('#'));
var selectedReview = randomReview.substring(randomReview.indexOf('#')+1,randomReview.length);

async function getReviewElement(url, elementId) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const htmlText = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');
		const element = doc.getElementById(elementId);
		
		if (!url.startsWith('http')){
			var subFolder = url.substring(0,(url.indexOf('/')));
		} else {
			var temp = url.substring(22,url.length);
			var subFolder = temp.substring(0,(temp.indexOf('/')));
		}
		
		if (subFolder != 'films') {
			var series = subFolder.toUpperCase();
		}
		
		const reviewURL = url + "#" + elementId;
		const imageURL = subFolder + "/" + element.querySelector('.episodeCardBG').getAttribute('src');
		var epNumber = element.querySelector('.seasonEpisodeNumberBox').innerText;
		if (epNumber.includes('Feature-Length')) {epNumber = epNumber.substring(0,7)}
		
		var title = element.querySelector('.titleBox').innerHTML;
		if (title.includes('<')) {title = title.substring(0,(title.indexOf('<')))}
				
		const myScore = element.querySelector('[class^="stars"]').outerHTML;
		const score = element.querySelector('.xx-large').innerText;
		
        return [reviewURL, imageURL, series, epNumber, title, myScore, score];
    } catch (error) {
        console.error('Error fetching or parsing page:', url, elementId, error);
        return null;
    }
}

getReviewElement('https://c6reviews.com/' + selectedPage , selectedReview).then(([reviewURL, imageURL, series, epNumber, title, myScore, score]) => {

	document.getElementById('randomReviewImage').innerHTML = "<a href='" + reviewURL + "'><img src='" + imageURL + "'></a>";
	document.getElementById('randomReviewEpisodeID').innerHTML = series + " " + epNumber;
	document.getElementById('randomReviewTitle').innerHTML = "<a style='white-space:wrap;' href='" + reviewURL + "'>" + title.replace(/ \(parts i and ii\)/gi,'') + "</a>";
	
	document.getElementById('randomReviewMyScore').innerHTML = "MY SCORE: " + myScore.replaceAll('<td','<div').replaceAll('/td','/div').replaceAll('<span class="showAward">','<br><span class="showAward" style="font-size:medium">').replaceAll('<span class="award">','<br><span class="award" style="font-size:medium">').replaceAll('<span class="personalFavorite">','<br><span class="personalFavorite" style="color:#FF86AD">').replaceAll('<span class="penaltyFlag">','<br><span class="penaltyFlag">').replaceAll('<span class="redFlag">','<br><span class="redFlag">').replaceAll('<span class="large">','<span class="small">');
	var scoreColor = "#D0D0D0";
	
	switch (Array.from(score)[0]) {
			case "0":
				scoreColor = '#F8393BBF';
				break;
			case "1":
				if (Array.from(score)[1] == "0") {
					scoreColor = '#03BE4BBF';
				} else {
					scoreColor = '#F95350BF';
				}
				break;
			case "2":
				scoreColor = '#FA6D55BF';
				break;
			case "3":
				scoreColor = '#FC975ABF';
				break;
			case "4":
				scoreColor = '#FDC16FBF';
				break;
			case "5":
				scoreColor = '#FFEB74BF';
				break;
			case "6":
				scoreColor = '#C0E373BF';
				break;
			case "7":
				scoreColor = '#91DA71BF';
				break;
			case "8":
				scoreColor = '#72D06FBF';
				break;
			case "9":
				scoreColor = '#43C75DBF';
				break;
		}
	
	document.getElementById('randomReviewScore').innerHTML = "FINAL SCORE: <span style='color:" + scoreColor + "'>" + score + "</span>";
	
});