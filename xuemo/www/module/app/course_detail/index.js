angular.module('starter.controllers')

    .controller('courseDetailCtrl', ['$scope','courseService','$state','$ionicSlideBoxDelegate','tmpStorageService',
        function($scope,courseService,$state,$ionicSlideBoxDelegate,tmpStorageService) {
            var courseId=$state.params.courseId;
            $scope.course={};
            courseService.getCoursePromise(courseId).success(function(result){
                $scope.course=result;
                $ionicSlideBoxDelegate.update();
            });
            $scope.tabStatusList=["courseIntro","comment","appointmentRecord"];
            $scope.currentTabStatus="courseIntro";
            $scope.toggleTab=function(status){
                $scope.currentTabStatus=status;
                var parentStatus="course_detail";
                $state.go(parentStatus+"."+status,$state.params);
            };

            $scope.relatedCourseList=[];
            courseService.getRelatedCoursePromise().success(function(result){
                $scope.relatedCourseList=result;
            });

            $scope.toAppointment = function() {
                console.log('ToAppointment');
                var passedCourse = {};
                passedCourse.id = $scope.course.id;
                passedCourse.title = $scope.course.title;
                passedCourse.category = $scope.course.category;
                passedCourse.teacher = {};
                passedCourse.teacher.id = $scope.course.teacher.id;
                passedCourse.teacher.nickname = $scope.course.teacher.nickname;
                passedCourse.districts = $scope.course.districts;
                passedCourse.sites = $scope.course.sites;
                passedCourse.types = $scope.course.types;
                passedCourse.price = $scope.course.price;
                console.log(passedCourse);
                var courseKey = 'FromCourseDetailPage';
                tmpStorageService.storeObject(courseKey, passedCourse);
                $state.go("confirm_appointment", {courseKey: courseKey});
            }
        }])
