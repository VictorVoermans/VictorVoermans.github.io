function prefetch() {
	if (document.getElementById("img_0").complete == false) {
		for (i = 0; i < images.length; i++) {
			var image = document.createElement("img");
			image.src = images[i];
			image.style.width = "1px";
			image.id = "img_" + i;
			document.getElementById("prefetch").appendChild(image);
		}
	}
}

var images = [
	"a/supermarket/01.png",
	"a/supermarket/02.png",
	"a/supermarket/03.png",
	"beeld/3d/01.png",
	"beeld/3d/02.png",
	"beeld/3d/03.png",
	"beeld/3d/04.png",
	"beeld/3d/05.png",
	"beeld/3d/09.png",
	"beeld/3d/10.png",
	"beeld/3d/11.png",
	"beeld/3d/12.png",
	"beeld/3d/13.png",
	"beeld/3d/14.png",
	"beeld/3d/15.png",
	"beeld/3d/16.png",
	"beeld/3d/17.png",
	"beeld/3d/18.png",
	"beeld/3d/19.png",
	"beeld/3d/20.png",
	"beeld/fotos/01.JPG",
	"beeld/fotos/02.JPG",
	"beeld/fotos/03.JPG",
	"beeld/fotos/04.JPG",
	"beeld/fotos/05.JPG",
	"moois/bill.jpg",
	"moois/izutsu.jpg",
	"moois/japanese_verse.jpg",
	"moois/nagai.jpg",
	"moois/paper_castles.jpg",
	"moois/quakefish.jpg",
	"moois/vewn.jpg",
	"moois/vreemdeling.jpg",
	"moois/wind.jpg",
	"moois/zeen.jpg",
	"moois/jonni.png",
	"overig/arkay.jpg",
	"overig/octal.jpg",
	"overig/rupple.jpg",
	"overig/tension.jpg",
	"overig/torrow.jpg",
	"overig/africa.png",
	"overig/bus.png",
	"overig/halte.png",
	"overig/sharp_heavens.png",
	"overig/sneeuw.png",
	"overig/station.png",
	"overig/vgen.png",
	"overig/wolken.png",
	"woorden/beethoven.jpg"
];