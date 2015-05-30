angular.module('starter.controllers')

    .controller('createActivityCtrl', ['$scope','courseService','$state','$ionicSlideBoxDelegate','tmpStorageService','$filter','URL_CONFIG','$http','authService',
        function($scope,courseService,$state,$ionicSlideBoxDelegate,tmpStorageService,$filter,URL_CONFIG,$http,authService) {
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
            $scope.showMap=function(){
                $state.go('location_setting');
            };

            var currentTime=new Date();
            $scope.activityForm={
                startDate:currentTime,
                startTime:currentTime,
                endDate:currentTime,
                endTime:currentTime
            };
            $scope.formOptions ={
                courseCategories:{
                    "multiple":false,
                        "addSelectAllBtn":false,
                        "modalTitle":"课程类型",
                        "modalName":"courseCategories"
                },
                districts:{
                    "multiple":false,
                    "modalTitle":"区域",
                        "modalName":"districts"
                }
            },
            $scope.formParams={
                title:'',
                describe:'',
                startTime:'',
                endTime:'',
                lat:null,
                lng:null,
                district:{} ,
                category:{},
                hostId:authService.getUserId()
            };
            $scope.locationLatLng={
                lat:null,
                lng:null
            };
            $scope.createActivity=function(){
                $scope.formParams.startTime=$filter('date')($scope.activityForm.startDate,'yyyy-MM-dd')
                    +' '+$filter('date')($scope.activityForm.startTime,'HH:mm:ss');
                $scope.formParams.endTime=$filter('date')($scope.activityForm.endDate,'yyyy-MM-dd')
                    +' '+$filter('date')($scope.activityForm.endTime,'HH:mm:ss');
                $scope.formParams.lat=$scope.locationLatLng.lat;
                $scope.formParams.lng=$scope.locationLatLng.lng;
                $http({
                    method:'POST',
                    url:normalHost+URL_CONFIG.common.activities[urlStatus],
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data:$scope.formParams
                }).success(function(result){
                    if(result.status != null && result.status == "Success") {
                        $state.go('nearby_activity');
                    }
                });

            }
            tmpStorageService.storeObject('createActivityLocation',$scope.locationLatLng);

            tmpStorageService.storeObject('createActivityLocation',$scope.locationLatLng);
        }])
