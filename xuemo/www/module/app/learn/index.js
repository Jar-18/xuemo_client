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
            $http({
                method:'GET',
                url:URL_CONFIG.common.courseCategories[urlStatus],
                params:{}
            }).success(function(data){
                var categories=data;
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
        });
        $scope.activeFilterList=[{
            level1:"",
            level2:routerParams.district
        },{
            level1:"",
            level2:routerParams.category
        },{
            level1:routerParams.sort
        }];
        $scope.$watch("activeFilterList",function(newVal,oldVal){
            if(newVal && newVal[0].level1==oldVal[0].level1){
                var listParams={
                    categoryId:$scope.activeFilterList[1].level2,
                    districtId:$scope.activeFilterList[0].level2,
                    orderBy:$scope.activeFilterList[2].level1
                };
                pagerService.init(listUrl,listParams);
                $scope.refresh();
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
        $scope.refresh=function(){
            pagerService.refresh($scope.courseList,function(whetherLoadMore){
                $scope.$broadcast('scroll.refreshComplete');
                console.debug(whetherLoadMore);
                $scope.whetherLoadMore = whetherLoadMore;
            })
        };
        $scope.showMore=function(){
            pagerService.nextPage($scope.courseList,function(whetherLoadMore){
                $scope.$broadcast('scroll.infiniteScrollComplete');
                console.debug(whetherLoadMore);
                $scope.whetherLoadMore = whetherLoadMore;
            })
        };
    }])
