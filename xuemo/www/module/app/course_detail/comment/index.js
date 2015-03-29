angular.module('starter.controllers')

    .controller('courseDetailCommentCtrl', ['$scope','courseService','$state','$ionicSlideBoxDelegate',
        function($scope,courseService,$state,$ionicSlideBoxDelegate) {
            $scope.courseIntro=$scope.$parent.courseItem;
            $scope.commentList=[];
            var commentParams={
                courseId:$state.params.courseId,
                pageSize: 3
            }
            courseService.getCommentPromise(commentParams).success(function(result){
                $scope.commentList=result;
            });
        }])
