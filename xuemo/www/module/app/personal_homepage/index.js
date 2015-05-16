angular.module('starter.controllers')
    .controller('personalHomepageCtrl', ['$scope', 'URL_CONFIG', '$http', '$state', 'userService', '$stateParams',
        function($scope, URL_CONFIG, $http, $state, userService, $stateParams) {
            var urlStatus = URL_CONFIG.status;
            var normalHost = URL_CONFIG.host.normalHost;

            //TODO
            var userId = $stateParams.userId == null ? 1 : $stateParams.userId;
            $scope.mode = $stateParams.mode == null ? "visit" : $stateParams.mode;

            userService.getPersonalInfoPromise(userId).success(function(data) {
                console.debug(data);
                $scope.userObj = data;
            });
            $scope.coursesList = [];
            userService.getTeachingCoursesPromise().success(function(data) {
                $scope.coursesList = data;
            });

            $scope.toModifyPage = function() {
                $state.go("modify_personal_info", {});
            }
        }
    ])