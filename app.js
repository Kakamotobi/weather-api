// -----Proxy for localhost----- //
const proxy = "https://cors-anywhere.herokuapp.com/";

// -----Current Location Weather----- //
window.addEventListener("load", function () {
    // Select DOM objects
    const timezone = document.querySelector(".timezone");
    const weatherIcon = document.querySelector(".weatherIcon");
    const max = document.querySelector(".max");
    const min = document.querySelector(".min");
    const temp = document.querySelector(".temp");
    const tempDegree = document.querySelector(".temp_degree");
    const tempUnit = document.querySelector(".temp_unit");
    const tempDesc = document.querySelector(".temp_desc");

    // if browser supports geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Set coordinates
                const lon = position.coords.longitude;
                const lat = position.coords.latitude;

                // API Current Location
                const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bff78a7cb5f9a304d7ec8c6a3b4b82ba`;
                fetch(api)
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        // Select API objects
                        const cityData = data.name;
                        const ctryData = data.sys.country;
                        const iconData = data.weather[0].icon;
                        const maxTempData = data.main.temp_max;
                        const minTempData = data.main.temp_min;
                        const tempData = data.main.temp;
                        const descData = data.weather[0].description;

                        // Update display
                        displayInfo(
                            timezone,
                            weatherIcon,
                            max,
                            min,
                            tempDegree,
                            tempUnit,
                            tempDesc,
                            cityData,
                            ctryData,
                            iconData,
                            maxTempData,
                            minTempData,
                            tempData,
                            descData
                        );

                        // Convert between celsius/fahrenheit
                        temp.addEventListener("click", () => {
                            unitConversion(
                                tempUnit,
                                tempDegree,
                                max,
                                min,
                                tempData,
                                maxTempData,
                                minTempData
                            );
                        });
                    })
                    // Error when something in the code doesn't work (ex: code, link trouble, etc.).
                    .catch((err) => {
                        console.log(err);
                    });
            },
            // Display error when user denies geolocation
            (err) => (tempDesc.textContent = err.message)
        );
    }
    // When browser doesn't support geolocation
    else {
        tempDesc.textContent = "Browser doesn't Support Geolocation";
    }
});

// -----Other Location Weather----- //
const form = document.querySelector("form");

form.addEventListener("submit", function (evt) {
    evt.preventDefault();
    const searchCity = document.querySelector("#searchCity");

    // Select DOM objects
    const timezone = document.querySelector(".other_timezone");
    const weatherIcon = document.querySelector(".other_weatherIcon");
    const max = document.querySelector(".other_max");
    const min = document.querySelector(".other_min");
    const temp = document.querySelector(".other_temp");
    const tempDegree = document.querySelector(".other_temp_degree");
    const tempUnit = document.querySelector(".other_temp_unit");
    const tempDesc = document.querySelector(".other_temp_desc");

    // API search city
    const api = `${proxy}api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&appid=bff78a7cb5f9a304d7ec8c6a3b4b82ba`;
    fetch(api)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            // Select API objects
            const cityData = data.name;
            const ctryData = data.sys.country;
            const iconData = data.weather[0].icon;
            const maxTempData = data.main.temp_max;
            const minTempData = data.main.temp_min;
            const tempData = data.main.temp;
            const descData = data.weather[0].description;

            timezone.textContent = `${cityData}, ${ctryData}`;
            weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconData}.png" width="70px" height="70px"/>`;
            tempDegree.textContent = Math.round(celsius);
            tempDesc.textContent = descData;

            // Update display
            displayInfo(
                timezone,
                weatherIcon,
                max,
                min,
                tempDegree,
                tempUnit,
                tempDesc,
                cityData,
                ctryData,
                iconData,
                maxTempData,
                minTempData,
                tempData,
                descData
            );

            // Convert between celsius/fahrenheit
            temp.addEventListener("click", () => {
                unitConversion(
                    tempUnit,
                    tempDegree,
                    max,
                    min,
                    tempData,
                    maxTempData,
                    minTempData
                );
            });
        })
        .catch((err) => {
            otherTimezone.textContent = "Try Again";
        });

    // Reset search value
    searchCity.value = "";
});

// -----Functions----- //
// Function for displaying information
function displayInfo(
    timezone,
    weatherIcon,
    max,
    min,
    tempDegree,
    tempUnit,
    tempDesc,
    cityData,
    ctryData,
    iconData,
    maxTempData,
    minTempData,
    tempData,
    descData
) {
    timezone.textContent = `${cityData}, ${ctryData}`;
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconData}.png" width="70px" height="70px"/>`;
    max.textContent = Math.round(celsius(maxTempData)) + "°";
    min.textContent = Math.round(celsius(minTempData)) + "°";
    tempDegree.textContent = Math.round(celsius(tempData));
    tempUnit.textContent = "°C";
    tempDesc.textContent = descData;
}

// Kelvin to Celsius
function celsius(x) {
    return x - 273.15;
}
// Kelvin to Fahrenheit
function fahrenheit(x) {
    return (x - 273.15) * (9 / 5) + 32;
}

// Function for unit conversion
function unitConversion(
    unit,
    degree,
    max,
    min,
    tempData,
    maxTempData,
    minTempData
) {
    if (unit.textContent === "°C") {
        degree.textContent = Math.round(fahrenheit(tempData));
        unit.textContent = "°F";
        max.textContent = Math.round(fahrenheit(maxTempData)) + "°";
        min.textContent = Math.round(fahrenheit(minTempData)) + "°";
    } else {
        degree.textContent = Math.round(celsius(tempData));
        unit.textContent = "°C";
        max.textContent = Math.round(celsius(maxTempData)) + "°";
        min.textContent = Math.round(celsius(minTempData)) + "°";
    }
}
