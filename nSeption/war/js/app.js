define(["codekata", "grid", "prettify"], function(kata, grid) {
	var nDesign = {
		pages : {
			index : {
				url : "",
				title : "nSeption",
				subtitle: "",
				links : []
			},
			
			codekata : {
				url : "./nPractice/codekata.html",
				title : "nPractice",
				subtitle: "",		
				links : ["Arrays and Strings", "Linked Lists", "Stacks and Queues", "Trees and Graphs"]
			},
			
			arrays : {
				url : "./nPractice/codekata.html",
				title : "nPractice",
				subtitle : "Arrays and Strings",
				links : ["Unique Characters", "Reverse String", "String Permutation"]
			},
			
			history : {
				url : "./nDesign/history/history.html",
				title : "History API",
				subtitle: "",
				links : [ "Overview", "API", "Events", "Usage" ]
			},
			
			grid : {
				url : "./nDesign/grid/grid.html",
				title : "Grid API",
				subtitle: "",
				links : ["Cells", "Containers", "Offset Cells", "Dynamic Cells", "The Grid"]
			}
		},
		
		navigationEvent : typeof history.state === "object" ? "popstate" : "hashchange"
	
	};
	
	$(window).load(function() {
		$("[data-spy=scroll]").each(function() {
			$(this).scrollspy('refresh');
		});
		prettyPrint();	
	});
	
	$(window).on(nDesign.navigationEvent,
		function() {
	
			var 
				link, 
				markup = "", 
				state = location.hash === "" ? "index" : location.hash.substring(1), 
				page = nDesign.pages[state],
				script = "",
				$navList = $('.nav.nav-list'),
				$window = $(window);
			
			$('nav .nav > li').each(function() {
				$(this).removeClass('active');
			});
			$('nav [href*=' +state+ ']').parent().addClass('active');
			
			
			// create side bar
			if (page !== undefined) {
				$('header h1').text(page.title);
				$('header h2').text(page.subtitle);

				if(page.links.length > 0) {
					for (link in page.links) {
						markup += "<li>" + "<a href=\"#" + page.links[link].replace(/ /g, "")
								+ "\">"
								+ "<i class=\"icon-chevron-right\"></i>"
								+ page.links[link] + "</a>" + "</li>";
					}
					$navList.html(markup);
				} else {
					$navList.html("");
				}

				if(state === "index") {
					$('.bs-docs-sidenav').html('');
					$('.main').load("index.html .main");
				} 
				else {
					$('.main').load(page.url + " .content", function(response, status, xhr) {
						if("./nPractice/codekata.html" === page.url && "codekata" !== state) {
							kata.load(state);
						} else if("grid" === state) {
							grid.load();
						}
						// affix side bar
						setTimeout(function() {
							$('.bs-docs-sidenav').affix(
								{
									offset : {
										top : function() {
											return $window
													.width() <= 980 ? 290
													: 210;
										},
										bottom : 270
									}
							});
						}, 100);
						
						$("[data-spy=scroll]").each(function() {
							$(this).scrollspy('refresh');
						});
						prettyPrint();
					});
				}
			}
		});
	
	$(window).on('back', function() {
		alert("back button pressed...");
	});
	
	$(window).on('forward', function() {
		alert("forward button pressed...");
	});
});
