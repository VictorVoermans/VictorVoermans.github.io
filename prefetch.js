function prefetch() {
	for (i = 0; i < images.length; i++) {
		var image = document.createElement("img");
		image.src =  images[i];
		image.style.width = "1px";
		document.getElementById("prefetch").appendChild(image);
	}
}

var images = [
	"a/supermarket/01.png",
	"a/supermarket/02.png",
	"a/supermarket/03.png",
	/*"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",*/
	""
];