/** //** ----= mwFade		 =-------------------------------------------------------------------------------------\**//** \
*
* 	Fades element using animation setting. Base function for mwShow()/mwHide() 
*	If no element specified, or element is invisible callback will be triggered immediately.
*
*	@param	bool	$state		- Set TRUE to show, FALSE otherwise.
*	@param	jQuery	$el		- jQuery element to fade.
*	@param	funtion	$callback	- Callback to call on finish.
*
*	@return	jQuery			- Given element, for chain calls.
*
\**//** ---------------------------------------------------------------------------= by Mr.V!T @ Morad Media Inc. =----/** //**/
function mwFade ($state, $el, $callback) {

	// Checking if callback given, and element happen to not exist
	if ( isFunction($callback) )
		if ( !$el || (isJQ($el) && $el.length == 0) )  {
			$callback();
			return $el;
		} //IF no item specified

	// Making sure dealing with jQuery
	// At this point element does exists
	// It's either directly DOM element, or non empty jQuery
	$el = _jq($el);

	// Checking visibility	
	var $visible	= $el.is(':visible'); 

	// Deciding animaiton depending on state and visiblity
	var $animate	= ( $state != $visible );

	// Defining speed
	var $speed	= 250; //<?=mwSkin('transition.speed')?>; 

	// Animating if necessary, othewise - just changing state
	if ( $animate ) {		

		// Stopping current animation (if any)
		// ToDo: stop or not to stop
		$el.stop(true);
		
		// Animating
		if ( $state )
			$el.fadeIn($speed);
		else
			$el.fadeOut($speed);

		// Calling callback via promise to avoid multiple callbacks.
		jQuery.when($el).done( function () {
	
			// Clearing opacity (fix for partial fade animation stop)
			jQuery(this).css('opacity', '');
	
			// Triggering callback
			if ( isFunction($callback)  )
				$callback();
	
		}); //jQuery.done.callback;

	} //IF animation
	else {  

		// Just toggling visibility
		if ( $state )
			$el.show();
		else
			$el.hide();
	
		// Triggering callback
		if ( isFunction($callback)  )
			$callback();

	} //IF static
	
	// Returning original element back
	return $el;
} //FUNC mwFade

/** //** ----= mwShow		 =-------------------------------------------------------------------------------------\**//** \
*
* 	Displays given element using animation setting. 
*	If no element specified, or element is invisible callback will be triggered immediately.
*
*	@param	jQuery	$el		- jQuery element to show.
*	@param	funtion	[$callback]	- Callback to call on finish.
*
*	@return	jQuery			- Given element, for chain calls.
*
\**//** ---------------------------------------------------------------------------= by Mr.V!T @ Morad Media Inc. =----/** //**/
function mwShow ($el, $callback) {

	// Just calling fade
	return mwFade(true, $el, $callback);

/*/

	if ( isFunction($callback) && (!$el || (isJQ($el) && $el.length == 0)) ) {
		$callback();
		return $el;
	} //IF no item specified

	$el = _jq($el);

	if ( !$el.is(':visible') ) {		

		// ToDo: stop or not to stop
		$el.stop(true).fadeIn(<?=mwSkin('transition.speed')?>);

		// Calling callback via promise to avoid multiple callbacks.
		jQuery.when($el).done( function () {
	
			// Clearing opacity (fix for partial animation stop on show)
			jQuery(this).css('opacity', '');
	
			if ( isFunction(callback)  )
				$callback();
	
		}); //jQuery.done.callback;

	} //IF animation
	else {  

		$el.show();
	
		if ( isFunction(callback)  )
			$callback();

	} //IF static
	
	return $el;
/**/
} //FUNC mwShow

/** //** ----= mwHide		 =-------------------------------------------------------------------------------------\**//** \
*
* 	Hides given element using animation setting.
*	If no element specified, or element is visible callback will be triggered immediately.
*
*	@param	jQuery	$el		- jQuery element to hide.
*	@param	funtion	[$callback]	- Callback to call on finish.
*
*	@return	jQuery			- Given element, for chain calls.
*
\**//** ---------------------------------------------------------------------------= by Mr.V!T @ Morad Media Inc. =----/** //**/
function mwHide ($el, $callback) {

	// Just calling fade
	return mwFade(false, $el, $callback);

/*/
	el = _jq(el);
	
	___(el);
	
	if ( el.is(':visible') ) {		

		// ToDo: stop or not to stop
		el.stop(true).fadeOut(<?=mwSkin('transition.speed')?>);

		// Calling callback via promise to avoid multiple callbacks.
		jQuery.when(el).done(function () {
	
			// Clearing opacity (fix for partial animation stop on show)
			_jq(this).css('opacity', '');
	
			if ( callback )	callback();
	
		}); //jQuery.done.callback

	} else { //IF animation 

		el.hide();

		if ( callback )	callback();

	} //IF static
	
	return el;
/**/
} //FUNC mwHide

