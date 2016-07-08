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
        controller: 'contactsCtrl'
      }
    }
  })

  .state('tabsController.notice', {
    url: '/notice',
    authenticate: true,
    views: {
      'notice-tab': {
        templateUrl: 'templates/notice.html',
        controller: 'noticeCtrl'
      }
    }
  })

  .state('tabsController.profile', {
    url: '/profile',
    authenticate: true,
    views: {
      'profile-tab': {
        templateUrl: 'templates/profile.html',
        controller: 'profileCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/tabsController',
    authenticate: true,
    abstract:true,
    controller: 'tabsControllerCtrl',
    templateUrl: 'templates/tabsController.html'
  })



  .state('tabsController.friendRequests', {
    url: '/friendRequests',
    authenticate: false,
    views: {
      'friendRequests-tab': {
        templateUrl: 'templates/friendRequests.html',
        controller: 'friendRequestsCtrl'
      }
    }
  })

  .state('tabsController.chatRoom', {
    url: '/chatRoom',
    authenticate: false,
    views: {
      'chatRoom-tab': {
        templateUrl: 'templates/chatRoom.html',
        controller: 'chatRoomCtrl'
      }
    }
  })

  .state('buttonUpdatePhoto', {
    url: '/buttonUpdatePhoto',
    authenticate: true,
    templateUrl: 'templates/buttonUpdatePhoto.html',
    controller: 'buttonUpdatePhotoCtrl'
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
    authenticate: true,
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })



  .state('extraData', {
    url: '/extraData',
    authenticate: true,
    templateUrl: 'templates/extraData.html',
    controller: 'extraDataCtrl'

  })

  .state('extraDataFacebook',{
    url:'/extraDataFacebook',
    authentica:true,
    templateUrl:'templates/extraDataFacebook.html',
    controller:'extraDataFacebookCtrl'
  })


  .state('account', {
    url: '/account',
    authenticate: true,
    templateUrl: 'templates/account.html',
    controller: 'accountCtrl'
  })


  .state('server', {
    url: '/server',
    authenticate: true,
    templateUrl: 'templates/server.html',
    controller: 'serverCtrl'
  })

  .state('logout', {
    url: '/logout',
    authenticate: true,
    templateUrl: 'templates/logout.html',
    controller: 'logoutCtrl'

  })

  .state('conversation', {
    url: '/conversation',
    authenticate: true,
    templateUrl: 'templates/conversation.html',
    controller: 'conversationCtrl',
    params: {
      contact_id : null
    }
  })
.state('contactProfile', {
    url: '/contactProfile',
    authenticate: true,
    templateUrl: 'templates/contactProfile.html',
    controller: 'contactProfileCtrl',
    params: {
      contactId:null,
      contactName:null
    }
  })

.state('personalConversation', {
    url: '/personalConversation',
    authenticate: true,
    templateUrl: 'templates/personalConversation.html',
    controller: 'personalConversationCtrl',
    params: {
      conver_id : null,
      my_mess_id: null,
      contact_mess_id: null,
      contact_id: null
    }
})
  .state('ratingModalShow', {
    url: '/ratingModalShow',
    authenticate: true,
    templateUrl: 'templates/ratingModalShow.html',
    //controller: 'ratingModalShowCtrl',
    params: {
      rating : 0
    }

  })
  .state('ratingPopover', {
    url: '/ratingPopover',
    authenticate: true,
    templateUrl: 'templates/ratingPopover.html',
    controller: 'ratingPopoverCtrl'
  })




  .state('tabsController.messages', {
    url: '/messages',
    authenticate: false,
    views: {
      'messages-tab': {
        templateUrl: 'templates/messages.html',
        controller: 'messagesCtrl'
      }
    }
  })




$urlRouterProvider.otherwise('/login')



});
