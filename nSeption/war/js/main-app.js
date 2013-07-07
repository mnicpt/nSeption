requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/lib',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
    	app			: '../app.min',
    	codekata	: '../../nPractice/js/codekata.min',
    	grid		: '../../nDesign/grid/js/grid.min'
    }
});

//Load the main app module to start the app
requirejs(["bootstrap.min", "app", "codekata", "grid"]);