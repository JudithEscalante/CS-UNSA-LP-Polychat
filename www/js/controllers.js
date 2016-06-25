angular.module('app.controllers', [])



.controller('tabsControllerCtrl', function($scope, $state) {
    $scope.notification={
                        notice: "+"+'3',
                        friendRequests: "+"+'4',
                        contacts: "+"+'10',
                        chatRoom: "+"+'6'
    };
    $scope.go=function(ref,tab){
      $state.go(ref);
      $scope.notification[tab]='';
    }
})

.controller('contactsCtrl', function($scope,$state, $ionicHistory) {
  //naveganciòn...

   $ionicHistory.nextViewOptions({
     disableAnimate: false,
     disableBack: false
    });

    $scope.data = {
    showDelete: false
  };

  $scope.friendslist = [
    {id_user:"1",
      body:"mensaje1",
      name:"luigy",
      date:"199999 de agosto",
      img:"img/eso-no-porfavor.jpg",
      country: "Perú",
      city: "Arequipa"},
    {id_user:"12",
      body:"respuesta2",
      name:"pollo",
      date:"2222222 de octubre",
      img:"img/profile-image-1.jpg",
      country: "Perú",
      city: "Arequipa"},
    {id_user:"13",
      body:"mensaje3",
      name:"Marikita",
      date:"11111 de agosto",
      img:"img/profile-image-5.jpg",
      country: "Perú",
      city: "Arequipa"},
    {id_user:"1",
      body:"mensaje3.1",
      name:"luigy",
      date:"5 de agosto",
      img:"img/eso-no-porfavor.jpg",
      country: "Perú",
      city: "Arequipa"},

    {id_user:"19",
      body:"respuesta34",
      name:"felpon",
      date:"33333 de octubre",
      img:"img/vamo-a-calmarno.jpg",
      country: "Perú",
      city: "Arequipa"}
  ];

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


.controller('noticeCtrl', function($scope, $ionicScrollDelegate) {


    $scope.numberNotificacion=10;

    /*------- friend' news on DB  ------*/
    $scope.friendslistnotices = [
      {id_user:"1",
        body:"mensaje1",
        name:"luigy",
        date:"199999 de agosto",
        img:"img/eso-no-porfavor.jpg",
        country: "Perú",
        city: "Arequipa"},
      {id_user:"12",
        body:"respuesta2",
        name:"pollo",
        date:"2222222 de octubre",
        img:"img/profile-image-1.jpg",
        country: "Perú",
        city: "Arequipa"},
      {id_user:"13",
        body:"mensaje3",
        name:"Marikita",
        date:"11111 de agosto",
        img:"img/profile-image-5.jpg",
        country: "Perú",
        city: "Arequipa"},
      {id_user:"1",
        body:"mensaje3.1",
        name:"luigy",
        date:"5 de agosto",
        img:"img/eso-no-porfavor.jpg",
        country: "Perú",
        city: "Arequipa"},

      {id_user:"19",
        body:"respuesta34",
        name:"felpon",
        date:"33333 de octubre",
        img:"img/vamo-a-calmarno.jpg",
        country: "Perú",
        city: "Arequipa"}
    ];
    /*------- end friend' news on DB  ------*/


    /*-------   LOAD MORE NOTICEs -----------*/

    $scope.loadMore = function() {
      var loadnumber=10;
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

.controller('profileCtrl', function($scope,$state) {

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

.controller('friendRequestsCtrl', function($scope,$state) {
  $scope.inputfind = {};

    /* ----- DB stranger ----------*/
      $scope.strangerslist = [
                      {id_user:"1",
                        body:"mensaje1",
                        name:"luigy",
                        date:"199999 de agosto",
                        img:"img/eso-no-porfavor.jpg",
                        country: "Perú",
                        city: "Arequipa"},
                      {id_user:"12",
                        body:"respuesta2",
                        name:"pollo",
                        date:"2222222 de octubre",
                        img:"img/profile-image-1.jpg",
                        country: "Perú",
                        city: "Arequipa"},
                      {id_user:"13",
                        body:"mensaje3",
                        name:"Marikita",
                        date:"11111 de agosto",
                        img:"img/profile-image-5.jpg",
                        country: "Perú",
                        city: "Arequipa"},
                      {id_user:"1",
                        body:"mensaje3.1",
                        name:"luigy",
                        date:"5 de agosto",
                        img:"img/eso-no-porfavor.jpg",
                        country: "Perú",
                        city: "Arequipa"},

                      {id_user:"19",
                        body:"respuesta34",
                        name:"felpon",
                        date:"33333 de octubre",
                        img:"img/vamo-a-calmarno.jpg",
                        country: "Perú",
                        city: "Arequipa"}
           ];
    /* ----  end  DB stranger ----*/

    /* ----- DB friendRequest ----------*/
      $scope.friendRequestslist = [
                      {id_user:"1",
                        body:"mensaje1",
                        name:"luigy",
                        date:"199999 de agosto",
                        img:"img/eso-no-porfavor.jpg",
                        country: "Perú",
                        city: "Arequipa"},
                      {id_user:"12",
                        body:"respuesta2",
                        name:"pollo",
                        date:"2222222 de octubre",
                        img:"img/profile-image-1.jpg",
                        country: "Perú",
                        city: "Arequipa"},
                      {id_user:"13",
                        body:"mensaje3",
                        name:"Marikita",
                        date:"11111 de agosto",
                        img:"img/profile-image-5.jpg",
                        country: "Perú",
                        city: "Arequipa"},
                      {id_user:"1",
                        body:"mensaje3.1",
                        name:"luigy",
                        date:"5 de agosto",
                        img:"img/eso-no-porfavor.jpg",
                        country: "Perú",
                        city: "Arequipa"},

                      {id_user:"19",
                        body:"respuesta34",
                        name:"felpon",
                        date:"33333 de octubre",
                        img:"img/vamo-a-calmarno.jpg",
                        country: "Perú",
                        city: "Arequipa"}

           ];
    /* ----  end  DB friendRequest ----*/

    $scope.friendRequestsCtrl=function(objFriend){
        //agregar amigos
    }
})



.controller('chatRoomCtrl', function($scope, $ionicScrollDelegate,$state) {

  $scope.clearDefault = function(a){
      if(a.defaultValue==a.value)
          {a.value=""}
  };


    /* variables AngularTimeAgo */
    $scope.time = new Date();
    /* end variables AngularTimeAgo */

    $scope.allmessage=[
                    {id_user:"1",
                      body:"mensaje1",
                      from:"luigy",
                      date:"19 de agosto",
                      img:"img/eso-no-porfavor.jpg"},
                    {id_user:"12",
                      body:"respuesta2",
                      from:"pollo",
                      date:"22 de octubre",
                      img:"img/profile-image-1.jpg"},
                    {id_user:"13",
                      body:"mensaje3",
                      from:"Marikita",
                      date:"19 de agosto",
                      img:"img/profile-image-5.jpg"},
                    {id_user:"16",
                      body:"mensaje3.1",
                      from:"luigy",
                      date:"19 de agosto",
                      img:"img/eso-no-porfavor.jpg"},
                    {id_user:"19",
                      body:"respuesta3",
                      from:"felpon",
                      date:"22 de octubre",
                      img:"img/vamo-a-calmarno.jpg"}
    ];

    $scope.userNameSender="luigy"; //usuario q envia el mensaje (YO)


    $scope.addMessage=function(){
      $scope.allmessage.push(
                              { body:$scope.message,
                                from:$scope.userNameSender,
                                date:$scope.time,
                                img:"img/eso-no-porfavor.jpg"}  //usuario general!!!
      );
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

.controller('conversationCtrl', function($scope,$state, $ionicScrollDelegate,$ionicHistory) {
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

  $scope.allmessage=[
    {id_user:"1",
      body:"mensaje1",
      name:"luigy",
      date:"199999 de agosto",
      img:"img/eso-no-porfavor.jpg",
      country: "Perú",
      city: "Arequipa"},
    {id_user:"12",
      body:"respuesta2",
      name:"pollo",
      date:"2222222 de octubre",
      img:"img/profile-image-1.jpg",
      country: "Perú",
      city: "Arequipa"},
    {id_user:"13",
      body:"mensaje3",
      name:"Marikita",
      date:"11111 de agosto",
      img:"img/profile-image-5.jpg",
      country: "Perú",
      city: "Arequipa"},
    {id_user:"1",
      body:"mensaje3.1",
      name:"luigy",
      date:"5 de agosto",
      img:"img/eso-no-porfavor.jpg",
      country: "Perú",
      body:"respuesta34",
      city: "Arequipa"},

      {id_user:"19",
      name:"felpon",
      date:"33333 de octubre",
      img:"img/vamo-a-calmarno.jpg",
      country: "Perú",
      city: "Arequipa"}
  ];

  var id_contac=$state.params.contact_id;
  var id_contactIndexof = -1;
  $scope.userNameReceiver="null" //
  //solo para  encontrar Id_contact en base de datos
        for(i=0;i<$scope.allmessage.length;i++){
          if($scope.allmessage[i].id_user == id_contac){
              id_contactIndexof = i;
          }
        }
  ////////////////////////////////////////////////////////////

  $scope.userNameReceiver=$scope.allmessage[id_contactIndexof].name //usuario q recibe el mensaje (destinatario)
  $scope.userNameSender="luigy"; //usuario q envia el mensaje (YO)
  $scope.id_userSender="1"; //usuario q envia el mensaje (YO)
  $scope.img_userSender="img/eso-no-porfavor.jpg"; //usuario q envia el mensaje (YO)
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
