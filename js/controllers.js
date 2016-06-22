angular.module('app.controllers', [])



.controller('contactsCtrl', function($scope, $ionicHistory) {
  //naveganciòn...
  $ionicHistory.nextViewOptions({
     disableBack: true
   });


  $scope.friendslist = [
                { name: "Pollo1", img:"img/profile-image-1.jpg", country: "Perú", city: "Arequipa"},
                { name: "Pollo2", img:"img/profile-image-2.jpg", country: "Perú", city: "Arequipa" },
                { name: "Pollo3", img:"img/profile-image-3.jpg", country: "Perú", city: "Arequipa" },
                { name: "Pollo4", img:"img/profile-image-4.jpg", country: "Perú", city: "Arequipa" },
                { name: "Pollo21", img:"img/profile-image-1.jpg", country: "Perú", city: "Arequipa" },
                { name: "Pollo22", img:"img/profile-image-2.jpg", country: "Perú", city: "Arequipa" },
                { name: "Pollo23", img:"img/profile-image-3.jpg", country: "Perú", city: "Arequipa" },
                { name: "Pollo24", img:"img/profile-image-4.jpg", country: "Perú", city: "Arequipa" }
         ];
   $scope.deleteFriendButton = function(friend){
      $scope.friendslist.splice($scope.friendslist.indexOf(friend), 1);
      /* BORRAR contacto de la BD*/
   };

   $scope.editFriendButton = function(item){
      /*editar contacto ITEM de la base de datos*/
   };
   $scope.chatFriendButton = function(item){
      /*empezar chat con ITEM */
   };

})


.controller('noticeCtrl', function($scope,$ionicScrollDelegate) {


    /*------- friend' news on DB  ------*/
    $scope.friendslistnotices = [
                { name: "Pollo1", img:"img/profile-image-1.jpg", country: "Perú", city: "Arequipa"},
                { name: "Pollo2", img:"img/profile-image-2.jpg", country: "Perú", city: "Arequipa" },
                { name: "Pollo3", img:"img/profile-image-3.jpg", country: "Perú", city: "Arequipa" },
                { name: "Pollo4", img:"img/profile-image-4.jpg", country: "Perú", city: "Arequipa" },
                { name: "Pollo21", img:"img/profile-image-1.jpg", country: "Perú", city: "Arequipa" },
                { name: "Pollo22", img:"img/profile-image-2.jpg", country: "Perú", city: "Arequipa" },
                { name: "Pollo23", img:"img/profile-image-3.jpg", country: "Perú", city: "Arequipa" },
                { name: "Pollo24", img:"img/profile-image-4.jpg", country: "Perú", city: "Arequipa" }
         ];
    /*------- end friend' news on DB  ------*/


    /*-------   LOAD MORE NOTICEs -----------*/

    $scope.loadMore = function() {
      var loadnumber=10;
      for (var i = 0; i < loadnumber; i++) {
        /* conecct with DB */
          var one_more= { name: "Pollo-load", img:"img/profile-image-1.jpg", country: "Perú", city: "Arequipa" };
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

.controller('meCtrl', function($scope) {

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

.controller('friendRequestsCtrl', function($scope) {
  $scope.inputfind = {};

    /* ----- DB stranger ----------*/
      $scope.strangerslist = [
             { name: "Pollo1", img:"img/profile-image-1.jpg", country: "Perú", city: "Arequipa"},
             { name: "Pollo2", img:"img/profile-image-2.jpg", country: "Perú", city: "Arequipa" },
             { name: "Pollo3", img:"img/profile-image-3.jpg", country: "Perú", city: "Arequipa" },
             { name: "Pollo4", img:"img/profile-image-4.jpg", country: "Perú", city: "Arequipa" },
             { name: "Pollo21", img:"img/profile-image-1.jpg", country: "Perú", city: "Arequipa" },
             { name: "Pollo22", img:"img/profile-image-2.jpg", country: "Perú", city: "Arequipa" },
             { name: "Pollo23", img:"img/profile-image-3.jpg", country: "Perú", city: "Arequipa" },
             { name: "Pollo24", img:"img/profile-image-4.jpg", country: "Perú", city: "Arequipa" }

           ];
    /* ----  end  DB stranger ----*/

    /* ----- DB friendRequest ----------*/
      $scope.friendRequestslist = [
             { name: "Pollo11", img:"img/profile-image-1.jpg", country: "Perú", city: "Arequipa" },
             { name: "Pollo12", img:"img/profile-image-2.jpg", country: "Perú", city: "Arequipa" },
             { name: "Pollo13", img:"img/profile-image-3.jpg", country: "Perú", city: "Arequipa" },
             { name: "Pollo14", img:"img/profile-image-4.jpg", country: "Perú", city: "Arequipa" },
             { name: "Pollo321", img:"img/profile-image-1.jpg", country: "Perú", city: "Arequipa" },
             { name: "Pollo322", img:"img/profile-image-2.jpg", country: "Perú", city: "Arequipa" },
             { name: "Pollo323", img:"img/profile-image-3.jpg", country: "Perú", city: "Arequipa" },
             { name: "Pollo324", img:"img/profile-image-4.jpg", country: "Perú", city: "Arequipa" }

           ];
    /* ----  end  DB friendRequest ----*/


})



.controller('chatRoomCtrl', function($scope, $ionicScrollDelegate, $firebase, cfg) {

      /* variables AngularTimeAgo */
      $scope.time = new Date();
      /* end variables AngularTimeAgo */

      $scope.userNameTemp="Felpon";
      $scope.messageUser={text:"este es mi mensajeAA", date:"19 de agosto",img:"img/eso-no-porfavor.jpg"}
      $scope.messageToUser={text:"esta es mi respuestaZZ", date:"22 de octubre",img:"img/vamo-a-calmarno.jpg"}



      var ref = new Firebase(cfg.firebase_url + 'messages');
      $scope.messages = $firebase(ref).$asArray();

      $scope.addMessage = function() {
         $scope.messages.$add({
           from: $scope.displayName || 'Anonymous',
           body: $scope.message
         });
         $scope.message = '';
         $ionicScrollDelegate.scrollBottom(true);
      };

      $scope.onKeydown = function(e) {
        if (e.keyCode === 13 && $scope.message) {
           $scope.addMessage();
        }
      };

})



.controller('logoutCtrl', function($scope, Auth, $state /*, ionicLoading, $ionicHistory, $timeout*/) {

    $scope.logout = function(){
      Auth.$unauth();
      console.log("logout complete!");
      $state.go('login');
    };

})
