angular.module('starter.controllers')

.controller('registerStep3Ctrl', ['$scope', 'courseService', '$state', 'URL_CONFIG', '$http', 'userService', 'authService', '$ionicHistory', '$ionicActionSheet',
	function($scope, courseService, $state, URL_CONFIG, $http, userService, authService, $ionicHistory, $ionicActionSheet) {
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
			portrait: '',
			interests: [],
		};
		$scope.options = {
			courseCategories:{
                    "multiple":true,
                    "addSelectAllBtn":false,
                    "modalTitle":"课程类型",
                    "modalName":"courseCategories"
            }
        };
		$scope.updatePersonalInfo = function() {
			var params = $scope.userInfo;
			params.userId = authService.getUserId();
			console.log(params);
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
					0 == index && takePhoto();
					1 == index && choosePhotoFromGallery();
					return true;
				}
			});
		};
		var urlStatus=URL_CONFIG.status;
		$http({
            method:'GET',
            url:URL_CONFIG.common.courseCategories[urlStatus],
            params:{}
        }).success(function(data){
            $scope.courseCategoriesList=data;
        });
	}
])