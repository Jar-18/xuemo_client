angular.module('starter.controllers')

.controller('registerStep2Ctrl', ['$scope', 'courseService', '$state', 'URL_CONFIG', '$http', 'userService', 'authService','$ionicHistory',
	function($scope, courseService, $state, URL_CONFIG, $http, userService, authService,$ionicHistory) {
		$scope.skipUpdatePersonalInfo = function() {
			$state.go('app.me');
		}
		$scope.userInfo = {
			nickname: '',
			gender: '1',
			birthday: new Date("1990-01-01T00:00:00.000Z"),
			motto: ''
		};
		$scope.updatePersonalInfo = function() {
			var params = $scope.userInfo;
			params.userId = authService.getUserId();
			userService.getUpdatePersonalInfoPromise(params)
				.success(function(result) {
					authService.updateProfile()
						.then(function() {
							$ionicHistory.clearCache();
							$ionicHistory.nextViewOptions({
								disableBack: true,
								historyRoot: true,
							});
							$state.go("app.me");
						});
				})
				.error(function(err) {
					alert(err);
				});
		}
	}
])