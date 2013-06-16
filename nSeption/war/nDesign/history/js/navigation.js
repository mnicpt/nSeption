/**
 * Creates events for back, forward and close events on the browser
 * 
 * author		: Steve Mask (pk4y)
 * version		: 1.0
 * date			: May 27, 2013
 * 
 * dependency	: history.js
 * 
 */
(function($){

	var 
		onload = false,
		closing = false,
		preventNavigationEvents = false,
		firedBackOrForward = false,
		supportedEvent = typeof history.state === "object" ? "popstate" : "hashchange",
		firefox = navigator.userAgent.indexOf('Firefox') !== -1,
		iphone	= navigator.userAgent.indexOf('iPhone') !== -1,
		ipad	= navigator.userAgent.indexOf('iPad') !== -1,
		ios		= iphone || ipad,
		
		reset = function () {
			onload = true; // reset onload flag
			closing = false; // reset closing flag
			
			/* reset forward and backward Navigation flags */
			firedBackOrForward = false;
		}
	;
	
	/* Handle navigating using a link. We don't want to fire Back and Forward events. */
	$(document).on('click', 'a', function(e) {
		
		$this = $(e.target);
		var link = $this.attr('href');
		if(link !== undefined && link.indexOf('#') < 0 && link.indexOf('javascript') === -1) {
			preventNavigationEvents = true;
			History.pushState({state:"forward"}, null); // needed for detecting forward when user navigates back to this page
		}
	});

	/* Handle navigating through submit of form. We don't want to fire Back and Forward events. */
	$(document).on('submit', 'form', function() {
		preventNavigationEvents = true;
		History.pushState({state:"forward"}, null); // needed for detecting forward when user navigates back to this page
	});

	/* Keep mobile browsers from caching */
	$(window).on('pageshow', function(e) {
		if(e.persisted) {
			location.reload(true);
		}
	});

	$(window).on('pagehide', function() {
		var session = sessionStorage['demo'];
		if(closing) {
			// either refreshing, closing or holding forward/backward button
		}
	});

	$(window).on('beforeunload', function() {
		if(!firedBackOrForward() && preventNavigationEvents === false && onload === false) {
			//either closed, refreshed or held down back or forward and skipped to another page
			closing = true;
			return "Are you sure you want to refresh or close the page?";
		}
	});
	
	$(window).load(function() {
		reset();
		
		/* Set back and forward states on each page on first time in */
		if (History.state() === null || History.state().state === "") { 
			preventNavigationEvents = true;
			// For knowing when hitting back button on page
			History.replaceState({
				state : "back"
			}, null);
			History.pushState({
				state : "page"
			}, null);
			
			if(firefox || ios) {
				$(window).trigger(jQuery.Event("popstate")); //Firefox does not fire a popstate onload of the page
			}
		} else {
			if(History.state().state === "back") {
				History.forward();
			}else if(History.state().state === "forward") {
				History.back();
			}
		}
	});
	
	/* Handle back and forward buttons through the 'popstate' event and trigger an event for each */
	$(window).on(supportedEvent,
			function() {
				if(History.state() !== null) {
					if(History.state().state === "") { //IE sets an empty hash onload of the page
						History.back();
					}else if (!preventNavigationEvents) {
						if(!onload) {
							if (History.state().state === "back") {
								$(document).trigger(jQuery.Event("back"));
								firedBackOrForward = true;
								History.back();
							}else if(History.state().state === "forward") {
								$(document).trigger(jQuery.Event("forward"));
								firedBackOrForward = true;
								History.forward();
							}
						} 
					}
					//reset mouse or button Navigation flag
					preventNavigationEvents = false;
					// reset onload flag
					onload = false;
					
					$('.console').append(
									"<br /><br />state: " + History.state().state +
									"<br />previous page: " + History.previousPage() +
									"<br />current page: " + History.currentPage +
									"<br />next page: " + History.nextPage() +
									"<br />history: " +localStorage["history"]);
				}
			});

})(jQuery);

