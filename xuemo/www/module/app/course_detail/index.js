angular.module('starter.controllers')

    .controller('courseDetailCtrl', ['$scope','courseService','$state','$ionicSlideBoxDelegate',
        function($scope,courseService,$state,$ionicSlideBoxDelegate) {
            var courseId=$state.params.courseId;
            $scope.course={};
            courseService.getCoursePromise(courseId).success(function(result){
                $scope.course=result;
                $ionicSlideBoxDelegate.update();
            });
            $scope.tabStatusList=["courseIntro","comment","appointmentRecord"];
            $scope.currentTabStatus="courseIntro";
            $scope.toggleTab=function(status){
                $scope.currentTabStatus=status;
                var parentStatus="app.course_detail";
                $state.go(parentStatus+"."+status,$state.params);
            };

            $scope.relatedCourseList=[];
            courseService.getRelatedCoursePromise().success(function(result){
                $scope.relatedCourseList=result;
            });
        }])
