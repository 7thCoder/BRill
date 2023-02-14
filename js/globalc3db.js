//-----------------------------------------------------------------------------------------
//
//
// Global Variables
//
//
//-----------------------------------------------------------------------------------------
//
//-----------------------------------------------------------
//
// SVG
//
//-----------------------------------------------------------
//
var SVG = {
	'arrow-left-1': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M15,30,0,15,15,0" transform="translate(9 1)" fill="none" stroke-width="1" stroke="#666"/></svg>',
	'arrow-right-1': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><g transform="translate(-1351 -2914)"><path d="M2120.74,2581l-15,15,15,15" transform="translate(3479.74 5526) rotate(180)" fill="none" stroke-width="1" stroke="#666"/></g></svg>',
	'arrow-left-2': '<svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27"><g transform="translate(8184 17529)"><path d="M0,0H26V26H0Z" transform="translate(-8157.5 -17502.5) rotate(180)" stroke-width="1" stroke="#666" fill="none"/><path d="M8,14,0,6.97,8,0" transform="translate(-8174.5 -17522.5)" stroke-width="1" stroke="#666" fill="none"/></g></svg>',
	'arrow-right-2': '<svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27"><g transform="translate(8184 17529)"><path d="M0,0H26V26H0Z" transform="translate(-8157.5 -17502.5) rotate(180)" stroke-width="1" stroke="#666" fill="none"/><path d="M8,0,0,7.03,8,14" transform="translate(-8166.5 -17508.5) rotate(180)" stroke-width="1" stroke="#666" fill="none"/></g></svg>',
	'arrow-left-3': '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"><path d="M333,363.247v50h50v-50Zm2,48v-46h46v22.005H346.448L354.663,380l-1.322-1.5-10.834,9.559,10.819,9.928,1.352-1.473-7.916-7.265H381v21.995Z" transform="translate(-333 -363.247)" fill="#666"/></svg>',
	'arrow-right-3': '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"><path d="M281,421.253v50h50v-50Zm48,48H283V447.248h34.552l-8.215,7.249,1.322,1.5,10.834-9.559-10.819-9.928-1.352,1.473,7.916,7.265H283V423.253h46Z" transform="translate(-281 -421.253)" fill="#666"/></svg>',
	'arrow-left-4': '<svg xmlns="http://www.w3.org/2000/svg" width="16.193" height="34.011" viewBox="0 0 16.193 34.011"><path id="icon-arrow-left-4" d="M0,0,12.317,12.317a4.991,4.991,0,0,1,0,7.059L6.969,24.724.511,31.183" transform="translate(14.779 32.597) rotate(180)" fill="none" stroke="#000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/></svg>',
	'arrow-right-4': '<svg xmlns="http://www.w3.org/2000/svg" width="16.193" height="34.011" viewBox="0 0 16.193 34.011"><path id="icon-arrow-right-4" d="M0,0,12.317,12.317a4.991,4.991,0,0,1,0,7.059L6.969,24.724.511,31.183" transform="translate(1.414 1.414)" fill="none" stroke="#000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/></svg>\n'
};





