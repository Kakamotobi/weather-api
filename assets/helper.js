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

// Kelvin to Celsius Conversion
function celsius(x) {
	return x - 273.15;
}

// Kelvin to Fahrenheit Conversion
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
