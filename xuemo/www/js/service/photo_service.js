angular.module("service.photo", [])
    .factory('photoService', function($q) {
        return {
            takePhoto: function() {
                var q = $q.defer();
                navigator.camera.getPicture(
                    function(imageURI) {
                        q.resolve(imageURI);
                    },
                    function(message) {
                        q.reject(err);
                    }, {
                        //options
                        quality: 100,
                        sourceType: navigator.camera.PictureSourceType.CAMERA,
                        destinationType: navigator.camera.DestinationType.FILE_URL
                    });
                return q.promise;
            },
            choosePhotoFromGallery: function() {
                var q = $q.defer();
                navigator.camera.getPicture(
                    function(imageURI) {
                        q.resolve(imageURI);
                    },
                    function(message) {
                        q.reject(err);
                    }, {
                        //options
                        quality: 100,
                        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
                        destinationType: navigator.camera.DestinationType.FILE_URL
                    });
                return q.promise;
            }
        }
    })