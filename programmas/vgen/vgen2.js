var onset = "";
var nucleus = "";
var coda = "";
var length;
var syllable = "";
var word = "";
var output = "";

function generateOutput(){
	if (document.getElementById("clear").checked){
		output = "";
	}
	
	var amount = document.getElementById("amount").value;
	
	for (j = 0; j < amount; j++){ 
		generateWord();
		output = "<span class=\"word\" onclick=\"addWord('" + word + "')\">" + word + "</span>" + "<br>" + output;
		word = "";
	}
	
	document.getElementById("output").innerHTML = output;
}

function generateWord(){
	var separator = document.getElementById("separator").value;
	
	chooseLength();
	
	for (i = 0; i < length; i++){
		generateSyllable();
		
		if (word == ""){
			word = syllable;
		} else {
			word = syllable + separator + word;
		}
	}
}

function generateSyllable(){
	chooseOnset();
	chooseNucleus();
	chooseCoda();
	
	syllable = onset + nucleus + coda; 
}

function chooseLength(){
	var minimum = parseInt(document.getElementById("minimum").value);
	var maximum = parseInt(document.getElementById("maximum").value);
	
	length = minimum + Math.floor(Math.random() * (maximum - (minimum - 1)));
}

function chooseOnset(){
	var onsetOptions = document.getElementById("onset").value.split(" ");
	onset = onsetOptions[Math.floor(Math.random() * onsetOptions.length)];
	
	if (document.getElementById("o75").checked){
		if (Math.floor(Math.random() * 4) == 0){
			onset = "";
		}
	} else if (document.getElementById("o50").checked){
		if (Math.floor(Math.random() * 2) == 0){
			onset = "";
		}
	} else if (document.getElementById("o25").checked){
		if (Math.floor(Math.random() * 4) != 0){
			onset = "";
		}
	} else if (document.getElementById("o0").checked){
		onset = "";
	}
}

function chooseNucleus(){
	var nucleusOptions = document.getElementById("nucleus").value.split(" ");
	nucleus = nucleusOptions[Math.floor(Math.random() * nucleusOptions.length)];
}

function chooseCoda(){
	var codaOptions = document.getElementById("coda").value.split(" ");
	coda = codaOptions[Math.floor(Math.random() * codaOptions.length)];
	
	if (document.getElementById("c75").checked){
		if (Math.floor(Math.random() * 4) == 0){
			coda = "";
		}
	} else if (document.getElementById("c50").checked){
		if (Math.floor(Math.random() * 2) == 0){
			coda = "";
		}
	} else if (document.getElementById("c25").checked){
		if (Math.floor(Math.random() * 4) != 0){
			coda = "";
		}
	} else if (document.getElementById("c0").checked){
		coda = "";
	}
}

function erase(){
	output = ""
	document.getElementById("output").innerHTML = "";
}

function addWord(selectedWord){
	var saved = document.getElementById("saveArea");
	
	if (saved.value == ""){
		saved.value = selectedWord;
	} else {		
		saved.value = saved.value + "\n" + selectedWord;
	}
}