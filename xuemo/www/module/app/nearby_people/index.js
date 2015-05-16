angular.module('starter.controllers')

.controller('nearbyPeopleCtrl', ['$scope', '$state', 'userService', 'locationService',
    function($scope, $state, userService, locationService) {
        var routerParams = $state.params;
        $scope.peopleList = [];
        $scope.noMoreItemsAvailable = false;
        $scope.pageNumber = 1;
        $scope.pageSize = 10;

        $scope.located = false;

        $scope.userId = 1;

        $scope.refresh = function() {
            console.log("refresh");
            locationService.getCurrentLocation()
                .then(function(position) {
                    console.log("postion" + position.lat + " " + position.lng);
                    $scope.pageNumber = 1;
                    $scope.located = true;
                    $scope.lat = position.lat;
                    $scope.lng = position.lng;
                    var peopleListPromise = userService.getNearbyPeoplePromise({
                        pageNumber: $scope.pageNumber,
                        pageSize: $scope.pageSize,
                        lat: position.lat,
                        lng: position.lng,
                        userId: $scope.userId,
                        orderBy: "distance"
                    });
                    peopleListPromise.success(function(data, status, headers) {
                        var peopleList = data;
                        console.debug(data);
                        if (peopleList.length == 0) {
                            $scope.noMoreItemsAvailable = true;
                        }
                        $scope.peopleList = peopleList;
                        $scope.pageNumber++;
                    }).finally(function() {
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    })
                })
                .catch(function(error) {
                    alert('code: ' + error.code + '\n' +
                        'message: ' + error.message + '\n');
                });
        };
        $scope.showMore = function() {
            console.log("showMore");
            if (!$scope.located) {
                locationService.getCurrentLocation()
                    .then(function(position) {
                        console.log("postion" + position.lat + " " + position.lng);
                        $scope.located = true;
                        $scope.lat = position.lat;
                        $scope.lng = position.lng;
                        $scope.showMore();
                    });
            } else {
                var peopleListPromise = userService.getNearbyPeoplePromise({
                    pageNumber: $scope.pageNumber,
                    pageSize: $scope.pageSize,
                    lat: $scope.lat,
                    lng: $scope.lng,
                    userId: $scope.userId,
                    orderBy: "distance"
                });
                peopleListPromise.success(function(data, status, headers) {
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
                })
            }



        };

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