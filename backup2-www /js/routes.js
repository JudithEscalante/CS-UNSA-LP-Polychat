angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('tabsController.contacts', {
    url: '/contacts',
    views: {
      'tab1': {
        templateUrl: 'templates/contacts.html',
        controller: 'contactsCtrl'
      }
    }
  })

  .state('tabsController.notice', {
    url: '/noticeDefault',
    views: {
      'tab2': {
        templateUrl: 'templates/notice.html',
        controller: 'noticeCtrl'
      }
    }
  })

  .state('tabsController.me', {
    url: '/me',
    views: {
      'tab3': {
        templateUrl: 'templates/me.html',
        controller: 'meCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/tabsController',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  

  .state('tabsController.friendRequests', {
    url: '/friendRequests',
    views: {
      'tab5': {
        templateUrl: 'templates/friendRequests.html',
        controller: 'friendRequestsCtrl'
      }
    }
  })

  .state('tabsController.chatRoom', {
    url: '/chatRoom',
    views: {
      'tab6': {
        templateUrl: 'templates/chatRoom.html',
        controller: 'chatRoomCtrl'
      }
    }
  })

  .state('logout', {
    url: '/logout',
        templateUrl: 'templates/logout.html',
        controller: 'logoutCtrl'

  })



.state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl',
    resolve: {
            "currentAuth": ["Auth", function(Auth) {
              return Auth.$waitForAuth();
            }]
    }

  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('account', {
    url: '/account',
    templateUrl: 'templates/account.html',
    controller: 'accountCtrl'
  })

  .state('server', {
    url: '/server',
    templateUrl: 'templates/server.html',
    controller: 'serverCtrl'
  })



$urlRouterProvider.otherwise('/login')



});
