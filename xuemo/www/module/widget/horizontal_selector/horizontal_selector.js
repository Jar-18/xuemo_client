angular.module("widget.horizontalSelector",[])
    .directive('horizontalSelector',[function(){
        return{
            restrict: 'E',
            templateUrl: './module/widget/horizontal_selector/horizontal_selector.html',
            replace:true,
            scope:{
                dicName:'@',
                selectorList:'=',
                selectedModel:'=',
                multiple:"@"
            },
            controller:['$scope',function($scope){
                $scope.selectedKeyObj={

                };
                function updateSelectedKeyObj(){
                    if($scope.multiple=="true"){
                        for(var index=0;index<$scope.selectedModel.length;index++){
                            $scope.selectedKeyObj[$scope.selectedModel[index].id]=true;
                        }
                    }else{
                        if($scope.selectedModel.id){
                            $scope.selectedKeyObj[$scope.selectedModel.id]=true;
                        }
                    }
                }
                if($scope.multiple=="true"){
                    if(!$scope.selectedModel){
                        $scope.selectedModel=[];
                    }
                }else{
                    if(!$scope.selectedModel){
                        $scope.selectedModel={};
                    }
                }
                function updateSelectedModel(){
                    var transformedModel=[];
                    for(var key in $scope.selectedKeyObj){
                        if($scope.multiple=="true"){
                            transformedModel.push({
                                id:key
                            });
                        }else{
                            transformedModel={
                                id:key
                            };
                        }
                    }
                    $scope.selectedModel=transformedModel;
                };
                $scope.$watch("selectedModel",function(nevVal,oldVal){
                    if(nevVal){
                        updateSelectedKeyObj();
                    }
                });
                $scope.itemClicked=function(key){
                    if($scope.selectedKeyObj[key]===undefined){
                        if($scope.multiple!="true"){
                            $scope.selectedKeyObj={};
                        }
                        $scope.selectedKeyObj[key]=true;
                    }else{
                        if($scope.multiple=="true"){
                            delete $scope.selectedKeyObj[key];
                        }
                    }
                    updateSelectedModel();
                };
            }]
        }
    }]);
