angular.module('starter.controllers')
  .controller('LoginCtrl', ['$scope','authService', function($scope, authService) {
  	$scope.account = "user1";
  	$scope.password = "123";
    $scope.login = function() {
    	authService.login($scope.account, $scope.password)
    		.then(function(result) {
    			if("Success" == result.data.status) {
    				$scope.closeLoginModal();
    				$scope.updateMePageProfile();
    			}
    		});
    }
  }])