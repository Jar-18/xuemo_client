angular.module('starter.controllers')

.controller('postCourseStep2Ctrl', ['$scope', 'URL_CONFIG', '$http', '$ionicActionSheet', 'courseService', function($scope, URL_CONFIG, $http, $ionicActionSheet, courseService) {
	// $scope.fileList = ['http://localhost:3000/images/default.jpg','http://localhost:3000/images/default.jpg'];
	$scope.fileList = [];

	$scope.addPhoto = function() {
		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({
			buttons: [{
				text: '拍照'
			}, {
				text: '从相册选取'
			}],
			titleText: '添加图片',
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

	function takePhoto() {
		navigator.camera.getPicture(onSuccess, onFail, {
			//options
			quality: 100,
			sourceType: navigator.camera.PictureSourceType.CAMERA,
			destinationType: navigator.camera.DestinationType.FILE_URL
		});
	};

	function choosePhotoFromGallery() {
		navigator.camera.getPicture(onSuccess, onFail, {
			//options
			quality: 100,
			sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
			destinationType: navigator.camera.DestinationType.FILE_URL
		});
	};

	function onSuccess(imageURI) {
		console.log(imageURI);
		var file = {};
		file.path = imageURI;
		$scope.$apply(function() {
			$scope.fileList.push(file);
		});
		console.log($scope.fileList[0]);
	};

	function onFail(message) {
		console.log(message);
	};

	$scope.uploadFiles = function() {
		courseService.getCoursePhotosUploadTokenPromise()
			.success(function(response) {
				console.log('Token from server:' + response);
				var ft = new FileTransfer();
				var options = new FileUploadOptions();
				options.fileKey = "file";
				options.mimeType = "image/jpg";
				options.chunkedMode = false;
				options.params = { 
				// Whatever you populate options.params with, will be available in req.body at the server-side.
					"token": response
				};

				//alert("UP2");
				console.log('created file');
				ft.upload($scope.fileList[0].path, "http://upload.qiniu.com", function(data) {
					// ft.upload($scope.lastPhoto, "http://192.168.2.5:3000/photos", function(data) {
					//Upload success
					alert("Upload success:" + data.response);
				}, function(err) {
					//Upload fail
					alert("Upload fails");
					console.log(err);
				}, options);
			});
	};
}])