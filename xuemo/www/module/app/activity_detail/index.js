angular.module('starter.controllers')

    .controller('activityDetailCtrl', ['$scope','courseService','$state','$ionicSlideBoxDelegate','tmpStorageService',
        function($scope,courseService,$state,$ionicSlideBoxDelegate,tmpStorageService) {
            $scope.tabStatusList=["activityIntro","participator"];
            var stateList=$state.current.name.split('.');
            $scope.currentTabStatus=stateList[stateList.length-1];
            $scope.toggleTab=function(status){
                $scope.currentTabStatus=status;
                var parentStatus="activity_detail";
                $state.go(parentStatus+"."+status,$state.params);
            };
        }])
