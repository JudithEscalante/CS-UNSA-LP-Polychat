angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('tabsController.contacts', {
    url: '/contacts',
    authenticate: true,
    views: {
      'contacts-tab': {
        templateUrl: 'templates/contacts.html',
        controller: 'contactsCtrl',
      }
    }
  })

  .state('tabsController.notice', {
    url: '/notice',
    authenticate: true,
    views: {
      'notice-tab': {
        templateUrl: 'templates/notice.html',
        controller: 'noticeCtrl',
      }
    }
  })

  .state('tabsController.me', {
    url: '/me',
    authenticate: true,
    views: {
      'me-tab': {
        templateUrl: 'templates/me.html',
        controller: 'meCtrl',
      }
    }
  })

  .state('tabsController', {
    url: '/tabsController',
    authenticate: true,
    templateUrl: 'templates/tabsController.html',
    abstract:true,
  })



  .state('tabsController.friendRequests', {
    url: '/friendRequests',
    authenticate: true,
    views: {
      'friendRequests-tab': {
        templateUrl: 'templates/friendRequests.html',
        controller: 'friendRequestsCtrl',
      }
    }
  })

  .state('tabsController.chatRoom', {
    url: '/chatRoom',
    authenticate: true,
    views: {
      'chatRoom-tab': {
        templateUrl: 'templates/chatRoom.html',
        controller: 'chatRoomCtrl',
      }
    }
  })







  .state('login', {
    url: '/login',
    authenticate: false,
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
    authenticate: false,
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl',
  })

  .state('account', {
    url: '/account',
    authenticate: true,
    templateUrl: 'templates/account.html',
    controller: 'accountCtrl',
  })


  .state('server', {
    url: '/server',
    authenticate: true,
    templateUrl: 'templates/server.html',
    controller: 'serverCtrl',
  })

  .state('logout', {
    url: '/logout',
    authenticate: true,
        templateUrl: 'templates/logout.html',
        controller: 'logoutCtrl',

  })



$urlRouterProvider.otherwise('/login')



});
