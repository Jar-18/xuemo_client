angular.module("widget.chainSelector",[])
    .directive('chainSelector',['modalService',function(modalService){
        return{
            restrict: 'E',
            templateUrl: './module/widget/chain_selector/chain_selector.html',
            replace:true,
            scope:{
                selectorList:'=',
                selectedModel:'=',
                customOptions:'='
            },
            controller:['$scope',function($scope){
                $scope.options={
                    "multiple":true,
                    "addSelectAllBtn":true,
                    "btnName":"请选择",
                    "modalTitle":"",
                    "modalName":""
                };
                if($scope.customOptions){
                    angular.extend($scope.options,$scope.customOptions);
                }
                var parentId="1";
                function getGroupedData(originalList){
                    var groupedObj={
                    };
                    for(var index=0;index<originalList.length;index++){
                        var selectorItem=originalList[index];
                        if(parentId==selectorItem.parentId){//第一级的item
                            //已经定义过，则更新一下name属性即可，否则初始化selectorItem
                            if(groupedObj[selectorItem.id]){
                                groupedObj[selectorItem.id].data=selectorItem;
                            }else{
                                groupedObj[selectorItem.id]={
                                    data:selectorItem,
                                    children:[]
                                };
                                if($scope.options.addSelectAllBtn){
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
                                if($scope.options.addSelectAllBtn){
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
                $scope.$watchCollection("selectorList",function(newVal,oldVal){
                    if(newVal){
                        $scope.selectorList==newVal;
                        $scope.groupedSelectorData=getGroupedData($scope.selectorList);
                    }
                });
                $scope.selectedItemObj={};
                if($scope.options.multiple){
                    for(var index=0;index<$scope.selectedModel.length;index++){
                        $scope.selectedItemObj[$scope.selectedModel[index].id]=true;
                    }
                }else{
                    if($scope.selectedModel.id){
                        $scope.selectedItemObj[$scope.selectedModel.id]=true;
                    }
                }
                $scope.level2Change=function(level2ItemData,level2List){
                    if(level2ItemData.mutex){
                        for(var index=1;index<level2List.length;index++){
                            if($scope.selectedItemObj[level2List[index].data.id]){
                               delete $scope.selectedItemObj[level2List[index].data.id];
                            }
                        }
                    }else{
                        //清除第二级中的不限制选项
                        if(!$scope.selectedItemObj[level2ItemData.id]&&$scope.selectedItemObj[level2List[0].data.id]){
                            delete $scope.selectedItemObj[level2List[0].data.id];
                        }
                    }
                    if($scope.selectedItemObj[level2ItemData.id]){
                        delete $scope.selectedItemObj[level2ItemData.id];
                    }else{
                        if(!$scope.options.multiple){
                            $scope.selectedItemObj={};
                        }
                        $scope.selectedItemObj[level2ItemData.id]=true;
                    }
                    var resultList;
                    if($scope.options.multiple){
                        resultList=[];
                        for(var key in $scope.selectedItemObj){
                            resultList.push({id:key});
                        }
                    }else{
                        resultList={};
                        for(var key in $scope.selectedItemObj){
                            resultList.id=key;
                        }
                    }
                    $scope.selectedModel=resultList;
                    console.debug($scope.selectedModel);
                }
                $scope.showModal=function(modalName){
                    modalService.showModal($scope,modalName);
                };
                $scope.hideModal=function(modalName){
                    modalService.hideModal(modalName);
                }
            }]
        }
    }])
    .factory('modalService',['$ionicModal',function($ionicModal){
        return{
            initModal:function(scope,modalName){
                var me=this;
                $ionicModal.fromTemplateUrl('./module/widget/chain_selector/chain_selector_modal.html', {
                    scope: scope,
                    animation: 'slide-in-up'
                }).then(function(modal) {
                    me[modalName] = modal;
                    me[modalName].show();
                });
            },
            showModal:function($scope,modalName){
                if(this[modalName]==null){
                    this.initModal($scope,modalName);
                }else{
                    this[modalName].show();
                }
            },
            removeModal:function(modalName){
                if(this[modalName]){
                    this[modalName].remove();
                    this[modalName]=null;
                }
            },
            hideModal:function(modalName){
                if(this[modalName]){
                    this[modalName].hide();
                }
            }
        }
    }]);
