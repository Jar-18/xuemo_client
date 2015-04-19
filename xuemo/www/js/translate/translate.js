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
            },
            courseType:{
                "1":"一对一",
                "2":"小班",
                "3":"大班"
            },
            courseSite:{
                "1":"老师家",
                "2":"学生家",
                "3":"公共场所"
            }
        },
        page:{
            courseDetail:{
                tab:{
                    courseIntro:"简介",
                    comment:"评论",
                    appointmentRecord:"预约记录"
                }
            }
        }
    });

    $translateProvider.preferredLanguage('en',{

    });
        $translateProvider.preferredLanguage('cn');

    }]);