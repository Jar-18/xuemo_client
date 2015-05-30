angular.module('starter.controllers')

.controller('myAttentionListCtrl', ['$scope', '$state', 'userService', 'locationService', 'authService',
    function($scope, $state, userService, locationService, authService) {
        $scope.peopleList = [];
        $scope.noMoreItemsAvailable = false;
        $scope.pageNumber = 1;
        $scope.pageSize = 10;

        $scope.refresh = function() {
            console.log("refresh");
            $scope.pageNumber = 1;
            userService.getAttentionListPromise({
                followerId: authService.getUserId(),
                pageNumber: $scope.pageNumber,
                pageSize: $scope.pageSize
            }).success(function(data, status, headers) {
                var peopleList = data;
                console.debug(data);
                if (peopleList.length == 0) {
                    $scope.noMoreItemsAvailable = true;
                }
                $scope.peopleList = peopleList;
                $scope.pageNumber++;
                console.log($scope.peopleList);
            }).finally(function() {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };

        $scope.showMore = function() {
            console.log("showMore");
            userService.getAttentionListPromise({
                pageNumber: $scope.pageNumber,
                pageSize: $scope.pageSize,
                followerId: authService.getUserId()
            }).success(function(data, status, headers) {
                var peopleList = data;
                console.debug(data);
                if (peopleList.length == 0) {
                    $scope.noMoreItemsAvailable = true;
                }
                for (var peopleIndex = 0; peopleIndex < peopleList.length; peopleIndex++) {
                    console.log('没进来？');
                    $scope.peopleList.push(peopleList[peopleIndex]);
                };
                $scope.pageNumber++;
                console.log($scope.peopleList);
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

        // var onSuccess = function(position) {
        //     alert('Latitude: ' + position.coords.latitude + '\n' +
        //         'Longitude: ' + position.coords.longitude + '\n' +
        //         'Altitude: ' + position.coords.altitude + '\n' +
        //         'Accuracy: ' + position.coords.accuracy + '\n' +
        //         'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
        //         'Heading: ' + position.coords.heading + '\n' +
        //         'Speed: ' + position.coords.speed + '\n' +
        //         'Timestamp: ' + position.timestamp + '\n');
        // };

        // onError Callback receives a PositionError object
        //
    }
])