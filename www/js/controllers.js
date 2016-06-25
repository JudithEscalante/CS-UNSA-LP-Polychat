angular.module('app.controllers', [])



.controller('tabsControllerCtrl', function($scope, $state, notificationsTabs) {

    $scope.notification=notificationsTabs;
    $scope.go=function(ref,tab){
      $state.go(ref);
      $scope.notification[tab]='';
    }
})

.controller('contactsCtrl', function($scope,$state, $ionicHistory, mydatabaseService) {
  //naveganciòn...
    $ionicHistory.nextViewOptions({
     disableAnimate: false,
     disableBack: false
    });

    $scope.data = {
    showDelete: false
    };

    $scope.friendslist = mydatabaseService.database();

    $scope.deleteFriendButton = function(friend){
   /* BORRAR contacto de la BD*/
    $scope.friendslist.splice($scope.friendslist.indexOf(friend), 1);
    console.log("te borre XD!");
    };

    $scope.editFriendButton = function(item){
        /*editar contacto ITEM de la base de datos*/
    };

    $scope.sendMessage = function(objFriend){
    $state.go('conversation',{'contact_id': objFriend.id_user });
    console.log("contacto enviado");
    };


})


.controller('noticeCtrl', function($scope, $ionicScrollDelegate, mydatabaseService) {

    /*------- friend' news on DB  ------*/
    $scope.friendslistnotices = mydatabaseService.database();
    /*------- end friend' news on DB  ------*/

    /*-------   LOAD MORE NOTICEs -----------*/

    $scope.loadMore = function() {
      var loadnumber=2;
      for (var i = 0; i < loadnumber; i++) {
        /* conecct with DB */
          var one_more= { id_user:"19",
                          body:"respuesta34",
                          name:"felpon",
                          date:"33333 de octubre",
                          img:"img/vamo-a-calmarno.jpg",
                          country: "Perú",
                          city: "Arequipa"};
        /* end conecct with DB */
        $scope.friendslistnotices.push(one_more);
      }
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }
    $scope.$on('$stateChangeSuccess', function() {
      $scope.loadMore();
    });
    /*-------   end LOAD MORE NOTICEs -------*/

})

.controller('profileCtrl', function($scope,$state, userPrincipal) {
  $scope.user=userPrincipal;
  $scope.findFriends = function(){
    $state.go('tabsController.friendRequests');
  }


})


.controller('loginCtrl', function($scope, Auth , Auth2, Ref ,$rootScope, $state, $ionicModal, $ionicLoading) {

   $scope.login = function(user) {
       if (user && user.email && user.password) {
         $ionicLoading.show({ template: 'Loging in..' });
         Auth.$authWithPassword({
           email: user.email,
           password: user.password
         }).then(function(authData) {
             console.log('Logged in as: ' + authData.uid); // logeado como ID:usuario (manejadaor por firebase)
             Ref.child('users')
             //.child(authData.uid)
             .once('value', function(snapshot) {
               var val = snapshot.val();
               $scope.$apply(function() {
               $rootScope.displayName = val; // guardar usuario en------> rootScope.display
               Auth2.setUser($rootScope.displayName);//probando
             });

             $ionicLoading.hide();
             $state.go('tabsController.notice');
           });
         }).catch(function(error) {
           alert('Authentication failed: ' + error.message);
           $ionicLoading.hide();
         });
       }
       else{
          $ionicLoading.show({template: 'Error!',   //mensaje faltan datos
                              duration: 600
                             });
       }
     };


})


.controller('signupCtrl', function($scope, $rootScope, $state, $ionicModal, cfg, $firebaseAuth, $ionicLoading, $ionicHistory) {
  $ionicHistory.clearHistory();

  var ref = new Firebase(cfg.firebase_url);
  var auth = $firebaseAuth(ref);

  $scope.signup = function(newUser) {
    if (newUser && newUser.name && newUser.email && newUser.password) {
      $ionicLoading.show({ template: 'Signing up...' });
      auth.$createUser({
        email: newUser.email,
        password: newUser.password
      }).then(function(userData) {
        ref.child('users').child(userData.uid).set({
          email: newUser.email,
          displayName: newUser.name
        });
        $state.go('tabsController.notice');
        $ionicLoading.hide();
      }).catch(function(error) {
        alert('Error: ' + error);
        $state.go('login');
        $ionicLoading.hide();

      });
    }
  };

})