function mwError (msg) {
	return '<div class="status error">' + msg + '</div>';
} //FUNC mwError

function mwSuccess (msg) {
	return '<div class="status success">' + msg + '</div>';
} //FUNC mwSuccess

function mwHint (msg) {
	return '<div class="status hint">' + msg + '</div>';
} //FUNC mwHint

function mwWarning (msg) {
	return '<div class="status warning">' + msg + '</div>';
} //FUNC mwWarning

function mwSkinLoader ($el) {
	$el		= _jq($el);
	
	// Copying loader html from system loader
	var $sysLoader	= jQuery('#systemLoader'); 
	var $html	= $sysLoader.html();
	
	// And inserting it into target element
	$el.html($html);
	
} //FUNC mwSkinLoader

function mwFormToggle ($form, $target, $state) {
	
	// Makikng sure it's jQuery
	$form = _jq($form);
	
	// One of form elements can be provided instead of form itself
	// Checking if that's the case.
	if ( !$form.is('form') )
		$form = $form.closest('form');
	
	// Searching target on form
	var $tEl = $form.find($target);
	
	// Toggling
	if ( !isEmpty($state) )
		$tEl.show();
	else
		$tEl.hide();
	
} //FUNC mwFormToggle

/** //** ----= mwState		 =----------------------------------------------\**//** \
*
* 	Sets system to processing/idle state.
*
*	@param	MIXED	state
*		bool		- TRUE for loading indication, FALSE - idle.
*		string		- Status message for idle state (usually operation result)
*
*	@param	MIXED	[dialog]
*		bool		- FALSE for background (hintbar only). TRUE for common 
*				  system loading.
*		string		- Dialog name, to use for indications.  
*
*	@return	bool		- Always FALSE.		
*
\**//** ------------------------------------= by Mr.V!T @ Morad Media Inc. =----/** //**/
function mwState (state, dialog) {

	// Omited dialog is TRUE
	if ( !isSet(dialog) )
		dialog = true;

	// Flush hint bar test.
	HINT_SAVE = false;
	
	// Updating system indicator
	if ( state !== true ) { 

	// ---- Setting IDLE state ---- 

		jQuery('#hint_bar_status_ready').show();
		jQuery('#hint_bar_status_working').hide();

		// Loader should be hided on this step anyway
		// In some cases when window was created during loading, loader may miss this
		// So it does not heart to forcehide
		mwWindow('LoaderWindow').hide();

		// Updating modal loaders
		if ( typeof(dialog) == 'string' ) {
			
		// ---- Custom dialog ----
	
			mwWindow(dialog).State(state);
			
		} else {
			
		// ---- Common loader and background ----	

			if ( state !== false )
				jQuery('#HintPlaceholder').html(state);

		} //IF no dialog
	
	} else { //IF working
	
	// ---- Setting WORKING state ----
	
		jQuery('#hint_bar_status_ready').hide();
		jQuery('#hint_bar_status_working').show();

		// Updating modal loaders
		if ( typeof(dialog) == 'string' && mwWindow(dialog).Visible ) {
			
		// ---- Custom dialog ----
	
			mwWindow(dialog).State(state);
			
		} else if ( dialog ) { //IF dialog set
		
		// ---- Common loader ----	
		
			mwWindow('LoaderWindow').show();
		
		} //IF common loader
	
	} //IF idle
	
	return false;
} //FUNC mwState

