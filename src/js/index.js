class App {
	constructor() {
		this.state = {
			errorMsg: "",
			currentData: {},
			currentCity: "",
		};

		// APIs
		// Weather & Air Quality Info API
		this.BASE_URL1 = "https://api.weatherapi.com/v1";
		this.API_KEY1 = "004d4c8732b1442897341639222004";
		// Temp, High/Low, Feels Like & Country Code API
		this.BASE_URL2 = "https://api.openweathermap.org/data/2.5";
		this.API_KEY2 = "bff78a7cb5f9a304d7ec8c6a3b4b82ba";

		// Root
		this.$root = document.getElementById("root");

		// Geolocation Event Listener
		window.addEventListener("load", () => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					async (position) => {
						const lat = position.coords.latitude;
						const lon = position.coords.longitude;

						const api1 = `${this.BASE_URL1}/current.json?q=${lat},${lon}&aqi=yes&key=${this.API_KEY1}`;
						const api2 = `${this.BASE_URL2}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.API_KEY2}`;

						await this.fetchData(api1, api2);
						this.render();
					},
					(err) => {
						// API Error
						this.setState({
							errorMsg: err.message,
							currentData: {},
							currentCity: "",
						});
					}
				);
			} else {
				// Geolocation Error
				this.setState({
					errorMsg: err.message,
					currentData: {},
					currentCity: "",
				});
			}
		});

		// Search Event Listener
		this.$root.addEventListener("submit", async (evt) => {
			evt.preventDefault();
			if (evt.target.classList.contains("search-form")) {
				const searchInput = document.querySelector(".search-input");

				const api1 = `${this.BASE_URL1}/current.json?q=${searchInput.value}&aqi=yes&key=${this.API_KEY1}`;
				const api2 = `${this.BASE_URL2}/weather?q=${searchInput.value}&units=metric&appid=${this.API_KEY2}`;

				await this.fetchData(api1, api2);
				this.render();
			}
		});

		// Major Cities Event Listener
		this.$root.addEventListener("click", async (evt) => {
			if (evt.target.classList.contains("major-city")) {
				const cityName = evt.target.innerText;
				const api1 = `${this.BASE_URL1}/current.json?q=${cityName}&aqi=yes&key=${this.API_KEY1}`;
				const api2 = `${this.BASE_URL2}/weather?q=${cityName}&units=metric&appid=${this.API_KEY2}`;

				await this.fetchData(api1, api2);
				this.render();
			}
		});
	}

	setState(newState) {
		this.state = {
			...this.state,
			...newState,
		};
		this.render();
	}

	async fetchData(api1, api2) {
		try {
			const [res1, res2] = await Promise.all([fetch(api1), fetch(api2)]);

			if (!res1.ok || !res2.ok) {
				throw new Error(!res1.ok ? res1.status : res2.status);
			}

			const data1 = await res1.json();
			const data2 = await res2.json();

			const data = {
				mainPanelData: {
					cityName: data2.name,
					ctryName: data2.sys.country,
					tempHigh: Math.round(data2.main.temp_max),
					tempLow: Math.round(data2.main.temp_min),
					temp: Math.round(data2.main.temp),
					weatherDesc: `${data1.current.condition.text}`,
					weatherIcon: data1.current.condition.icon,
					time: this.formatTimeAndDate(data1.location.localtime),
				},
				weatherPanelData: {
					"Feels Like": `${Math.round(data2.main.feels_like)}&#176;`,
					UV: data1.current.uv,
					Wind: `${data1.current.wind_kph}km/h`,
					Humidity: `${data1.current.humidity}%`,
					Precipitation: `${data1.current.precip_mm}mm`,
					Visibility: `${data1.current.vis_km}km`,
				},
				airQualityPanelData: {
					usEpaIndex: data1.current.air_quality["us-epa-index"],
					details: {
						"PM<sub>10</sub>": `${data1.current.air_quality.pm10.toFixed(
							1
						)}μg/m<sup>3</sup>`,
						"PM<sub>2.5</sub>": `${data1.current.air_quality.pm2_5.toFixed(
							1
						)}μg/m<sup>3</sup>`,
						"O<sub>3</sub>": `${data1.current.air_quality.o3.toFixed(
							1
						)}μg/m<sup>3</sup>`,
						CO: `${data1.current.air_quality.co.toFixed(1)}μg/m<sup>3</sup>`,
						"NO<sub>2</sub>": `${data1.current.air_quality.no2.toFixed(
							1
						)}μg/m<sup>3</sup>`,
					},
				},
				weatherCode: data1.current.condition.code,
				isDay: data1.current.is_day,
			};

			this.setState({
				errorMsg: "",
				currentData: data,
				currentCity: data.mainPanelData.cityName
					.toLowerCase()
					.replace(/ /g, ""),
			});
		} catch (err) {
			let errorMessage;
			if (err.message === "400" || err.message === "404")
				errorMessage = "Enter a valid city";
			else if (
				err.message === "401" ||
				err.message === "403" ||
				err.message === "429"
			)
				errorMessage = "Something went wrong with the API";
			else errorMessage = "Oops! Please try again";

			this.setState({
				errorMsg: errorMessage,
				currentData: {},
				currentCity: "",
			});
		}
	}

	// Find Background Image
	findImgTitle(code) {
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
	}

	// Format Time and Date
	formatTimeAndDate(dateStr) {
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
	}

	// Rate Air Quality
	rateAirQuality(rate) {
		const ratings = [
			null,
			"Good",
			"Moderate",
			"Unhealthy (sensitive)",
			"Unhealthy",
			"Very Unhealthy",
			"Hazardous",
		];

		return ratings[rate];
	}

	// Render
	render() {
		const { errorMsg, currentData, currentCity } = this.state;
		const {
			mainPanelData,
			weatherPanelData,
			airQualityPanelData,
			weatherCode,
			isDay,
		} = currentData;

		// Background Image
		const dayOrNight = isDay === 1 ? "day" : "night";
		const imgTitle = this.findImgTitle(weatherCode) || "clear";
		const bgImgURL = `url(src/images/weather/${dayOrNight}/${imgTitle}.png)`;

		// Set the rating text color
		const re = new RegExp("[a-z]+", "g");
		const airQuality = this.rateAirQuality(airQualityPanelData?.usEpaIndex);
		const airQualityClass = airQuality?.toLowerCase().match(re).join("-");

		// Weather Info Panel
		let weatherInformation = "";
		if (weatherPanelData) {
			for (let [key, val] of Object.entries(weatherPanelData)) {
				weatherInformation += `<information-list infoName="${key}" infoVal="${val}"></information-list>`;
			}
		}

		// Air Quality Panel
		let airQualityInformation = "";
		if (airQualityPanelData) {
			for (let [key, val] of Object.entries(airQualityPanelData.details)) {
				airQualityInformation += `<information-list infoName="${key}" infoVal="${val}"></information-list>`;
			}
		}

		this.$root.innerHTML = `
			<div id="wrapper" class="${dayOrNight}" style="background-image: ${bgImgURL}">
				<section class="main-panel">
					<main-panel 
						data='${mainPanelData !== undefined ? JSON.stringify(mainPanelData) : "{}"}' 
						errorMsg='${errorMsg}'></main-panel>
				</section>

				<section class="side-panel">
					<div class="search-section">
						<search-form></search-form>
						<ul class="major-cities">
							<h3>Major Cities</h3>
							<li class="major-city ${
								currentCity === "newyork" && "text-active"
							}">New York</li>
							<li class="major-city ${currentCity === "london" && "text-active"}">London</li>
							<li class="major-city ${currentCity === "paris" && "text-active"}">Paris</li>
							<li class="major-city ${
								currentCity === "newdelhi" && "text-active"
							}">New Delhi</li>
							<li class="major-city ${currentCity === "sydney" && "text-active"}">Sydney</li>
							<li class="major-city ${currentCity === "seoul" && "text-active"}">Seoul</li>
						</ul>
					</div>

					<div class="more-info-section">
						<div class="weather-information">
							<h3>Weather Info</h3>
							<ul>
								${weatherInformation}
							</ul>
						</div>

						<div class="air-quality-information">
							<h3>Air Quality
								<span id="air-quality-rating" class="${airQualityClass}">
									${airQuality || ""}
								</span>
							</h3>
							<ul>
								${airQualityInformation}
							</ul>
						</div>
					</div>
				</section>
			</div>
		`;
	}
}

new App();
