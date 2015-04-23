angular.module('starter.controllers')

    .controller('learnCtrl', ['$scope','courseService',function($scope,courseService) {
        $scope.courseList=[];
        $scope.noMoreItemsAvailable = false;
        $scope.pageNumber=1;
        $scope.pageSize=10;
        $scope.refreshCourseList=function(){
            var goodsListPromise=courseService.getCoursePromise(undefined,{
                pageNumber:$scope.pageNumber,
                pageSize:$scope.pageSize
            });
            goodsListPromise.success(function(data,status,headers){
                var courseList=data;
                if(courseList.length==0){
                    $scope.noMoreItemsAvailable = true;
                }
                for(var goodsIndex= 0;goodsIndex<courseList.length;goodsIndex++){
                    $scope.courseList.push(courseList[goodsIndex]);
                };
                $scope.pageNumber++;
            }).finally(function(){
                $scope.$broadcast('scroll.infiniteScrollComplete');
            })
        };
        $scope.showMoreCourses=function(){
            var goodsListPromise=courseService.getCoursePromise(undefined,{
                pageNumber:$scope.pageNumber,
                pageSize:$scope.pageSize
            });
            goodsListPromise.success(function(data,status,headers){
                var courseList=data;
                if(courseList.length==0){
                    $scope.noMoreItemsAvailable = true;
                }
                for(var goodsIndex= 0;goodsIndex<courseList.length;goodsIndex++){
                    $scope.courseList.push(courseList[goodsIndex]);
                };
                $scope.pageNumber++;
            }).finally(function(){
                $scope.$broadcast('scroll.infiniteScrollComplete');
            })
        };
    }])
