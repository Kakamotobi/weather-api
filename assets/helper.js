// Function for Displaying Information
function displayInfo(timezoneDisplay, timezoneData) {
	const { timezone, weatherIcon, tempDegree, tempUnit, tempDesc } =
		timezoneDisplay;
	const { dataCity, dataCtry, dataIcon, dataTemp, dataDesc } = timezoneData;
	timezone.textContent = `${dataCity}, ${dataCtry}`;
	weatherIcon.innerHTML = `<img src="https:${dataIcon}" width="70px" height="70px" />`;
	tempDegree.textContent = dataTemp;
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
