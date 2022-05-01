class InformationList extends HTMLElement {
	constructor() {
		super();
		this.infoName = "";
		this.infoVal = "";
	}

	connectedCallback() {
		this.infoName = this.getAttribute("infoName");
		this.infoVal = this.getAttribute("infoVal");

		this.render();
	}

	render() {
		this.innerHTML = `
      <li class="information">
        <span>${this.infoName}</span><span>${this.infoVal}</span>
      </li>
    `;
	}
}

customElements.define("information-list", InformationList);
