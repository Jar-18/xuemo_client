angular.module('starter.controllers')

.controller('meCtrl', ['$scope', '$state','$ionicModal', function($scope, $state, $ionicModal) {
	$scope.user = {
		id: 1,
		portrait: "jar.jpg",
		nickname: "Jar",
		age: 18,
		gender: 1,
		motto: "无忧无虑的程序猿",
		navigable: true
	};
	$scope.toPersonalHomepage = function() {
		$state.go("personal_homepage", {userId: $scope.user.id, mode: "modify"});
	}

	$ionicModal.fromTemplateUrl('module/app/login/index.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.loginModal = modal;
	});
	$scope.openLoginModal = function() {
		$scope.loginModal.show();
	};
	$scope.closeLoginModal = function() {
		$scope.loginModal.hide();
	};
}])