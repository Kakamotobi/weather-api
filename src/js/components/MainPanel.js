class MainPanel extends HTMLElement {
	constructor() {
		super();
		this.data = {};
		this.errorMsg = "";
	}

	connectedCallback() {
		this.data = JSON.parse(this.getAttribute("data"));
		this.errorMsg = this.getAttribute("errorMsg");

		this.render();
	}

	render() {
		if (this.data) {
			this.innerHTML = `
        <div class="summary">
          <div class="container-wrapper">
            <div class="temp-container">
            <div class="temp-high-low">
                <span class="temp-high">${this.data.tempHigh || ""}</span>
              <span class="temp-low">${this.data.tempLow || ""}</span>
            </div>
              <span class="temp">${this.data.temp || "-"}&#176;</span>
          </div>
          <div class="location-info-container">
              <h1 class="location">${
								this.errorMsg
									? this.errorMsg
									: `${this.data.cityName || ""}, ${this.data.ctryName || ""}`
							}</h1>
            <small class="time-date">${this.data.time || ""}</small>
          </div>
          <div class="weather-info-container">
            <span class="weather-icon"><img class="weather-icon-img" src="${
							this.data.weatherIcon || ""
						}" /></span>
              <span class="weather-desc">${this.data.weatherDesc || ""}</span>
          </div>
          </div>
        </div>
      `;
		}
	}
}

customElements.define("main-panel", MainPanel);
