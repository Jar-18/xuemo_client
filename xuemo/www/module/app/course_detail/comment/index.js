angular.module('starter.controllers')

    .controller('courseDetailCommentCtrl', ['$scope','courseService','$state','$ionicSlideBoxDelegate',
        function($scope,courseService,$state,$ionicSlideBoxDelegate) {
            $scope.courseIntro=$scope.$parent.courseItem;
            $scope.commentList=[];
            $scope.loaded=false;
            $scope.loadingHintText="加载中...";
            var commentParams={
                courseId:$state.params.courseId,
                pageSize: 3
            }
            courseService.getCommentPromise(commentParams).success(function(result){
                if(result.length==0){
                    $scope.loadingHintText="暂时没有数据";
                }else{
                    $scope.loaded=true;
                }
                $scope.commentList=result;
            });
        }])
