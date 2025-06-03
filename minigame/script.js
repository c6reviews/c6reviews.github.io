//********************************************************************************************
//Define canvas, set context, and set default font
//********************************************************************************************
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.font = "18px Roboto";


//********************************************************************************************
//Create an area for messages and the timer at the top of the canvas
//********************************************************************************************
ctx.fillStyle = "lightgrey";
ctx.fillRect(0,0,800,20);
ctx.fillStyle = "black";
ctx.fillText("Chain of Command", 320, 15);

//********************************************************************************************
//Define sounds
//********************************************************************************************
var makeitso = new Audio('makeitso.mp3');
var howmanylights = new Audio('howmanylights.mp3');
var engage = new Audio('engage.mp3');
var therearefourlights = new Audio('therearefourlights.mp3');
var therearefivelights = new Audio('therearefivelights.mp3');

//********************************************************************************************
//Define images to use
//********************************************************************************************
var dude = new Image();
dude.src = "dude.png";

var dude1 = new Image();
dude1.src = "dude1.png";

var dude2 = new Image();
dude2.src = "dude2.png";

var waypoint = new Image();
waypoint.src = "waypoint.png";

var tarpit = new Image();
tarpit.src = "tarpit.png";

var htarpit = new Image();
htarpit.src = "htarpit.png";

var tarpit5 = new Image();
tarpit5.src = "tarpit5.png";

var biff = new Image();
biff.src = "biff.png";

var mushroom = new Image();
mushroom.src = "spookymushroom.png"

//********************************************************************************************
//Variables to define the next waypoint, whether the player is frozen,
//if the game has started, if the game is over, the game timer, the player speed bonus,
//or if the tarpit has been "cleared" after being stuck in it (to avoid getting stuck repeatedly)
//********************************************************************************************
var nextWaypoint = 0;
var frozen = true;
var gameStart = false;
var gameOver = false;
var timerVal = 30;
var timer = setInterval(timerTick,1000);
var speedBonus = 0;
var tarpitActive = false;
var dudeToggle = false;

//********************************************************************************************
//Set starting coordinates for images, display images, and display text on the instructions screen
//********************************************************************************************
var dudeX = 60;
var dudeY = 40;
var tarpitX = 60;
var tarpitY = 235;
var waypointX = [40,90,140,190];
var waypointY = [145,145,145,145];
var mushroomX = 65;
var mushroomY = 360;

dude.onload = function() {
	ctx.drawImage(dude, dudeX, dudeY, 35, 75);
};

tarpit.onload = function() {
	ctx.drawImage(tarpit, tarpitX, tarpitY, 38, 80);
};

waypoint.onload = function() {
	for (var i = 0; i<=3; i++)
	{
		ctx.drawImage(waypoint, waypointX[i], waypointY[i], 25, 40);
		ctx.fillStyle="black";
		ctx.fillText(i+1, waypointX[i]+8, waypointY[i]+20);
		ctx.fillStyle="white";
	}
};

mushroom.onload = function() {
	ctx.drawImage(mushroom, mushroomX, mushroomY, 30, 35);
};

ctx.fillStyle = "white";
ctx.font = "18px Roboto";
ctx.fillText("This is PICARD. Move him around with the arrow keys or the WASD keys.",110,90);
ctx.fillText("Collect the FIVE LIGHTS in order, within 30 seconds.",255,170);
ctx.fillText("Don't get too close to GUL MADRED, because he takes up more pixels",130,270);
ctx.fillText("than he should, and he will freeze you in place for 5 seconds!",130,295);
ctx.fillText("Pick up the RAW TASPAR EGG for a speed boost!",130,378);
ctx.font = "30px Roboto";
ctx.fillText("Click anywhere to begin!",225,480);
ctx.font = "18px Roboto";

canvas.addEventListener('click', startGame);



