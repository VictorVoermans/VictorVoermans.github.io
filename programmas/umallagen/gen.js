var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "."];
var codes = ["111", "112", "113", "121", "122", "123", "131", "132", "133", "211", "212", "213", "221", "222", "223", "231", "232", "233", "311", "312", "313", "321", "322", "323", "331", "332", "333"];

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var debug = document.getElementById("debug"); // dit kan uiteindelijk weg

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

function generate(){
	prepareCanvas();
	draw();
}

function prepareCanvas(){
	getThickness();
	setCanvasHeight();
	setCanvasWidth();
}

function getThickness(){
	thickness = document.getElementById("thickness").value;
}

function convertInputToCode(){
	input = document.getElementById("input").value;			// "ta"
	
	for (i = 0; i < letters.length; i++){
		input = input.replaceAll(letters[i], codes[i]);		// "312111"
	}
	
	input = input.split("");								// ["3","1","2","1","1","1"]
	
	for (i = 0; i < input.length; i++){						// [3,1,2,1,1,1]
		input[i] = parseInt(input[i]);
	}
}

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
	context.fillStyle = "white";
	drawHorizontalLines();
	drawVerticalEnds();
	generateCheckerPattern();
	generateCumulativeCodes();
	drawVerticalLines();
	eraseHorizontalLines();
}

function drawBackground(){
	context.fillStyle = "red";
	context.fillRect(0,0,canvasWidth,canvasHeight);
}

function drawHorizontalLines(){
	for (i = 1; i < 2*(thickness+1); i+=2){
		context.fillRect(1,i,canvasWidth-2,1);
	}
}

function drawVerticalEnds(){
	for (i = 4; i < thickness*4; i+=4){
		context.fillRect(1,i,1,1);
	} // left side
	
	for (i = 2; i <thickness*2; i+=4){
		context.fillRect(canvasWidth-2,i,1,1);
	} // right side
}

function generateCheckerPattern(){
	checkerColumnAmount = Math.ceil(sum/(thickness/2)); // dit gebruikt ik ook in setCanvasWidth() dus moet op een handigere plek kunnen
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
	} // the x-coordinates of the checker squares
	
	for (i = 0; i < checkerColumnAmount/2; i++){
		yStart = 2;
		for (j = 0; j < checkersPerColumnAmount; j++){
			checkerY.push(yStart + (j*4));
		}
		yStart = 4;
		for (j = 0; j < checkersPerColumnAmount; j++){
			checkerY.push(yStart + (j*4));
		}
	} // the y-coordinates of the checker squares
}

function generateCumulativeCodes(){
	cumulativeCodes = []; // reset the array to an empty one
	cumulativeCodes[0] = input[0]; // set up the start
	for (i = 1; i < input.length; i++){
		cumulativeCodes[i] = cumulativeCodes[i-1] + input[i];
	} // kind of similar to fibonacci
}

function drawVerticalLines(){
	for (i = 0; i < cumulativeCodes.length; i++){
		context.fillRect(checkerX[cumulativeCodes[i]-1]-1,checkerY[cumulativeCodes[i]-1],1,1); // the line to the left
		context.fillRect(checkerX[cumulativeCodes[i]-1]+1,checkerY[cumulativeCodes[i]-1],1,1); // the line to the right
	}
}

function eraseHorizontalLines(){
	context.fillStyle = "red";
	for (i = 0; i < cumulativeCodes.length; i++){
		context.fillRect(checkerX[cumulativeCodes[i]-1],checkerY[cumulativeCodes[i]-1]+1,1,1); // the line above
		context.fillRect(checkerX[cumulativeCodes[i]-1],checkerY[cumulativeCodes[i]-1]-1,1,1); // the line below
	}
}