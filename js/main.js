

(function($){

	// Slider
	$("#slider").pepperSlider({
		prev: "prev",
		next: "next",
		animation: "fade",
		activeClass: "pepperSliderActiveClass",
		parallax: "pepperSliderParallaxClass",
		pagination: {
			id : "pagination",
			type: ["Red Pepper", "Green Pepper", "Yellow Pepper", "Black Pepper", "Orange Pepper"]
		}
	});

})(this.jQuery);
