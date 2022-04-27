// Find Background Image
const findImg = (code) => {
	if (code === 1000) return "clear";
	else if (code === 1003 || code === 1006) return "cloudy";
	else if (code === 1009) return "overcast";
	else if (code === 1030 || code === 1135 || code === 1147) return "fog";
	else if (
		code === 1063 ||
		code === 1150 ||
		code === 1153 ||
		code === 1180 ||
		code === 1183 ||
		code === 1240 ||
		code === 1273
	)
		return "light-rain";
	else if (
		code === 1066 ||
		code === 1210 ||
		code === 1213 ||
		code === 1255 ||
		code === 1279
	)
		return "light-snow";
	else if (
		code === 1069 ||
		code === 1072 ||
		code === 1168 ||
		code === 1171 ||
		code === 1198 ||
		code === 1201 ||
		code === 1204 ||
		code === 1207 ||
		code === 1237 ||
		code === 1249 ||
		code === 1252 ||
		code === 1261 ||
		code === 1264
	)
		return "sleet";
	else if (
		code === 1186 ||
		code === 1189 ||
		code === 1192 ||
		code === 1195 ||
		code === 1243 ||
		code === 1246 ||
		code === 1276
	)
		return "heavy-rain";
	else if (
		code === 1114 ||
		code === 1117 ||
		code === 1216 ||
		code === 1219 ||
		code === 1222 ||
		code === 1225 ||
		code === 1258 ||
		code === 1282
	)
		return "heavy-snow";
	else if (code === 1087) return "thunder";
};

// Format Time and Date
const formatTimeAndDate = (dateStr) => {
	const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	let parsedDateStr = dateStr.split(" ");
	parsedDateStr =
		parsedDateStr[1].length === 4
			? parsedDateStr.join("T0")
			: parsedDateStr.join("T");

	const today = new Date(parsedDateStr);

	const hours = today.getHours() === 12 ? 12 : today.getHours() % 12;
	const mins = today.getMinutes().toString().padStart(2, "0");
	const meridiem = today.getHours() >= 12 ? "PM" : "AM";
	const day = days[today.getDay()];
	const month = months[today.getMonth()];
	const date = today.getDate();
	const year = today.getFullYear();

	return `${hours}:${mins}${meridiem} ${day}, ${month} ${date}, ${year}`;
};

// Rate Air Quality
const rateAirQuality = (rate) => {
	const ratings = [
		null,
		"Good",
		"Moderate",
		"Unhealthy (sensitive)",
		"Unhealthy",
		"Very Unhealthy",
		"Hazardous",
	];

	// Set the rating text color
	const re = new RegExp("[a-z]+", "g");
	const className = ratings[rate].toLowerCase().match(re).join("-");
	airQualityRatingDisplay.classList.remove(
		...airQualityRatingDisplay.classList
	);
	airQualityRatingDisplay.classList.add(className);

	return ratings[rate];
};

// Start Loading
const startLoading = () => {
	// Deactivate content
	containerWrapper.classList.add("non-active");
	for (let info of information) {
		info.classList.add("non-active");
	}
	airQualityRatingDisplay.classList.add("non-active");
	// Activate loader
	for (let loader of loaders) {
		loader.classList.add("active");
	}
};

// End Loading
const endLoading = () => {
	for (let loader of loaders) {
		loader.classList.remove("active");
	}
	containerWrapper.classList.remove("non-active");
	for (let info of information) {
		info.classList.remove("non-active");
	}
	airQualityRatingDisplay.classList.remove("non-active");
};

// Fetch Data from API
const fetchData = async (api1, api2) => {
	try {
		startLoading();

		const [res1, res2] = await Promise.all([fetch(api1), fetch(api2)]);

		if (!res1.ok || !res2.ok) {
			throw new Error(!res1.ok ? res1.status : res2.status);
		}

		const data1 = await res1.json();
		const data2 = await res2.json();

		endLoading();

		return { ...data1, ...data2 };
	} catch (err) {
		endLoading();

		if (err.message === "400") displayError("Enter a valid city");
		else if (err.message === "401" || err.message === "403")
			displayError("Something went wrong with the API");
		else displayError("Oops! Please try again");
	}
};

