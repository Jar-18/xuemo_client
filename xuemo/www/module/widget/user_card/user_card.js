angular.module("widget.userCard",[])
    .directive('userCard',[function(){
        return{
            restrict: 'E',
            templateUrl: './module/widget/user_card/user_card.html',
            replace:true,
            scope:{
                user:'='
            },
            controller:['$scope',function($scope){

            }]
        }
    }]);
