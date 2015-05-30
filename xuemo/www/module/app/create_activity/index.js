angular.module('starter.controllers')

    .controller('createActivityCtrl', ['$scope','courseService','$state','$ionicSlideBoxDelegate','tmpStorageService','$filter',
        function($scope,courseService,$state,$ionicSlideBoxDelegate,tmpStorageService,$filter) {
            $scope.showMap=function(){
                $state.go('location_setting');
            };
            $scope.location={
                name:''
            };
            $scope.activityForm={
                startDate:$filter('date')(new Date(),'yyyy-MM-dd'),
                endDate:$filter('date')(new Date(),'yyyy-MM-dd')
            };
            $scope.locationLatLng={
                lat:null,
                lng:null
            };
            setTimeout(function(){
                console.debug($scope.locationLatLng);
                console.debug(tmpStorageService.retriveObject('createActivityLocation'));

            },10000);

            tmpStorageService.storeObject('createActivityLocation',$scope.locationLatLng);

            tmpStorageService.storeObject('createActivityLocation',$scope.locationLatLng);
        }])
