angular.module('starter.controllers')

.controller('myFollowerListCtrl', ['$scope', '$state', 'userService', 'locationService', 'authService',
    function($scope, $state, userService, locationService, authService) {
        $scope.peopleList = [];
        $scope.noMoreItemsAvailable = false;
        $scope.pageNumber = 1;
        $scope.pageSize = 10;

        $scope.located = false;

        $scope.refresh = function() {
            console.log("refresh");
            $scope.pageNumber = 1;
            userService.getFollowerListPromise({
                pageNumber: $scope.pageNumber,
                pageSize: $scope.pageSize,
                attentionId: authService.getUserId()
            }).success(function(data, status, headers) {
                var peopleList = data;
                console.debug(data);
                if (peopleList.length == 0) {
                    $scope.noMoreItemsAvailable = true;
                }
                $scope.peopleList = peopleList;
                $scope.pageNumber++;
            }).finally(function() {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };

        $scope.showMore = function() {
            console.log("showMore");
            userService.getFollowerListPromise({
                pageNumber: $scope.pageNumber,
                pageSize: $scope.pageSize,
                attentionId: authService.getUserId()
            }).success(function(data, status, headers) {
                var peopleList = data;
                console.debug(data);
                if (peopleList.length == 0) {
                    $scope.noMoreItemsAvailable = true;
                }
                for (var peopleIndex = 0; peopleIndex < peopleList.length; peopleIndex++) {
                    $scope.peopleList.push(peopleList[peopleIndex]);
                };
                $scope.pageNumber++;
            }).finally(function() {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };

        $scope.toPersonalHomepage = function(userId) {
            $state.go("personal_homepage", {
                userId: userId,
                mode: "visit"
            });
        }
    }
])