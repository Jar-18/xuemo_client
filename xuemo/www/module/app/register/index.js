angular.module('starter.controllers')

.controller('registerCtrl', ['$scope', 'courseService', '$state', 'URL_CONFIG', '$http', 'userService', 'authService','$ionicHistory',
    function($scope, courseService, $state, URL_CONFIG, $http, userService, authService,$ionicHistory) {
        var routerParams = $state.params;
        var urlStatus = URL_CONFIG.status;
        var normalHost = URL_CONFIG.host.normalHost;
        $scope.passwordInputType = 'password';
        $scope.togglePasswordInputType = function() {
            if ($scope.passwordInputType === 'password') {
                $scope.passwordInputType = 'text';
            } else {
                $scope.passwordInputType = 'password';
            };
        }

        $scope.registerData = {
            phone: '12345678900',
            verifyCode: '123456',
            pwd: '123456'
        };

        $scope.doRegister = function() {
            var params = {};
            params.account = $scope.registerData.phone;
            params.password = $scope.registerData.pwd;
            userService.getRegisterPromise(params)
                .success(function(resulst) {
                    console.log("注册成功");
                    authService.login($scope.registerData.phone, $scope.registerData.pwd)
                        .then(function() {
                            $ionicHistory.nextViewOptions({
                                disableBack: true,
                            });
                            $state.go('register_step_2');
                        });
                })
                .error(function(err) {
                    alert(err);
                });
        }
    }
])