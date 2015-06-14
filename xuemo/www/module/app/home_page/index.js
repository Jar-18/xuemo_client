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
        $scope.categoriesList=[   {
            "id": 2,
            "name": "语言",
            "parentId": 1,
            "key":"cake"
        },{
            "id": 13,
            "name": "体育",
            "parentId": 1,
            "key":"cake"
        }, {
            "id": 24,
            "name": "小学辅导",
            "parentId": 1,
            "key":"cake"
        }, {
            "id": 29,
            "name": "初中辅导",
            "parentId": 1,
            "key":"cake"
        },{
            "id": 38,
            "name": "高中辅导",
            "parentId": 1,
            "key":"cake"
        }, {
            "id": 51,
            "name": "资格认证",
            "parentId": 1,
            "key":"cake"
        }, {
            "id": 46,
            "name": "考研辅导",
            "parentId": 1,
            "key":"cake"
        },{
            "id": 56,
            "name": "IT技能",
            "parentId": 1,
            "key":"cake"

        },{
            "id": 66,
            "name": "艺术",
            "parentId": 1,
            "key":"cake"

        },{
            "id": 77,
            "name": "休闲娱乐",
            "parentId": 1,
            "key":"cake"

        },{
            "id": 83,
            "name": "兴趣技能",
            "parentId": 1,
            "key":"cake"
        }, {
            "id": 92,
            "name": "其他",
            "parentId": 1,
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
