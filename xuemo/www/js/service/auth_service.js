angular.module("service.auth", ['service.config'])
    .factory('authService', ['$http', 'URL_CONFIG', function($http, URL_CONFIG) {
        var urlStatus = URL_CONFIG.status;
        var normalHost = URL_CONFIG.host.normalHost;
        return {
            login: function(account, password) {
                var url = normalHost + URL_CONFIG.app.auth.login[urlStatus];
                console.log(account + ' ' + password);
                return $http({
                    method: 'POST',
                    url: url,
                    data: {
                        account: account,
                        password: password
                    }
                }).success(function(result) {
                    console.log(result);
                    if ('Success' == result.status) {
                        localStorage.token = result.token;
                        localStorage.userId = result.user.id;
                        localStorage.user = JSON.stringify(result.user);
                    } else {
                        alert(result.message);
                    }
                }).error(function(err) {
                    alert(err);
                });
            },
            logout: function() {
                delete localStorage.token;
                delete localStorage.userId;
                delete localStorage.user;
            },
            isAuthed: function() {
                return localStorage.token != null;
            },
            getUserId: function() {
                return localStorage.userId;
            },
            getProfile: function() {
                if(localStorage.user == null) {
                    return null
                }
                return JSON.parse(localStorage.user);
            },
            updateProfile: function() {
                var userId = localStorage.userId;
                if (userId != null) {
                    var url = normalHost + URL_CONFIG.app.auth.updateProfile[urlStatus] + '/' + userId;
                    return $http({
                        method: 'GET',
                        url: url,
                    }).success(function(result) {
                        localStorage.user = JSON.stringify(result);
                    }).error(function(err) {
                        alert(err);
                    });
                }
            }
        }
    }])