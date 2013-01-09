# [pepperSlider jQuery Plugin]

pepperSlider is not another jQuery slider Plugin.  
It contains the basics features you can expect from one of these sliders, but in a very concise way (less than 5Ko) and with a great retro-compatibility (up to IE6).

pepperSlider is:
* Easy/Ready to use
* Multipurpose: tab Handler, sliding page, or simply an image/content/whatever slider
* Provided with an easy parallax module
* Compatible: it degrades gracefully for browsers that doesn't support CSS3 animation - eg. IE6/7/8 - via Modernizr)
* Light: speed up your loading
* Entirely customizable: only the logic is provided, the design and ideas are all yours - be creative !
* Dependent only on jQuery/Zepto (quite common) and Moderninzr for detecting CSS3 animation

## Basic implementation
Include at the end of your page, just before the `</body>` tag:

	`<script>window.jQuery || document.write('<script src="js/vendor/jquery-1.8.0.min.js"><\/script>')</script>
	<script type="text/javascript" src="js/jquery.pepperslider.js"></script>
	<script src="js/plugins.js"></script>
	<script src="js/main.js"></script>`

Put the code below in your HTML where you want:

	`<div id="slider">
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
	</div>`

In a script file :
	`$("#slider").pepperSlider();`

Pretty easy huh?

## Options

### Customizable

|Option|Type|Default
|:---------|:---------:|:----------:|
|**activeClass**: customize the main class that define active state on items|String|pepperSliderActiveClass|
|**animation**: fade or cycle for the time being|String|fade|
|**continuous**: to loop animation automatically or not|Boolean|true|
|**keyboardNav**: enable use of Left/Right arrow to navigate|Boolean|true|
|**timer**: display duration|Number|3000|
|**speed**: animation duration|Number|1000|
|**parallax**: class for a parallax container (see Parallax usage)|Number|1000|
|**overStop**: stop the animation when mouse hover the container. Avoid when onOff, next, prev, pagination are available. Useless for mobile usage.|Boolean|false|
|**startAt**: slide to display at the initialization|Number|1|
|**pagination**: pagination module (see Pagination usage)|Object {id: string, type: number *or* array of string}|{id:"",type:""}|

### Controls

|Control|Value
|:---------|:---------:|
|**prev**: link to previous slide |`<a href="#" data-controls="prev" id="prev">Previous Pepper</a>`|
|**next**: link to next |`<a href="#" data-controls="next" id="next">Next Pepper</a>`|
|**onOff**: link to stop/start animation. Useless if continuous is set to false. |`<a href="#" data-controls="onoff" id="on-off">On off</a>`|

### Pagination usage
The *pagination* option must be an object with an id for the container of the pagination (list of slides links) and a type namely a *number* for a numeric pagination or an *array* of *string*s for a custom pagination.

### Parallax usage


	`<li class="red">
		<h2>Red pepper ?</h2>
		<div class="pepperSliderParallaxClass">
			<img src="redPepperTop.png" alt=" " data-offset="500">
			<img src="redPepperRight.png" alt=" " data-offset="500">
			<p data-offset="200">
				What a wonderful pepper !
			</p>
			<i class="icon" data-offset="0"></i>
		</div>
	</li>`

---
Note : to cancel the effect to items in the container `.pepperSliderParallaxClass`, set the data-offset of these items to 0.


## License
MIT

#### Todo v2
* Handle Touch event
* Directional for i18n : "left", "right", "reverse"
* Change hashtags in URL - Link slides from static links
* Fanciest CSS3 transitions for demo purpose
* Multidirectionnal parallax