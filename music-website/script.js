const scrollLeft = document.querySelector(".scroll-left");
const scrollRight = document.querySelector(".scroll-right");
const heroDiv = document.querySelector(".hero-img");
const sectionContainer = document.querySelector("section");
const bodyContainer = document.querySelector("body");
const emblemDiv = document.querySelector(".emblem");
const albumTitleSpan = document.querySelector(".album-title");
const texts = document.querySelectorAll(".text");
const albumNum = document.querySelector(".album-num");
const spotifyWidget = document.querySelector(".spotify-widget iframe");
const albums = [
	{
		album: "22, S-Crew",
		emblem: "Life is better with music",
		"bg-color": ["#0396FF", "#0D1827"],
		"accent-color": "#0396FF",
		url: "https://upload.wikimedia.org/wikipedia/fr/thumb/d/dc/S-Crew.jpg/220px-S-Crew.jpg",
		spotify:
			"https://open.spotify.com/embed/track/0Q9yA6p8yufj42kYFZMdJa?utm_source=generator"
	},
    {
		album: "50 cent, I Get Money ",
		emblem: "Life is better with music",
		"bg-color": ["#3df5a7", "#0D1827"],
		"accent-color": "#3df5a7",
		url:
			"https://www.nova.fr/wp-content/uploads/sites/2/2021/06/50-cent-getty-images.png",
		spotify:
			"https://open.spotify.com/embed/track/2OXo0vKbu3ilgz4S5EOn60?utm_source=generator"
	},
	{
		album: "Sheck Wes, Mo Bamba",
		emblem: "Life is better with music",
		"bg-color": ["#727272", "#0D1827"],
		"accent-color": "#727272",
		url: "https://www.billboard.com/wp-content/uploads/media/Sheck-Wes-press-photo-2018-cr_Cian-Moore-billboard-1548.jpg",
		spotify:
			"https://open.spotify.com/embed/track/1xzBco0xcoJEDXktl7Jxrr?utm_source=generator"
	},
	{
		album: "Juice WRLD, Wishing Well",
		emblem: "Life is better with music",
		"bg-color": ["#f687ff", "#0D1827"],
		"accent-color": "#f687ff",
		url:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKlFG8O5Wy7RwLHomE0paYozh-a7mV4Qs58X0pGAWHDOjAy4QLBxcWDRhRYjQbg2l-YvI&usqp=CAU",
		spotify:
			"https://open.spotify.com/embed/track/2U5WueTLIK5WJLD7mvDODv?utm_source=generator"
	},
];

scrollLeft.addEventListener("click", () => handleClickScroll(-1));
scrollRight.addEventListener("click", () => handleClickScroll(1));
heroDiv.addEventListener("animationend", () => {
	heroDiv.classList.remove("album-transition");
	document.addEventListener("keydown", handleKeyScroll);
	scrollLeft.disabled = false;
	scrollRight.disabled = false;
	scrollLeft.classList.remove("key-press-hover-left");
	scrollRight.classList.remove("key-press-hover-right");

	for (const text of texts) text.classList.add("show-texts");
});

const handleClickScroll = (val) => {
	if (index + val >= 0 && index + val < albums.length) {
		updateDisplay((index += val));
	}
};

const handleKeyScroll = (e) => {
	if (e.key == "ArrowLeft") {
		scrollLeft.classList.add("key-press-hover-left");
		handleClickScroll(-1);
	}
	if (e.key == "ArrowRight") {
		scrollRight.classList.add("key-press-hover-right");
		handleClickScroll(1);
	}
};
let index = 0;

const updateDisplay = (index) => {
	let DELIMITER = "";

	const album = albums[index];

	for (const text of texts) text.classList.remove("show-texts");
	emblemDiv.innerHTML = "";
	scrollLeft.disabled = true;
	scrollRight.disabled = true;
	document.removeEventListener("keydown", handleKeyScroll);

	sectionContainer.id = `hero-${album.album.toLowerCase().replace(" ", "-")}`;
	bodyContainer.style.background = `linear-gradient(180deg, ${album["bg-color"][0]} 0%, ${album["bg-color"][1]} 100%)`;
	heroDiv.style.backgroundImage = `url(${album.url})`;
	albumTitleSpan.textContent = album.album;
	spotifyWidget.src = album.spotify;

	const number = index + 1;
	albumNum.innerText = number >= 10 ? number + "." : `0${number}.`;
	albumNum.style.color = album["accent-color"];

	if (index === 3) scrollRight.classList.add("hide-arrow");
	else scrollRight.classList.remove("hide-arrow");

	createEmblem(album.emblem, DELIMITER[0] || undefined).forEach((node) =>
		emblemDiv.append(node)
	);

	heroDiv.classList.add("album-transition");
};

const createEmblem = (string, delimiter = "•") => {
	const spans = [];

	string = string.trim().replaceAll(" ", delimiter) + delimiter;
	const numChars = string.length;
	const degVal = 90 / (numChars / 4);

	string.split("").forEach((char, idx) => {
		const span = document.createElement("span");
		span.innerText = char;
		span.style.transform = `rotate(${180 - degVal * idx}deg)`;
		if (char === delimiter) span.style.color = albums[index]["accent-color"];
		spans.push(span);
	});

	return spans;
};

updateDisplay(index);