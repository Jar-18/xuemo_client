angular.module('starter.controllers')

    .controller('mainTabsCtrl', ['$scope','$ionicHistory','$state','userService',function($scope,$ionicHistory,$state,userService) {
        $scope.showTabs=true;
        $scope.$root.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams){
                var currentState= toState.name;
                var showTabs=false;
                var level1TabList=['app.learn','app.teach','app.find','app.news','app.me'];
                for(var index=0;index<level1TabList.length;index++){
                    if(currentState==level1TabList[index]){
                        showTabs=true;
                        break;
                    }
                }
                $scope.showTabs=showTabs;
            });
        $scope.navTo=function(state){
            $scope.currentStatus=state;
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go(state,{});
        }
        $scope.currentStatus=$state.current.name;
    }])
