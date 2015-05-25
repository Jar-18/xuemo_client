angular.module('starter.controllers')

    .controller('locationInfoCtrl', ['$scope','courseService','$state','$ionicSlideBoxDelegate','tmpStorageService','$stateParams',
        function($scope,courseService,$state,$ionicSlideBoxDelegate,tmpStorageService,$stateParams) {
        // 百度地图的基础配置
            console.debug($stateParams);
            var locationLatLng={
                lat:$stateParams.lat,
                lng:$stateParams.lng
            };
            $scope.locationName=$stateParams.locationName;
            $scope.locationDesc=$stateParams.locationDesc;
            var zoomLevel=17;
            var map = new BMap.Map("location-info-map");
            var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
            map.addControl(top_left_navigation);
            map.centerAndZoom( new BMap.Point(locationLatLng.lng,locationLatLng.lat), zoomLevel);
            map.enableScrollWheelZoom(true);
            map.enableDragging();
            function addMarker(map,point,labelText){
                var opts = {
                    position : point    // 指定文本标注所在的地理位置
                }
                var label = new BMap.Label(labelText, opts);  // 创建文本标注对象
                var marker = new BMap.Marker(point); // 创建点

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


            }
            //刷新地图
            function refreshMap(){
                var currentLocPoint=new BMap.Point(locationLatLng.lng,locationLatLng.lat);
                addMarker(map,currentLocPoint,'');
                map.centerAndZoom(currentLocPoint,zoomLevel);
            };
            refreshMap();
        }])
