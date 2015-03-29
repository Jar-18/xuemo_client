angular.module('starter.controllers')

    .controller('courseDetailAppointmentRecordCtrl', ['$scope','courseService','$state','$ionicSlideBoxDelegate',
        function($scope,courseService,$state,$ionicSlideBoxDelegate) {
            $scope.appointmentList=[];
            var appointmentParams={
                courseId:$state.params.courseId,
                pageSize: 5
            }
            courseService.getAppointmentPromise(appointmentParams).success(function(result){
                $scope.appointmentList=result;
            });
        }])
