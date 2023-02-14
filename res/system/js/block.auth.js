var USERS_FRONTEND_AJAX = '/ajax/users';

var mwAuth = {
	
	state		: function ($el, $state) {
		
		// State can be loading/idle
		
		if ( $state ) {
		//	$el.find('.mwFormSubmit').fadeOut(300);
			$el.find('.mwFormSubmit').animate({ opacity: 0 }, 300);
			$el.find('.mwFormLoader').fadeIn(300);
		} else { //If loader 
		//	$el.find('.mwFormSubmit').fadeIn(300);
			$el.find('.mwFormSubmit').animate({ opacity: 1 }, 300);
			$el.find('.mwFormLoader').fadeOut(300);
		} //IF idle

	}, //FUNC state
	
	submitForm	: function ($form, $reload) {
		
		var $this	= this;
		var $el		= _jq($form);
		
		if ( $el.get(0).tagName.toLowerCase() != 'form' ) 
			$el = $el.closest('form')
		
		// Getting form elements
		var $sn		= $el.attr('id');
		var $status	= $el.find('.mwFormStatus'); 
		
		// Cleaning status and validations
		$status.html('');
		setValidations($el, {});
		
		// Clearing status classes from element
		$el.removeClass('mwSubmitSuccess mwSubmitError');
		
		var $url = $el.attr('action');

		// Setting loading state
		$this.state($el, true);
		
		mwAjax($url, $el.get(0), false)

			.success( function ($data) {
				
				// Marking form
				$el.addClass('mwSubmitSuccess');

				// Not hiding loader if redirecting or reloading
				// Othewise hiding

				if ( $data.redirect )
					window.location.href = $data.redirect;
				else if ( $reload )					
					window.location.reload();
				else
					$this.state($el, false);
					
			}) //FUNC mwAjax.start

			.error( function ($data) {

				// Marking form
				$el.addClass('mwSubmitError');

				// Error causes idling
				$this.state($el, false);

				// Setting status if error returned
				$status.html( mwError($data.status.text) );
			/*/	
				if ( $data.res )
					$status.append($data.res);
			/**/	
				// Each validation message should be captured
				if ( $data._validations && $data._validations[$sn] ) {
					
					// Manually processing messages yet.
					// ToDo: Implement erorrs handling API for frontend
			
					// Looping through each failed field and each message for that field
					// All validatinos are indexed by form ID				
					for ( var $field in $data._validations[$sn] ) {
						for ( var $msg in $data._validations[$sn][$field] ) {
							
							// Appending each message to status area
							$status.append( mwError($data._validations[$sn][$field][$msg]) );
			
						} //FOR each message for field
					} //FOR each fail field
			
				} //IF validations come

			}) //FUNC mwAjax.error.callback

			.stop( function () {
			
			// ---- Scrolling to form top ----
			
				// Giving some space above form (for titles/headers)
				var $delta = 100;

				// Floating height can be specified in page template
				var $f = jQuery('DIV[data-floatHeight]');
				
				if ( $f.length ) {

					$delta += $f.attr('data-floatHeight')*1;

				} else { //IF height specified
					
					// If not specified directly - trying to get some common
					var $f = jQuery('.menuWrap');
					if ( $f.css('position') == 'fixed' )
						$delta += $f.height();
					
				} //If nothing found
			
				// Animating to show errors
				jQuery('html, body').animate({
					scrollTop: jQuery('#' + $sn).offset().top - $delta
				}, 300); //jQuery.animate.options

			}) //FUNC mwAjax.stop

			.go();
		
		return false; 
	}, //FUNC submitForm
	
} //OBJECT mwAuth