angular.module("service.user",['service.config'])
    .factory('userService',['$http','URL_CONFIG',function($http,URL_CONFIG) {
        var urlStatus=URL_CONFIG.status;
        var normalHost=URL_CONFIG.host.normalHost;
        return{
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
            }
        }
    }])