// Display Data
const displayData = (data) => {
	const { location, current, name, sys, main } = data;

	// Background Image
	const dayOrNight = current.is_day === 1 ? "day" : "night";
	const imgTitle = findImg(current.condition.code);
	body.style.backgroundImage = `url(src/images/weather/${dayOrNight}/${imgTitle}.png)`;
	// Night Styles
	if (dayOrNight === "night") {
		body.classList.add("night");
	} else {
		body.classList.remove("night");
	}
	// Main Panel
	tempHighDisplay.textContent = Math.round(main.temp_max);
	tempLowDisplay.textContent = Math.round(main.temp_min);
	tempDisplay.innerHTML = `${Math.round(main.temp)}&#176;`;
	locationDisplay.textContent = `${name}, ${sys.country}`;
	timeDateDisplay.textContent = formatTimeAndDate(location.localtime);
	weatherIconDisplay.innerHTML = `<img class="weather-icon-img" src="${current.condition.icon}" />`;
	weatherDescDisplay.textContent = current.condition.text;
	// Side Panel
	feelsLikeDisplay.innerHTML = `
	<span>Feels like</span><span>${Math.round(main.feels_like)}&#176;</span>
	`;
	uvIndexDisplay.innerHTML = `<span>UV</span><span>${current.uv}</span>`;
	windDisplay.innerHTML = `<span>Wind</span><span>${current.wind_kph}km/h</span>`;
	humidityDisplay.innerHTML = `<span>Humidity</span><span>${current.humidity}%</span>`;
	precipitationDisplay.innerHTML = `<span>Precipitation</span><span>${current.precip_mm}mm</span>`;
	visibilityDisplay.innerHTML = `<span>Visibility</span><span>${current.vis_km}km</span>`;
	airQualityRatingDisplay.textContent = rateAirQuality(
		current.air_quality["us-epa-index"]
	);
	pm10Display.innerHTML = `<span>PM<sub>10</sub></span><span>${current.air_quality[
		"pm10"
	].toFixed(1)}μg/m<sup>3</sup></span>`;
	pm2_5Display.innerHTML = `<span>PM<sub>2.5</sub></span><span>${current.air_quality[
		"pm2_5"
	].toFixed(1)}μg/m<sup>3</sup></span>`;
	ozoneDisplay.innerHTML = `<span>O<sub>3</sub></sub></span><span>${current.air_quality[
		"o3"
	].toFixed(1)}μg/m<sup>3</sup></span>`;
	carbonMonoxideDisplay.innerHTML = `<span>CO</span><span>${current.air_quality[
		"co"
	].toFixed(1)}μg/m<sup>3</sup></span>`;
	nitrogenDioxideDisplay.innerHTML = `<span>NO<sub>2</sub></span><span>${current.air_quality[
		"no2"
	].toFixed(1)}μg/m<sup>3</sup></span>`;
};

// Display Error
const displayError = (msg) => {
	// Main Panel
	tempHighDisplay.textContent = "";
	tempLowDisplay.textContent = "";
	tempDisplay.innerHTML = "-&#176;";
	locationDisplay.textContent = msg;
	timeDateDisplay.textContent = "";
	weatherIconDisplay.innerHTML = "";
	weatherDescDisplay.textContent = "";
	// Side Panel
	feelsLikeDisplay.innerHTML = "";
	uvIndexDisplay.innerHTML = "";
	windDisplay.innerHTML = "";
	humidityDisplay.innerHTML = "";
	precipitationDisplay.innerHTML = "";
	visibilityDisplay.innerHTML = "";
	airQualityRatingDisplay.innerHTML = "";
	pm10Display.innerHTML = "";
	pm2_5Display.innerHTML = "";
	ozoneDisplay.innerHTML = "";
	carbonMonoxideDisplay.innerHTML = "";
	nitrogenDioxideDisplay.innerHTML = "";
};
