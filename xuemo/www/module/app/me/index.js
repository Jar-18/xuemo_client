angular.module('starter.controllers')

.controller('meCtrl', ['$scope', function($scope) {
	$scope.teacher = {
		portrait: "jar.jpg",
		nickname: "Jar",
		age: 18,
		gender: 1,
		motto: "无忧无虑的程序猿"
	};
}])