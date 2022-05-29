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
