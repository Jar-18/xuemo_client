angular.module('starter.controllers')

.controller('myFavouriteCoursesCtrl', ['$scope', 'URL_CONFIG', '$http', '$state', 'userService', 'authService', 'courseService', 
    function($scope, URL_CONFIG, $http, $state, userService, authService, courseService) {
    $scope.courseList = [];
    $scope.noMoreItemsAvailable = false;
    $scope.pageNumber = 1;
    $scope.pageSize = 10;

    $scope.userId = authService.getUserId();

    $scope.refreshCourseList = function() {
        $scope.pageNumber = 1;
        var goodsListPromise = courseService.getFavouriteCourseListPromise({
            pageNumber: $scope.pageNumber,
            pageSize: $scope.pageSize,
            userId: $scope.userId,
            orderBy: "latest"
        });
        goodsListPromise.success(function(data, status, headers) {
            var courseList = data;
            if (courseList.length == 0) {
                $scope.noMoreItemsAvailable = true;
            }
            $scope.courseList = courseList;
            $scope.pageNumber++;
        }).finally(function() {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        })
    };
    $scope.showMoreCourses = function() {
        var goodsListPromise = courseService.getFavouriteCourseListPromise({
            pageNumber: $scope.pageNumber,
            pageSize: $scope.pageSize,
            userId: $scope.userId,
            orderBy: "latest"
        });
        goodsListPromise.success(function(data, status, headers) {
            var courseList = data;
            if (courseList.length == 0) {
                $scope.noMoreItemsAvailable = true;
            }
            for (var goodsIndex = 0; goodsIndex < courseList.length; goodsIndex++) {
                $scope.courseList.push(courseList[goodsIndex]);
            };
            $scope.pageNumber++;
        }).finally(function() {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        })
    };
}])