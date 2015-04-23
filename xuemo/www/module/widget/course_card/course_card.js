angular.module("widget.courseCard",[])
    .directive('courseCard',[function(){
        return{
            restrict: 'E',
            templateUrl: './module/widget/course_card/course_card.html',
            replace:true,
            scope:{
                course:'='
            },
            controller:['$scope',function($scope){

            }]
        }
    }]);
