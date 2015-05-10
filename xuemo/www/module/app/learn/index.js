angular.module('starter.controllers')

.controller('learnCtrl', ['$scope','courseService','$state','URL_CONFIG','$http',
    function($scope,courseService,$state,URL_CONFIG,$http) {
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
                category:"single",//一级
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
                console.debug($scope.activeFilterList);
                $scope.refreshCourseList();
            }
        },true);
        $scope.courseList=[];
        $scope.noMoreItemsAvailable = false;
        $scope.pageNumber=1;
        $scope.pageSize=10;
        $scope.refreshCourseList=function(){
            $scope.pageNumber=1;
            var goodsListPromise=courseService.getCoursePromise(undefined,{
                pageNumber:$scope.pageNumber,
                pageSize:$scope.pageSize,
                categoryId:$scope.activeFilterList[1].level1,
                districtId:$scope.activeFilterList[0].level2,
                orderBy:$scope.activeFilterList[2].level1
            });
            goodsListPromise.success(function(data,status,headers){
                var courseList=data;
                if(courseList.length==0){
                    $scope.noMoreItemsAvailable = true;
                }
                $scope.courseList=courseList;
                $scope.pageNumber++;
            }).finally(function(){
                $scope.$broadcast('scroll.infiniteScrollComplete');
            })
        };
        $scope.showMoreCourses=function(){
            var goodsListPromise=courseService.getCoursePromise(undefined,{
                pageNumber:$scope.pageNumber,
                pageSize:$scope.pageSize,
                categoryId:$scope.activeFilterList[1].level1,
                districtId:$scope.activeFilterList[0].level2,
                orderBy:$scope.activeFilterList[2].level1
            });
            goodsListPromise.success(function(data,status,headers){
                var courseList=data;
                if(courseList.length==0){
                    $scope.noMoreItemsAvailable = true;
                }
                for(var goodsIndex= 0;goodsIndex<courseList.length;goodsIndex++){
                    $scope.courseList.push(courseList[goodsIndex]);
                };
                $scope.pageNumber++;
            }).finally(function(){
                $scope.$broadcast('scroll.infiniteScrollComplete');
            })
        };
    }])
