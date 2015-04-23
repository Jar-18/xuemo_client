// Ionic Starter App


angular.module('starter.controllers', [
        'widget.ratingStar',
        'widget.genderAge',
        'widget.horizontalSelector',
        'widget.chainSelector',

        'service.config',
        'service.course'
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
          abstract: true,
          templateUrl: "templates/tabs.html"
      })

      // Each tab has its own nav history stack:

      .state('app.learn', {
          url: '/learn',
          views: {
              'tab-learn': {
                  templateUrl: 'module/app/learn/index.html',
                  controller: 'learnCtrl'
              }
          }
      })
      .state('app.course_detail', {
          url: '/course_detail/:courseId',
          views: {
              'tab-learn': {
                  templateUrl: 'module/app/course_detail/index.html',
                  controller: 'courseDetailCtrl'
              }
          }
      })
      .state('app.course_detail.courseIntro', {
          url: '/course_intro',
          views: {
              'course-detail': {
                  templateUrl: 'module/app/course_detail/course_intro/index.html',
                  controller:"courseDetailIntroCtrl"
              }
          }
      })
      .state('app.course_detail.comment', {
          url: '/comment',
          views: {
              'course-detail': {
                  templateUrl: 'module/app/course_detail/comment/index.html',
                  controller:"courseDetailCommentCtrl"
              }
          }
      })
      .state('app.course_detail.appointmentRecord', {
          url: '/appointment_record',
          views: {
              'course-detail': {
                  templateUrl: 'module/app/course_detail/appointment_record/index.html',
                  controller:"courseDetailAppointmentRecordCtrl"
              }
          }
      })
      .state('app.teach', {
          url: '/teach',
          views: {
              'tab-teach': {
                  templateUrl: 'module/app/teach/index.html',
                  controller: 'teachCtrl'
              }
          }
      })
      .state('app.post_course_step_2', {
          url: '/post_course_step_2/:courseId',
          views: {
              'tab-teach': {
                  templateUrl: 'module/app/teach/post_course_step_2/index.html',
                  controller: 'postCourseStep2Ctrl'
              }
          }
      })
      .state('app.find', {
          url: '/find',
          views: {
              'tab-find': {
                  templateUrl: 'module/app/personal_homepage/index.html',
                  controller: 'personalHomepageCtrl'
              }
          }
      })
      .state('app.news', {
          url: '/news',
          views: {
              'tab-news': {
                  templateUrl: 'templates/chat-detail.html',
                  controller: 'ChatDetailCtrl'
              }
          }
      })
      .state('app.account', {
          url: '/account',
          views: {
              'tab-account': {
                  templateUrl: 'templates/tab-account.html',
                  controller: 'AccountCtrl'
              }
          }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/learn');

});