//-----------------------------------------------------------------------------------------
//
//
// Global Helper Functions
//
//
//-----------------------------------------------------------------------------------------
//
//-----------------------------------------------------------
//
// Debounce
//
//-----------------------------------------------------------
//
function _debounce(func, wait, immediate) {
	var timeout;
	return function () {
		var context = this, args = arguments;
		var later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}


//-----------------------------------------------------------
//
// Is IE Version
//
//-----------------------------------------------------------
//
function _isIEVersion() {
	var ua = window.navigator.userAgent;
	var msie = ua.indexOf('MSIE ');
	var trident = ua.indexOf('Trident/');

	if (msie > 0) {
		// IE 10 or older => return version number
		return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	}

	if (trident > 0) {
		// IE 11 => return version number
		var rv = ua.indexOf('rv:');
		return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	}

	return false;
}


//-----------------------------------------------------------
//
// Is Mobile Devices
//
//-----------------------------------------------------------
//
function _isMobileDevices() {
	if ((is.mobile() || is.tablet()) && is.touchDevice()) {
		return true;
	} else {
		return false;
	}
}


//-----------------------------------------------------------
//
// Is Min Browser Width
//
//-----------------------------------------------------------
//
function _isMinBrowserWidth(width) {

	// Return Boolean
	//
	return window.matchMedia("(min-width: " + width + "px)").matches;
}


//-----------------------------------------------------------
//
// Is Max Browser Width
//
//-----------------------------------------------------------
//
function _isMaxBrowserWidth(width) {

	// Return Boolean
	//
	return window.matchMedia("(max-width: " + width + "px)").matches;
}


//-----------------------------------------------------------
//
// Has URL Query
//
//-----------------------------------------------------------
//
function _hasUrlQuery(uri) {
	return uri.indexOf("?") > 0;
}


//-----------------------------------------------------------
//
// Remove URL Query
//
//-----------------------------------------------------------
//
function _removeUrlQuery(uri) {
	return uri.substring(0, uri.indexOf("?"));
}


//-----------------------------------------------------------
//
// Get URL Query
//
//-----------------------------------------------------------
//
function _getUrlQuery() {
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for (var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}


//-----------------------------------------------------------
//
// Get File Extension from String
//
//-----------------------------------------------------------
//
function _getFileExtension(file) {
	return file.substr((file.lastIndexOf('.') + 1));
}


//-----------------------------------------------------------
//
// Convert Extension to File Type
//
//-----------------------------------------------------------
//
function _convertFileExtensionToFileType(extension) {
	if (typeof extension !== 'string') {
		return console.log('The parameter for _convertFileExtensionToFileType() function is not a string');
	}

	var ext = extension.toLowerCase();

	switch (ext) {
		case 'png':
		case 'jpg':
		case 'jpeg':
		case 'gif':
		case 'webp':
		case 'heic':
		case 'heif':
			return 'image';
		case 'txt':
			return 'txt';
		case 'pdf':
			return 'pdf';
		case 'xls':
		case 'xlsx':
			return 'excel';
		case 'doc':
		case 'docx':
			return 'word';
		case 'ppt':
		case 'pptx':
			return 'powerpoint';
		case 'mp4':
		case 'mov':
		case 'wmv':
		case 'flv':
		case 'avi':
		case 'avchd':
			return 'video';
		default:
			return 'unknown';
	}
}




//-----------------------------------------------------------------------------------------
//
//
// Global Initializations
//
//
//-----------------------------------------------------------------------------------------
//
//-----------------------------------------------------------
//
// Init ScrollMagic Controller
//
//-----------------------------------------------------------
//
var SMController = new ScrollMagic.Controller();


//-----------------------------------------------------------------------------------------
//
//
// Global Functions
//
//
//-----------------------------------------------------------------------------------------
//
//-----------------------------------------------------------
//
// Browser Version
//
//-----------------------------------------------------------
//
function handleBrowserVersion() {

	// Check browser compatibility
	//
	if (_isIEVersion() !== false && _isIEVersion() < 10) {
		$('html').addClass('no-support');
	}

	if (is.ie()) {
		$('html').addClass('is-ie');
	}

	if (is.edge()) {
		$('html').addClass('is-edge');
	}

	if (is.desktop()) {
		$('html').addClass('is-desktop');
	}

	if (is.mobile()) {
		$('html').addClass('is-mobile');
	}

	if (is.tablet()) {
		$('html').addClass('is-tablet');
	}

	if (is.touchDevice()) {
		$('html').addClass('is-touch-device');
	}
}


//-----------------------------------------------------------
//
// Accessibility
//
//-----------------------------------------------------------
//
function handleAccessibility() {

	//--------------------------------
	// Parameters
	//--------------------------------
	//
	var fontSizeIncrement = 1.2;
	var fontSizeDecrement = 0.8;

	//--------------------------------
	// Selectors
	//--------------------------------
	//
	var resizeSelectors = ['p', 'a', 'span', 'input', 'textarea', 'select', 'h2', 'h3', 'h4', 'h5', 'h6', '.resizable'].join(', ');
	var highlightSelectors = ['a', 'button', '.accordionBtn', '.imgCardInner'].join(', ');

	//--------------------------------
	// Open Accessibility Button
	//--------------------------------
	//
	$('.accessibilityBtn').on('click', function (e) {
		e.preventDefault();
		$('#accessibility').toggleClass("open");
		return false;
	});

	//--------------------------------
	// Resize Font
	//--------------------------------
	//
	$(resizeSelectors).each(function () {

		// Selectors
		//
		var $el = $(this);

		// Parameters
		//
		var originalFontSize = $el.css('font-size');

		// Reset font size
		//
		$(".reset").on('click', function () {
			$el.css('font-size', originalFontSize);
		});

		// Increase font size
		//
		$(".increase").on('click', function () {
			var currentFontSize = parseFloat($el.css('font-size'));
			var newFontSize = currentFontSize * fontSizeIncrement;
			$el.css('font-size', newFontSize);
			return false;
		});

		// Decrease font size
		//
		$(".decrease").on('click', function () {
			var currentFontSize = parseFloat($el.css('font-size'));
			var newFontSize = currentFontSize * fontSizeDecrement;
			$el.css('font-size', newFontSize);
			return false;
		});
	});

	//--------------------------------
	// Grayscale
	//--------------------------------
	//
	$('#grayscale').on('click', function () {
		$('body').toggleClass("bandw");
		return false;
	});

	//--------------------------------
	// Highlight Links
	//--------------------------------
	//
	$('#allLinks').on('click', function () {
		$(highlightSelectors).toggleClass("linksHighLight");
	});

	//--------------------------------
	// Invert Color
	//--------------------------------
	//
	$('#invertAll').on('click', function () {
		$('body').toggleClass("inverted");
		return false;
	});
}


//-----------------------------------------------------------
//
// handle Viewport Height
//
//-----------------------------------------------------------
//
function handleVH() {

	// Set viewport height
	//
	setVH();

	// Listen to the resize event
	//
	$(window).resize(function () {
		setVH();
	});

	// Set viewport height function
	//
	function setVH() {
		var $vh = $(window).innerHeight() * 0.01;
		$('html').attr('style', '--vh:' + $vh + 'px');
	}
}


//-----------------------------------------------------------
//
// Text Length
//
//-----------------------------------------------------------
//
function handleTextLength() {
	$('[data-text-length]').text(function (index, currentText) {
		var text_length = $(this).attr('data-text-length');

		if (currentText.length > text_length) {
			return currentText.substr(0, text_length) + '...';
		} else {
			return currentText.substr(0, text_length);
		}
	});
}


//-----------------------------------------------------------
//
// Scroll To Top
//
//-----------------------------------------------------------
//
function handleScrollTop() {
	$(".scrollTop").on('click', function (e) {
		e.preventDefault();
		$('html, body').animate({scrollTop: 0}, 'slow');
	});
}


//-----------------------------------------------------------
//
// Slide Toggle
//
//-----------------------------------------------------------
//
function handleSlideToggle() {
	var $el = $('[data-slide-toggle]');

	$el.each(function () {
		var $this = $(this);
		var $target = $($this.attr('data-slide-toggle'));

		if ($target[0].hasAttribute('data-toggle-open')) {
			$target.toggleClass('toggle-active');
			$this.toggleClass('toggle-active');
		} else {
			$target.hide();
		}

		$this.on('click', function () {
			$target.slideToggle();
			$target.toggleClass('toggle-active');
			$this.toggleClass('toggle-active');
		});
	});
}


//-----------------------------------------------------------
//
// Image Popup
//
//-----------------------------------------------------------
//
function handleImagePopup() {
	$('.img-popup').magnificPopup({
		type: 'image',
		closeBtnInside: false,
		closeOnContentClick: false,
		image: {
			verticalFit: true,
			titleSrc: 'title'
		},
		gallery: {
			enabled: true
		}
	});
}


//-----------------------------------------------------------
//
// Video Popup
//
//-----------------------------------------------------------
//
function handleVideoPopup() {
	$('.video-popup').magnificPopup({
		type: 'iframe',
		closeBtnInside: false,
		closeOnContentClick: false,
		disableOn: 700,
		removalDelay: 160
	});
}


//-----------------------------------------------------------
//
// Handle Form
//
//-----------------------------------------------------------
//
function handleForm() {

	convertAsterisk();

	$(document).ajaxComplete(function (event, request, settings) {
		convertAsterisk();
	});

	function convertAsterisk() {
		if ($("table.Dialog tr th .asterisk").length || $("table.Dialog tr td label .asterisk").length || $("table.Dialog tr td .icon .asterisk").length) {
			return;
		}

		$("table.Dialog tr th:contains('*'), table.Dialog tr td label:contains('*'), table.Dialog tr td .icon:contains('*')").html(function (index, html) {
			return html.replace(/(\*)/g, '<span class="asterisk">$1</span>');
		});
	}
}


//-----------------------------------------------------------
//
// Toggle Form
//
// Usage Case:
// <input type='radio' data-toggle-form='#target-id'/>
//
//-----------------------------------------------------------
//
function handleToggleForm() {

	$('[data-toggle-form-hidden]').hide();
	$('[data-toggle-form-hidden-reverse]').show();

	// Toggle Forms
	$('[data-toggle-form]').change(function () {
		if ($(this).is('input:radio')) {
			$($(this).attr('data-toggle-form')).toggle(!!$(this).is(':checked'));
			return false;
		} else if ($(this).is('input:checkbox')) {
			$($(this).attr('data-toggle-form')).toggle(!!$(this).is(':checked'));
			return false;
		} else if ($(this).is('select:not([multiple])')) {
			var val = $(this).val().toLowerCase();
			var valTarget = $(this).attr('data-toggle-form-val').toLowerCase();
			$($(this).attr('data-toggle-form')).toggle(val === valTarget);
			return false;
		}
	});

	// Toggle Forms Reverse
	$('[data-toggle-form-reverse]').change(function () {
		if ($(this).is('input:radio')) {
			$($(this).attr('data-toggle-form-reverse')).toggle(!$(this).is(':checked'));
			return false;
		} else if ($(this).is('input:checkbox')) {
			$($(this).attr('data-toggle-form-reverse')).toggle(!$(this).is(':checked'));
			return false;
		} else if ($(this).is('select:not([multiple])')) {
			var val = $(this).val().toLowerCase();
			var valTarget = $(this).attr('data-toggle-form-val').toLowerCase();
			$($(this).attr('data-toggle-form-reverse')).toggle(val !== valTarget);
			return false;
		}
	});

	// Multiselect
	$('[data-toggle-form][multiple] option').on('click', function () {
		var $this = $(this);
		var $parent = $this.closest('select');
		var $target = $($parent.attr('data-toggle-form'));
		var val = $this.val().toLowerCase();
		var valTarget = $parent.attr('data-toggle-form-val').toLowerCase();

		if (val === valTarget) {
			$target.toggle($this.is(':selected'));
		}
	});
}


//-----------------------------------------------------------
//
// Input Mask
//
//-----------------------------------------------------------
//
function handleInputMask() {

	// via data-inputmask attribute
	//
	$(":input").inputmask();

	// Options
	//
	var phoneOption = {"mask": "(999) 999-9999"};
	var dateOption = {"alias": "datetime", "inputFormat": "mm/dd/yyyy"};
	var emailOption = {"alias": "email"};

	// Selectors
	//
	var phoneSelectors = [
		'input[data-input-type="phone"]',
		'input[name="phone"]',
		'input[name="phone_number"]',
		'input[name="contact_phone_number"]',
		'input[name="business_phone_number"]'
	].join(', ');

	var dateSelectors = [
		'input[data-input-type="date"]',
		'input[name="date"]'
	].join(', ');

	// Phone
	//
	$(phoneSelectors).inputmask(phoneOption);

	// Date
	//
	$(dateSelectors).inputmask(dateOption);
}


//-----------------------------------------------------------
//
// Accordion
//
//-----------------------------------------------------------
//
function handleAccordion() {
	$('.accordionContent').slideUp();

	$('.accordionBtn').on('click', function () {
		var $this = $(this);
		var $parent = $this.closest('.accordion');
		var $content = $('.accordionContent', $parent);

		if ($parent.hasClass('active')) {
			$parent.removeClass('active');
			$content.slideUp({
				duration: 500
			});
		} else {
			$parent.addClass('active');
			$content.slideDown({
				duration: 500
			});
		}

		// Fix for Slick Slider
		$(".slider .sliderWrap").slick("refresh");
	});
}


//-----------------------------------------------------------
//
// Tabs
//
//-----------------------------------------------------------
//
function handleTabs() {
	$('.tabs').each(function () {
		var $tabs = $(this);
		var $navs = $('.tabsNav', $tabs);
		var $contents = $('.tabsContent', $tabs);

		$contents.hide();
		$contents.first().show();
		$navs.first().addClass('active');

		$navs.on('click', function (e) {
			e.preventDefault();

			var $nav = $(this);
			var $index = $nav.index();

			$navs.removeClass('active');
			$nav.addClass('active');

			$contents.hide();
			$contents.eq($index).show();

			// Fix for Slick Slider
			$(".slider .sliderWrap").slick("refresh");
		});
	});
}


//-----------------------------------------------------------
//
// Sidebar Mobile
//
//-----------------------------------------------------------
//
function handleSidebarMobile() {

	$('.sidebar').each(function () {

		//--------------------------------
		// Selectors
		//--------------------------------
		//
		var $el = $(this);
		var $body = $('body');
		var $openBtn = $('.sidebarOpen', $el);
		var $closeBtn = $('.sidebarClose', $el);
		var $sidebarInner = $('.sidebarSide .sidebarInner', $el);

		//--------------------------------
		// Open Sidebar
		//--------------------------------
		//
		$openBtn.on('click', function (e) {
			e.preventDefault();

			$el.addClass('active');
			$sidebarInner.fadeIn(400);
			$body.addClass('_overflow-hidden');

			// Accessibility
			//
			$openBtn.attr('aria-disabled', true);
			$closeBtn.attr('aria-disabled', false);
		});

		//--------------------------------
		// Close Sidebar
		//--------------------------------
		//
		$closeBtn.on('click', function (e) {
			e.preventDefault();
			$body.removeClass('_overflow-hidden');
			$sidebarInner.fadeOut(400, function () {
				$el.removeClass('active');
			});

			// Accessibility
			//
			$openBtn.attr('aria-disabled', false);
			$closeBtn.attr('aria-disabled', true);
		});

		//--------------------------------
		// Resize
		//--------------------------------
		//
		$(window).on('resize', _debounce(function () {
			if (_isMinBrowserWidth(992)) {
				$el.removeClass('active');
				$sidebarInner.css({'display': ''});
				$body.removeClass('_overflow-hidden');
			}
		}, 250));
	});
}


//-----------------------------------------------------------
//
// Sticky Sidebar
//
//-----------------------------------------------------------
//
function handleStickySidebar() {

	// Exit if no sticky sidebar
	//
	if (!$('.sidebarSticky').length) return false;

	// Sticky Sidebar
	//
	$('.sidebarSticky').each(function () {

		// Parameters
		//
		var _offset = 15;

		// Selectors
		//
		var $header = $('.headerWrap');
		var $el = $(this);
		var $main = $('.sidebarMainWrap', $el);
		var $sidebar = $('.sidebarSideWrap', $el);

		// Init scroll scene
		//
		var scene = new ScrollMagic.Scene({
			triggerElement: $sidebar,
			triggerHook: 0
		})
			.setPin($sidebar, {pushFollowers: false})
			.setClassToggle($el, "stuck")
			.addTo(SMController);

		// Set scroll scene offset and duration
		//
		scene.offset(getOffset());
		scene.duration(getDuration());

		// Resize
		//
		$(window).on('resize', _debounce(function () {

			// Re-calculate scroll scene offset and duration
			//
			scene.offset(getOffset());
			scene.duration(getDuration());
		}, 250));

		// Get Offset Function
		//
		function getOffset() {
			return -($header.height() + _offset);
		}

		// Get Duration Function
		//
		function getDuration() {
			return $main.height() - $sidebar.height();
		}
	});
}


//-----------------------------------------------------------
//
// Initial Avatar
//
//-----------------------------------------------------------
//
function handleInitialAvatar() {
	var $el = $('[data-initial-avatar]');
	var initial = "";

	if (!$el.length) return false;

	if ($el.attr('data-initial-name') && $el.attr('data-initial-name') !== "") {
		initial = $el.attr('data-initial-name').substring(0, 1).toUpperCase();
	} else {
		initial = "A";
	}

	$el.append('<span>' + initial + '</span>');
}


//-----------------------------------------------------------
//
// Multiple Select Input
//
//-----------------------------------------------------------
//
function handleMultipleSelect() {

	//--------------------------------
	// Disable preselect
	//--------------------------------
	//
	$("select[multiple] option").prop("selected", false);
}


//-----------------------------------------------------------
//
// Multiple Select Input without pressing Ctr key
//
//-----------------------------------------------------------
//
function handleMultipleSelectInputWithoutCtr() {
	var multiSelect = {};

	if (is.desktop()) {
		init();
	}

	function init() {
		var s = document.getElementsByTagName('select');
		for (var i = 0; i < s.length; i++) {
			if (s[i].multiple) {
				var n = s[i].name;
				multiSelect[n] = [];
				for (var j = 0; j < s[i].options.length; j++) {
					multiSelect[n][j] = s[i].options[j].selected;
				}
				s[i].onchange = changeMultiSelect;
			}
		}
	}

	function changeMultiSelect() {
		var n = this.name;
		for (var i = 0; i < this.options.length; i++) {
			if (this.options[i].selected) {
				multiSelect[n][i] = !multiSelect[n][i];
			}
			this.options[i].selected = multiSelect[n][i];
		}
	}
}


//-----------------------------------------------------------
//
// Handle Modal
//
//-----------------------------------------------------------
//
function handleModal() {
	$('.modal').each(function () {

		//--------------------------------
		// Selector
		//--------------------------------
		//
		var $this = $(this);
		var $body = $('body');
		var $mwBtn = $('.btn a', $this);
		var $btn = $('.modalBtn', $this);
		var $panel = $('.modalPanel', $this);
		var $dialog = $('.modalDialog', $this);
		var $close = $('.modalClose', $this);

		//--------------------------------
		// Open modal panel
		//--------------------------------
		//
		if ($mwBtn.length) {
			$mwBtn.on('click', function (e) {
				e.preventDefault();
				openModal();
			});
		} else {
			$btn.on('click', function (e) {
				e.preventDefault();
				openModal();
			});
		}

		//--------------------------------
		// Close modal panel
		//--------------------------------
		//
		$close.on('click', function (e) {
			e.preventDefault();
			closeModal();
		});

		$panel.on('click', function (e) {
			if (e.target === this) {
				closeModal();
			}
		});

		//--------------------------------
		// Functions
		//--------------------------------
		//
		function openModal() {
			$body.addClass('_overflow-hidden');
			$panel.fadeIn(400, function () {
				$panel.addClass('active');
				$dialog.addClass('active');
			});
		}

		function closeModal() {
			$body.removeClass('_overflow-hidden');
			$panel.removeClass('active');
			$dialog.removeClass('active');
			$panel.fadeOut();
		}
	});
}


//-----------------------------------------------------------
//
// Hide Empty
//
//-----------------------------------------------------------
//
function handleHideEmpty() {
	$('[data-hide-empty]').each(function () {
		$(this).attr('data-hide-empty') === '' ? $(this).hide() : null;
	});
}


//-----------------------------------------------------------
//
// Image Placeholder
//
//-----------------------------------------------------------
//
function handleImgPlaceholder() {
	$('[data-img-placeholder]').each(function () {
		if ($(this).attr('data-img-placeholder') === '') {
			$(this).removeAttr('data-img-placeholder');
			return  $(this).addClass('_img-placeholder');
		}
	});
}


//-----------------------------------------------------------
//
// Hide Empty
//
//-----------------------------------------------------------
//
function handleVideoPlayer() {
	$('.videoPlayer').each(function () {
		var $this = $(this);
		var $cover = $('.videoCover', $this);
		var $video = $('video', $this);

		$cover.on('click', function () {
			$video.css('opacity', 1);
			$cover.fadeOut('fast', function () {
				$video[0].play();
			});
		});
	});
}


//-----------------------------------------------------------
//
// Fit Image
//
//-----------------------------------------------------------
//
function handleFitImage() {
	$('[data-fit-img]').each(function () {
		var $this = $(this);
		var $img = $('[data-fit-img-child]', $this);

		var thisWidth = 0;
		var imgWidth = 0;

		autoFit();

		$(window).on('resize', _debounce(function () {
			autoFit();
		}, 250));

		function autoFit() {
			thisWidth = $this.outerWidth();
			imgWidth = $img.outerWidth();

			if (thisWidth > imgWidth) {
				$img.css({
					width: '100%',
					height: 'auto'
				});
			} else {
				$img.css({
					width: 'auto',
					height: '100%'
				});
			}
		}
	});
}


//-----------------------------------------------------------------------------------------
//
//
// Execute Global Functions Before Page Ready
//
//
//-----------------------------------------------------------------------------------------
//
handleBrowserVersion();


//-----------------------------------------------------------------------------------------
//
//
// Execute Global Functions After Page Ready
//
//
//-----------------------------------------------------------------------------------------
//
$(document).ready(function () {
	handleAccessibility();
	handleVH();
	handleTextLength();
	handleSlideToggle();
	handleScrollTop();
	handleImagePopup();
	handleVideoPopup();
	handleForm();
	handleToggleForm();
	handleInputMask();
	handleAccordion();
	handleTabs();
	handleSidebarMobile();
	handleStickySidebar();
	handleInitialAvatar();
	handleMultipleSelect();
	handleMultipleSelectInputWithoutCtr();
	handleModal();
	handleHideEmpty();
	handleImgPlaceholder();
	handleVideoPlayer();
	handleFitImage();
});