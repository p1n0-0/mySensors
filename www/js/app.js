angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {

  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
  })

  .state('app.camera', {
    url: '/camera',
    views: {
      'menuContent': {
        templateUrl: 'templates/camera.html',
        controller: 'CameraCtrl'
      }
    }
  })

  .state('app.geolocation', {
    url: '/geolocation',
    views: {
      'menuContent': {
        templateUrl: 'templates/geolocation.html',
        controller: 'GeolocationCtrl'
      }
    }
  })

  .state('app.information', {
    url: '/information',
    views: {
      'menuContent': {
        templateUrl: 'templates/information.html',
        controller: 'InformationCtrl'
      }
    }
  })

  .state('app.motions', {
    url: '/motions',
    views: {
      'menuContent': {
        templateUrl: 'templates/motions.html',
        controller: 'MotionsCtrl'
      }
    }
  })

  .state('app.vibration', {
    url: '/vibration',
    views: {
      'menuContent': {
        templateUrl: 'templates/vibration.html',
        controller: 'VibrationCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/camera');

});
