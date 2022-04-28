// Geolocation Event Listener
window.addEventListener("load", () => {
	// If browser supports geolocation
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			async (position) => {
				const lat = position.coords.latitude;
				const lon = position.coords.longitude;

				const api1 = `${BASE_URL1}/current.json?q=${lat},${lon}&aqi=yes&key=${API_KEY1}`;
				const api2 = `${BASE_URL2}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY2}`;

				const data = await fetchData(api1, api2);
				if (data) displayData(data);
			},
			(err) => {
				locationDisplay.innerText = err.message;
				timeDateDisplay.innerText =
					"Try refreshing and allow the use of your location.";
			}
		);
	} else {
		locationDisplay.innerText = "Browser doesn't support geolocation";
		timeDateDisplay.innerText = "Try searching";
	}
});

// Search Event Listener
form.addEventListener("submit", async (evt) => {
	evt.preventDefault();
	const api1 = `${BASE_URL1}/current.json?q=${searchInput.value}&aqi=yes&key=${API_KEY1}`;
	const api2 = `${BASE_URL2}/weather?q=${searchInput.value}&units=metric&appid=${API_KEY2}`;

	const data = await fetchData(api1, api2);
	if (data) {
		displayData(data);

		majorCities.querySelector(".text-active")?.classList.remove("text-active");
		for (let city of majorCity) {
			if (
				city.getAttribute("name") ===
				searchInput.value.toLowerCase().replace(/ /g, "")
			) {
				city.classList.add("text-active");
			}
		}

		searchInput.value = "";
		searchInput.blur();
	}
});

// Major Cities Event Listener
for (let city of majorCity) {
	city.addEventListener("click", async (evt) => {
		const cityName = evt.target.innerText;
		const api1 = `${BASE_URL1}/current.json?q=${cityName}&aqi=yes&key=${API_KEY1}`;
		const api2 = `${BASE_URL2}/weather?q=${cityName}&units=metric&appid=${API_KEY2}`;

		const data = await fetchData(api1, api2);
		if (data) {
			displayData(data);
			majorCities
				.querySelector(".text-active")
				?.classList.remove("text-active");
			city.classList.add("text-active");
		}
	});
}
