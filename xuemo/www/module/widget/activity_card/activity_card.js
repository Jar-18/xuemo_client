angular.module("widget.activityCard",[])
    .directive('activityCard',[function(){
        return{
            restrict: 'E',
            templateUrl: './module/widget/activity_card/activity_card.html',
            replace:true,
            scope:{
                activity:'='
            },
            controller:['$scope',function($scope){

            }]
        }
    }]);