//********************************************************************************************
//Function to set up the game after the user clicks on the instructions screen
//********************************************************************************************
function startGame(){

	if (gameStart == false){

		gameStart = true;
			
		//Clear the entire screen and reset default font and color
		ctx.clearRect(0,20,800,480);	
		ctx.font = "18px Roboto";
		ctx.fillStyle = "white";
		
		//Move the mushroom off-screen until later
		mushroomX = 801;
		mushroomY = 501;
			
			
		//********************************************************************************************
		//Create random starting positions for the dude and the tarpit
		//Dude can be anywhere, the tarpit must be in a smaller box toward the middle of the field
		//Keep repositioning the tarpit until it doesn't overlap the dude
		//********************************************************************************************
		dudeX = Math.floor(Math.random() * 765);
		dudeY = Math.floor(Math.random() * 405)+20;
		ctx.drawImage(dude1, dudeX, dudeY, 35, 75);

		do{
			tarpitX = Math.floor(Math.random() * 362)+200;
			tarpitY = Math.floor(Math.random() * 160)+120;
		} while (isOverlapping(dudeX, dudeY, 35, 75, tarpitX, tarpitY, 38, 80));
		
		ctx.drawImage(tarpit, tarpitX, tarpitY, 38, 80);


		//********************************************************************************************
		//Reposition waypoints, checking for overlap
		//********************************************************************************************
		for (var i = 0; i <= 3; i++)
		{
			var overlap = false;
			
			do
			{
				waypointX[i] = Math.floor(Math.random() * 730)+25;
				waypointY[i] = Math.floor(Math.random() * 380)+40;
				
				//Check for overlap with dude or tarpit
				overlap = isOverlapping(waypointX[i], waypointY[i], 25, 40, dudeX, dudeY, 35, 75) ||
						  isOverlapping(waypointX[i], waypointY[i], 25, 40, tarpitX, tarpitY, 55, 80);
						  
				//Check for overlap with previous waypoints
				for (var j = i-1; j >= 0; j--)
					{
						if (isOverlapping(waypointX[i], waypointY[i], 25, 40, waypointX[j], waypointY[j], 25, 40))
						{ overlap = true; }
					}
						  
			}
			while (overlap == true);

			ctx.drawImage(waypoint, waypointX[i], waypointY[i], 25, 40);
			ctx.fillStyle="black";
			ctx.fillText(i+1, waypointX[i]+8, waypointY[i]+20);
			ctx.fillStyle="white";
		}

		//Unfreeze the player!
		frozen = false;
		
	}
}



//********************************************************************************************
//Function for the game timer countdown
//********************************************************************************************
function timerTick(){

	if (gameStart){
		ctx.fillStyle="lightgrey";
		ctx.fillRect(700,0,100,20);
		ctx.fillStyle="black";
		ctx.fillText(timerVal, 750,15);
		ctx.fillStyle="white";
		if (timerVal <= 0)
		{
			endGame("outOfTime");
		}
		else if (timerVal % 4 == 0)
		{
			if (!tarpitActive){
				repositionTarpit();
			}
			timerVal--;		
		}
		else if (timerVal == 15)
		{
			placeMushroom();
			timerVal--;		
		}
		else
		{
			timerVal--;
		}
	}

}



//********************************************************************************************
//Function and listener for arrow key presses to move the dude
//********************************************************************************************
function handleKeydown(e){

	if (!frozen)
	{
		ctx.clearRect(dudeX,dudeY,35,75);
		
		switch (e.key){
			case "ArrowRight":
			case "d":
				if(dudeX + 35 <= 795-speedBonus){dudeX += 5+speedBonus;}
				break;
			case "ArrowLeft":
			case "a":
				if(dudeX >= 5+speedBonus){dudeX -= 5+speedBonus;}
				break;
			case "ArrowUp":
			case "w":
				if(dudeY >= 25+speedBonus){dudeY -= 5+speedBonus;}
				break;
			case "ArrowDown":
			case "s":
				if(dudeY + 75 <= 495-speedBonus){dudeY += 5+speedBonus;}
				break;	
		}		

		if (dudeToggle)
		{
			ctx.drawImage(dude1, dudeX, dudeY, 35, 75);
		} else {
			ctx.drawImage(dude2, dudeX, dudeY, 35, 75);
		}
		dudeToggle = !dudeToggle;
		checkForCollision(e);
	}
	
}

document.addEventListener("keydown", handleKeydown);


//********************************************************************************************
//Function to reposition the tarpit
//********************************************************************************************

