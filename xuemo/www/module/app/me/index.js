angular.module('starter.controllers')

.controller('meCtrl', ['$scope','$state', function($scope,$state) {
	$scope.teacher = {
        id:1,
		portrait: "jar.jpg",
		nickname: "Jar",
		age: 18,
		gender: 1,
		motto: "无忧无虑的程序猿"
	};
    $scope.toPersonalHomepage=function(){
        $state.go("app.personal_homepage", {});
    }
}])