/**
 * Handles cross-browser state handling of the history api and wraps existing
 * functionality.
 * 
 * author : Steve Mask (pk4y) 
 * version : 1.0 date : May 27, 2013
 * 
 */
(function ($) {
	var 
		currentPage = location.pathname.split('/')[2], 
		historyStorage = localStorage["history"] !== undefined ? 
				JSON.parse(localStorage["history"])
				: null,
		createPageFlow = function() {
			var 
				sessionHistory = new Array(),
				contextRoot = location.pathname.split('/')[1];
			
			sessionHistory.push(currentPage);
			localStorage["history"] = JSON.stringify({
				pageFlow : sessionHistory,
				contextRoot : contextRoot
			});
			historyStorage = JSON.parse(localStorage["history"]);
		};

	// Stores page flow in local storage.
	$(function() {
		/* Keep track of history within navigation */
		if (historyStorage !== null) {
			var currentContext = location.pathname.split('/')[1];
			if (historyStorage.contextRoot !== currentContext) {
				localStorage.removeItem("history");
				createPageFlow();
			} else if (historyStorage.pageFlow.indexOf(currentPage) === -1) {
				historyStorage.pageFlow.push(currentPage);
			}
			localStorage["history"] = JSON.stringify(historyStorage);
		} else {
			createPageFlow();
		}

	});
	
	return History = {
		state : function() {
			if (typeof history.state === "object") {
				return history.state;
			} else {
				return {
					state : location.hash.substring(1)
				};
			}
		},
		replaceState : function(obj, url) {
			if (typeof history.replaceState === "function") {
				history.replaceState(obj, null, url);
			} else {
				location.hash = obj.state;
			}
		},
		pushState : function(obj, url) {
			if (typeof history.pushState === "function") {
				history.pushState(obj, null, url);
			} else {
				location.hash = obj.state;
			}
		},
		back : function() {
			history.back();
		},
		forward : function() {
			history.forward();
		},
		go : function(numPages) {
			history.go(numPages);
		},

		history : historyStorage,
		currentPage : currentPage,
		previousPage : function() { // determines the previous page in the flow
			var 
				indexOfCurrentPage = historyStorage.pageFlow
						.indexOf(this.currentPage),
				previousPage = historyStorage.pageFlow[indexOfCurrentPage - 1];
				
			if (previousPage === undefined) {
				previousPage = document.referrer.split('/')[4];
			}
			return previousPage;
		},
		nextPage : function() { // determines the next page in the flow
			try {
				var 
					indexOfCurrentPage = historyStorage.pageFlow
						.indexOf(this.currentPage),
					nextPage = historyStorage.pageFlow[indexOfCurrentPage + 1];
					
				if (nextPage === undefined) {
					nextPage = "You are at the end of your flow.";
				}
			} catch (e) {
				nextPage = "You are at the end of your flow.";
			}

			return nextPage;
		}
	};
})(jQuery);
