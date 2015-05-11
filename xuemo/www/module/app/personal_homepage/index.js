angular.module('starter.controllers')

    .controller('personalHomepageCtrl', ['$scope','URL_CONFIG','$http','$state','userService',function($scope,URL_CONFIG,$http,$state,userService) {
        var urlStatus=URL_CONFIG.status;
        var normalHost=URL_CONFIG.host.normalHost;
        userService.getPersonalInfoPromise(1).success(function(data){
            console.debug(data);
            $scope.userObj=data;
        });
        $scope.coursesList=[];
        userService.getTeachingCoursesPromise().success(function(data){
            $scope.coursesList=data;
        });

        $scope.toModifyPage = function() {
            $state.go("modify_personal_info", {});
        }
    }])
