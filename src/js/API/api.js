// Weather & Air Quality Info API
const BASE_URL1 = "https://api.weatherapi.com/v1";
const API_KEY1 = "004d4c8732b1442897341639222004";

// Temp, High/Low, Feels Like & Country Code API
const BASE_URL2 = "https://api.openweathermap.org/data/2.5";
const API_KEY2 = "bff78a7cb5f9a304d7ec8c6a3b4b82ba";

// Fetch Data from API
const fetchData = async (api1, api2) => {
	try {
		startLoader();

		const [res1, res2] = await Promise.all([fetch(api1), fetch(api2)]);

		if (!res1.ok || !res2.ok) {
			throw new Error(!res1.ok ? res1.status : res2.status);
		}

		const data1 = await res1.json();
		const data2 = await res2.json();

		endLoader();

		return { ...data1, ...data2 };
	} catch (err) {
		endLoader();

		if (err.message === "400") displayError("Enter a valid city");
		else if (err.message === "401" || err.message === "403")
			displayError("Something went wrong with the API");
		else displayError("Oops! Please try again");
	}
};
