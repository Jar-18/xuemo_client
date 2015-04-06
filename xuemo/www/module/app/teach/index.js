angular.module('starter.controllers')

    .controller('teachCtrl', ['$scope','URL_CONFIG','$http',function($scope,URL_CONFIG,$http) {
        var urlStatus=URL_CONFIG.status;
        $http({
            method:'GET',
            url:URL_CONFIG.common.districts[urlStatus],
            params:{}
        }).success(function(data){
            $scope.districtsList=data;
        });
        $http({
            method:'GET',
            url:URL_CONFIG.common.courseCategories[urlStatus],
            params:{}
        }).success(function(data){
            $scope.courseCategoriesList=data;
        });
        $scope.courseForm={
            options:{
                courseSite:{
                    dicName:"courseSite",
                    selectorList:["1","2","3"]
                },
                courseType:{
                    dicName:"courseType",
                    selectorList:["1","2","3"]
                },
                courseCategories:{
                    "multiple":false,
                    "addSelectAllBtn":false
                }
            },
            dataModel:{
                sites:"1",
                types:"1",
                districts:[{"id":100103},{"id":100104}] ,
                courseCategories:[{"id":100201}]

            }
        }
    }])
