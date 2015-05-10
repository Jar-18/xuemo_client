angular.module('starter.controllers')

.controller('postCourseStep2Ctrl', ['$scope', 'URL_CONFIG', '$http', '$ionicActionSheet', 'courseService', '$stateParams', 
	function($scope, URL_CONFIG, $http, $ionicActionSheet, courseService, $stateParams) {
 	var urlStatus=URL_CONFIG.status;
 	var normalHost=URL_CONFIG.host.normalHost;
 
	$scope.fileList = [];
	var courseId = $stateParams.courseId;
	$scope.courseForm = {
		dataModel: {
			describe: "",
			pics: [] 
		}
	};

	$scope.addPhoto = function() {
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

	function takePhoto() {
		navigator.camera.getPicture(onAddPhotoSuccess, onAddPhotoFail, {
			//options
			quality: 100,
			sourceType: navigator.camera.PictureSourceType.CAMERA,
			destinationType: navigator.camera.DestinationType.FILE_URL
		});
	};

	function choosePhotoFromGallery() {
		navigator.camera.getPicture(onAddPhotoSuccess, onAddPhotoFail, {
			//options
			quality: 100,
			sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
			destinationType: navigator.camera.DestinationType.FILE_URL
		});
	};

	function onAddPhotoSuccess(imageURI) {
		console.log(imageURI);
		var file = {};
		file.path = imageURI;
		$scope.$apply(function() {
			$scope.fileList.push(file);
		});
		console.log($scope.fileList[0]);
	};

	function onAddPhotoFail(message) {
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
				var count = 0;
				for(var i = 0;i < $scope.fileList.length;i++) {
					ft.upload($scope.fileList[i].path, "http://upload.qiniu.com", function(data) {
						// ft.upload($scope.lastPhoto, "http://192.168.2.5:3000/photos", function(data) {
						//Upload success
						var dataJson = JSON.parse(data.response);
						// alert("Upload success:" + dataJson.key);
						$scope.courseForm.dataModel.pics.push({id:dataJson.key});
						// alert(JSON.stringify($scope.courseForm));
						//alert("post");
						//alert("i:"+i+"||length:"+($scope.fileList.length - 1));
						count++;
						console.log("count:"+count+"||"+$scope.fileList.length);
						if(count == $scope.fileList.length) {
							$scope.post();
						}
					}, function(err) {
						//Upload fail
						alert("Upload fails");
						console.log(err);
					}, options);
				}
				// $scope.fileList.forEach(function(file) {
					
				// });
			});
	};

	$scope.post = function() { 
		// ("psot2");
		var url=normalHost+URL_CONFIG.app.teach.postCourseStep1[urlStatus]+"/"+courseId;
        //console.debug($scope.courseForm.dataModel);
        // alert(url);
        $http({
            method:'PUT',
            url:url,
            headers: {
                'Content-Type': 'application/json'
            },
            data:$scope.courseForm.dataModel
        }).success(function(result){
            if(result.status != null && result.status == "Success") {
                alert("发布成功");
            }
        }).error(function(err) {
        	alert(err);
        });
	}
}])