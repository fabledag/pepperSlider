# [pepperSlider jQuery Plugin](https://github.com/DamienSeguin/pepperSlider)

pepperSlider is not another jQuery slider Plugin.  
It contains the basics features you can expect from one of these sliders, but in a very concise way (less than 6Ko) and with a great retro-compatibility (up to IE6).

pepperSlider is:
* Easy/Ready to use
* Multipurpose: tab handler, sliding page, or simply an image/content/whatever slider
* Provided with an easy parallax module
* Compatible: it degrades gracefully for browsers that doesn't support CSS3 animations - eg. IE6/7/8 - via Modernizr)
* Mobile friendly: it accepts swipe navigation
* Light: speed up your loading
* Entirely customizable: only the logic is provided, the design and ideas are all yours - be creative !
* Rely only on jQuery/Zepto (quite common) and Modernizr for detecting CSS3 animations


## Basic implementation
Include at the end of your page, just before the `</body>` tag:

	<script>window.jQuery || document.write('<script src="js/vendor/jquery-1.8.0.min.js"><\/script>')</script>
	<script type="text/javascript" src="js/jquery.pepperslider.js"></script>
	<script src="js/main.js"></script>

Put the code below in your HTML where you want:

	<div id="slider">
		<ul>
			<li class="red">
				<h2>Red pepper ?</h2>
			</li>
			<li class="green">
				<h2>Why not green ?</h2>
			</li>
			<li class="yellow">
				<h2>What about yellow ?</h2>
			</li>
			<li class="black">
				<h2>And black ?</h2>
			</li>
			<li class="orange">
				<h2>You say ? Orange ?</h2>
			</li>
		</ul>
	</div>

See `css/main.css` for a good starting point.

In a script file :
	$("#slider").pepperSlider();

Pretty easy huh?

## Options

### Customizable

|Option|Type|Default
|:---------|:---------:|:----------:|
|**activeClass**: customize the main class that define active state on slides|String|pepperSliderActiveClass|
|**animation**: fade or cycle for the time being|String|fade|
|**continuous**: to loop animation automatically or not|Boolean|true|
|**keyboardNav**: enable use of Left/Right arrow to navigate|Boolean|false|
|**timer**: display duration|Number|3000|
|**speed**: animation duration|Number|300|
|**parallax**: class for a parallax container (see Parallax usage)|Number|1000|
|**easing**: easing type for parallax|String|linear|
|**touch**: enable use of touch events.|Boolean|false|
|**touchSensitivity**: set length of the swipe.|Number|30|
|**overStop**: stop the animation when mouse hover the container.|Boolean|false|
|**startAt**: slide to display at the initialization|Number|1|
|**pagination**: pagination module (see Pagination usage)|Object|{id:"",type:""}|

### Controls

|Control|Code
|:---------|:---------:|
|**prev**: link to previous slide |`<a href="#" data-controls="prev" id="prev">Previous Pepper</a>`|
|**next**: link to next |`<a href="#" data-controls="next" id="next">Next Pepper</a>`|
|**onOff**: link to stop/start animation. Useless if continuous is set to false. |`<a href="#" data-controls="onoff" id="on-off">On off</a>`|

---
Note: If you have links inside your slides, add `data-bypass="true"` to cancel the preventDefault on it.
Note: When using these controls, don't use the overStop option (it's bad for UX).

### Events

|Event|Description
|:---------|:---------:|
|**beforeAnimate**|This event fires before the new active slide is set.|
|**afterAnimate**|This event fires after the new active slide is set.|

Implementation:

	$('#slider').on('beforeAnimate', function(event) {
		console.log('Slide that will become active : ' + event.slide.html());
	});
	$('#slider').on('afterAnimate', function(event) {
		console.log('Slide that is now active : ' + event.slide.html());
	});


### Pagination usage
The *pagination* option must be an object with an id for the container of the pagination (list of slides links) and a type namely a *number* for a numeric pagination or an *array* of *string* for a custom pagination.

### Parallax usage


	<li class="red">
		<h2>Red pepper ?</h2>
		<div class="pepperSliderParallaxClass">
			<img src="redPepperTop.png" alt=" " data-offset="500">
			<img src="redPepperRight.png" alt=" " data-offset="500">
			<p data-offset="200">
				What a wonderful pepper !
			</p>
			<i class="icon" data-offset="0"></i>
		</div>
	</li>

---
Note: to cancel the effect to items in the container `.pepperSliderParallaxClass`, set the data-offset of these items to 0.


## License
MIT