/*
 * Copyright 2012 Damien SEGUIN
 * http://damienseguin.me/
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CON* NECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

;
(function($, window, undefined) {

	var pluginName = "pepperSlider",
		document = window.document,
		defaults = {

			// Naming
			activeClass: "pepperSliderActiveClass",

			// Animation
			animation: "fade",
			continuous: true,
			keyboardNav: true,
			timer: 3000,
			speed: 1000,
			parallax: "",

			// User Interactions
			overStop: false,
			/* Avoid when onOff, next, prev, pagination are available */

			// Pagination
			startAt: 1,
			pagination: {
				id: "pagination",
				type: "number"
			}
		};

	var PepperSlider = function(element, options) {

			// Plugin internal properties
			this.$element = $(element);
			this.$elementList = $(element).find("> ul");
			this.$elementListAndPagination = $(element).find("> ul, > ol");
			this.options = $.extend({}, defaults, options);
			this._defaults = defaults;
			this._name = pluginName;

			this._init();
		};

	PepperSlider.prototype = {
		_init: function() {

			// Item length
			this.length = this.$elementList.find("> li").length;

			// Init animate
			this._animate(this.options.startAt);
			if(this.options.continuous) {
				this.isRunning = true;
				this.interval = setInterval($.proxy(this._switchActive, this), this.options.timer);
			}
			if(this.options.animation == "cycle") {
				this.$elementList.css("width", this.length * this.$element.width());
			}

			// Create pagination
			if(this.options.pagination.id) {
				var i = 1;
				if(Object.prototype.toString.call(this.options.pagination.type) === "[object Array]") {
					while(i < (this.options.pagination.type.length + 1)) {
						if(i == this.options.startAt) {
							$(document.createElement("li")).addClass(this.options.activeClass).html("<a data-controls=" + i + " href='#'>" + this.options.pagination.type[i - 1] + "</a>").appendTo("#" + this.options.pagination.id);
						} else {
							$(document.createElement("li")).html("<a data-controls=" + i + " href='#'>" + this.options.pagination.type[i - 1] + "</a>").appendTo("#" + this.options.pagination.id);
						}++i;
					}
				} else if (this.options.pagination.type == "number") {
					while(i < (this.length + 1)) {
						if(i == this.options.startAt) {
							$(document.createElement("li")).addClass(this.options.activeClass).html("<a data-controls=" + i + " href='#'>" + i + "</a>").appendTo("#" + this.options.pagination.id);
						} else {
							$(document.createElement("li")).html("<a data-controls=" + i + " href='#'>" + i + "</a>").appendTo("#" + this.options.pagination.id);
						}++i;
					}
				}
			}

			// Eventlistener
			this.$element.on("click", "a", $.proxy(this._on, this));
			if(this.options.keyboardNav) {
				that = this;
				$(document).keydown(function(e) {
					switch (e.keyCode) {
						case 37: that._switchActive("prev"); break;
						case 39: that._switchActive("next"); break;
					}
				});
			}
			if(this.options.overStop) this.$element.on("mouseenter mouseleave", $.proxy(this._on, this));
		},
		_on: function(e) {
			if(e.type == "mouseenter" && this.interval) {
				this.isRunning = false;
				clearInterval(this.interval);
			} else if(e.type == "mouseleave") {
				this.isRunning = true;
				clearInterval(this.interval);
				this.interval = setInterval($.proxy(this._switchActive, this), this.options.timer);
			} else if(e.type == "click") {
				// Prevent default and bubbling
				e.preventDefault();
				e.stopImmediatePropagation();

				// Get the clicked control
				control = $(e.currentTarget).data("controls");

				this._switchActive(control);
			}
		},
		_animate: function(active) {

			// Set active class
			var $oldActiveList = this.$elementListAndPagination.find("." + this.options.activeClass),
				$newActiveList = this.$elementListAndPagination.find("> li:nth-child(" + active + ")");
			oldActive = this.$elementList.find("." + this.options.activeClass), newActive = this.$elementList.find("> li:nth-child(" + active + ")");

			$oldActiveList.removeClass(this.options.activeClass);
			$newActiveList.addClass(this.options.activeClass);

			// Animate
			if($("html").hasClass("no-csstransitions") && this.options.animation == "fade") {
				oldActive.fadeOut();
				newActive.fadeIn();
			}

			if(this.options.animation == "cycle") {
				this.$elementList.stop(true).animate({
					"left": -$newActiveList.position().left
				}, this.options.speed);
			}

			// Parallax
			if(this.options.parallax) {

				var that = this;

				this.$elementList.children(":lt(" + (active - 1) + ")").removeClass("after").addClass("before");
				this.$elementList.children(":gt(" + (active - 1) + ")").removeClass("before").addClass("after");

				this.$elementList.find("." + that.options.parallax + " *").each(function() {

					// Detect offset for speed
					offset = $(this).data("offset");
					if(offset === undefined) {
						offset = that.options.speed / 2;
					}

					// Change margins
					if($(this).parent().parent().hasClass(that.options.activeClass)) {
						$(this).stop(true).animate({
							"margin-left": 0
						}, 500);
					} else {
						if($(this).parent().parent().hasClass("before")) {
							$(this).stop(true).animate({
								"margin-left": -offset
							}, 500);
						} else if($(this).parent().parent().hasClass("after")) {
							$(this).stop(true).animate({
								"margin-left": offset
							}, 500);
						}
					}
				});
			}

		},
		_switchActive: function(control) {
			var $active = this.$elementList.find("." + this.options.activeClass),
				activeIndex = this.$elementList.find("> li").index($active);

			if(typeof control == "string" || typeof control == "undefined") {

				// On or Off
				if(control == "onoff") {
					$targetIndex = activeIndex;
					this.isRunning = !this.isRunning;
				}

				// Next or Prev || Timer
				if(control == "next" || typeof control == "undefined") {
					$targetIndex = activeIndex + 1;
				} else if(control == "prev") {
					$targetIndex = activeIndex - 1;
				}

				// First or last
				if($targetIndex > (this.length - 1)) {
					$targetIndex = 0;
				} else if($targetIndex < 0) {
					$targetIndex = this.length - 1;
				}

				// Convert {js}index to {css}nth-child
				$targetIndex += 1;

			} else if(typeof control == "number") {
				// Pagination
				$targetIndex = control;
			}

			// Not timer || OnOff
			if(this.interval && typeof control !== "undefined" || control == "onoff") {
				clearInterval(this.interval);
				if(this.isRunning) {
					this.interval = setInterval($.proxy(this._switchActive, this), this.options.timer);
				}
			}

			this._animate($targetIndex);
		}
	};

	$.fn[pluginName] = function(options) {
		return this.each(function() {
			if(!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new PepperSlider(this, options));
			}
		});
	};

}(jQuery, window));