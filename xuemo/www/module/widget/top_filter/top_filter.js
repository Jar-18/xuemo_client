angular.module("widget.topFilter",[])
    .directive('topFilter',[function(){
        return{
            restrict: 'E',
            templateUrl: './module/widget/top_filter/top_filter.html',
            replace:true,
            scope:{
                activeItemList:'='
            },
            controller:['$scope',function($scope){
                var districts=[
                    {
                        "parentId":"1",
                        "id":"2",
                        "name":"浦东新区"
                    },
                    {
                        "parentId":"1",
                        "id":"3",
                        "name":"闵行区"
                    },
                    {
                        "parentId":"2",
                        "id":"5",
                        "name":"世纪公园"
                    },
                    {
                        "parentId":"2",
                        "id":"6",
                        "name":"八佰伴"
                    },
                    {
                        "parentId":"2",
                        "id":"7",
                        "name":"川沙"
                    },
                    {
                        "parentId":"2",
                        "id":"8",
                        "name":"康桥"
                    },
                    {
                        "parentId":"3",
                        "id":"9",
                        "name":"七宝"
                    },
                    {
                        "parentId":"3",
                        "id":"10",
                        "name":"莘庄"
                    },
                    {
                        "parentId":"3",
                        "id":"11",
                        "name":"南方商城"
                    }
                ];
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
                    data:districts
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
                $scope.activeFilterKey="";
                $scope.toggleTab=function(key){
                    if($scope.activeFilterKey==key){
                        $scope.activeFilterKey="";
                        return;
                    }
                    $scope.activeFilterKey=key;
                };
                $scope.dictionary={};
                function formDictionary(){
                    for(var filterIndex=0;filterIndex<$scope.filterData.length;filterIndex++){
                        var currentDataItem=$scope.filterData[filterIndex];
                        $scope.dictionary[currentDataItem.key]={};
                        for(var itemIndex=0;itemIndex<currentDataItem.data.length;itemIndex++){
                            if($scope.activeItemList[filterIndex].level2!==undefined&&$scope.activeItemList[filterIndex].level2==currentDataItem.data[itemIndex].id){
                                $scope.activeItemList[filterIndex].level1=currentDataItem.data[itemIndex].parentId;
                            }
                            $scope.dictionary[currentDataItem.key][currentDataItem.data[itemIndex].id]=currentDataItem.data[itemIndex].name;
                        }
                    }
                    console.debug( $scope.dictionary);
                }
                formDictionary();
                $scope.getFilterName=function(filterItem,filterItemIndex){
                    var selectedValue="";
                    if($scope.activeItemList[filterItemIndex].level2!==undefined){
                        selectedValue=$scope.activeItemList[filterItemIndex].level2;
                    }else{
                        selectedValue=$scope.activeItemList[filterItemIndex].level1;
                    }

                    if($scope.dictionary[filterItem.key][selectedValue]){
                        return $scope.dictionary[filterItem.key][selectedValue];
                    }else{
                        return filterItem.name;
                    }
                }
                function transformFilterData(){
                    var result=[];
                    for(var index=0;index<$scope.filterData.length;index++){
                        var currentDataItem=$scope.filterData[index];
                        var transformedDataItem={};
                        transformedDataItem.name=currentDataItem.name;
                        transformedDataItem.key=currentDataItem.key;
                        transformedDataItem.category=currentDataItem.category;
                        if(transformedDataItem.category=="linkage"){
                            transformedDataItem.data=getGroupedData(currentDataItem.data,{
                                parentId:1,
                                addSelectAllBtn:true
                            })
                        }else{
                            transformedDataItem.data=currentDataItem.data;
                        }
                        result.push(transformedDataItem);
                    }
                    $scope.transformedFilterData=result;
                }
                transformFilterData();
                $scope.currentLevel2List={};
                function updateLevel2List(){
                    for(var index=0;index<$scope.transformedFilterData.length;index++){
                        var currentFilter=$scope.transformedFilterData[index];
                        if(currentFilter.category=="linkage"){
                            for(var level1Index=0;level1Index<currentFilter.data.length;level1Index++){
                                if($scope.activeItemList[index].level1==currentFilter.data[level1Index].data.id){
                                    $scope.currentLevel2List[currentFilter.key]=currentFilter.data[level1Index].children;
                                    break;
                                }
                            }
                        }
                    }
                    console.debug($scope.currentLevel2List);
                };
                updateLevel2List();
                $scope.level1Clicked=function(activeItemIndex,id,filterCategory){
                    if($scope.activeItemList[activeItemIndex].level1==id){
                        return;
                    }
                    $scope.activeItemList[activeItemIndex].level1=id;
                    if(filterCategory=="linkage"){
                        updateLevel2List();
                    }else{
                        $scope.activeFilterKey="";
                    }
                }
                $scope.level2Clicked=function(activeItemIndex,id){
                    if($scope.activeItemList[activeItemIndex].level2==id){
                        return;
                    }
                    $scope.activeItemList[activeItemIndex].level2=id;
                    $scope.activeFilterKey="";
                };
                function getGroupedData(originalList,options){
                    var groupedObj={
                    };
                    for(var index=0;index<originalList.length;index++){
                        var selectorItem=originalList[index];
                        if(options.parentId==selectorItem.parentId){//第一级的item
                            //已经定义过，则更新一下name属性即可，否则初始化selectorItem
                            if(groupedObj[selectorItem.id]){
                                groupedObj[selectorItem.id].data=selectorItem;
                            }else{
                                groupedObj[selectorItem.id]={
                                    data:selectorItem,
                                    children:[]
                                };
                                if(options.addSelectAllBtn){
                                    groupedObj[selectorItem.id].children.push({
                                        data:{
                                            id:selectorItem.id,
                                            name:"不限",
                                            mutex:true
                                        }
                                    });
                                }
                            }
                        }else{
                            //第二级的item
                            if(!groupedObj[selectorItem.parentId]){
                                groupedObj[selectorItem.parentId]={
                                    data:null,
                                    children:[]
                                };
                                if(options.addSelectAllBtn){
                                    groupedObj[selectorItem.parentId].children.push({
                                        data:{
                                            id:selectorItem.parentId,
                                            name:"不限",
                                            mutex:true
                                        }
                                    });
                                }
                            };
                            groupedObj[selectorItem.parentId].children.push({
                                data:selectorItem
                            });
                        }
                    };
                    var groupedList=[];
                    for(var key in groupedObj){
                        groupedList.push(groupedObj[key]);
                    }
                    return groupedList;
                };
                console.debug(getGroupedData(districts,{
                    parentId:1,
                    addSelectAllBtn:true
                }))
            }]
        }
    }]);
