angular.module("service.user",['service.config'])
    .factory('userService',['$http','URL_CONFIG',function($http,URL_CONFIG) {
        var urlStatus=URL_CONFIG.status;
        var normalHost=URL_CONFIG.host.normalHost;
        return{
            getPersonalInfoPromise:function(courseId,params){
                if(!params){
                    params={};
                }
                var url=normalHost+URL_CONFIG.app.learn.courseList[urlStatus];
                if(courseId){
                    url=url+"/"+courseId;
                }
                var courseListPromise=$http({
                    method:'GET',
                    url:url,
                    params:params
                });
                return courseListPromise;
            }
        }
    }])
