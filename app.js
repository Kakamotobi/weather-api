// ----------Current Timezone Weather---------- //

// Select DOM objects
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

// Geolocation event listener
window.addEventListener("load", function () {
    // if browser supports geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Set coordinates
                const lon = position.coords.longitude;
                const lat = position.coords.latitude;

                // API current timezone
                const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bff78a7cb5f9a304d7ec8c6a3b4b82ba`;
                fetch(api)
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        // Select API objects
                        const dataCity = data.name;
                        const dataCtry = data.sys.country;
                        const dataIcon = data.weather[0].icon;
                        const dataMaxTemp = data.main.temp_max;
                        const dataMinTemp = data.main.temp_min;
                        const dataTemp = data.main.temp;
                        const dataDesc = data.weather[0].description;

                        // Update display
                        displayInfo(
                            currentTzTimezone,
                            currentTzWeatherIcon,
                            currentTzMax,
                            currentTzMin,
                            currentTzTempDegree,
                            currentTzTempUnit,
                            currentTzTempDesc,
                            dataCity,
                            dataCtry,
                            dataIcon,
                            dataMaxTemp,
                            dataMinTemp,
                            dataTemp,
                            dataDesc
                        );

                        // Convert between celsius/fahrenheit
                        currentTzTemp.addEventListener("click", () => {
                            unitConversion(
                                currentTzTempUnit,
                                currentTzTempDegree,
                                currentTzMax,
                                currentTzMin,
                                dataTemp,
                                dataMaxTemp,
                                dataMinTemp
                            );
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

// Select DOM objects
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

// Search submit event listener
form.addEventListener("submit", function (evt) {
    evt.preventDefault();
    const otherTzSearchCity = document.querySelector(
        "#otherTimezone__searchCity"
    );

    // API search timezone
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${otherTzSearchCity.value}&appid=bff78a7cb5f9a304d7ec8c6a3b4b82ba`;
    fetch(api)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            // Select API objects
            const dataCity = data.name;
            const dataCtry = data.sys.country;
            const dataIcon = data.weather[0].icon;
            const dataMaxTemp = data.main.temp_max;
            const dataMinTemp = data.main.temp_min;
            const dataTemp = data.main.temp;
            const dataDesc = data.weather[0].description;

            otherTzTimezone.textContent = `${dataCity}, ${dataCtry}`;
            otherTzWeatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${dataIcon}.png" width="70px" height="70px"/>`;
            otherTzTempDegree.textContent = Math.round(celsius);
            otherTzTempDesc.textContent = dataDesc;

            // Update display
            displayInfo(
                otherTzTimezone,
                otherTzWeatherIcon,
                otherTzMax,
                otherTzMin,
                otherTzTempDegree,
                otherTzTempUnit,
                otherTzTempDesc,
                dataCity,
                dataCtry,
                dataIcon,
                dataMaxTemp,
                dataMinTemp,
                dataTemp,
                dataDesc
            );

            // Convert between celsius/fahrenheit
            otherTzTemp.addEventListener("click", () => {
                unitConversion(
                    otherTzTempUnit,
                    otherTzTempDegree,
                    otherTzMax,
                    otherTzMin,
                    dataTemp,
                    dataMaxTemp,
                    dataMinTemp
                );
            });
        })
        .catch((err) => {
            otherTzTimezone.textContent = "Try Again";
        });

    // Reset search value
    otherTzSearchCity.value = "";
});

// ----------Functions---------- //
// Function for displaying information
function displayInfo(
    timezone,
    weatherIcon,
    max,
    min,
    tempDegree,
    tempUnit,
    tempDesc,
    dataCity,
    dataCtry,
    dataIcon,
    dataMaxTemp,
    dataMinTemp,
    dataTemp,
    dataDesc
) {
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

// Function for unit conversion
function unitConversion(
    unit,
    degree,
    max,
    min,
    dataTemp,
    dataMaxTemp,
    dataMinTemp
) {
    if (unit.textContent === "°C") {
        degree.textContent = Math.round(fahrenheit(dataTemp));
        unit.textContent = "°F";
        max.textContent = Math.round(fahrenheit(dataMaxTemp)) + "°";
        min.textContent = Math.round(fahrenheit(dataMinTemp)) + "°";
    } else {
        degree.textContent = Math.round(celsius(dataTemp));
        unit.textContent = "°C";
        max.textContent = Math.round(celsius(dataMaxTemp)) + "°";
        min.textContent = Math.round(celsius(dataMinTemp)) + "°";
    }
}