.controller('accountCtrl', function($scope) {

})

.controller('serverCtrl', function($scope) {

})

.controller('friendRequestsCtrl', function($scope,$state, mydatabaseService) {
  $scope.inputfind = {};

    /* ----- DB stranger ----------*/
      $scope.strangerslist =  mydatabaseService.database();
    /* ----  end  DB stranger ----*/

    /* ----- DB friendRequest ----------*/
      $scope.friendRequestslist = mydatabaseService.database();
    /* ----  end  DB friendRequest ----*/

    $scope.friendRequestsCtrl=function(objFriend){
        //agregar amigos
    }
})



.controller('chatRoomCtrl', function($scope, $ionicScrollDelegate,$state, mydatabaseService, userPrincipal) {

  $scope.clearDefault = function(a){
      if(a.defaultValue==a.value)
          {a.value=""}
  };

    /* variables AngularTimeAgo */
    $scope.time = new Date();
    /* end variables AngularTimeAgo */

    $scope.allmessage=mydatabaseService.database();

    $scope.user=userPrincipal;

    $scope.addMessage=function(){
      //console.log($scope.messageInput);
      //$scope.user.body=$scope.messageInput;
      //console.log(userPrincipal.body);
      // $scope.allmessage.push($scope.user);
      $scope.allmessage.push( { id_user: '3',
                                    body:$scope.messageInput,
                                    name:'felpon',
                                    date:'01-01-01',
                                    img:'img/homero.jpg',
                                    country: 'constantinopla',
                                    city: 'los olvidados'});
      $scope.messageInput='';
      $ionicScrollDelegate.scrollBottom(true);
      console.log("mensaje enviado");
    };


    $scope.sendMessage=function(obj){
      $state.go('conversation',{'contact_id': obj.id_user });
      console.log("contacto enviado");

    };

})



.controller('logoutCtrl', function($scope, Auth, $state /*, ionicLoading, $ionicHistory, $timeout*/) {
    $scope.logout = function(){
      Auth.$unauth();
      console.log("logout complete!");
      $state.go('login');
    };

})

.controller('conversationCtrl', function($scope,$state,$ionicScrollDelegate,$ionicHistory,mydatabaseService,userPrincipal) {
  //naveganciòn...
  $ionicHistory.nextViewOptions({
    disableAnimate: false,
    disableBack: false
   });

   $scope.myGoBack = function() {
    $ionicHistory.goBack();
  };


  /* variables AngularTimeAgo */
  $scope.time = new Date();
  /* end variables AngularTimeAgo */

  $scope.user=userPrincipal;
  $scope.allmessage=mydatabaseService.database();

  ////////////////////////////////////////////////////////////
  var id_contac=$state.params.contact_id;
  var id_contactIndexof = -1;
  //solo para  encontrar Id_contact en base de datos
        for(i=0;i<$scope.allmessage.length;i++){
          if($scope.allmessage[i].id_user == id_contac){
              id_contactIndexof = i;
          }
        }
  $scope.userNameReceiver=$scope.allmessage[id_contactIndexof]; //usuario q recibe el mensaje (destinatario)
  ///////////////////////////////////////////////////////////////

  $scope.addMessage=function(){
      $scope.allmessage.push(
                              { id_user:$scope.id_userSender,
                                body:$scope.messageInput,
                                name:$scope.userNameSender,
                                date:$scope.time,
                                img:$scope.img_userSender
                                }
        );
      $scope.messageInput='';
      $ionicScrollDelegate.scrollBottom(true);
    };
})
