angular.module('starter.controllers')

.controller('meCtrl', ['$scope', '$state', '$ionicModal', 'authService',
	function($scope, $state, $ionicModal, authService) {


		$scope.updateMePageProfile = function() {
			$scope.user = authService.getProfile();
		}
		$scope.user = null;
		$scope.updateMePageProfile();

		$scope.toPersonalHomepage = function() {
			$state.go("personal_homepage", {
				userId: $scope.user.id,
				mode: "modify"
			});
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
	}
])