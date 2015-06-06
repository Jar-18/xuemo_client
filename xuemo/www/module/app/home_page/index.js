angular.module('starter.controllers')

.controller('homePageCtrl', ['$scope','courseService','$state','URL_CONFIG','$http', 'authService',
    function($scope,courseService,$state,URL_CONFIG,$http,authService) {

        //Update user profile when open app every time
        authService.updateProfile();

        function groupCategoriesList(categoriesList,groupedNum){
            var result=[];
            var loopNum=Math.floor(categoriesList.length/groupedNum);
            for(var loopIndex=0;loopIndex<=loopNum;loopIndex++){
                var groupedList=[];
                for(var index=0;index<groupedNum;index++){
                    if(loopIndex*groupedNum+index==categoriesList.length){
                        break;
                    }
                    groupedList.push(categoriesList[loopIndex*groupedNum+index]);
                }
                result.push(groupedList)
            }
            return result;
        }
        $scope.categoriesList=[    {
            "parentId":"1",
            "id":"1",
            "name":"运动",
            "key":"cake"
        },{
            "parentId":"1",
            "id":"2",
            "name":"语言",
            "key":"food"
        },{
            "parentId":"1",
            "id":"3",
            "name":"厨艺",
            "key":"ktv"
        },{
            "parentId":"1",
            "id":"3",
            "name":"运动",
            "key":"cake"
        },{
            "parentId":"1",
            "id":"3",
            "name":"运动",
            "key":"cake"
        },{
            "parentId":"1",
            "id":"3",
            "name":"运动",
            "key":"cake"
        },{
            "parentId":"1",
            "id":"3",
            "name":"运动",
            "key":"cake"
        },{
            "parentId":"1",
            "id":"3",
            "name":"运动",
            "key":"cake"
        },{
            "parentId":"1",
            "id":"3",
            "name":"运动",
            "key":"cake"
        },{
            "parentId":"1",
            "id":"3",
            "name":"运动",
            "key":"cake"
        },{
            "parentId":"1",
            "id":"3",
            "name":"运动",
            "key":"cake"
        },{
            "parentId":"1",
            "id":"3",
            "name":"运动",
            "key":"cake"
        }];
        $scope.groupedCategoriesList=groupCategoriesList($scope.categoriesList,8);
        $scope.navToCertainCategory=function(item){
            $state.go('learn',{
                district:1,
                category:item.id
            });
        };
        $scope.courseList=[];
        courseService.getRelatedCoursePromise().success(function(result){
            $scope.courseList=result;
        });


    }])