function repositionTarpit() {

		var overlap = false;

		ctx.clearRect(tarpitX,tarpitY,38,80);

		do
		{
			tarpitX = Math.floor(Math.random() * 362)+200;
			tarpitY = Math.floor(Math.random() * 160)+120;
				
			//Check for overlap with dude
			overlap = isOverlapping(tarpitX, tarpitY, 38, 80, dudeX, dudeY, 35, 75);
						  
			//Check for overlap with remaining waypoints
			for (var i=nextWaypoint; i <= 3; i++)
			{
				if (isOverlapping(tarpitX, tarpitY, 38, 80, waypointX[i], waypointY[i], 25, 40))
				{ overlap = true; }
			}
					  
		} while (overlap == true);
		
		ctx.drawImage(tarpit, tarpitX, tarpitY, 38, 80);

}


//********************************************************************************************
//Function to check for overlapping during initial object placement
//********************************************************************************************
function isOverlapping(obj1X, obj1Y, obj1W, obj1H, obj2X, obj2Y, obj2W, obj2H){

	if (obj1X < obj2X + obj2W &&
		obj1X + obj1W > obj2X &&
		obj1Y < obj2Y + obj2H &&
		obj1Y + obj1H > obj2H )
	{ return true; }
	else
	{ return false; }
	
}



//********************************************************************************************
//Function to place the mushroom at 15 seconds into the game
//********************************************************************************************
function placeMushroom(){
	
	var overlap = false;
				
		do
		{
			mushroomX = Math.floor(Math.random() * 740)+30;
			mushroomY = Math.floor(Math.random() * 410)+35;
			
			//Check for overlap with dude or tarpit
			overlap = isOverlapping(mushroomX, mushroomY, 30, 35, dudeX, dudeY, 35, 75) ||
					  isOverlapping(mushroomX, mushroomY, 30, 35, tarpitX, tarpitY, 38, 80);
					  
			//Check for overlap with remaining waypoints
			for (var i=nextWaypoint; i <= 3; i++)
				{
					if (isOverlapping(mushroomX, mushroomY, 30, 35, waypointX[i], waypointY[i], 25, 40))
					{ overlap = true; }
				}
					  
		}
		while (overlap == true);

		ctx.drawImage(mushroom, mushroomX, mushroomY, 30, 35);
}


			
//********************************************************************************************
//Function to check for collisions during the game
//********************************************************************************************
function checkForCollision(e){
	
	// Check for collision with next waypoint and clear the waypoint
	if (dudeX < waypointX[nextWaypoint] + 25 &&
		dudeX + 35 > waypointX[nextWaypoint] &&
		dudeY < waypointY[nextWaypoint] + 40 &&
		dudeY + 75 > waypointY[nextWaypoint] ){
		
		clearWaypoint(nextWaypoint);
		nextWaypoint++;	
	} 

	
	// Check for collision with a different waypoint and bounce the player back
	for (var i = nextWaypoint+1; i<=3; i++)
	{
		if (dudeX < waypointX[i] + 25 &&
		dudeX + 30 > waypointX[i] &&
		dudeY < waypointY[i] + 40 &&
		dudeY + 75 > waypointY[i] ){
		
			ctx.clearRect(dudeX,dudeY,35,75);
			ctx.drawImage(waypoint, waypointX[i], waypointY[i], 25, 40);																	
			ctx.fillStyle="black";
			ctx.fillText(i+1, waypointX[i]+8, waypointY[i]+20);
			ctx.fillStyle="white";
			
			switch (e.key){
				case "ArrowRight":
				case "d":
					dudeX -= 20;
					break;
				case "ArrowLeft":
				case "a":
					dudeX += 20;
					break;
				case "ArrowUp":
				case "w":
					dudeY += 20;
					break;
				case "ArrowDown":
				case "s":
					dudeY -= 20;
			}
			
			ctx.drawImage(dude1, dudeX, dudeY, 35, 75);
		}
	}

	
	// Check for collision with tarpit and freeze the player for 4 seconds
	if (dudeX < tarpitX + 38 &&
		dudeX + 35 > tarpitX &&
		dudeY < tarpitY + 80 &&
		dudeY + 75 > tarpitY ){
		
		frozen = true;
		tarpitActive = true;
		
		ctx.clearRect(dudeX,dudeY,35,75);
		ctx.drawImage(tarpit, tarpitX, tarpitY, 38, 80);
		
		howmanylights.play();
		
		ctx.fillStyle="red";
		ctx.fillText("How",tarpitX+4,tarpitY+25);
		ctx.fillText("many",tarpitX+2,tarpitY+40);
		ctx.fillText("lights?",tarpitX,tarpitY+55);
		ctx.fillStyle="white";
		
		dudeX = tarpitX+10;
		dudeY = tarpitY+7;

		if (timerVal > 4) {
			setTimeout('ctx.clearRect(tarpitX,tarpitY,55,80);',4000);
			setTimeout('repositionTarpit();',4000);
			setTimeout('ctx.drawImage(dude1, dudeX, dudeY, 35, 75);',4000);
			setTimeout('frozen = false;tarpitActive = false',4000);
		}
	}
	
	
	// Check for collision with the mushroom
	if (dudeX < mushroomX + 30 &&
		dudeX + 35 > mushroomX &&
		dudeY < mushroomY + 35 &&
		dudeY + 75 > mushroomY &&
		speedBonus == 0){
		
		engage.play();
		
		ctx.clearRect(mushroomX, mushroomY, 30, 35);
		speedBonus = 3;
		ctx.drawImage(dude1, dudeX, dudeY, 35, 75);
		ctx.fillStyle="green";
		ctx.fillText("Speed bonus!",5,15);
		ctx.fillStyle="white";
	} 
}



