angular.module('service.pager',[]).factory('pagerService',['$http',function($http){
    return{
        init:function(url,params,pageSize){
            if(!params){
                params={};
            };
            if(pageSize===undefined){
                this.pageSize=5;
            }else{
                this.pageSize=pageSize;
            }
            this.url=url;
            this.params=angular.copy(params);
        },
        /*在调用nextPage之前，必须先进行init、refresh操作
        * 第一次刷新都是调用refresh，剩下的都是调用nextPage*/
        refresh:function(dataList,callback){
            var me=this;
            this.params.pageNumber=1;
            this.params.pageSize=this.pageSize;
            return $http({
                method:'GET',
                url:this.url,
                params:this.params
            }).success(function(data,status,headers){
                var totalNum=headers('X-Total-Count');
                var whetherLoadMore=true;
                if(totalNum<=me.pageSize){
                    whetherLoadMore=false;
                };
                //进行数组的清空操作
                dataList.length=0;
                for(var index=0;index<data.length;index++){
                    dataList.push(data[index]);
                };
                callback(whetherLoadMore);
            })
        },
        /*请求之后再判断是否还有more,判断的是是否能够进行下一次next操作*/
        nextPage:function(dataList,callback){
            var me=this;
            this.params.pageNumber++;
            return $http({
                method:'GET',
                url:this.url,
                params:this.params
            }).success(function(data,status,headers){
                var totalNum=headers('X-Total-Count');
                var whetherLoadMore=true;
                if(totalNum<=me.params.pageNumber*me.pageSize){
                    whetherLoadMore=false;
                }
                for(var index=0;index<data.length;index++){
                    dataList.push(data[index]);
                };
                callback(whetherLoadMore);
            })
        }
    }
}]);
