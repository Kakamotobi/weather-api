// ----------Current Timezone Weather---------- //

// Select DOM Objects
const currentTzTimezone = document.querySelector(".currentTimezone__timezone");
const currentTzWeatherIcon = document.querySelector(
	".currentTimezone__weatherIcon"
);
const currentTzMax = document.querySelector(".currentTimezone__max");
const currentTzMin = document.querySelector(".currentTimezone__min");
const currentTzTemp = document.querySelector(".currentTimezone__temp");
const currentTzTempDegree = document.querySelector(
	".currentTimezone__tempDegree"
);
const currentTzTempUnit = document.querySelector(".currentTimezone__tempUnit");
const currentTzTempDesc = document.querySelector(".currentTimezone__tempDesc");

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
const otherTzTimezone = document.querySelector(".otherTimezone__timezone");
const otherTzWeatherIcon = document.querySelector(
	".otherTimezone__weatherIcon"
);
const otherTzMax = document.querySelector(".otherTimezone__max");
const otherTzMin = document.querySelector(".otherTimezone__min");
const otherTzTemp = document.querySelector(".otherTimezone__temp");
const otherTzTempDegree = document.querySelector(".otherTimezone__tempDegree");
const otherTzTempUnit = document.querySelector(".otherTimezone__tempUnit");
const otherTzTempDesc = document.querySelector(".otherTimezone__tempDesc");

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
		"#otherTimezone__searchCity"
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

// ----------Functions---------- //

// Function for Displaying Information
function displayInfo(timezoneDisplay, timezoneData) {
	const { timezone, weatherIcon, max, min, tempDegree, tempUnit, tempDesc } =
		timezoneDisplay;
	const {
		dataCity,
		dataCtry,
		dataIcon,
		dataMaxTemp,
		dataMinTemp,
		dataTemp,
		dataDesc,
	} = timezoneData;
	timezone.textContent = `${dataCity}, ${dataCtry}`;
	weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${dataIcon}.png" width="70px" height="70px"/>`;
	max.textContent = Math.round(celsius(dataMaxTemp)) + "°";
	min.textContent = Math.round(celsius(dataMinTemp)) + "°";
	tempDegree.textContent = Math.round(celsius(dataTemp));
	tempUnit.textContent = "°C";
	tempDesc.textContent = dataDesc;
}

// Kelvin to Celsius
function celsius(x) {
	return x - 273.15;
}

// Kelvin to Fahrenheit
function fahrenheit(x) {
	return (x - 273.15) * (9 / 5) + 32;
}

// Function for Unit Conversion
function unitConversion(timezoneDisplay, timezoneData) {
	const { tempUnit, tempDegree, max, min } = timezoneDisplay;
	const { dataTemp, dataMaxTemp, dataMinTemp } = timezoneData;

	if (tempUnit.textContent === "°C") {
		tempDegree.textContent = Math.round(fahrenheit(dataTemp));
		tempUnit.textContent = "°F";
		max.textContent = Math.round(fahrenheit(dataMaxTemp)) + "°";
		min.textContent = Math.round(fahrenheit(dataMinTemp)) + "°";
	} else {
		tempDegree.textContent = Math.round(celsius(dataTemp));
		tempUnit.textContent = "°C";
		max.textContent = Math.round(celsius(dataMaxTemp)) + "°";
		min.textContent = Math.round(celsius(dataMinTemp)) + "°";
	}
}
