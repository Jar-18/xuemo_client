angular.module("widget.ratingStar",[])
    .directive('ratingStar',[function(){
        return{
            restrict: 'E',
            templateUrl: './module/widget/rating_star/rating_star.html',
            replace:true,
            scope:{
                mark:'@'
            },
            controller:['$scope',function($scope){
                var totalMark=5;
                var width=Math.floor($scope.mark/totalMark*100);
                $scope.ratingStarsStyle="width:"+width+"%;"
            }]
        }
    }]);
