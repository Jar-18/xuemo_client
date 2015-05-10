angular.module("service.activity",['service.config'])
    .factory('activityService',['$http','URL_CONFIG',function($http,URL_CONFIG) {
        var urlStatus=URL_CONFIG.status;
        var normalHost=URL_CONFIG.host.normalHost;
        return{
            getActivityPromise:function(activityId,params){
                if(!params){
                    params={};
                }
                var url=normalHost+URL_CONFIG.app.find.nearbyActivity.activityList[urlStatus];
                if(activityId){
                    url=url+"/"+activityId;
                }
                var activityListPromise=$http({
                    method:'GET',
                    url:url,
                    params:params
                });
                return activityListPromise;
            }
        }
    }])
