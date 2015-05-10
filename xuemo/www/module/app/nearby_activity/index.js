angular.module('starter.controllers')

    .controller('nearbyActivityCtrl', ['$scope','$state','activityService',function($scope,$state,activityService) {
        var routerParams=$state.params;
        $scope.activityList=[];
        $scope.noMoreItemsAvailable = false;
        $scope.pageNumber=1;
        $scope.pageSize=10;
        $scope.refresh=function(){
            $scope.pageNumber=1;
            var activityListPromise=activityService.getActivityPromise(undefined,{
                pageNumber:$scope.pageNumber,
                pageSize:$scope.pageSize
            });
            activityListPromise.success(function(data,status,headers){
                var activityList=data;
                console.debug(data);
                if(activityList.length==0){
                    $scope.noMoreItemsAvailable = true;
                }
                $scope.activityList=activityList;
                $scope.pageNumber++;
            }).finally(function(){
                $scope.$broadcast('scroll.infiniteScrollComplete');
            })
        };
        $scope.showMore=function(){
            var activityListPromise=activityService.getActivityPromise(undefined,{
                pageNumber:$scope.pageNumber,
                pageSize:$scope.pageSize
            });
            activityListPromise.success(function(data,status,headers){
                var activityList=data;
                console.debug(data);
                if(activityList.length==0){
                    $scope.noMoreItemsAvailable = true;
                }
                for(var activityIndex= 0;activityIndex<activityList.length;activityIndex++){
                    $scope.activityList.push(activityList[activityIndex]);
                };
                $scope.pageNumber++;
            }).finally(function(){
                $scope.$broadcast('scroll.infiniteScrollComplete');
            })


        };
    }])
