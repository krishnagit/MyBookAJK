var loginModule = angular.module('mainModule',[]);

loginModule.service('LoginService', function() {
	
	this.isUsernameValid = function(username) {
		if (username === undefined || username == null || username.trim() == "") {
			console.log("Enter Valid User name");
			return false;
		}
		else {			
			return true;
		}
	};
	
	this.isPasswordValid = function(password) {
		if (password === undefined || password == null || password.trim() == "") {
			console.log("Enter Valid Password");
			return false;
		}
		else {			
			return true;
		}
	};
	
	this.authenticateLogin = function (username, password) {
		
		if (username === 'krishna' && password === 'welcome123') {
			return true;
		}
		else {
			console.log("Enter Valid Username & Password mismatch. Please try again!!");
			return false;
		}
	};
	
});

loginModule.controller('LoginController', ['$scope', '$location', 'LoginService', function($scope, $location, loginService) {
	
	$scope.loginState = false;
	
	$scope.validateUser = function() {
		
		if (loginService.isUsernameValid($scope.username) &&
				loginService.isPasswordValid($scope.password) &&
				loginService.authenticateLogin($scope.username, $scope.password) ) {
			
			$scope.loginState = true;
			$location.path("/feeds");
		}
		else {
			$scope.loginState = false;
			$location.path("/home");
		}
	};
	
	$scope.logOut = function() {
		
		$scope.loginState = false;
		$scope.username = "";
		$scope.password = "";
		$location.path("/home");
	}
}]);