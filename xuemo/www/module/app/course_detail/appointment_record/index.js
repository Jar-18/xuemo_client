angular.module('starter.controllers')

    .controller('courseDetailAppointmentRecordCtrl', ['$scope','courseService','$state','$ionicSlideBoxDelegate',
        function($scope,courseService,$state,$ionicSlideBoxDelegate) {
            $scope.appointmentList=[];
            $scope.loaded=false;
            $scope.loadingHintText="加载中...";
            var appointmentParams={
                courseId:$state.params.courseId,
                pageSize: 5
            }
            courseService.getAppointmentPromise(appointmentParams).success(function(result){
                if(result.length==0){
                    $scope.loadingHintText="暂时没有数据";
                }else{
                    $scope.loaded=true;
                }
                $scope.appointmentList=result;
            });
        }])
