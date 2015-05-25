angular.module('starter.controllers')

    .controller('createActivityCtrl', ['$scope','courseService','$state','$ionicSlideBoxDelegate','tmpStorageService','mapModalService','$filter',
        function($scope,courseService,$state,$ionicSlideBoxDelegate,tmpStorageService,mapModalService,$filter) {
            $scope.showMap=function(){
                mapModalService.showModal($scope);
            };
            $scope.location={
                name:''
            };
            $scope.activityForm={
                startDate:$filter('date')(new Date(),'yyyy-MM-dd'),
                endDate:$filter('date')(new Date(),'yyyy-MM-dd')
            };
            $scope.hideMapModal=function(){
                mapModalService.hideModal();
            };
            $scope.queryMap=function(){
                if($scope.map&&$scope.location.name){
                    var local = new BMap.LocalSearch($scope.map, {
                        renderOptions:{map: $scope.map}
                    });
                    local.search($scope.location.name);
                }
            }
            //刷新地图
            $scope.addMarker=function(map,point,labelText){
                var opts = {
                    position : point    // 指定文本标注所在的地理位置
                }
                var label = new BMap.Label(labelText, opts);  // 创建文本标注对象
                var marker = new BMap.Marker(point); // 创建点
                if(!$scope.activityMarker){
                    $scope.activityMarker=marker;
                    $scope.markerLabel=label;
                }else{
                    map.removeOverlay($scope.activityMarker);
                    map.removeOverlay($scope.markerLabel);
                    $scope.activityMarker=marker;
                    $scope.markerLabel=label;
                }

                label.setStyle({
                    color : "black",
                    fontSize : "12px",
                    height : "20px",
                    lineHeight : "20px",
                    fontFamily:"微软雅黑",
                    border:"none"
                });
                if(label){
                    map.addOverlay(label);
                }
                map.addOverlay(marker);


            };
            $scope.activityMarker=null;
            $scope.markerLabel=null;
            $scope.refreshMap=function(){
                var locationLatLng={
                    lat:39.921988,
                    lng:116.417854
                };
                var zoomLevel=17;
                var map = new BMap.Map("location-setting-map");
                map.addEventListener("click", function(e){
                    console.debug(e.point.lng);
                    $scope.addMarker(map,new BMap.Point(e.point.lng,e.point.lat),'活动地点')
                });
                $scope.map=map;
                var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
                map.addControl(top_left_navigation);
                map.centerAndZoom( new BMap.Point(locationLatLng.lng,locationLatLng.lat), zoomLevel);
                map.enableScrollWheelZoom(true);
                map.enableDragging();
                var currentLocPoint=new BMap.Point(locationLatLng.lng,locationLatLng.lat);
            };
        }])
