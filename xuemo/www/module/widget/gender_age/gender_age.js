angular.module("widget.genderAge",[])
    .directive('genderAge',[function(){
        return{
            restrict: 'E',
            templateUrl: './module/widget/gender_age/gender_age.html',
            replace:true,
            scope:{
                gender:'@',
                age:'@'
            },
            controller:['$scope',function($scope){

            }]
        }
    }]);
