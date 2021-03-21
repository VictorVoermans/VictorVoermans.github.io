var akk1 = ["sz", "c", "s,", "t,", "h", "aaa", "eee", "iii", "uuu", "aa", "ee", "ii", "uu", "'"];
var akk2 = ["š", "š", "ṣ", "ṭ", "ḫ", "â", "ê", "î", "û", "ā", "ē", "ī", "ū", "’"];

var cap1 = ["_a", "_b", "_d", "_e", "_g", "_ḫ", "_i", "_k", "_l", "_m", "_n", "_p", "_q", "_r", "_s", "_t", "_u", "_w", "_y", "_z", "_š", "_ṣ", "_ṭ", "_ā", "_ē", "_ī", "_ū", "_â", "_ê", "_î", "_û"];
var cap2 = ["A", "B", "D", "E", "G", "Ḫ", "I", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "U", "W", "Y", "Z", "Š", "Ṣ", "Ṭ", "Ā", "Ē", "Ī", "Ū", "Â", "Ê", "Î", "Û"];

var misc1 = ["{", "}", ";", "[[", "]]"];
var misc2 = ["</i><sup>", "</sup><i>", "<br>", "⸢", "⸣"];

var sum1 = ["M", "N", "J", "B", "D", "G", "P", "T", "K", "SZ", "C", "S", "H", "Z", "R", "L", "A", "E", "I", "U"]; // SZ moet voor de S en de Z worden gedaan
var sum2 = ["m", "n", "ĝ", "b", "d", "g", "p", "t", "k", "š", "š", "s", "ḫ", "z", "r", "l", "a", "e", "i", "u"];

var num = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

var noi = ["[", "]", "(", ")", "⸢", "⸣"];

var tag1 = ["<i></i>", "</sub><sub>", "|</i><sub>", "</sub><i>|"];
var tag2 = ["", "", "</i>", "<i>"];

function convert() {
	var input = "<i>" + document.getElementById("input").value + "</i>";

	for (i = 0; i < akk1.length; i++) {
		input = input.replaceAll(akk1[i], akk2[i]);
	}

	for (i = 0; i < misc1.length; i++) {
		input = input.replaceAll(misc1[i], misc2[i]);
	}

	for (i = 0; i < sum1.length; i++) {
		input = input.replaceAll(sum1[i], "</i>" + sum2[i] + "<i>");
	}

	for (i = 0; i < cap1.length; i++) {
		input = input.replaceAll(cap1[i], cap2[i]);
	}

	for (i = 0; i < num.length; i++) {
		input = input.replaceAll(num[i], "</i><sub>" + num[i] + "</sub><i>");
	}

	for (i = 0; i < noi.length; i++) {
		input = input.replaceAll(noi[i], "</i>" + noi[i] + "<i>");
	}

	for (i = 0; i < tag1.length; i++) {
		input = input.replaceAll(tag1[i], tag2[i]);
	}

	document.getElementById("output").innerHTML = input;
}