/** //** ----= mwExHandle	=--------------------------------------------------------------------------------------\**//** \
*
*	Morweb global exceptions handler. Basic handlinng for now. This way user can say at least smth.
*
*	@see window.onerror handler doc for parameters list.
*
\**//** ---------------------------------------------------------------------------= by Mr.V!T @ Morad Media Inc. =----/** //**/
function mwExHandle (msg, url, lineNo) {
	
	// ToDo: test compatability
	// ToDo: Implement class based exceptions logic, 
	// and filter errors to separate debug (not shown to user) and user friendly messages

	// If nothing to show - showing nothing
	if ( !msg )
		return;

	// Forcing message to be string (in case object given - relying on native toString() )
	var msg = msg + '';
	
	// Removing trash
	msg = msg.replace('uncaught exception:', '');

	mwState( mwError(msg) );
	
} //FUNC mwExHandle

var mwHintShow = false;

function mwWatchHints ($context, $dialog) {
	
	var $target = ( $dialog ) ? '#' + $dialog + ' .winStatus' : '#HintPlaceholder';
	
	$context = _jq($context);
	
	$context
		.off('mouseenter.mwHints')
		.off('mouseleave.mwHints')
		.on('mouseenter.mwHints', '[title], [hint], [error]', function() {
		
			if ( mwHintShow )
				return;
				
			mwHintShow = true;
			
			// Saving hintbar content
			this.HINT_SAVE = jQuery($target).html();
			
			// Temporary allowing 'title' attribute to act as hint.
			// Later only 'hint' will be used to avoid title tricks
			
			// First trying if there is error
			var hint	= jQuery(this).attr('error');
			var cls		= 'error';
			
			// If no error, trying hint
			if ( !hint ) {
				hint	= jQuery(this).attr('hint') || jQuery(this).attr('title');
				cls	= 'hint';
			} //IF no error

			// Placing hint
			if ( hint ) 
				jQuery($target).html('<div class="status ' + cls + '">' + hint + '</div>');

			// Removing title ( unnecessary later )
			this.TITLE_SAVE	= this.title; 
			this.title	= '';
			
		}) //FUNC mouseenter
		.on('mouseleave.mwHints', '[title], [hint], [error]', function() {

			this.title	= this.TITLE_SAVE;
			jQuery($target).html(this.HINT_SAVE);

			mwHintShow = false;
		}) //FUNC mouseleave
	; //jQuery(context)
	
} //FUNC mwWatchHints

/*--------------------------------------------------------------------------------*\
|	setHintElements
|----------------------------------------------------------------------------------
| Set's elements for dynamic hints.
| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
|	Params:
|		selector	string	- Target elements jQuery selector.
|	Return:
|				bool	- Always FALSE.
\*--------------------------------------------------------------= by Mr.V!T =-----*/
function setHintElements (selector, dialog) {
	
	var target = ( dialog ) ? '#' + dialog + ' .winStatus' : '#HintPlaceholder';
	
	selector = _jq(selector);
	
	selector
		.unbind('mouseenter')		
		.unbind('mouseleave')		
		.hover( function() {
			// Saving hintbar content
			HINT_SAVE = jQuery(target).html();
			
			// Temporary allowing 'title' attribute to act as hint.
			// Later only 'hint' will be used to avoid title tricks
			
			// First trying if there is error
			var hint	= jQuery(this).attr('error');
			var cls		= 'error';
			
			// If no error, trying hint
			if ( !hint ) {
				hint	= jQuery(this).attr('hint') || jQuery(this).attr('title');
				cls	= 'hint';
			} //IF no error

			// Placing hint
			if ( hint ) 
				jQuery(target).html('<div class="status ' + cls + '">' + hint + '</div>');

			// Removing title ( unnecessary later )
			TITLE_SAVE	= this.title; 
			this.title	= '';
			
		}, //FUNC over
		function() {

			this.title	= TITLE_SAVE;
			
			if ( HINT_SAVE !== false )
				jQuery(target).html(HINT_SAVE);
		} //FUNC out
	); //jQuery onclick
	
} //FUNC setHintElements

