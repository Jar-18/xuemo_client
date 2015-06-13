angular.module("service.upload", [])
    .factory('uploadService', function($q) {
        var fileServer = "http://upload.qiniu.com";
        return {
            uploadImg: function(token, imgURI, option) {
                console.log('get token');
                console.log('token str:' + token.data);
                var q = $q.defer();
                var ft = new FileTransfer();
                var options = new FileUploadOptions();
                options.fileKey = "file";
                options.mimeType = "image/jpg";
                options.chunkedMode = false;
                options.params = {
                    // Whatever you populate options.params with, will be available in req.body at the server-side.
                    "token": token.data
                };
                ft.upload(imgURI, fileServer,
                    function(data) {
                        var dataJson = JSON.parse(data.response);
                        q.resolve(dataJson.key);
                    },
                    function(err) {
                        q.reject(err);
                    }, options);
                return q.promise;
            }
        }
    })