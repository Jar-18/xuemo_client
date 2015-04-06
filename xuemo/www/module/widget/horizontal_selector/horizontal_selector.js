angular.module("widget.horizontalSelector",[])
    .directive('horizontalSelector',[function(){
        return{
            restrict: 'E',
            templateUrl: './module/widget/horizontal_selector/horizontal_selector.html',
            replace:true,
            scope:{
                dicName:'@',
                selectorList:'=',
                selectedModel:'='
            },
            controller:['$scope',function($scope){

            }]
        }
    }]);
