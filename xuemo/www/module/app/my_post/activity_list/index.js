angular.module('starter.controllers')

.controller('myPostActivitiesCtrl', ['$scope', 'URL_CONFIG', '$http', '$state', 'userService', 'authService', 'activityService', 
    function($scope, URL_CONFIG, $http, $state, userService, authService, activityService) {
    $scope.activityList = [];
    $scope.noMoreItemsAvailable = false;
    $scope.pageNumber = 1;
    $scope.pageSize = 10;

    $scope.userId = authService.getUserId();

    $scope.refreshActivityList = function() {
        $scope.pageNumber = 1;
        var goodsListPromise = activityService.getActivityPromise(undefined, {
            pageNumber: $scope.pageNumber,
            pageSize: $scope.pageSize,
            hostId: $scope.userId,
            orderBy: "latest"
        });
        goodsListPromise.success(function(data, status, headers) {
            var activityList = data;
            if (activityList.length == 0) {
                $scope.noMoreItemsAvailable = true;
            }
            $scope.activityList = activityList;
            $scope.pageNumber++;
        }).finally(function() {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        })
    };
    $scope.showMoreActivities = function() {
        var goodsListPromise = activityService.getActivityPromise(undefined, {
            pageNumber: $scope.pageNumber,
            pageSize: $scope.pageSize,
            hostId: $scope.userId,
            orderBy: "latest"
        });
        goodsListPromise.success(function(data, status, headers) {
            var activityList = data;
            if (activityList.length == 0) {
                $scope.noMoreItemsAvailable = true;
            }
            for (var goodsIndex = 0; goodsIndex < activityList.length; goodsIndex++) {
                $scope.activityList.push(activityList[goodsIndex]);
            };
            $scope.pageNumber++;
        }).finally(function() {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        })
    };
}])