//********************************************************************************************
//Function to clear a waypoint
//********************************************************************************************
function clearWaypoint(w){
	
	//Freeze dude
	frozen = true;

	//Clear dude and waypoint
	ctx.clearRect(dudeX,dudeY,35,75);
	ctx.clearRect(waypointX[w],waypointY[w],25,40);
	
	//Replace waypoint with biff
	ctx.drawImage(biff, waypointX[w]-5, waypointY[w]-5, 36, 38);
	
	switch (w) {
		case 0:
			makeitso.play();
			break;
		case 1:
			makeitso.play();
			break;
		case 2:
			makeitso.play();
			break;
		case 3:
			therearefourlights.play();
			break;
	}
	if (w >= 3) {
		//If last waypoint, end game after .25 seconds
		setTimeout('endGame("win");',250);
	} else {
		//If not last waypoint, unfreeze dude and redraw everything after 1 second
		setTimeout('frozen = false;',1000);
		setTimeout('redrawAll();',1000);
	}
}



//********************************************************************************************
//Function to redraw all images
//********************************************************************************************
function redrawAll(){

	if (!gameOver)
	{
		ctx.clearRect(0,20,800,480);
		
		ctx.drawImage(dude1, dudeX, dudeY, 35, 75);
			
		ctx.drawImage(tarpit, tarpitX, tarpitY, 38, 80);
			
		for (var i = nextWaypoint; i <= 3; i++)
		{
			ctx.drawImage(waypoint, waypointX[i], waypointY[i], 25, 40);
			ctx.fillStyle="black";
			ctx.fillText(i+1, waypointX[i]+8, waypointY[i]+20);
			ctx.fillStyle="white";
		}
		
		if (speedBonus == 0)
		{
		ctx.drawImage(mushroom, mushroomX, mushroomY, 30, 35);
		}
	}	
}



//********************************************************************************************
//Function for end-of-game actions
//********************************************************************************************
function endGame(type){
	
	gameOver = true;
	frozen = true;
	clearInterval(timer);
	
	howmanylights.pause();
	
	ctx.clearRect(0,20,800,480);
	ctx.font = "80px Roboto";
	ctx.fillStyle="white";
	ctx.fillText("It's over!",250,100);
	
	switch(type)
	{
		case "win":
			ctx.fillStyle="green";
			ctx.fillText("You won!",240,200);
			
			//Make the dude jump for joy!
			ctx.drawImage(dude, 370, 295, 35, 75);
			ctx.drawImage(htarpit, 355, 375, 80, 38);
			for (var i = 1; i <= 200; i+=2)
			{
				setTimeout('ctx.clearRect(370, 295, 35, 75);',500*i)
				setTimeout('ctx.drawImage(dude, 370, 300, 35, 75);',500*i)
				setTimeout('ctx.clearRect(370, 300, 35, 75);',500*(i+1))
				setTimeout('ctx.drawImage(dude, 370, 295, 35, 75);',500*(i+1))
			}
			
			break;
			
		case "outOfTime":
			ctx.fillStyle="red";
			ctx.fillText("You ran out of time",40,200);
			ctx.fillStyle="white";
			ctx.drawImage(tarpit5, 355, 275, 57, 120);
			
			therearefivelights.play();
			
			break;
	}
	
}