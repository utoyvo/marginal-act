jQuery(document).ready(function() {

	// Single Page Application
	var articles = [],
		singlePage = $(".single");

	singlePage.on("click", function(e) {
		if (singlePage.hasClass("active")) {
			var clicked = $(e.target);
			if (clicked.hasClass("overlay")) {
				window.location.hash = "#";
				$("#player").attr("src","");
			}
		}
	});

	$.getJSON("storage/articles.json", function(data) {
		articles = data;
		generateAllArticles(articles);
		$(window).trigger("hashchange");
	});

	$(window).on("hashchange", function() {
		render(decodeURI(window.location.hash));
	});

	// generate all articles
	function generateAllArticles(data) {
		var list = $(".entries"),
			entryLayer = 2,
			theTemplateScript = $(".entries-template").html(),
			theTemplate = Handlebars.compile(theTemplateScript);

		list.append(theTemplate(data));
		list.find(".entry").on("mousedown", function() {
			$(this).css("z-index", entryLayer);
			entryLayer += 1;
			list.find(".entry").on("click", function(e) {
				var productIndex = $(this).data("index");
				window.location.hash = "game/" + productIndex;
			})
		});
	}

	// render
	function render(url) {
		$(".entries").removeClass("active");
		$(".single").removeClass("active");
		

		var temp = url.split("/")[0],
		map = {
			"" : function() {
				renderArticlesPage(articles);
			},
			"#game" : function() {
				index = url.split("#game/")[1].trim();
				renderSinglePage(index, articles);
			},
		};

		if (map[temp]) {
			map[temp]();
		} else {
			renderErrorPage();
		}
	}

	// article
	function renderArticlesPage(data) {
		$(".entry").draggable(); // draggable (jquery-ui)
	}

	// single
	function renderSinglePage(index, data) {

		// modal
		var container = $("#modal");
		container.addClass("active");

		window.onclick = function(e) {
			if (e.target == modal) {
				window.location.hash = "#";
				container.removeClass("active");
				container.find("iframe").attr("src", "");
			}
		}

		if (data.length > 0) {
			data.forEach(function (item) {
				if (item.id == index) {
					container.find("h2").text(item.name);
					container.find("iframe").attr("src", item.media.youtube);
					container.find("p.short").text(item.description.short);
					container.find("p.expanded").text(item.description.expanded);
					container.find("time").text(item.released);
					container.find("time").attr("datetime", item.released);
					container.find(".button").text(item.button.text);
					container.find(".button").attr("href", item.button.link);
				}
			});
		}
	}

	// error page
	function renderErrorPage() {
		$(".error").addClass("active");
	}

	// Preloader
	$(window).load(function() {
		setTimeout(function() {
			$(".loader").fadeOut("slow", function() {});
		}, 1000);
	});

	// Parallax
	$(".scene").parallax();
}); // jQuery

