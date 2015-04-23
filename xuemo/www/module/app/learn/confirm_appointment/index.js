angular.module('starter.controllers')

.controller('confirmAppointmentCtrl', ['$scope', 'courseService', '$state', 'tmpStorageService',
    function($scope, courseService, $state, tmpStorageService) {
        var courseKey = $state.params.courseKey;
        $scope.course = tmpStorageService.retriveObject(courseKey);
    }
])