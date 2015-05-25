angular.module('starter.controllers')

    .controller('activityDetailParticipatorCtrl', ['$scope','userService','$state','$ionicSlideBoxDelegate',
        function($scope,userService,$state,$ionicSlideBoxDelegate) {
            $scope.courseIntro=$scope.$parent.courseItem;
            $scope.commentList=[];
            $scope.loaded=false;
            $scope.loadingHintText="加载中...";
            var participatorParams={
                courseId:$state.params.courseId,
                pageSize: 3
            };
            userService.getNearbyPeoplePromise(participatorParams).success(function(result, status, headers) {
                if(result.length==0){
                    $scope.loadingHintText="暂时没有数据";
                }else{
                    $scope.loaded=true;
                }
                $scope.peopleList=result;

            })
        }])
