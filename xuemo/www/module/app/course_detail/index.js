angular.module('starter.controllers')

.controller('courseDetailCtrl', ['$scope', 'courseService', '$state', '$ionicSlideBoxDelegate', 'tmpStorageService', 'authService',
    function($scope, courseService, $state, $ionicSlideBoxDelegate, tmpStorageService, authService) {
        var courseId = $state.params.courseId;
        $scope.course = {};
        courseService.getCoursePromise(courseId, {
            userId: authService.getUserId()
        }).success(function(result) {
            $scope.course = result;
            $ionicSlideBoxDelegate.update();
        });
        $scope.tabStatusList = ["courseIntro", "comment", "appointmentRecord"];
        $scope.currentTabStatus = "courseIntro";
        $scope.toggleTab = function(status) {
            $scope.currentTabStatus = status;
            var parentStatus = "course_detail";
            $state.go(parentStatus + "." + status, $state.params);
        };

        $scope.relatedCourseList = [];
        courseService.getRelatedCoursePromise().success(function(result) {
            $scope.relatedCourseList = result;
        });

        $scope.modifyFavourite = function() {
            if (!$scope.course.isFavourite) {
                courseService.getAddFavouritePromise({
                        userId: authService.getUserId(),
                        courseId: $scope.course.id
                    })
                    .success(function(result) {
                        console.log('add favourite successed');
                        $scope.course.isFavourite = true;
                    })
                    .error(function(mes) {
                        alert(mes);
                    });
            } else {
                courseService.getRemoveFavouritePromise({
                        userId: authService.getUserId(),
                        courseId: $scope.course.id
                    })
                    .success(function(result) {
                        console.log('remove favourite successed');
                        $scope.course.isFavourite = false;
                    })
                    .error(function(mes) {
                        alert(mes);
                    });
            }

        }

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
            $state.go("confirm_appointment", {
                courseKey: courseKey
            });
        }

        $scope.toPersonalHomepage = function() {
            console.log("ToPersonalHomepage");
            $state.go("personal_homepage", {
                userId: $scope.course.teacher.id,
                mode: "visit"
            });
        }
    }
])