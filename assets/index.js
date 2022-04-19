// ----------Current Timezone Weather---------- //

// Select DOM Objects
const currentTzTimezone = document.querySelector(".current-timezone__timezone");
const currentTzWeatherIcon = document.querySelector(
	".current-timezone__weatherIcon"
);
const currentTzMax = document.querySelector(".current-timezone__max");
const currentTzMin = document.querySelector(".current-timezone__min");
const currentTzTemp = document.querySelector(".current-timezone__temp");
const currentTzTempDegree = document.querySelector(
	".current-timezone__tempDegree"
);
const currentTzTempUnit = document.querySelector(".current-timezone__tempUnit");
const currentTzTempDesc = document.querySelector(".current-timezone__tempDesc");

// Current Timezone Display Object
const currentTimezoneDisplay = {
	timezone: currentTzTimezone,
	weatherIcon: currentTzWeatherIcon,
	max: currentTzMax,
	min: currentTzMin,
	temp: currentTzTemp,
	tempDegree: currentTzTempDegree,
	tempUnit: currentTzTempUnit,
	tempDesc: currentTzTempDesc,
};

// Geolocation Event Listener
window.addEventListener("load", function () {
	// if browser supports geolocation
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				// Set Coordinates
				const lon = position.coords.longitude;
				const lat = position.coords.latitude;

				// API Current Timezone
				const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bff78a7cb5f9a304d7ec8c6a3b4b82ba`;
				fetch(api)
					.then((res) => {
						return res.json();
					})
					.then((data) => {
						const { name, sys, weather, main } = data;
						// Current Timezone Data Object
						const currentTimezoneData = {
							dataCity: name,
							dataCtry: sys.country,
							dataIcon: weather[0].icon,
							dataMaxTemp: main.temp_max,
							dataMinTemp: main.temp_min,
							dataTemp: main.temp,
							dataDesc: weather[0].description,
						};

						// Update Display
						displayInfo(currentTimezoneDisplay, currentTimezoneData);

						// Convert between Celsius/Fahrenheit
						currentTzTemp.addEventListener("click", () => {
							unitConversion(currentTimezoneDisplay, currentTimezoneData);
						});
					})
					// Error when something in the code doesn't work (ex: code, link trouble, etc.).
					.catch((err) => {
						console.log(err);
					});
			},
			// Display error when user denies geolocation
			(err) => (currentTzTempDesc.textContent = err.message)
		);
	}
	// When browser doesn't support geolocation
	else {
		currentTzTempDesc.textContent = "Browser Doesn't Support Geolocation";
	}
});

// ----------Other Timezone Weather---------- //

// Select DOM Objects
const form = document.querySelector("form");
const otherTzTimezone = document.querySelector(".other-timezone__timezone");
const otherTzWeatherIcon = document.querySelector(
	".other-timezone__weatherIcon"
);
const otherTzMax = document.querySelector(".other-timezone__max");
const otherTzMin = document.querySelector(".other-timezone__min");
const otherTzTemp = document.querySelector(".other-timezone__temp");
const otherTzTempDegree = document.querySelector(".other-timezone__tempDegree");
const otherTzTempUnit = document.querySelector(".other-timezone__tempUnit");
const otherTzTempDesc = document.querySelector(".other-timezone__tempDesc");

// Other Timezone Display Object
const otherTimezoneDisplay = {
	timezone: otherTzTimezone,
	weatherIcon: otherTzWeatherIcon,
	max: otherTzMax,
	min: otherTzMin,
	temp: otherTzTemp,
	tempDegree: otherTzTempDegree,
	tempUnit: otherTzTempUnit,
	tempDesc: otherTzTempDesc,
};

// Search Submit Event Listener
form.addEventListener("submit", function (evt) {
	evt.preventDefault();
	const otherTzSearchCity = document.querySelector(
		"#other-timezone__searchCity"
	);

	// API Other Timezone
	const api = `https://api.openweathermap.org/data/2.5/weather?q=${otherTzSearchCity.value}&appid=bff78a7cb5f9a304d7ec8c6a3b4b82ba`;
	fetch(api)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			const { name, sys, weather, main } = data;
			// Other Timezone Data Object
			const otherTimezoneData = {
				dataCity: name,
				dataCtry: sys.country,
				dataIcon: weather[0].icon,
				dataMaxTemp: main.temp_max,
				dataMinTemp: main.temp_min,
				dataTemp: main.temp,
				dataDesc: weather[0].description,
			};

			// Update Display
			displayInfo(otherTimezoneDisplay, otherTimezoneData);

			// Convert between Celsius/Fahrenheit
			otherTzTemp.addEventListener("click", () => {
				unitConversion(otherTimezoneDisplay, otherTimezoneData);
			});
		})
		.catch((err) => {
			otherTzTimezone.textContent = "Try Again";
		});

	// Reset Search Value
	otherTzSearchCity.value = "";
});
