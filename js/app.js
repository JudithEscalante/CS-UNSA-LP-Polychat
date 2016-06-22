// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

//agregè "firebase"
angular.module('app', ["ionic", "app.controllers",
                        "app.routes", "app.services", "app.directives"
                      ,"firebase","angularMoment"])
    //agregando .constant y .service

      .constant('cfg', {
        firebase_url: 'https://jn6h.firebaseio.com/gdgguadalajara/codelab/'
        //firebase_url: 'https://polychatcsunsa.firebaseio.com/'

      })
    //parametro màs importante    rootRef
  //  .service('rootRef', ['FirebaseUrl', Firebase])


//agregè  lo siguiente ( $rootScope, $state, Auth)
.run(function($ionicPlatform, $rootScope, $state, $location, Auth2) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });
/*
  $rootScope.$on('$routeChangeStart',function(event){
    if(!Auth.isLoggedIn()){
        console.log('DENY');
        event.preventDefault();
        //$location.path('/login');
        $state.go('tabsController.notice');

    }
    else{
        console.log('ALLOW');
        //$location.path('/home');
        $state.go('login');

    }

  });
*/
/*
    $rootScope.displayName = null;

    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      if (toState.authenticate && !AuthService.isAuthenticated()){
         // User isn’t authenticated
         $state.transitionTo("login");
         event.preventDefault();
       }
     });
*/


})
