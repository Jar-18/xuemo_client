angular.module('starter.controllers')

.controller('myAppointmentCtrl', ['$scope','courseService','$state','URL_CONFIG','$http','pagerService',
    function($scope,courseService,$state,URL_CONFIG,$http,pagerService) {
        var routerParams=$state.params;
        var urlStatus=URL_CONFIG.status;
        var normalHost=URL_CONFIG.host.normalHost;

        $http({
            method:'GET',
            url:"http://120.26.47.14:3000/appointments?userId=2",
            params:{}
        }).success(function(data){
            $scope.myAppointmentList=data;
        });
    }])
