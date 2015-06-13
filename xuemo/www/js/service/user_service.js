angular.module("service.user",['service.config'])
    .factory('userService',['$http','URL_CONFIG',function($http,URL_CONFIG) {
        var urlStatus=URL_CONFIG.status;
        var normalHost=URL_CONFIG.host.normalHost;
        return{
            getUserPhotosUploadTokenPromise: function(){
                var url = normalHost + URL_CONFIG.app.user.uploadUserPhotoToken[urlStatus];
                var promise = $http({
                    method: 'GET',
                    url: url
                });
                return promise;
            },
            getPersonalInfoPromise:function(userId,params){
                if(!params){
                    params={};
                }
                var url=normalHost+URL_CONFIG.common.personalInfo[urlStatus];
                if(userId){
                    url=url+"/"+userId;
                }
                var personalInfoPromise=$http({
                    method:'GET',
                    url:url,
                    params:params
                });
                return personalInfoPromise;
            },
            getTeachingCoursesPromise:function(params){
                if(!params){
                    params={};
                }
                var url=normalHost+URL_CONFIG.app.learn.relatedCourseList[urlStatus];
                var courseListPromise=$http({
                    method:'GET',
                    url:url,
                    params:params
                });
                return courseListPromise;
            },
            getNearbyPeoplePromise:function(params) {
                if(!params) {
                    params = {};
                }
                var url = normalHost + URL_CONFIG.app.find.nearbyPeople.peopleList[urlStatus];
                var nearbyPeoplePromise = $http({
                    method:'GET',
                    url:url,
                    params:params
                });
                return nearbyPeoplePromise;
            },
            getRegisterPromise:function(params) {
                var url = normalHost + URL_CONFIG.app.user.register[urlStatus];
                var registerPromise = $http({
                    method:'POST',
                    url:url,
                    data:params,
                });
                return registerPromise;
            },
            getUpdatePersonalInfoPromise:function(params) {
                var url = normalHost + URL_CONFIG.app.user.updatePersonalInfo[urlStatus] + '/' + params.userId;
                var updatePromise = $http({
                    method:'PUT',
                    url:url,
                    data:params,
                });
                return updatePromise;

            },
            getRemoveFollowerPromise: function(params) {
                var url = normalHost + URL_CONFIG.app.user.follower[urlStatus];
                var remFollowerPromise = $http({
                    method:'DELETE',
                    url:url,
                    params:params,
                });
                return remFollowerPromise;
            },
            getCreateFollowerPromise: function(data) {
                var url = normalHost + URL_CONFIG.app.user.follower[urlStatus];
                var createFollowerPromise = $http({
                    method:'POST',
                    url:url,
                    data:data,
                });
                return createFollowerPromise;
            },
            getAttentionListPromise: function(params) {
                var url = normalHost + URL_CONFIG.app.user.follower[urlStatus];
                var attentionListPromise = $http({
                    method:'GET',
                    url:url,
                    params:params,
                });
                return attentionListPromise;
            },
            getFollowerListPromise: function(params) {
                var url = normalHost + URL_CONFIG.app.user.follower[urlStatus];
                var followerListPromise = $http({
                    method:'GET',
                    url:url,
                    params:params,
                });
                return followerListPromise;
            }
        }
    }])
