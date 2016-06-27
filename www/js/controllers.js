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


  // $scope.listSplit = [];
  //   var lastChar = '';
  //   for(var i=0,len=list.length; i<len; i++) {
  //     var item = list[i];
  //
  //     if(item.name.charAt(0) != lastChar) {
  //       $scope.list.push({name:item.name.charAt(0),letter:true});
  //       lastChar = item.name.charAt(0);
  //     }
  //     $scope.list.push(item);
  //
  // }







})


.controller('noticeCtrl', function($scope, $ionicScrollDelegate, mydatabaseService) {

    /*-------     friend' news on DB  --------*/
    $scope.friendslistnotices = mydatabaseService.database();
    /*------- end friend' news on DB  --------*/

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

.controller('profileCtrl', function($scope,$state, userPrincipal, Camera, $ionicPopover) {
  $scope.user=userPrincipal;

  // $scope.takePicture2 = function (options){
  //   console.log("takePicture2");
  // }
  // $scope.getPicture2 = function (options){
  //   console.log("getPicture2");
  // }
  $scope.takePicture = function (options) {
    console.log("start takePicture");
    var options = {
                     quality : 75,
                     targetWidth: 200,
                     targetHeight: 200,
                     sourceType: 1
    };
    Camera.getPicture(options).then(function(imageData) {
       $scope.user.img = imageData;
    }, function(err) {
       console.log(err);
    });
  };
  $scope.getPicture = function (options) {
    console.log("start-getPicture");
     var options = {
        quality : 75,
        targetWidth: 200,
        targetHeight: 200,
        sourceType: 0
     };

     Camera.getPicture(options).then(function(imageData) {
        $scope.user.img = imageData;
     }, function(err) {
        console.log(err);
     });
  };

  $scope.user=userPrincipal;
  $scope.findFriends = function(){
    $state.go('tabsController.friendRequests');
  };


  $scope.backgroundPicture='img/fondo3.jpg';

  $scope.getBackgrundPicture = function (options) {
    console.log("getBackground-Picture");
     var options = {
        quality : 75,
        targetWidth: 200,
        targetHeight: 200,
        sourceType: 0
     };

     Camera.getPicture(options).then(function(imageData) {
        $scope.backgroundPicture = imageData;
     }, function(err) {
        console.log(err);
     });
  };

  $scope.user=userPrincipal;
  $scope.findFriends = function(){
    $state.go('tabsController.friendRequests');
  };




  $scope.ratingsObject2 = {
    iconOn: 'ion-ios-star',    //Optional
    iconOff: 'ion-ios-star-outline',   //Optional
    iconOnColor: 'rgb(200, 200, 100)',  //Optional
    iconOffColor:  'rgb(200, 100, 100)',    //Optional
    rating:  $scope.user.rating, //Optional
    minRating:0,    //Optional
    readOnly: true, //Optional
    callback: function(rating) {    //Mandatory
      $scope.ratingsCallback(rating);
    }
  };

  $scope.ratingsCallback = function(rating) {
    console.log('profile: Selected rating is : ', rating);
  };


  $ionicPopover.fromTemplateUrl('templates/buttonUpdatePhoto.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });






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

    $scope.addFriend=function(){
        //agregar amigos
        console.log("addFriend");
    }

    $scope.confirm = function(){
      console.log("confirm");
    }
    $scope.delete = function(){
      console.log("delete");
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

.controller('ratingPopoverCtrl', function($scope) {
})

.controller('buttonUpdatePhotoCtrl', function($scope) {
})

.controller('conversationCtrl', function($scope,$state,$ionicScrollDelegate,$ionicHistory,mydatabaseService,userPrincipal,$ionicPopover) {
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

  $ionicPopover.fromTemplateUrl('templates/ratingPopover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.ratingsCallback = function(rating) {
    console.log('Selected rating is : ', rating);
  };

  $scope.ratingsObject = {
    iconOn: 'ion-ios-star',    //Optional
    iconOff: 'ion-ios-star-outline',   //Optional
    iconOnColor: 'rgb(200, 200, 100)',  //Optional
    iconOffColor:  'rgb(200, 100, 100)',    //Optional
    rating:  $scope.user.rating, //Optional
    minRating: 0,    //Optional
    readOnly: false, //Optional
    callback: function(rating) {    //Mandatory
      $scope.ratingsCallback(rating);
      $scope.user.rating=rating;
    }
  };

})
