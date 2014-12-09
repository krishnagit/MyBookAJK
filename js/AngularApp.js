var app = angular.module('myBook', ['mainModule', 'feedsModule','ngRoute']);

app.config(['$routeProvider',
	function ($routeProvider) {

		$routeProvider.
			when('/feeds', {	
				templateUrl:'../src/feeds.html'
			}).
			when('/profile', {
				templateUrl:'../src/profile.html'
			}).
			when('/home', {
				templateUrl:'../src/main.html'
			}).
			
			otherwise({
					redirectTo: '/home'
			});
	}
]);
