angular.module('starter.controllers')
    .controller('personalHomepageCtrl', ['$scope', 'URL_CONFIG', '$http', '$state', 'userService', '$stateParams', 'authService',
        function($scope, URL_CONFIG, $http, $state, userService, $stateParams, authService) {
            var urlStatus = URL_CONFIG.status;
            var normalHost = URL_CONFIG.host.normalHost;

            //TODO
            var userId = $stateParams.userId == null ? 1 : $stateParams.userId;
            $scope.mode = $stateParams.mode == null ? "visit" : $stateParams.mode;

            userService.getPersonalInfoPromise(userId, {
                selfId: authService.getUserId()
            }).success(function(data) {
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

            $scope.modifyFollow = function() {
                if (!$scope.userObj.isFollowed) {
                    userService.getCreateFollowerPromise({
                        followerId: authService.getUserId(),
                        attentionId: $scope.userObj.id
                    }).success(function(result) {
                        console.log('Add attention success');
                        $scope.userObj.isFollowed = true;
                    });
                } else {
                    userService.getRemoveFollowerPromise({
                        followerId: authService.getUserId(),
                        attentionId: $scope.userObj.id
                    }).success(function(result) {
                        console.log('Remove attention success');
                        $scope.userObj.isFollowed = false;
                    });
                }
            }

        }
    ])