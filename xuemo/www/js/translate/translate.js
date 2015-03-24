angular.module('starter')
    .config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('cn', {
        widget:{
            tab:{
                learn:"我要学",
                teach:"我要教",
                find:"发现",
                news:"消息",
                account:"我的"
            },
            city:{

            },
            gender:{
                "1":"男",
                "0":"女"
            }
        },
        page:{

        }
    });

    $translateProvider.preferredLanguage('en',{

    });
        $translateProvider.preferredLanguage('cn');

    }]);