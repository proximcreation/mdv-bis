vol2dApp.controller('MainCtrl',[
	'$scope',
	'$http',
	'$sce',
	'$timeout',
	'filterFilter',	
	'localStorageService',
	function($scope, $http, $sce, $timeout, filterFilter,localStorageService) {

	// config load
	$scope.enums = enums;
	$scope.config = config;

	var w = window, d = document, e = d.documentElement, g = d.getElementsByTagName('body')[0];
	$scope.screen = {
	    width : /*w.innerWidth || e.clientWidth || */g.clientWidth,
	    height : /*w.innerHeight|| e.clientHeight|| */g.clientHeight
	};

	var lineData = [{
		x: 1,
		y: 5
	}, {
		x: 20,
		y: 20
	}, {
		x: 40,
		y: 10
	}, {
		x: 60,
		y: 40
	}, {
		x: 80,
		y: 5
	}, {
		x: 100,
		y: 60
	}];


	$scope.loadGraph = function(id) {

		var vis = d3.select('#'+id),
	    WIDTH = $scope.screen.width - 90,
	    HEIGHT = $scope.config.graph.height,
	    MARGINS = {
	      top: 20,
	      right: 20,
	      bottom: 20,
	      left: 50
	    },
	    xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(lineData, function(d) {
	      return d.x;
	    }), d3.max(lineData, function(d) {
	      return d.x;
	    })]),
	    yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(lineData, function(d) {
	      return d.y;
	    }), d3.max(lineData, function(d) {
	      return d.y;
	    })]),
	    xAxis = d3.svg.axis()
	      .scale(xRange)
	      .tickSize($scope.config.graph.axis.width)
	      .tickSubdivide(true),
	    yAxis = d3.svg.axis()
	      .scale(yRange)
	      .tickSize($scope.config.graph.axis.width)
	      .orient('left')
	      .tickSubdivide(true);
	 
		vis.append('svg:g')
		  .attr('class', 'x axis')
		  .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
		  .call(xAxis);
		 
		vis.append('svg:g')
		  .attr('class', 'y axis')
		  .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
		  .call(yAxis);

		var lineFunc = d3.svg.line()
		.x(function(d) {
	    	return xRange(d.x);
	  	})
	  	.y(function(d) {
	    	return yRange(d.y);
	  	})
	  	.interpolate('linear');

		vis.append('svg:path')
		.attr('d', lineFunc(lineData))
		.attr('stroke', 'blue')
		.attr('stroke-width', 2)
		.attr('fill', 'none');
	};
}]);