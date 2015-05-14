angular.module("service.course",['service.config'])
    .factory('courseService',['$http','URL_CONFIG',function($http,URL_CONFIG) {
        var urlStatus=URL_CONFIG.status;
        var normalHost=URL_CONFIG.host.normalHost;
        return{
            getCoursePromise:function(courseId,params){
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
            },

            getCommentPromise:function(params){
                if(!params){
                    params={};
                }
                var url=normalHost+URL_CONFIG.common.courseComments[urlStatus];
                var courseListPromise=$http({
                    method:'GET',
                    url:url,
                    params:params
                });
                return courseListPromise;
            },

            getAppointmentPromise:function(params){
                if(!params){
                    params={};
                }
                var url=normalHost+URL_CONFIG.common.courseAppointment[urlStatus];
                var courseListPromise=$http({
                    method:'GET',
                    url:url,
                    params:params
                });
                return courseListPromise;
            },
            getRelatedCoursePromise:function(params){
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
            getCoursePhotosUploadTokenPromise: function(){
                var url = normalHost + URL_CONFIG.app.teach.uploadCoursePhotoToken[urlStatus];
                var promise = $http({
                    method: 'GET',
                    url: url
                });
                return promise;
            },
            getCreateAppointmentPromise: function(params) {
                if(!params){
                    params={};
                }
                var url=normalHost+URL_CONFIG.app.learn.createAppointment[urlStatus];
                var createAppointmentPromise = $http({
                    method:'POST',
                    url:url,
                    params:params
                });
                return createAppointmentPromise;
            }
        }
    }])
