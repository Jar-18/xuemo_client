// Ionic Starter App


angular.module('starter.controllers', [
        'widget.ratingStar',
        'widget.genderAge',
        'widget.horizontalSelector',
        'widget.chainSelector',
        'widget.courseCard',
        'widget.activityCard',
        'widget.topFilter',
        'widget.userCard',

        'service.config',
        'service.course',
        'service.activity',
        'service.tmpStorage',
        'service.user',
        'service.location',
        'service.mapModal',
        'service.auth'
    ])
    .filter('transformImgUrl',['URL_CONFIG',function(URL_CONFIG){
        return function(imgName){
            if(!imgName){
                imgName="default.jpg";
            }
            var urlStatus=URL_CONFIG.status;
            var imgHost=URL_CONFIG.host.imgHost;
            var imgApi=URL_CONFIG.common.imgApi;
            return imgHost+imgApi+"/"+imgName;
        }
    }]);

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','pascalprecht.translate'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
      .state('app', {
          url: "/app",
          views:{
              'app':{
                  controller: 'mainTabsCtrl',
                  templateUrl: 'module/app/tabs/index.html'
              }
          }
      })
      .state('app.home_page', {
          url: '/home_page',
          views: {
              'main': {
                  templateUrl: 'module/app/home_page/index.html',
                  controller: 'homePageCtrl'
              }
          }
      })
      // Each tab has its own nav history stack:
      .state('activity_detail', {
          url: '/activity_detail/:activityId',
          views: {
              'app': {
                  templateUrl: 'module/app/activity_detail/index.html',
                  controller: 'activityDetailCtrl'
              }
          }
      })
      .state('create_activity', {
          url: '/create_activity',
          views: {
              'app': {
                  templateUrl: 'module/app/create_activity/index.html',
                  controller: 'createActivityCtrl'
              }
          }
      })
      .state('activity_detail.activityIntro', {
          url: '/activity_intro',
          views: {
              'activity-detail': {
                  templateUrl: 'module/app/activity_detail/activity_intro/index.html',
                  controller:"activityDetailIntroCtrl"
              }
          }
      })
      .state('activity_detail.participator', {
          url: '/participator',
          views: {
              'activity-detail': {
                  templateUrl: 'module/app/activity_detail/participator/index.html',
                  controller:"activityDetailParticipatorCtrl"
              }
          }
      })
      .state('location_info', {
          url: '/location_info?lng&lat&locationName&locationDesc',
          views: {
              'app': {
                  templateUrl: 'module/app/location_info/index.html',
                  controller: 'locationInfoCtrl'
              }
          }
      })
      .state('location_setting', {
          url: '/location_setting?lng&lat',
          views: {
              'app': {
                  templateUrl: 'module/app/location_setting/index.html',
                  controller: 'locationSettingCtrl'
              }
          }
      })
      .state('learn', {
          url: '/learn/:district/:category/:sort',
          views: {
              'app': {
                  templateUrl: 'module/app/learn/index.html',
                  controller: 'learnCtrl'
              }
          }
      })
      .state('register', {
          url: '/register',
          views: {
              'app': {
                  templateUrl: 'module/app/register/index.html',
                  controller: 'registerCtrl'
              }
          }
      })
      .state('register_step_2', {
          url: '/register_step_2',
          views: {
              'app': {
                  templateUrl: 'module/app/register_step_2/index.html',
                  controller: 'registerStep2Ctrl'
              }
          }
      })
      .state('app.find', {
          url: '/find',
          views: {
              'main': {
                  templateUrl: 'module/app/find/index.html',
                  controller: 'findCtrl'
              }
          }
      })
      .state('nearby_people', {
          url: '/nearby_people',
          views: {
              'app': {
                  templateUrl: 'module/app/nearby_people/index.html',
                  controller: 'nearbyPeopleCtrl'
              }
          }
      })
      .state('nearby_activity', {
          url: '/nearby_activity',
          views: {
              'app': {
                  templateUrl: 'module/app/nearby_activity/index.html',
                  controller: 'nearbyActivityCtrl'
              }
          }
      })
      .state('course_detail', {
          url: '/course_detail/:courseId',
          views: {
              'app': {
                  templateUrl: 'module/app/course_detail/index.html',
                  controller: 'courseDetailCtrl'
              }
          }
      })
      .state('course_detail.courseIntro', {
          url: '/course_intro',
          views: {
              'course-detail': {
                  templateUrl: 'module/app/course_detail/course_intro/index.html',
                  controller:"courseDetailIntroCtrl"
              }
          }
      })
      .state('course_detail.comment', {
          url: '/comment',
          views: {
              'course-detail': {
                  templateUrl: 'module/app/course_detail/comment/index.html',
                  controller:"courseDetailCommentCtrl"
              }
          }
      })
      .state('course_detail.appointmentRecord', {
          url: '/appointment_record',
          views: {
              'course-detail': {
                  templateUrl: 'module/app/course_detail/appointment_record/index.html',
                  controller:"courseDetailAppointmentRecordCtrl"
              }
          }
      })
      .state('teach', {
          url: '/teach',
          views: {
              'app': {
                  templateUrl: 'module/app/teach/index.html',
                  controller: 'teachCtrl'
              }
          }
      })
      .state('post_course_step_2', {
          url: '/post_course_step_2/:courseId',
          views: {
              'app': {
                  templateUrl: 'module/app/post_course_step_2/index.html',
                  controller: 'postCourseStep2Ctrl'
              }
          }
      })
      .state('app.news', {
          url: '/news',
          views: {
              'main': {
                  templateUrl: 'templates/chat-detail.html',
                  controller: 'ChatDetailCtrl'
              }
          }
      })
      .state('app.me', {
          url: '/me',
          views: {
              'main': {
                  templateUrl: 'module/app/me/index.html',
                  controller: 'meCtrl'
              }
          }
      })

      .state('my_post', {
        url: '/my_post',
        views: {
          'app': {
            templateUrl: 'module/app/my_post/index.html',
            controller: 'myPostCtrl'
          }
        }
      })

      .state('my_post.courseList', {
        url: '/courses',
        views: {
          'my-post': {
            templateUrl: 'module/app/my_post/course_list/index.html',
            controller: 'myPostCoursesCtrl'
          }
        }
      })

      .state('my_post.activityList', {
        url: '/activities',
        views: {
          'my-post': {
            templateUrl: 'module/app/my_post/activity_list/index.html',
            controller: 'myPostActivitiesCtrl'
          }
        }
      })

      .state('my_favourite', {
        url: '/my_favourite',
        views: {
          'app': {
            templateUrl: 'module/app/my_favourite/index.html',
            controller: 'myFavouriteCtrl'
          }
        }
      })

      .state('my_favourite.courseList', {
        url: '/courses',
        views: {
          'my-favourite': {
            templateUrl: 'module/app/my_favourite/course_list/index.html',
            controller: 'myFavouriteCoursesCtrl'
          }
        }
      })

      .state('my_favourite.activityList', {
        url: '/activities',
        views: {
          'my-favourite': {
            templateUrl: 'module/app/my_favourite/activity_list/index.html',
            controller: 'myFavouriteActivitiesCtrl'
          }
        }
      })

      .state('my_attention', {
        url: '/my_attentions',
        views: {
          'app': {
            templateUrl: 'module/app/my_attention/index.html',
            controller: 'myAttentionListCtrl'
          }
        }
      })

      .state('my_follower', {
        url: '/my_followers',
        views: {
          'app': {
            templateUrl: 'module/app/my_follower/index.html',
            controller: 'myFollowerListCtrl'
          }
        }
      })

      .state('personal_homepage', {
          url: '/personal_homepage/:userId/:mode',
          views: {
              'app': {
                  templateUrl: 'module/app/personal_homepage/index.html',
                  controller: 'personalHomepageCtrl'
              }
          }
      })
      .state('confirm_appointment', {
        url: '/confirm_appointment/:courseKey',
        views: {
          'app': {
            templateUrl: 'module/app/confirm_appointment/index.html',
            controller: 'confirmAppointmentCtrl'
          }
        }
      })
      .state('modify_personal_info', {
        url: '/modify_personal_info',
        views: {
          'app': {
            templateUrl: 'module/app/modify_personal_info/index.html',
            controller: 'modifyPersonalInfoCtrl'
          }
        }
      });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home_page');

});
