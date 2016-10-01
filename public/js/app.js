define(["codekata", "grid", "mastermind", "prettify"], function (kata, grid, mastermind) {
    var nDesign = {
        pages: {
            index: {
                url: "",
                title: "nSeption",
                subtitle: "",
                links: []
            },

            codekata: {
                url: "./nPractice/codekata.html",
                title: "nPractice",
                subtitle: "",
                links: []
            },

            arrays: {
                url: "./nPractice/practice.html",
                title: "nPractice",
                subtitle: "Arrays and Strings",
                links: ["Unique Characters", "Reverse String",
				         "String Permutation", "Encode Spaces",
				         "Compress String", "Rotate Image",
				         "Clear Axes", "Substring"]
            },

            lists: {
                url: "./nPractice/practice.html",
                title: "nPractice",
                subtitle: "Linked Lists",
                links: ["Duplicates"]
            },

            stacks: {
                url: "./nPractice/practice.html",
                title: "nPractice",
                subtitle: "Stacks and Queues",
                links: ["Stack as Array"]
            },

            trees: {
                url: "./nPractice/practice.html",
                title: "nPractice",
                subtitle: "Trees and Graphs",
                links: ["Balanced Tree"]
            },

            history: {
                url: "./nDesign/history/history.html",
                title: "History API",
                subtitle: "",
                links: []
            },

            grid: {
                url: "./nDesign/grid/grid.html",
                title: "Grid API",
                subtitle: "",
                links: []
            },

            mastermind: {
                url: "./nGame/mastermind/mastermind.html",
                title: "nGame",
                subtitle: "",
                links: []
            }
        },

        navigationEvent: typeof history.state === "object" ? "popstate" : "hashchange"

    };

    $(window).load(function () {
        $("[data-spy=scroll]").each(function () {
            $(this).scrollspy('refresh');
        });
        prettyPrint();
    });

    $(window).on(nDesign.navigationEvent,
        function () {

            var
                i,
                markup = "",
                state = location.hash === "" ? "index" : location.hash.substring(1),
                page = nDesign.pages[state],
                $window = $(window);

            $('nav .nav > li').each(function () {
                $(this).removeClass('active');
            });
            $('nav [href*=' + state + ']').parent().addClass('active');


            // create side bar
            if (page !== undefined) {
                $('header h1').text(page.title);
                $('header h3').text(page.subtitle);

                if (state === "index") {
                    $('.bs-docs-sidenav').html('');
                    $('.row-fluid.main').load("index.html .main");
                } else {
                    $('.row-fluid.main').load(page.url + " .content", function () {
                        if ("./nPractice/practice.html" === page.url && "codekata" !== state) {
                            var $navList = $('.nav.nav-list');
                            if (page.links.length > 0) {
                                for (i = 0; i < page.links.length; i++) {
                                    markup += "<li>" + "<a href=\"#" + page.links[i].replace(/ /g, "") +
                                        "\">" +
                                        "<i class=\"icon-chevron-right\"></i>" +
                                        page.links[i] + "</a>" + "</li>";
                                }
                                $navList.html(markup);
                            } else {
                                $navList.html("");
                            }
                            kata.load(state);
                        } else if ("grid" === state) {
                            grid.load();
                        } else if ("mastermind" === state) {
                            mastermind.init();
                        }

                        prettyPrint();
                    });
                }
            }
        });

    $(window).on('back', function () {
        alert("back button pressed...");
    });

    $(window).on('forward', function () {
        alert("forward button pressed...");
    });
});