// Marquee
(function(){"use strict";window.marquee=function(i){i=i||{};var n=i.selector||".marquee",o=i.spacing||"30px",r=document.querySelectorAll(n),a=window.innerWidth;s();function s(){for(var e=0;e<r.length;e++){var n=r[e],s=n.innerHTML,l=document.createElement("div"),p=document.createElement("span"),u=0,v;n.innerHTML="";n.appendChild(l);l=n.children[0];l.style.whiteSpace="nowrap";l.style.position="absolute";n.position=0;n.content=s;n.vertical=n.dataset.vertical=="true";n.reverse=n.dataset.reverse=="true";n.pausable=n.dataset.pausable=="true";n.hover=n.dataset.hover=="true";n.direction=n.reverse?1:-1;n.speed=(n.dataset.speed?n.dataset.speed/60:50/60)*n.direction;n.delay=n.dataset.delay*60||0;n._delay=0;n.callback=n.dataset.callback;if(i.randomSpeed&&!n.dataset.speed){var y=Math.floor(Math.random()*50)+10;n.speed=y/60*n.direction}p.innerHTML=n.content;p.style.display="inline-block";p.style.paddingRight=o;v=p.cloneNode(true);l.appendChild(p);n.contentWidth=l.offsetWidth;n.contentHeight=f(n);n.style.overflow="hidden";n.style.visibility="hidden";n.style.position="relative";n.style.width=(n.parentElement.offsetWidth||window.innerWidth)+"px";n.style.height=n.contentHeight+"px";l.appendChild(v);u=l.offsetWidth;if(n.vertical){n.classList.add("marquee--vertical");n.style.width=n.contentHeight+"px";n.style.height=(n.parentElement.offsetHeight||window.innerHeight)+"px";l.style.transform="rotate(-90deg)";if(!n.reverse){l.style.transformOrigin="0% 0%";l.style.left=0;l.style.top="100%"}else{l.style.transformOrigin="100% 100%";l.style.bottom="100%";l.style.right=0}}else{l.style.top="calc(50% - "+n.contentHeight/2+"px)";if(n.reverse){l.style.right=0}}while(u<a+n.contentWidth*2){v=p.cloneNode(true);l.appendChild(v);u+=n.contentWidth}n.isPaused=n.hover||!t(n);n.style.visibility="visible";n.classList.add("is-ready");(function(e){if(n.pausable){r[e].addEventListener("mouseenter",function(){r[e].isPaused=true});r[e].addEventListener("mouseleave",function(){r[e].isPaused=false})}if(n.hover){r[e].addEventListener("mouseenter",function(){r[e].isPaused=false});r[e].addEventListener("mouseleave",function(){r[e].isPaused=true})}})(e)}d();window.addEventListener("resize",c);window.addEventListener("scroll",h)}function d(){for(var e=0;e<r.length;e++){var t=r[e],i=window[t.callback];if(t._delay<t.delay){t._delay+=1}else if(!t.isPaused){if(!t.vertical){if(t.reverse){if(t.position>=t.contentWidth){if(t.callback&&typeof i==="function")i();t.position=0}}else{if(t.position<=t.contentWidth*-1){if(t.callback&&typeof i==="function")i();t.position=0}}t.position+=t.speed;t.children[0].style.transform="translate3d("+t.position+"px, 0, 0)"}else{if(t.reverse){if(t.position<=t.contentWidth*-1)t.position=0}else{if(t.position>=t.contentWidth)t.position=0}t.position-=t.speed;t.children[0].style.transform="translate3d(0, "+t.position+"px, 0) rotate(-90deg)"}}}window.requestAnimationFrame(d)}function l(){for(var e=0;e<r.length;e++){var t=r[e],i=t.children[0];t.contentWidth=i.children[0].offsetWidth;t.contentHeight=f(t);t.style.width=t.parentElement.offsetWidth||window.innerWidth+"px";t.style.height=t.contentHeight+"px";i.style.top="calc(50% - "+t.contentHeight/2+"px)"}}function c(){e(function(){l();if(window.innerWidth>a){for(var e=0;e<r.length;e++){var t=r[e],i=t.children[0],n=i.offsetWidth,o=t.querySelector("span");while(n<window.innerWidth+t.contentWidth*2){var s=o.cloneNode(true);i.appendChild(s);n+=o.offsetWidth}}a=window.innerWidth}},i.resizeDebounce||500)}function f(e){var t=e.children[0].children;t=Array.from(t);t=t.map(function(e){return e.offsetHeight});return Math.max(...t)}function h(){e(function(){for(var e=0;e<r.length;e++){if(t(r[e])){r[e].isPaused=false}else{r[e].isPaused=true}}},500)}};function e(e,t,i){var n,o=this,r=arguments,a=function(){n=null;if(!i)e.apply(o,r)},s=i&&!n;clearTimeout(n);n=setTimeout(a,t);if(s)e.apply(o,r)}function t(e){var t=e.getBoundingClientRect(),i=document.documentElement;return!e.hover&&t.top>=0&&t.left>=0&&t.bottom<=(window.innerHeight||i.clientHeight)&&t.right<=(window.innerWidth||i.clientWidth)||window.getComputedStyle(e,null).getPropertyValue("position")=="fixed"}})();marquee();