/** //** ----= mwUpdateScrolls	=--------------------------------------------------------------------------------------\**//** \
*
* 	Updates scollable contents.
*
*	@param	jQuery	[$context]	- Context to search scrolls within.
*
*	@return	jQuery			- Scrollable elements found.
*
\**//** ---------------------------------------------------------------------------= by Mr.V!T @ Morad Media Inc. =----/** //**/
function mwUpdateScrolls ($context) {

	if ( !isFunction(jQuery.fn.mCustomScrollbar) )
		return false;

	$context = $context ? _jq($context) : jQuery(document);

	var $scrolls = $context.find('.mwScroll'); 
	
	$scrolls.mCustomScrollbar('destroy')
	$scrolls.mCustomScrollbar({
		theme			: 'dark',
		autoHideScrollbar	: true,
	//	scrollInertia		: false,
		contentTouchScroll	: true,
		advanced		: {
	//		autoScrollOnFocus	: true
		}
	}); //mCustomScrollbar
	
	return $scrolls;		
} //FUNC mwUpdateScrolls

/** //** ----= OBJECT mwAjax	=--------------------------------------------------------------------------------------\**//** \
*
* 	Morweb system Ajax procesing object.
*
* 	@package	Morweb
* 	@subpackage	System
* 	@category	helper
*
*	@param	string	url	- Path to controller to request from.
*
*	@param	MIXED	[post]	- Data to post on request. Can be DOM form, jQuery selector 
*				  or object which points to form, or object with parameters.
*
*	@param	MIXED	[dialog]- Any valid mwState() dialog value.  
*
\**//** ---------------------------------------------------------------------------= by Mr.V!T @ Morad Media Inc. =----/** //**/
function mwAjax (url, data, dialog) {

	// Creating morweb extension object
	var exObj = {

	'dialog'	: dialog,	// Dialog related to call. Will be used to display status.

// ==== CONTENTS ===============================================================================================================

	/** //** ----= parseContents	=------------------------------------------------------------------------------\**//** \
	*
	* 	Parses AraxResult for different content types.
	*	
	*	@param	object(AjaxResult)	data	- Result in vAjax object format.  
	*
	\**//** -------------------------------------------------------------------= by Mr.V!T @ Morad Media Inc. =----/** //**/
	parseContents	: function (data) {

		var self = this;

		// If smth wrong come - nothing to do
		if ( !data ) return;

	// ---- Processing debug (unexpected output) ----
	
		if ( data._debug && typeof(mwRawDump) != 'undefined' )
			mwRawDump('#wDebugCurrent', data._debug);

		delete data._debug;
		
	// ---- Processing validations ----

		if ( data._validations ) {
		
			// To be sure that smth correct come
			if ( typeof(data._validations) == 'object' ) {

				//Processig each given validations form
				for ( var form in data._validations ) {
					
					// Skipping not forms ( numeric indexies are allowed )
					if ( isInt(form) ) continue;

					// Normally forms are specified by ids, if not found, then it's for custom processing
					// Trying to define context first to speedup and avoid cross windows applying 
					var context = ( typeof(this.dialog) == 'string ' ) ? mwWindow(this.dialog).Body : jQuery('#' + form);
					
					// Setting validations
					setValidations(context, data._validations[form]);
					
				} //FOR each form

			} //IF object comed
			
		} //IF validations given

	// ---- Processing cahces -----

		if ( !data._cache ) return;
	
		var cache = data._cache; 
		delete data._cache;

		// HTML comed can contain errors, 
		// though jQuery may still insert it, exception is happen right AFTER insert.
		// To prevent script stop (content was inserted anyway) - catching exceptions 
		// for each insert individually (to process others which are succeed) and relogging them in console.

	// ---- Setting up data cache ----

		// Making sure mwData exists at all
		if ( typeof(mwData) == 'undefined' )
			mwData = {};

		if ( cache.Data ) {

		/*/	
			if (mwData.Users);
				__(mwData.Users);
			
		/**/	
			// ToDo: Seems that jQuery.extend() does not merge arrays propertly
			// And empty objects/assoc arrays (which meant to be data objects) 
			// come as list arrays, which are not merged
			jQuery.extend(true, mwData, cache.Data);
		/*/

			if (mwData.Users);
				__(mwData.Users);
		/**/
		} //IF Data set	

	// ---- Setting up windows ----

		// Using mwWinManager to get windows system container
		var $winContainer = mwWinManager.init().Container;

		if ( cache.Windows ) {

			for ( var i in cache.Windows ) {

				// Checking for html within regular results	
				if ( !data['_wc_'+i] ) continue;

				var wnd		= mwWindow(i);
				var $old	= wnd.Window;

				// Disablingg old window, but keeping it's element
				// This allows updated window to init in background, with smooth transition
				// In addition - increasing z-index, to make sure it stays on top, covering new version
				if ( $old && $old.length ) {
					
					// Removing IDs and names from old elements, to allow proper init
					$old.removeAttr('id')
					$old.find('[id], [name]').removeAttr('id name');
					
					// Increasing z-index, just setting it notably higher
					$old.css('z-index', $old.css('z-index')*1+100 );
					
				} //IF old window present				
				
				try {	
					var el = jQuery('<div id="' + i + '" class="winEl">' + data['_wc_'+i] + '</div>')
						.appendTo($winContainer);
					
				} catch (e) {
					
					// Researching window, cuz it still may be inserted
					var el = $winContainer.find('#' + i);

					console.error(e);
				} //TRY

				// Initiating window
				wnd.Element(el).align();

				// Removing old window element if there was one
				if ( $old && $old.length )
					$old.remove();
				
				// Initiating title
				if ( cache.Windows[i] )
					wnd.Title(cache.Windows[i]);

				delete data['_wc_'+i];

			} //FOR each window in system

		} //IF windows set

	// ---- Setting up contents ----

		if ( cache.Contents ) {

			for ( var i in cache.Contents ) {
				// Checking for html within regular results	
				if ( !data['_cc_'+i] ) continue;
				
				try {
					jQuery('#' + i).html(data['_cc_'+i]);
				} catch (e) {
					console.error(e);
				} //TRY

				delete data['_cc_'+i];
			} //FOR each contents

		} //IF contents set

	// ---- Setting up subcontents ----

		// Making sure mwSubContents exists at all
		if ( typeof(mwSubContents) == 'undefined' )
			mwSubContents = {};

		if ( cache.SubContents ) {
			
			for ( var i in cache.SubContents ) {
				
				// Checking for html within regular results	
				if ( !data['_sc_'+i] ) continue;
				
				mwSubContents[i] = data['_sc_'+i];	
				
				delete data['_sc_'+i];
			} //FOR each subcontents

		} //IF subcontents set

	// ---- Running java init ----

		if ( cache.Java ) {
			
			// Executing each given java init				
			for ( var i in cache.Java ) {
				jQuery.globalEval(cache.Java[i]);
			} //FOR each java init

		} //IF subcontents set

	}, //FUNC parseResult

// ==== GENERAL ================================================================================================================

	/** //** ----= init	=--------------------------------------------------------------------------------------\**//** \
	*
	* 	Sets up basic events. Used before constructor return, to make sure that processing triggers before custom events.
	*
	*	@return	SELF
	*	
	\**//** -------------------------------------------------------------------= by Mr.V!T @ Morad Media Inc. =----/** //**/
	init		: function () {

	// ---- START ----

		this.start( function (data) {

			// Setting loading state
			mwState(true, this.dialog);

		}); //FUNC vAjax.stop.callback

	// ---- STOP ----

		this.stop( function (data) {

			// Parsing contentns
			this.parseContents(data);

		}); //FUNC vAjax.stop.callback

	// ---- SUCCESS ----

		this.success( function (data) {

			// If some of contents come defined updater - calling it.
			// DEPRECATED: Not used anymore, left from old code for compatability				
			if ( typeof(updateDesktop) == 'function' )
				updateDesktop();

		}); //FUNC vAjax.success.callback

	// ---- ERROR ----

		this.error( function (data) {
			
			// Simple results are threated as debug/errors
			if ( data.status.minor == 'simple' ) {

				mwRawDump('#wDebugCurrent', data.res);
							
				// Updating status
				mwState(false, this.dialog);
				
				return;
			} //IF simple

		}); //FUNC vAjax.error.callback

	// ---- DONE ----

		this.done( function (data) {

			// Updating status
			mwState(data.status.text, this.dialog);

		}); //FUNC vAjax.stop.callback

		return this;
	}, //FUNC init

	/** //** ----= go	=--------------------------------------------------------------------------------------\**//** \
	*
	* 	Basic posting method. Proceeds ajax requests, parses contents, calls callbacks and updates system status.
	*	
	*	@param	object(AjaxResult)	data	- Result in vAjax object format.  
	*
	\**//** -------------------------------------------------------------------= by Mr.V!T @ Morad Media Inc. =----/** //**/
	go		: function () {
		
		// Before posting attempting to reset current validations on dialog (if one specified)
		if ( typeof(this.dialog) == 'string' )
			setValidations( mwWindow(this.dialog).Body, {});			

		this.post();

		return this;
	}, //FUNC go
	
// ==== CONTENT TYPES ==========================================================================================================

	/** //** ----= content	=--------------------------------------------------------------------------------------\**//** \
	*
	* 	Loads content from contoller specified. And applies to specified element if supplied.
	*
	*	@param	MIXED	target	- Target to insert content to. Can be jQuery selector, 
	*				  jQuery object, DOM element, or callback function. Function 
	*				  passed as target will act as onSuccess callback.
	*
	*	@return SELF
	*
	\**//** -------------------------------------------------------------------= by Mr.V!T @ Morad Media Inc. =----/** //**/
	content : function (target) {
	
		this.go();
		
		if ( isFunction(target) )
			this.success(target);
		else
			this.success( function (data) {

				if ( !target ) return;
				
				// If common content come - inserting it into target
				if ( data.content !== undefined ) {

					target = _jq(target);
					
					target.html(data.content);
					
				} //IF content set.

			}); //FUNC onSuccess

		return this;
	}, //FUNC content	

	/** //** ----= index	=--------------------------------------------------------------------------------------\**//** \
	*
	* 	This was designed with idea of index reload. Can take optional callback parameter. 
	*	On success action it reloads index from controller specified, closes related dialogs, calls given callback and 
	*	triggers status. Callback will be called after success reload, all elements positioning and status updates.
	*
	*	@param	function	
	*			[callback]	- Callback to call upon success.
	*					  If callback returns FALSE, dialog will be not 
	*					  canceled and status will be not updated.
	*
	*	@return	SELF		
	*
	\**//** -------------------------------------------------------------------= by Mr.V!T @ Morad Media Inc. =----/** //**/
	index : function (callback) {

		// Getting scroll position of scroll table to be fancy
		// ToDo: scrollTable instance method for reinit
		var $pos = jQuery('.mwScrollTable.body').scrollTop();
		
		return this
			.go()
			.success( function (data) {
				
				var res = true;
				
				if ( typeof(callback) == 'function' )
					res = callback(data);
				
				if ( res !== false ) {
					
					if ( typeof(this.dialog) == 'string' )
						mwWindow(this.dialog).hide();
					
					// Status was updated in window, but if it's closed - text status should go in hintbar
					if ( data.status.text )
						mwState(data.status.text);

					// Index tables
					jQuery('.mwIndexTable').each( function () {
			
						mwScrollTable( jQuery(this), {
							container	: jQuery('.mwDesktop'), 
						});
						
					}); //jQuery.each scroll table

					// Resetting scroll position to top
					jQuery('.mwScrollTable.body').scrollTop($pos);

				} //IF all ok
				
				return res;
				
			}) //FUNC onSuccess
		; //this
		
	}, //FUNC index
	
	/** //** ----= window	=--------------------------------------------------------------------------------------\**//** \
	*
	* 	Based on content loading it targets one specified window and shows it on success.
	*	Can take optional callback parameter, which will be called on success, but before show window.
	*
	*	@param	string		name	- Name of dialog to show upon loading.
	*
	*	@param	function	
	*			[callback]	- Callback to call upon success.
	*					  If callback returns FALSE, dialog will be not 
	*					  opened and status will be not updated.
	*
	*	@return	SELF		
	*
	\**//** -------------------------------------------------------------------= by Mr.V!T @ Morad Media Inc. =----/** //**/
	window : function (name, callback) {
	
		return this
			.go()
			.success( function (data) {
			
			var res = true;

			if ( typeof(callback) == 'function' )
				res = callback(data);
			
			if ( res !== false )
				mwWindow(name).show();
			
			return res;
		}); //FUNC
		
	} //FUNC window
	
	}; //OBJECT mwAjax

	// Getting basic vAjax object, and extending it with morweb behavior
	var vAjaxObj = vAjax(url, data);
	
	jQuery.extend(vAjaxObj, exObj);
	
	// Initiating basic events
	vAjaxObj.init();
	
	// Returning it to user
	return vAjaxObj;
} //CONSTRUCTOR mwAjax

