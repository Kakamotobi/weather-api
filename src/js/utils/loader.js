const startLoader = () => {
	// Deactivate content
	containerWrapper.classList.add("non-active");
	for (let info of information) {
		info.classList.add("non-active");
	}
	airQualityRatingDisplay.classList.add("non-active");
	// Activate loader
	for (let loader of loaders) {
		loader.classList.add("active");
	}
};

const endLoader = () => {
	for (let loader of loaders) {
		loader.classList.remove("active");
	}
	containerWrapper.classList.remove("non-active");
	for (let info of information) {
		info.classList.remove("non-active");
	}
	airQualityRatingDisplay.classList.remove("non-active");
};