// Parallax
(function(e,t,n,r){function u(t,n){this.element=t;this.$context=e(t).data("api",this);this.$layers=this.$context.find(".layer");var r={calibrateX:this.$context.data("calibrate-x")||null,calibrateY:this.$context.data("calibrate-y")||null,invertX:this.$context.data("invert-x")||null,invertY:this.$context.data("invert-y")||null,limitX:parseFloat(this.$context.data("limit-x"))||null,limitY:parseFloat(this.$context.data("limit-y"))||null,scalarX:parseFloat(this.$context.data("scalar-x"))||null,scalarY:parseFloat(this.$context.data("scalar-y"))||null,frictionX:parseFloat(this.$context.data("friction-x"))||null,frictionY:parseFloat(this.$context.data("friction-y"))||null};for(var i in r){if(r[i]===null)delete r[i]}e.extend(this,o,n,r);this.calibrationTimer=null;this.calibrationFlag=true;this.enabled=false;this.depths=[];this.raf=null;this.ox=0;this.oy=0;this.ow=0;this.oh=0;this.cx=0;this.cy=0;this.ix=0;this.iy=0;this.mx=0;this.my=0;this.vx=0;this.vy=0;this.onMouseMove=this.onMouseMove.bind(this);this.onDeviceOrientation=this.onDeviceOrientation.bind(this);this.onOrientationTimer=this.onOrientationTimer.bind(this);this.onCalibrationTimer=this.onCalibrationTimer.bind(this);this.onAnimationFrame=this.onAnimationFrame.bind(this);this.onWindowResize=this.onWindowResize.bind(this);this.initialise()}var i="parallax";var s=30;var o={calibrationThreshold:100,calibrationDelay:500,supportDelay:500,calibrateX:false,calibrateY:true,invertX:true,invertY:true,limitX:false,limitY:false,scalarX:10,scalarY:10,frictionX:.1,frictionY:.1};u.prototype.transformSupport=function(e){var i=n.createElement("div");var s=false;var o=null;var u=false;var a=null;var f=null;for(var l=0,c=this.vendors.length;l<c;l++){if(this.vendors[l]!==null){a=this.vendors[l][0]+"transform";f=this.vendors[l][1]+"Transform"}else{a="transform";f="transform"}if(i.style[f]!==r){s=true;break}}switch(e){case"2D":u=s;break;case"3D":if(s){n.body.appendChild(i);i.style[f]="translate3d(1px,1px,1px)";o=t.getComputedStyle(i).getPropertyValue(a);u=o!==r&&o.length>0&&o!=="none";n.body.removeChild(i)}break}return u};u.prototype.ww=null;u.prototype.wh=null;u.prototype.hw=null;u.prototype.hh=null;u.prototype.portrait=null;u.prototype.desktop=!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|IEMobile)/);u.prototype.vendors=[null,["-webkit-","webkit"],["-moz-","Moz"],["-o-","O"],["-ms-","ms"]];u.prototype.motionSupport=t.DeviceMotionEvent!==r;u.prototype.orientationSupport=t.DeviceOrientationEvent!==r;u.prototype.orientationStatus=0;u.prototype.transform2DSupport=u.prototype.transformSupport("2D");u.prototype.transform3DSupport=u.prototype.transformSupport("3D");u.prototype.initialise=function(){if(this.$context.css("position")==="static"){this.$context.css({position:"relative"})}this.$layers.css({position:"absolute",display:"block",height:"100%",width:"100%"});this.$layers.first().css({position:"relative"});this.$layers.each(e.proxy(function(t,n){this.depths.push(e(n).data("depth")||0)},this));this.accelerate(this.$context);this.accelerate(this.$layers);this.updateDimensions();this.enable();this.queueCalibration(this.calibrationDelay)};u.prototype.updateDimensions=function(){this.ox=this.$context.offset().left;this.oy=this.$context.offset().top;this.ow=this.$context.width();this.oh=this.$context.height();this.ww=t.innerWidth;this.wh=t.innerHeight;this.hw=this.ww/2;this.hh=this.wh/2};u.prototype.queueCalibration=function(e){clearTimeout(this.calibrationTimer);this.calibrationTimer=setTimeout(this.onCalibrationTimer,e)};u.prototype.enable=function(){if(!this.enabled){this.enabled=true;if(this.orientationSupport){this.portrait=null;t.addEventListener("deviceorientation",this.onDeviceOrientation);setTimeout(this.onOrientationTimer,this.supportDelay)}else{this.cx=0;this.cy=0;this.portrait=false;t.addEventListener("mousemove",this.onMouseMove)}t.addEventListener("resize",this.onWindowResize);this.raf=requestAnimationFrame(this.onAnimationFrame)}};u.prototype.disable=function(){if(this.enabled){this.enabled=false;if(this.orientationSupport){t.removeEventListener("deviceorientation",this.onDeviceOrientation)}else{t.removeEventListener("mousemove",this.onMouseMove)}t.removeEventListener("resize",this.onWindowResize);cancelAnimationFrame(this.raf)}};u.prototype.calibrate=function(e,t){this.calibrateX=e===r?this.calibrateX:e;this.calibrateY=t===r?this.calibrateY:t};u.prototype.invert=function(e,t){this.invertX=e===r?this.invertX:e;this.invertY=t===r?this.invertY:t};u.prototype.friction=function(e,t){this.frictionX=e===r?this.frictionX:e;this.frictionY=t===r?this.frictionY:t};u.prototype.scalar=function(e,t){this.scalarX=e===r?this.scalarX:e;this.scalarY=t===r?this.scalarY:t};u.prototype.limit=function(e,t){this.limitX=e===r?this.limitX:e;this.limitY=t===r?this.limitY:t};u.prototype.clamp=function(e,t,n){e=Math.max(e,t);e=Math.min(e,n);return e};u.prototype.css=function(t,n,i){var s=null;for(var o=0,u=this.vendors.length;o<u;o++){if(this.vendors[o]!==null){s=e.camelCase(this.vendors[o][1]+"-"+n)}else{s=n}if(t.style[s]!==r){t.style[s]=i;break}}};u.prototype.accelerate=function(e){for(var t=0,n=e.length;t<n;t++){var r=e[t];this.css(r,"transform","translate3d(0,0,0)");this.css(r,"transform-style","preserve-3d");this.css(r,"backface-visibility","hidden")}};u.prototype.setPosition=function(e,t,n){t+="%";n+="%";if(this.transform3DSupport){this.css(e,"transform","translate3d("+t+","+n+",0)")}else if(this.transform2DSupport){this.css(e,"transform","translate("+t+","+n+")")}else{e.style.left=t;e.style.top=n}};u.prototype.onOrientationTimer=function(e){if(this.orientationSupport&&this.orientationStatus===0){this.disable();this.orientationSupport=false;this.enable()}};u.prototype.onCalibrationTimer=function(e){this.calibrationFlag=true};u.prototype.onWindowResize=function(e){this.updateDimensions()};u.prototype.onAnimationFrame=function(){var e=this.ix-this.cx;var t=this.iy-this.cy;if(Math.abs(e)>this.calibrationThreshold||Math.abs(t)>this.calibrationThreshold){this.queueCalibration(0)}if(this.portrait){this.mx=(this.calibrateX?t:this.iy)*this.scalarX;this.my=(this.calibrateY?e:this.ix)*this.scalarY}else{this.mx=(this.calibrateX?e:this.ix)*this.scalarX;this.my=(this.calibrateY?t:this.iy)*this.scalarY}if(!isNaN(parseFloat(this.limitX))){this.mx=this.clamp(this.mx,-this.limitX,this.limitX)}if(!isNaN(parseFloat(this.limitY))){this.my=this.clamp(this.my,-this.limitY,this.limitY)}this.vx+=(this.mx-this.vx)*this.frictionX;this.vy+=(this.my-this.vy)*this.frictionY;for(var n=0,r=this.$layers.length;n<r;n++){var i=this.depths[n];var s=this.$layers[n];var o=this.vx*i*(this.invertX?-1:1);var u=this.vy*i*(this.invertY?-1:1);this.setPosition(s,o,u)}this.raf=requestAnimationFrame(this.onAnimationFrame)};u.prototype.onDeviceOrientation=function(e){if(!this.desktop&&e.beta!==null&&e.gamma!==null){this.orientationStatus=1;var n=(e.beta||0)/s;var r=(e.gamma||0)/s;var i=t.innerHeight>t.innerWidth;if(this.portrait!==i){this.portrait=i;this.calibrationFlag=true}if(this.calibrationFlag){this.calibrationFlag=false;this.cx=n;this.cy=r}this.ix=n;this.iy=r}};u.prototype.onMouseMove=function(e){this.ix=(e.pageX-this.hw)/this.hw;this.iy=(e.pageY-this.hh)/this.hh};var a={enable:u.prototype.enable,disable:u.prototype.disable,calibrate:u.prototype.calibrate,friction:u.prototype.friction,invert:u.prototype.invert,scalar:u.prototype.scalar,limit:u.prototype.limit};e.fn[i]=function(t){var n=arguments;return this.each(function(){var r=e(this);var s=r.data(i);if(!s){s=new u(this,t);r.data(i,s)}if(a[t]){s[t].apply(s,Array.prototype.slice.call(n,1))}})}})(window.jQuery||window.Zepto,window,document);(function(){var e=0;var t=["ms","moz","webkit","o"];for(var n=0;n<t.length&&!window.requestAnimationFrame;++n){window.requestAnimationFrame=window[t[n]+"RequestAnimationFrame"];window.cancelAnimationFrame=window[t[n]+"CancelAnimationFrame"]||window[t[n]+"CancelRequestAnimationFrame"]}if(!window.requestAnimationFrame){window.requestAnimationFrame=function(t,n){var r=(new Date).getTime();var i=Math.max(0,16-(r-e));var s=window.setTimeout(function(){t(r+i)},i);e=r+i;return s}}if(!window.cancelAnimationFrame){window.cancelAnimationFrame=function(e){clearTimeout(e)}}})()
