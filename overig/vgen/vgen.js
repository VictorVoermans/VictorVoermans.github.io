var tempA = [];
var tempS = "";
var outputA = [];
var outputS = "";

function generate(){
	var onset = document.getElementById("onset").value;
	var nucleus = document.getElementById("nucleus").value;
	var coda = document.getElementById("coda").value;
	
	onset = onset.split(",");
	nucleus = nucleus.split(",");
	coda = coda.split(",");
	
	var structure = document.getElementById("structure").value;
	var separator = document.getElementById("separator").value;
	var length = document.getElementById("length").value;
	
	for (i = 0; i < length; i++){
		
		var randomOnset;
		var randomNucleus;
		var randomCoda;
		var randomNumber;
		
		if (structure.includes("O") == true){
			randomOnset = onset[Math.floor(Math.random() * onset.length)];
		} else if (structure.includes("o") == true){
			randomNumber = Math.floor(Math.random() * 2);
			if (randomNumber == 1){
				randomOnset = onset[Math.floor(Math.random() * onset.length)];
			} else {
				randomOnset = "";
			}
		} else {
			randomOnset = "";
		}
		
		if (structure.includes("N") == true){
			randomNucleus = nucleus[Math.floor(Math.random() * nucleus.length)];
		} else if (structure.includes("n") == true){
			randomNumber = Math.floor(Math.random() * 2);
			if (randomNumber == 1){
				randomNucleus = nucleus[Math.floor(Math.random() * nucleus.length)];
			} else {
				randomNucleus = "";
			}
		} else {
			randomNucleus = "";
		}
		
		if (structure.includes("C") == true){
			randomCoda = coda[Math.floor(Math.random() * coda.length)];
		} else if (structure.includes("c") == true){
			randomNumber = Math.floor(Math.random() * 2);
			if (randomNumber == 1){
				randomCoda = coda[Math.floor(Math.random() * coda.length)];
			} else {
				randomCoda = "";
			}
		} else {
			randomCoda = "";
		}

		tempA.push(randomOnset + randomNucleus + randomCoda);
	}
	tempS = tempA.join(separator);
	tempA = [];
	outputA.unshift(tempS);
	outputS = outputA.join("<br>");
	document.getElementById("output").innerHTML = outputS;
}

function empty(){
	outputA = [];
	document.getElementById("output").innerHTML = "";
}

function help(){
	document.getElementById("output").innerHTML = "<b>Onset, nucleus and coda:</b> The characters that make up the start, middle and end of a syllable, separated by a comma. They can be more than one character per entry.<br><br><b>Syllable structure:</b> Should be of the form ONC (onset, nucleus, coda), where lowercase letters indicate optional parts of syllables and absent letters absent parts of syllables.<br><br><b>Syllable separator:</b> The character or characters that should seperate syllables within words. Leave it empty to have no separator.<br><br><b>Word length:</b> The amount of syllables per generated word.<br><br>If you need more than this, check out the generators on <a href='https://www.zompist.com/gen.html'>Zompist</a> and <a href='http://akana.conlang.org/tools/awkwords/'>Awkwords</a>.";
}