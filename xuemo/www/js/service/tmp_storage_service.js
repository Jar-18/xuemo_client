angular.module("service.tmpStorage", [])
    .factory('tmpStorageService',function($http,URL_CONFIG) {
        var data = {};

        return{
            storeObject: function(key, object) {
                data[key] = object;
            },

            retriveObject: function(key) {
                return data[key];
            },
        }
    })
