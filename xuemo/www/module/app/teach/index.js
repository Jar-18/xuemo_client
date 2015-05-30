angular.module('starter.controllers')

    .controller('teachCtrl', ['$scope','URL_CONFIG','$http','$state','authService',function($scope,URL_CONFIG,$http,$state, authService) {
        var urlStatus=URL_CONFIG.status;
        var normalHost=URL_CONFIG.host.normalHost;

        $http({
            method:'GET',
            url:URL_CONFIG.common.districts[urlStatus],
            params:{}
        }).success(function(data){
            $scope.districtsList=data;
        });
        $http({
            method:'GET',
            url:URL_CONFIG.common.courseCategories[urlStatus],
            params:{}
        }).success(function(data){
            $scope.courseCategoriesList=data;
        });
        $scope.courseForm={
            options:{
                courseSite:{
                    dicName:"courseSite",
                    selectorList:["1","2","3"]
                },
                courseType:{
                    dicName:"courseType",
                    selectorList:["1","2","3"]
                },
                courseCategories:{
                    "multiple":false,
                    "addSelectAllBtn":false,
                    "modalTitle":"课程类型",
                    "modalName":"courseCategories"
                },
                districts:{
                    "modalTitle":"区域",
                    "modalName":"districts"
                }
            },
            dataModel:{
                districts:[] ,
                category:{},
                "sites":[
                    {"id":"1"},
                    {"id":"2"}
                ],
                "types":[
                    {"id":"1"},
                    {"id":"2"}
                ],
                "title":"",
                teacher:{id:authService.getUserId()},
                "price": ""
            }
        };
        $scope.postCourseStep1=function(){
            var url=normalHost+URL_CONFIG.app.teach.postCourseStep1[urlStatus];
            //console.debug($scope.courseForm.dataModel);
            
            $http({
                method:'POST',
                url:url,
                headers: {
                    'Content-Type': 'application/json'
                },
                data:$scope.courseForm.dataModel
            }).success(function(result){
                if(result.status != null && result.status == "Success") {
                    $state.go("post_course_step_2", {courseId: result.courseId});
                }
            });
        };
    }])
