function prefetch() {
	for (i = 0; i < images.length; i++) {
		var image = document.createElement("img");
		image.src = images[i];
		image.style.width = "1px";
		document.getElementById("prefetch").appendChild(image);
	}
}