/** //** ----= OBJECT mwSubContent =--------------------------------------------\**//** \
*
* 	System SubContents processing tools.
*
*	@param	jQuery	container	- Container element to setup with subcontents.
*	@param	jQuery	[animation]	- Element to use for animations. Possible values:
*					  jQuery compatable pointer to element to animate,
*					  TRUE to animate container element (default behavior),
*					  FALSE to cancel animations (for manual animating).
*
\**//** ------------------------------------= by Mr.V!T @ Morad Media Inc. =----/** //**/
function mwSubContent (_container, _animation) {

	// Validating environment
	_container = _jq(_container);
	
	if ( _animation === undefined ) 
		_animation = true;

	return {

		storage		: jQuery('#sysSubContents'),	// System subContents storage.
		container	: _container,			// Container element to operatie with.
		animation	: _animation,			// Element to animate on operations. For internal use. To setup use animate() method. 

		/** //** ----= animate		 =----------------------------------------------\**//** \
		*
		* 	Applies animation to set element and calls callback on final. For internal use.
		*
		*	@param	string		type		- Animation type: 'show' or 'hide'.
		*	@param	function	[callback]	- Callback to call on final.
		*
		*	@return SELF 
		*
		\**//** ------------------------------------= by Mr.V!T @ Morad Media Inc. =----/** //**/
		animate		: function ( type, callback ) {

			// Calculating animation target
			var a;
			
			if ( this.animation === true ) 
				a = this.container;
			else if ( this.animation === false )
				a = false;
			else
				a = _jq(this.animation);
			
			// Ensuring callback is a function
			callback = callback || function(){};

		// ---- Applying animation if set ----
		
			if ( a ) {
				
				// If animation target set - calling proper animation and returning.
				// If no valid animation - doing nothing, it will proceed to default no animation flow.
				switch ( type ) {
					case 'show'	:
						mwShow(a, callback); 
						return this;				
					case 'hide'	: 
						mwHide(a, callback); 
						return this;				
				} //SWITCH type

			} //IF animation
				
		// ---- No animation ----

			if ( typeof(callback) == 'function' )
				callback();

			return this;				
		}, //FUNC animate
		
		/** //** ----= setup		 =----------------------------------------------\**//** \
		*
		* 	Replaces container subContents with subContent specified, cleaning container. 
		*	Applies animations if set. Calls callback after subContent inserted and before show.
		*	New subContent will be passed to callbacks. 
		*
		*	@param	string	id			- SubContainer system ID.  
		*
		*	@param	function	[callback]	- Callback to call after hide and setup.  
		*	@param	function	[onfinal]	- Callback to call after final show.  
		*
		*	@return SELF
		*
		\**//** ------------------------------------= by Mr.V!T @ Morad Media Inc. =----/** //**/
		setup		: function (id, callback, onfinal) {
			
			var self = this; // Shortcut to use in callback

			// Calling cleaner, this will also hide container 
			this.unset( function () {

				// Attaching content				
			//	var el = jQuery('#' + id);
				var el = jQuery(mwSubContents[id]);
				el.appendTo(self.container);

				// Showing container
				self.animate('show', function () {
					// Calling final callback
					if ( typeof(onfinal) == 'function' )
						onfinal(el);
					
				}); //FUNC onShow

				// Small delay to allow to update contents dimensions
				setTimeout( function () {
					// Calling callback, it will start before animated, 
					// but after animaiton start - contents become real
					if ( typeof(callback) == 'function' )
						callback(el);
				}, 1);

			}); //FUNC onHide
			
			return this;
		}, //FUNC setup

		/** //** ----= unset		 =----------------------------------------------\**//** \
		*
		* 	Clears container from subContents, moving them to system storage.
		*	Calls callback after clean.
		*
		*	@param	function	[callback]	- Callback to call on done.  
		*
		*	@return SELF
		*
		\**//** ------------------------------------= by Mr.V!T @ Morad Media Inc. =----/** //**/
		unset		: function ( callback ) {

			var self = this; // Shortcut to use in callback

			this.animate('hide', function () {

				// Removing all childs in container. Container means only subcontents
			//	self.container.find('.subContent').appendTo('#sysSubContents');
				self.container.empty();

				if ( typeof(callback) == 'function' )
					callback();

			}); //FUNC onHide
			
			return this;
		} //FUNC unset
		
	}; //OBJECT mwSubContent

} //CONSTRUCTOR mwSubContent
