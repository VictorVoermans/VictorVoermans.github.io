var dark = "#c0c0c0";
var light = "#dbdbdb";
var last;

function preloadFlags() {
	for (i = 0; i < c.length; i++) {
		var flagImg = document.createElement("img");
		flagImg.src = folderName + "/flag_" + c[i] + ".png";
		flagImg.style.width = "1px";
		document.getElementById("preload").appendChild(flagImg);
	}
}

function darken(i){
	if (document.getElementById(c[i]).classList.contains("island")){
		document.getElementById(c[i]).style.stroke = dark;
	} else {
		document.getElementById(c[i]).style.fill = dark;
	}
}

function lighten(i){
	if (document.getElementById(c[i]).classList.contains("island")){
		document.getElementById(c[i]).style.stroke = light;
	} else {
		document.getElementById(c[i]).style.fill = light;
	}
}

function mouseout(i){
	if (i != last) {
		lighten(i);
	}
}

function click(i){
	if (last != null && last != i){
		lighten(last);
		hideCapital(last);
	}
	
	displayInfo(i);
	last = i;
}

function displayInfo(i){
	document.getElementById("c_name").innerHTML = c_name[i];
	document.getElementById("flag").style.visibility = "visible";
	document.getElementById("flag").src = folderName + "/flag_" + c[i] + ".png";
	
	displayCapitalName(i);
	displayCapital(i);
	isItNepal(i);
}

function hideInfo(){
	document.getElementById("c_name").innerHTML = "";
	document.getElementById("flag").style.visibility = "hidden";
	document.getElementById("cap_name").innerHTML = "";
	
	if (last != null){
		hideCapital(last);
		lighten(last);
	}
	
	last = null;
}

function displayCapitalName(i){
	if (cap_name[i].includes(",")){
		document.getElementById("cap_name").innerHTML = "Capitals: " + cap_name[i];
	} else if (cap_name[i] == "X"){
		document.getElementById("cap_name").innerHTML = "";
		document.getElementById("flag").style.visibility = "hidden";
	} else if (cap_name[i] == ""){
		document.getElementById("cap_name").innerHTML = "";
	} else {
		document.getElementById("cap_name").innerHTML = "Capital: " + cap_name[i];
	}
}

function displayCapital(i){
	document.getElementById("cap_" + c[i]).style.visibility = "visible";
}

function hideCapital(i){
	document.getElementById("cap_" + c[i]).style.visibility = "hidden";
}

function isItNepal(i){
	if (c[i] == "nepal"){
		document.getElementById("flag").style.border = "none";
	} else {
		document.getElementById("flag").style.border = "2px solid black";
	}
}