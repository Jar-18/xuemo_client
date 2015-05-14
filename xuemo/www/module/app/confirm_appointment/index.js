angular.module('starter.controllers')

.controller('confirmAppointmentCtrl', ['$scope', 'courseService', '$state', 'tmpStorageService',
    function($scope, courseService, $state, tmpStorageService) {
        var courseKey = $state.params.courseKey;
        $scope.course = tmpStorageService.retriveObject(courseKey);

        $scope.userId = 2;

        $scope.createAppointment = function() {
        	var params = {};
        	params.courseId = $scope.course.id;
        	params.applicantId = $scope.userId;
        	courseService.getCreateAppointmentPromise(params)
        		.success(function(res) {
        			alert("预约成功");
        		})
        		.error(function(mes) {
        			alert(mes);
        		});
        }
    }
])