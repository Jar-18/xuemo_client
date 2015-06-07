angular.module('starter.controllers')

    .controller('activityDetailCtrl', ['$scope','activityService','$state','$ionicSlideBoxDelegate','tmpStorageService','authService',
        function($scope,activityService,$state,$ionicSlideBoxDelegate,tmpStorageService,authService) {
            $scope.tabStatusList=["activityIntro","participator"];
            var stateList=$state.current.name.split('.');
            $scope.currentTabStatus=stateList[stateList.length-1];
            $scope.toggleTab=function(status){
                $scope.currentTabStatus=status;
                var parentStatus="activity_detail";
                $state.go(parentStatus+"."+status,$state.params);
            };



            var activityId = $state.params.activityId;
            $scope.activity = {};
            activityService.getActivityPromise(activityId, {
                userId: authService.getUserId()
            }).success(function(result) {
                $scope.activity = result;
                console.debug($scope.activity);
                $ionicSlideBoxDelegate.update();
            });
        }])
