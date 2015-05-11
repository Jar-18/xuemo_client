angular.module('starter.controllers')

.controller('modifyPersonalInfoCtrl', ['$scope', 'URL_CONFIG', '$http', '$state', 'userService', function($scope, URL_CONFIG, $http, $state, userService) {
    $scope.user = {
        id: 1,
        portrait: "jar.jpg",
        nickname: "Jar",
        age: 18,
        gender: 1,
        birthday: "1992-10-30",
        motto: "无忧无虑的程序猿",
        district: "上海，浦东新区"
    };
}])