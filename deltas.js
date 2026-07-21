// widget by Embed.im (https://app.embed.im/snow.js)

var embedimSnow=document.getElementById("embedim--snow");

// Get today's date and format as needed
var today = new Date();
var monthAndDate = today.toLocaleDateString("en-US", {month: 'long', day: 'numeric'});
year = today.toLocaleDateString("en-US", {year: 'numeric'});

if(!embedimSnow && monthAndDate == "September 8"){

	const divisionColors = [
		"#f5c542", // Command (gold)
		"#f5c542", // Command (gold)
		"#f5c542", // Command (gold)
		"#c63b3b", // Operations (red)
		"#c63b3b", // Operations (red)
		"#3f82ff"  // Sciences (blue)
	];
	
	const embRand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

	let embHTML = "";

	let embCSS = `
	#embedim--snow{
		position:fixed;
		left:0;
		top:0;
		width:100vw;
		height:100vh;
		overflow:hidden;
		pointer-events:none;
		z-index:9999999;
	}

	.embedim-wrapper{
		position:absolute;
		width:14px;
		height:20px;
		margin-top:-20px;
	}

	.embedim-snow{
		display:block;
		width:100%;
		height:100%;
		background-repeat:no-repeat;
		background-size:contain;
		background-position:center;
		transform-origin:center center;
		filter:drop-shadow(0 0 2px rgba(255,220,120,.6));
	}

	@keyframes tumble{
		0%   { rotate:-20deg; }
		25%  { rotate:12deg; }
		50%  { rotate:-8deg; }
		75%  { rotate:18deg; }
		100% { rotate:-20deg; }
	}
	`;

	for(let i = 1; i < 200; i++){

		const color = divisionColors[embRand(0, divisionColors.length - 1)];

		const deltaSVG = encodeURIComponent(`
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140">
			<path fill="${color}"
				d="M50 0 L92 132 L59 91 L8 132 Z"/>
			<path fill="#ffffff"
				d="M50 22 L69 87 L54 69 L31 87 Z"/>
		</svg>
		`);

		embHTML += '<span class="embedim-wrapper"><i class="embedim-snow"></i></span>';

		const rndX = embRand(0,1000000) * 0.0001;
		const rndO = embRand(-100000,100000) * 0.0001;
		const rndT = (embRand(3,8) * 10).toFixed(2);
		const rndS = (embRand(3000,10000) * 0.0001).toFixed(2);

		const duration = embRand(5,15);
		const delay = embRand(0,30);
		const tumble = embRand(3,8);
		const direction = embRand(0,1) ? "normal" : "reverse";

		embCSS += `
		.embedim-wrapper:nth-child(${i}){
			opacity:${(embRand(3000,10000) * 0.0001).toFixed(2)};
			transform:translate(${rndX.toFixed(2)}vw,-20px) scale(${rndS});
			animation:fall-${i} ${duration}s -${delay}s linear infinite;
		}

		.embedim-wrapper:nth-child(${i}) .embedim-snow{
			animation:tumble ${tumble}s ease-in-out infinite ${direction};
		}

		@keyframes fall-${i}{
			${rndT}%{
				transform:
					translate(${(rndX+rndO).toFixed(2)}vw,${rndT}vh)
					scale(${rndS});
			}

			to{
				transform:
					translate(${(rndX+rndO/2).toFixed(2)}vw,105vh)
					scale(${rndS});
			}
		}
		`;
		embCSS += `
		.embedim-wrapper:nth-child(${i}) .embedim-snow{
			background-image:url("data:image/svg+xml,${deltaSVG}");
			animation:tumble ${tumble}s ease-in-out infinite ${direction};
		}
		`;
	}

	embedimSnow = document.createElement("div");
	embedimSnow.id = "embedim--snow";
	embedimSnow.innerHTML = `<style>${embCSS}</style>${embHTML}`;

	document.addEventListener("DOMContentLoaded", () => {
		document.body.appendChild(embedimSnow);
	});
}