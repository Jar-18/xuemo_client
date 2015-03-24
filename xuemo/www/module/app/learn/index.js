angular.module('starter.controllers')

    .controller('learnCtrl', ['$scope','courseService',function($scope,courseService) {
        $scope.courseList=[];
        courseService.getCoursePromise().success(function(result){
            $scope.courseList=result;
        });
    }])
