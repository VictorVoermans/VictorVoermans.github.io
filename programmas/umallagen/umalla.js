var caps = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "."];
var codes = ["111", "112", "113", "121", "122", "123", "131", "132", "133", "211", "212", "213", "221", "222", "223", "231", "232", "233", "311", "312", "313", "321", "322", "323", "331", "332", "333"];

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var debug = document.getElementById("debug");

var thickness; // this is the width of the band expressed in number of underlying checkerboard squares
var input; // this is the text the user wants to have written out
var sum; // this is the sum of the numbers that make up the code of a text (a > 111 > 1+1+1=3)
var canvasHeight;
var canvasWidth;
var checkerColumnAmount;
var checkersPerColumnAmount;
var checkerX = []; // an array of the x-coordinates of the checker squares
var checkerY = []; // an array of the y-coordinates of the checker squares
var cumulativeCodes = [];
var lineColor = "white";
var backgroundColor = "red";

function generate(){
	prepareInput();
	prepareCanvas();
	draw();
	applyScaleAndRotation();
}

// this function turns uppercase letters into lowercase ones and removes all spaces and interpuntion except full stops; only letters and full stops are represented in the script.
function prepareInput(){
	input = document.getElementById("input").value;
	
	// turn uppercase letters into lowercase ones
	for (i = 0; i < caps.length; i++){
		input = input.replaceAll(caps[i], letters[i]);
	}
	
	// remove any character from input which doesn't apprear in "letters" array
	for (i = 0; i < input.length; i++){
		if (letters.indexOf(input[i]) == -1){
			input = input.replaceAll(input[i], "");
		}
	}
}

function prepareCanvas(){
	getThickness();
	setCanvasHeight();
	setCanvasWidth();
}

function getThickness(){
	thickness = document.getElementById("thickness").value;
}

// this function converts a string of letters into an array of numbers, which the script uses.
function convertInputToCode(){
	// "ta" > "312111"
	for (i = 0; i < letters.length; i++){
		input = input.replaceAll(letters[i], codes[i]);
	}
	
	// 312111 > ["3","1","2","1","1","1"]
	input = input.split("");
	
	// ["3","1","2","1","1","1"] > [3,1,2,1,1,1]
	for (i = 0; i < input.length; i++){
		input[i] = parseInt(input[i]);
	}
}

// this function calculates the sum of the numbers that make up a code, so 312111 > 3+1+2+1+1+1 = 9. this is needed for calculating the length
function calculateSum(){
	sum = 0;
	
	for (i = 0; i < input.length; i++){
		sum = sum + input[i];
	}
}

function setCanvasHeight(){
	canvasHeight = ((2 * thickness) + 3); // +3 = +1 +2(border)
	canvas.height = canvasHeight;
}

function setCanvasWidth(){
	convertInputToCode();
	calculateSum();
	canvasWidth = Math.ceil(sum/(thickness/2)) * 2 + 7; // +7 = +1 +4(ends) +2(border)
	canvas.width = canvasWidth;
}

function draw(){
	drawBackground();
	context.fillStyle = lineColor;
	drawHorizontalLines();
	drawVerticalEnds();
	generateCheckerPattern();
	generateCumulativeCodes();
	drawVerticalLines();
	eraseHorizontalLines();
}

function drawBackground(){
	context.fillStyle = backgroundColor;
	context.fillRect(0,0,canvasWidth,canvasHeight);
}

// this function draws horizontal lines across the band of the script. vertical lines will break up this neat base pattern later on in the process.
function drawHorizontalLines(){
	for (i = 1; i < 2*(thickness+1); i+=2){
		context.fillRect(1,i,canvasWidth-2,1);
	}
}

// this function draws the vertical lines which appear at both ends of a block of text, to seal it off as it were.
function drawVerticalEnds(){
	for (i = 4; i < thickness*4; i+=4){
		context.fillRect(1,i,1,1);
	} // left side
	
	for (i = 2; i <thickness*2; i+=4){
		context.fillRect(canvasWidth-2,i,1,1);
	} // right side
}

// this function generates two arrays, which are the x and y coordinates of the checker pattern which underlies the script
function generateCheckerPattern(){
	checkerColumnAmount = Math.ceil(sum/(thickness/2));
	checkersPerColumnAmount = thickness/2;
	
	checkerX = []; // these arrays have to be emptied every time
	checkerY = [];
	
	var xStart = 4;
	var yStart;
	
	for (i = 0; i < checkerColumnAmount; i++){
		for (j = 0; j < checkersPerColumnAmount; j++){
			checkerX.push(xStart);
		}
		xStart += 2;
	}
	
	for (i = 0; i < checkerColumnAmount/2; i++){
		yStart = 2;
		for (j = 0; j < checkersPerColumnAmount; j++){
			checkerY.push(yStart + (j*4));
		}
		yStart = 4;
		for (j = 0; j < checkersPerColumnAmount; j++){
			checkerY.push(yStart + (j*4));
		}
	}
}

// this function generates an array in which the numbers in the code (3,1,2,1,1,1,...) are added onto each other, so 3,4,6,7,8,9. this is needed to determin which of the underlying checkerboard squares will be used in the script
function generateCumulativeCodes(){
	cumulativeCodes = []; // reset the array to an empty one
	cumulativeCodes[0] = input[0]; // set up the start
	for (i = 1; i < input.length; i++){
		cumulativeCodes[i] = cumulativeCodes[i-1] + input[i];
	}
}

// this function draws the vertical lines to the left and the right of the selected checkerboard squares
function drawVerticalLines(){
	for (i = 0; i < cumulativeCodes.length; i++){
		context.fillRect(checkerX[cumulativeCodes[i]-1]-1,checkerY[cumulativeCodes[i]-1],1,1); // the line to the left
		context.fillRect(checkerX[cumulativeCodes[i]-1]+1,checkerY[cumulativeCodes[i]-1],1,1); // the line to the right
	}
}

// this function erases (draws with backgroundcolor) the horizontal lines above and below the selected checkerboard squares
function eraseHorizontalLines(){
	context.fillStyle = backgroundColor;
	for (i = 0; i < cumulativeCodes.length; i++){
		context.fillRect(checkerX[cumulativeCodes[i]-1],checkerY[cumulativeCodes[i]-1]+1,1,1); // the line above
		context.fillRect(checkerX[cumulativeCodes[i]-1],checkerY[cumulativeCodes[i]-1]-1,1,1); // the line below
	}
}

function applyScaleAndRotation(){
	var horizontal = document.getElementById("horizontal");
	var vertical = document.getElementById("vertical");
	
	var scale = 2;
	
	if (horizontal.checked == true){
		canvas.style.transform = "scale(" + scale + ") rotate(0deg) translate(" + canvasWidth/4 + "px," + canvasHeight/4 + "px)";
	} else {
		canvas.style.transform = "scale(" + scale + ") rotate(90deg) translate(" + (canvasWidth/2-(canvasHeight/4)) + "px," + ((canvasWidth/2 - canvasHeight)/2) + "px)";
	}
}