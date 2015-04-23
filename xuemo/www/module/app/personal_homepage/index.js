angular.module('starter.controllers')

    .controller('personalHomepageCtrl', ['$scope','URL_CONFIG','$http','$state',function($scope,URL_CONFIG,$http,$state) {
        var urlStatus=URL_CONFIG.status;
        var normalHost=URL_CONFIG.host.normalHost;

    }])
