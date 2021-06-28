var c1 = ["人", "父", "母", "子", "女", "孫", "兄", "弟", "牛", "馬", "羊", "肉", "耳", "目", "心", "足", "手", "力", "山", "水", "火", "金", "玉", "車", "舟", "君", "臣", "帝", "王", "侯", "公", "民", "天", "地", "國", "日", "月", "古", "今", "上", "中", "下", "左", "右", "之", "孔子", "楚", "梁", "宋", "中山"];

var p1 = ["ren2", "fu4", "mu3", "zi3", "nü3", "sun1", "xiong1", "di4", "niu2", "ma3", "yang2", "rou4", "er3", "mu4", "xin1", "zu2", "shou3", "li4", "shan1", "shui3", "huo3", "jin1", "yu4", "che1", "zhou1", "jun1", "chen2", "di4", "wang2", "hou2", "gong1", "min2", "tian1", "di4", "guo2", "ri4", "yue4", "gu3", "jin1", "shang4", "zhong1", "xia4", "zuo3", "you4", "zhi1", "kong3zi3", "chu3", "liang2", "song4", "zhong1shan1"];

var c2 = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "百", "千", "萬", "士", "土", "木", "田", "里", "家", "姓", "名", "命", "言", "酒", "杯", "海", "泉", "盜", "狗", "兔", "狐", "虎", "蛇", "魚", "獸", "物", "事", "行", "東", "西", "南", "北", "内", "外", "韓", "齊", "鄭", "其"];

var p2 = ["yi1", "er4", "san3", "si4", "wu3", "liu4", "qi1", "ba1", "jiu3", "shi2", "bai3", "qian1", "wan4", "shi4", "tu3", "mu4", "tian2", "li3", "jia1", "xing4", "ming2", "ming4", "yan2", "jiu3", "bei1", "hai3", "quan2", "dao4", "gou3", "tu4", "hu2", "hu3", "she2", "yu2", "shou4", "wu4", "shi4", "xing2", "dong1", "xi1", "nan2", "bei3", "nei4", "wai4", "han2", "qi2", "zheng4", "qi2"];

var characterArrays = [c1, c2]; // kan beter
var pinyinArrays = [p1, p2];

var currentCharacters = [];
var currentPinyin = [];

var random;

document.getElementById("input").addEventListener("keyup", function(e){
	if (e.code ===  "Enter"){
		document.write("hou");
	}
});

// wanneer de pagina laadt

function onLoad(){
	emptyInput();
}

// wanneer je een les begint

function begin(lesson){
	generateCurrentArrays(lesson);
	chooseRandomNumber();
	displayCurrentCharacter();
	focusOnInput();
	hideMenu();
}

// iedere keer dat je op enter drukt

function submitAnswer(event){
	if (event.keyCode === 13){
		// als er iets ingevuld is
		if (document.getElementById("input").value != ""){
			check();
			emptyInput();
		} 
		// als het veld leeg is (en je het antwoord dus niet weet)
		else {
			displayCurrentPinyin();
			addRandomToArrays();
		}
	}
}

function check(){
	// als het antwoord juist is
	if (document.getElementById("input").value == currentPinyin[random]){
		// als er nog meer dan 1 te gaan zijn
		if (currentCharacters.length != 1){
			removeRandomFromArrays();
			chooseRandomNumber();
			displayCurrentCharacter();
		} 
		// als dit de laatste was
		else {
			window.location.reload(false);
		}
	}
}

// concrete acties

function generateCurrentArrays(lesson){
	currentCharacters = characterArrays[lesson];
	currentPinyin = pinyinArrays[lesson];
}

function emptyInput(){
	document.getElementById("input").value = "";
}

function focusOnInput(){
	document.getElementById("input").focus();
}

function chooseRandomNumber(){
	random = Math.floor(Math.random() * currentCharacters.length);
}

function displayCurrentCharacter(){
	document.getElementById("character").innerHTML = currentCharacters[random];
}

function displayCurrentPinyin(){
	document.getElementById("input").value = currentPinyin[random];
}

function addRandomToArrays(){
	currentCharacters.push(currentCharacters[random]);
	currentPinyin.push(currentPinyin[random]);
}

function removeRandomFromArrays(){
	currentCharacters.splice(random, 1);
	currentPinyin.splice(random, 1);
}

function hideMenu(){
	document.getElementById("lessons").style.visibility = "hidden";
}