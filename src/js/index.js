// Geolocation Event Listener
window.addEventListener("load", () => {
	// If browser supports geolocation
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(async (position) => {
			const lat = position.coords.latitude;
			const lon = position.coords.longitude;

			const api1 = `${BASE_URL1}/current.json?q=${lat},${lon}&aqi=yes&key=${API_KEY1}`;
			const api2 = `${BASE_URL2}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY2}`;

			const data = await fetchData(api1, api2);
			displayData(data);
		});
	} else {
		timeDateDisplay.textContent = "Browser Doesn't Support Geolocation";
	}
});

// Search Event Listener
form.addEventListener("submit", async (evt) => {
	evt.preventDefault();
	const api1 = `${BASE_URL1}/current.json?q=${searchInput.value}&aqi=yes&key=${API_KEY1}`;
	const api2 = `${BASE_URL2}/weather?q=${searchInput.value}&appid=${API_KEY2}`;

	const data = await fetchData(api1, api2);
	displayData(data);
	searchInput.value = "";
	searchInput.blur();
});

// Major Cities Event Listener
for (let city of majorCity) {
	city.addEventListener("click", async (evt) => {
		const cityName = evt.target.innerText;
		const api1 = `${BASE_URL1}/current.json?q=${cityName}&aqi=yes&key=${API_KEY1}`;
		const api2 = `${BASE_URL2}/weather?q=${cityName}&appid=${API_KEY2}`;

		const data = await fetchData(api1, api2);
		displayData(data);

		majorCities.querySelector(".active")?.classList.remove("active");
		city.classList.add("active");
	});
}
