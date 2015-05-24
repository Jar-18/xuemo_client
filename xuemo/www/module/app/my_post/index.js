angular.module('starter.controllers')

    .controller('myPostCtrl', ['$scope','courseService','$state','$ionicSlideBoxDelegate','tmpStorageService',
        function($scope,courseService,$state,$ionicSlideBoxDelegate,tmpStorageService) {
            $scope.tabStatusList=["courseList","activityList"];
            $scope.currentTabStatus="courseList";

            //TODO tab status has not been set to initial value
            console.log($scope.currentTabStatus);

            $scope.toggleTab=function(status){
                $scope.currentTabStatus=status;
                var parentStatus="my_post";
                $state.go(parentStatus+"."+status);
            };
        }])
