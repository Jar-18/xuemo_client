angular.module('starter.controllers')

.controller('modifyPersonalInfoCtrl', ['$scope', 'URL_CONFIG', '$http', '$state', 'userService','authService', 
    function($scope, URL_CONFIG, $http, $state, userService, authService) {
    $scope.user = authService.getProfile();
}])