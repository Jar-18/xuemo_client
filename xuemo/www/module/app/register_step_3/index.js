angular.module('starter.controllers')

.controller('registerStep3Ctrl', ['$scope', 'courseService', '$state', 'URL_CONFIG', '$http', 'userService', 'authService', '$ionicHistory', '$ionicActionSheet', 'photoService', 'uploadService',
	function($scope, courseService, $state, URL_CONFIG, $http, userService, authService, $ionicHistory, $ionicActionSheet, photoService, uploadService) {
		$scope.skipUpdatePersonalInfo = function() {
			console.log('dtt');
			$ionicHistory.clearCache();
			$ionicHistory.nextViewOptions({
				disableBack: true,
				historyRoot: true,
			});
			$state.go('app.me');
		}
		$scope.userInfo = {
			portrait: 'img/default.jpg',
			interests: [],
		};
		$scope.options = {
			courseCategories: {
				"multiple": true,
				"addSelectAllBtn": false,
				"modalTitle": "课程类型",
				"modalName": "courseCategories"
			}
		};
		$scope.updatePersonalInfo = function() {

			userService.getUserPhotosUploadTokenPromise()
				.then(function(token) {
					console.log('111');
					console.log(token);
					return uploadService.uploadImg(token, $scope.userInfo.portrait, {});
				})
				.then(function(key) {
					console.log('222');
					console.log(key);
					var params = {
						userId: authService.getUserId(),
						portrait: key,
						interests: $scope.userInfo.interests
					}
					return userService.getUpdatePersonalInfoPromise(params);
				})
				.then(function(result) {
					console.log('333');
					console.log(result);
					return authService.updateProfile();
				})
				.then(function() {
					console.log('444');
					$ionicHistory.clearCache();
					$ionicHistory.nextViewOptions({
						disableBack: true,
						historyRoot: true,
					});
					$state.go("app.me");
				})
				.catch(function(err) {
					alert(err);
				});

			// var params = $scope.userInfo;
			// params.userId = authService.getUserId();
			// console.log(params);
			// userService.getUpdatePersonalInfoPromise(params)
			// 	.success(function(result) {
			// 		authService.updateProfile()
			// 			.then(function() {
			// 				$ionicHistory.clearCache();
			// 				$ionicHistory.nextViewOptions({
			// 					disableBack: true,
			// 					historyRoot: true,
			// 				});
			// 				$state.go("app.me");
			// 			});
			// 	})
			// 	.error(function(err) {
			// 		alert(err);
			// 	});
		}
		$scope.updatePortrait = function() {
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
		};

		var urlStatus = URL_CONFIG.status;
		$http({
			method: 'GET',
			url: URL_CONFIG.common.courseCategories[urlStatus],
			params: {}
		}).success(function(data) {
			$scope.courseCategoriesList = data;
		});
	}
])