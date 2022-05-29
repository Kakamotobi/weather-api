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
	const className = ratings[rate].toLowerCase().match(re).join("-"); // ""
	airQualityRatingDisplay.classList.remove(
		...airQualityRatingDisplay.classList
	);
	airQualityRatingDisplay.classList.add(className);

	return ratings[rate]; // Ex: "Good"
};
