angular.module('service.mapModal',[]).factory('mapModalService',['$ionicModal',function($ionicModal){
    return{
        initModal:function(scope){
            var me=this;
            $ionicModal.fromTemplateUrl('./module/app/map/index.html', {
                scope: scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                me.mapModal = modal;
                me.mapModal.show();
                scope.refreshMap();
            });
        },
        showModal:function($scope){
            if(this.mapModal==null){
                this.initModal($scope);
            }else{
                this.mapModal.show();
            }
        },
        removeModal:function(){
            if(this.mapModal){
                this.mapModal.remove();
                this.mapModal=null;
            }
        },
        hideModal:function(){
            if(this.mapModal){
                this.mapModal.hide();
            }
        }
    }
}]);
