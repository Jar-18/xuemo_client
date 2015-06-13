angular.module('starter.controllers')

.controller('modifyPersonalInfoCtrl', ['$scope', 'URL_CONFIG', '$http', '$state', 'userService', 'authService', '$ionicActionSheet', 'photoService', 'uploadService',
	function($scope, URL_CONFIG, $http, $state, userService, authService, $ionicActionSheet, photoService, uploadService) {
		$scope.userInfo = authService.getProfile();

		$scope.updatePortrait = function() {
			userService.getUserPhotosUploadTokenPromise()
				.then(function(token) {
					return uploadService.uploadImg(token, $scope.userInfo.portrait, {});
				})
				.then(function(key) {
					var params = {
						userId: authService.getUserId(),
						portrait: key,
					}
					return userService.getUpdatePersonalInfoPromise(params);
				})
				.then(function(result) {
					//return authService.updateProfile();
				})
				.catch(function(err) {
					alert(err);
				});
		}
		$scope.choosePortrait = function() {
			// Show the action sheet
			var hideSheet = $ionicActionSheet.show({
				buttons: [{
					text: '拍照'
				}, {
					text: '从相册选取'
				}],
				// titleText: '添加图片',
				cancelText: '取消',
				cancel: function() {
					// No action
				},
				buttonClicked: function(index) {
					if (0 == index) {
						photoService.takePhoto()
							.then(afterChoosePhoto);
					} else if (1 == index) {
						photoService.choosePhotoFromGallery()
							.then(afterChoosePhoto);
					}
					return true;
				}
			});
		};

		var afterChoosePhoto = function(imgURI) {
			$scope.userInfo.portrait = imgURI;
			$scope.updatePortrait();
		};
	}
])