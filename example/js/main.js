(function($) {

	// Slider
	$('#slider').pepperSlider({
		touch: true,
		activeClass: 'pepperSliderActiveClass',
		startAt: 2,
		stopAtBounds: true,
		continuous: true,
		pagination: {
			id: 'pagination',
			type: ['Red Pepper', 'Green Pepper', 'Yellow Pepper', 'Black Pepper', 'Orange Pepper']
		}
	});
	$('#slider').on('beforeAnimate', function(event) {
		console.log('Slide that will become active has these classes :\n' + event.slide.attr("class"));
	});
	$('#slider').on('afterAnimate', function(event) {
		console.log('Slide that is now active has these classes :\n' + event.slide.attr("class"));
	});

})(this.jQuery);