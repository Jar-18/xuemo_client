angular.module("service.tmpStorage", [])
    .factory('tmpStorageService',function($http,URL_CONFIG) {
        var data = {};

        return{
            storeObject: function(key, object) {
                if(data[key] != undefined) {
                    throw new Error('Key already exists in tmp storage');
                }
                data[key] = object;
            },

            retriveObjectAndDestroy: function(key) {
                var o = data[key];
                delete data[key];
                return o;
            },
        }
    })
