angular.module('starter.controllers')

    .controller('learnCtrl', ['$scope','courseService','$state',function($scope,courseService,$state) {
        var routerParams=$state.params;
        $scope.activeFilterList=[{
            level1:"",
            level2:routerParams.district
        },{
            level1:routerParams.category
        },{
            level1:routerParams.sort
        }];
        $scope.$watch("activeFilterList",function(newVal,oldVal){
            if(newVal && newVal[0].level1==oldVal[0].level1){
                $scope.refreshCourseList();
            }
        },true);
        $scope.courseList=[];
        $scope.noMoreItemsAvailable = false;
        $scope.pageNumber=1;
        $scope.pageSize=10;
        $scope.refreshCourseList=function(){
            $scope.pageNumber=1;
            var goodsListPromise=courseService.getCoursePromise(undefined,{
                pageNumber:$scope.pageNumber,
                pageSize:$scope.pageSize,
                categoryId:$scope.activeFilterList[1].level1,
                districtId:$scope.activeFilterList[1].level2
            });
            goodsListPromise.success(function(data,status,headers){
                var courseList=data;
                if(courseList.length==0){
                    $scope.noMoreItemsAvailable = true;
                }
                $scope.courseList=courseList;
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
