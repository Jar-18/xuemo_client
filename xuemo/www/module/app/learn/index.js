angular.module('starter.controllers')

.controller('learnCtrl', ['$scope','courseService','$state','URL_CONFIG','$http','pagerService',
    function($scope,courseService,$state,URL_CONFIG,$http,pagerService) {
        var routerParams=$state.params;
        var urlStatus=URL_CONFIG.status;
        var normalHost=URL_CONFIG.host.normalHost;

        $http({
            method:'GET',
            url:URL_CONFIG.common.districts[urlStatus],
            params:{}
        }).success(function(data){
            $scope.districts=data;
            var categories=[
                {
                    "parentId":"1",
                    "id":"2",
                    "name":"语言"
                },
                {
                    "parentId":"1",
                    "id":"3",
                    "name":"运动"
                },
                {
                    "parentId":"3",
                    "id":"4",
                    "name":"游泳"
                },
                {
                    "parentId":"2",
                    "id":"5",
                    "name":"英语"
                },
                {
                    "parentId":"2",
                    "id":"6",
                    "name":"日语"
                },
                {
                    "parentId":"2",
                    "id":"7",
                    "name":"法语"
                },
                {
                    "parentId":"3",
                    "id":"8",
                    "name":"羽毛球"
                }
            ];
            var sortList=[
                {
                    "parentId":"1",
                    "id":"latest",
                    "name":"最新发布"
                },{
                    "parentId":"1",
                    "id":"rating",
                    "name":"评价最高"
                },{
                    "parentId":"1",
                    "id":"hotest",
                    "name":"人气最高"
                }
            ];
            $scope.filterData=[{
                name:"区域",
                key:"districts",
                category:"linkage",//联动
                data:$scope.districts
            },{
                name:"类别",
                key:"categories",
                category:"linkage",//一级
                data:categories
            },{
                name:"排序",
                key:"sort",
                category:"single",//一级
                data:sortList
            }
            ];
        });
        $scope.activeFilterList=[{
            level1:"",
            level2:routerParams.district
        },{
            level1:routerParams.category
        },{
            level1:routerParams.sort
        }];
        $scope.$watch("activeFilterList",function(newVal,oldVal){
            if(newVal && newVal[0].level1==oldVal[0].level1){
                $scope.refreshCourseList();
            }
        },true);
        $scope.courseList=[];
        $scope.whetherLoadMore = false;

        var listUrl=normalHost+URL_CONFIG.app.learn.courseList[urlStatus];
        var listParams={
            categoryId:$scope.activeFilterList[1].level1,
            districtId:$scope.activeFilterList[0].level2,
            orderBy:$scope.activeFilterList[2].level1
        };
        pagerService.init(listUrl,listParams);
        $scope.refreshCourseList=function(){
            pagerService.refresh($scope.courseList,function(whetherLoadMore){
                $scope.$broadcast('scroll.refreshComplete');
                console.debug(whetherLoadMore);
                $scope.whetherLoadMore = whetherLoadMore;
            })
        };
        $scope.showMoreCourses=function(){
            pagerService.nextPage($scope.courseList,function(whetherLoadMore){
                $scope.$broadcast('scroll.infiniteScrollComplete');
                console.debug(whetherLoadMore);
                $scope.whetherLoadMore = whetherLoadMore;
            })
        };
    }])
