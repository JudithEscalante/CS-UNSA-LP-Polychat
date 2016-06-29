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

.controller('profileCtrl', function($scope,$state, userPrincipal, Camera, $ionicPopup, $timeout) {
  $scope.user=userPrincipal;

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


  $scope.ratingsObject = {
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
    console.log('Selected rating is : ', rating);
  };





  // A confirm dialog
  $scope.showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Consume Ice Cream',
      template: 'Are you sure you want to eat this ice cream?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        console.log('You are sure');
      } else {
        console.log('You are not sure');
      }
    });
  };











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
             
             /*
             Ref.child('users')
             //.child(authData.uid)
             .once('value', function(snapshot) {
               var val = snapshot.val();
               $scope.$apply(function() {
               $rootScope.displayName = val; // guardar usuario en------> rootScope.display
               Auth2.setUser($rootScope.displayName);//probando
             });
        
           });*/

             $ionicLoading.hide();
             $state.go('tabsController.chatRoom');
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


.controller('signupCtrl', function($scope, $rootScope, $state,Ref, $firebaseAuth, $ionicLoading, $ionicHistory,userId) {
  $ionicHistory.clearHistory();

  //var ref = new Firebase(cfg.firebase_url);
  var auth = $firebaseAuth(Ref);

  $scope.newUser = {};

  $scope.signupEmail = function() {
    if ($scope.newUser.email && $scope.newUser.password) {
      $ionicLoading.show({ template: 'Signing up...' });
      auth.$createUser({
        email: $scope.newUser.email,
        password: $scope.newUser.password
      }).then(function(userData) {
        /*
        ref.child('users').child(userData.uid).set({
          email: newUser.email,
          displayName: newUser.name
        });*/
        userId.id = userData.uid;
        console.log(userId.id);
        $state.go('extraData');
        $ionicLoading.hide();

      }).catch(function(error) {
        alert('Error: ' + error);
        $state.go('login');
        $ionicLoading.hide();

      });
    }
  };

})

.controller('extraDataCtrl', function($scope,$state,userId,Ref) {
  $scope.data = {};
  //$scope.data.country = "Afganistán";
  $scope.natLan = [
  {text:"Español",checked:false},
  {text:"Inglés",checked:false},
  {text:"Portugués",checked:false},
  {text:"Francés",checked:false},
  {text:"Alemán",checked:false}
  ];

  $scope.objLan = [
  {text:"Español",checked:false},
  {text:"Inglés",checked:false},
  {text:"Portugués",checked:false},
  {text:"Francés",checked:false},
  {text:"Alemán",checked:false}
  ];

  $scope.data.nat = [];
  $scope.data.obj = [];
  $scope.data.user_id = userId.id;

 

  $scope.saveData = function(){

    for(i=0;i<$scope.natLan.length;i++){
      if($scope.natLan[i].checked)
      {
        $scope.data.nat.push($scope.natLan[i].text);
      }
    }


   for(i=0;i<$scope.objLan.length;i++){

    if($scope.objLan[i].checked)
    {
      $scope.data.obj.push($scope.objLan[i].text);
       
    }
    }

    //Ref.push().set($scope.data);
    console.log("Printing user id...");
    console.log(userId.id);
    userId.data = $scope.data;
    console.log("user data name: ",userId.data.name);
    console.log("scope data name",$scope.data.name);
    Ref.child('usersTest/'+userId.id).set($scope.data);
    $state.go('login');

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



.controller('chatRoomCtrl', function($scope, $ionicScrollDelegate,$state, mydatabaseService, userPrincipal,userId,Ref,$firebaseArray) {

  //var ref = new Firebase("https://radiant-fire-9029.firebaseio.com");
  $scope.user = userId.data; 
  var chatRef = Ref.child('chatTest');
  var user_ref = Ref.child('usersTest');

  $scope.messages = $firebaseArray(chatRef);

  var auth_id = userId.id;
  var new_con = new Firebase('https://radiant-fire-9029.firebaseio.com/conversationsTest');

  /*
  $scope.pushMessage = function() {

    user_ref.orderByChild('user_id').equalTo(auth_id).on('child_added',function(data){
      var cur_user = data.val();

      chatRef.push().set({
      user_name: cur_user.name,
      user_id: cur_user.user_id,
      content: $scope.message 
      });

      $scope.message = '';
      $ionicScrollDelegate.scrollBottom();

    });
  };
*/
  console.log("user name",userId.data.name);
  console.log("user id",userId.data.user_id);

  $scope.pushMessage = function(){

    chatRef.push().set({
      user_name: userId.data.name,
      user_id: userId.data.user_id,
      content: $scope.message 
    });

    $scope.message = '';
    $ionicScrollDelegate.scrollBottom();

  };

  $scope.goChat = function(us_id,us_name){
    var curr = userId.data;
    var my_ref = Ref.child('usersTest/'+userId.id+'/last_messages');

    if(curr.user_id != us_id){

      my_ref.orderByChild('contact_id').equalTo(us_id).on('value',function(data){

        var existing_conver = data.val();
        if(existing_conver){

          var conver_key = Object.keys(existing_conver)[0];
          var existing_conver_object = existing_conver[conver_key];

          $state.go('chatContact',{
          conver_id : existing_conver_object.conversationId,
          my_mess_id: existing_conver_object.messId1,
          contact_mess_id: existing_conver_object.messId2,
          contact_id: existing_conver_object.contact_id
          });

        }
        else{

          user_ref.orderByChild('user_id').equalTo(us_id).on('child_added',function(data){
          var contact_ref = data.ref().child('last_messages');

          var new_con_ref = new_con.push();

          var myMessRef = my_ref.push();
          var contactMessRef = contact_ref.push();

          myMessRef.set({
          conversationId : new_con_ref.key(),
          messId1 : myMessRef.key(),
          messId2 : contactMessRef.key(),
          contact_name : us_name,
          contact_id : us_id
          });

          contactMessRef.set({
          conversationId : new_con_ref.key(),
          messId1 : contactMessRef.key(),
          messId2 : myMessRef.key(),
          contact_name : curr.name,
          contact_id : curr.user_id
          });

          $state.go('chatContact',{
          conver_id : new_con_ref.key(),
          my_mess_id: myMessRef.key(),
          contact_mess_id: contactMessRef.key(),
          contact_id: us_id
          }); 

          });

           
        }

      });

    }

  };

  /*

    $scope.goChat = function(us_id,us_name){

         user_ref.orderByChild('user_id').equalTo(auth_id).on('child_added', function(data) {
          var curr = data.val();
          var my_ref = data.ref().child('last_messages');

          if(curr.user_id != us_id ){

          my_ref.orderByChild('contact_id').equalTo(us_id).on('value',function(data){

          var existing_conver = data.val();

        if(existing_conver)
        {
          
          var conver_key = Object.keys(existing_conver)[0];
          var existing_conver_object = existing_conver[conver_key];

          $state.go('chatContact',{
          conver_id : existing_conver_object.conversationId,
          my_mess_id: existing_conver_object.messId1,
          contact_mess_id: existing_conver_object.messId2,
          contact_id: existing_conver_object.contact_id
          }); 

        }
        else{
          user_ref.orderByChild('user_id').equalTo(us_id).on('child_added',function(data){
          var contact_ref = data.ref().child('last_messages');

          var new_con_ref = new_con.push();

          var myMessRef = my_ref.push();
          var contactMessRef = contact_ref.push();

          myMessRef.set({
          conversationId : new_con_ref.key(),
          messId1 : myMessRef.key(),
          messId2 : contactMessRef.key(),
          contact_name : us_name,
          contact_id : us_id
          });

          contactMessRef.set({
          conversationId : new_con_ref.key(),
          messId1 : contactMessRef.key(),
          messId2 : myMessRef.key(),
          contact_name : curr.name,
          contact_id : curr.user_id
          });

          $state.go('chatContact',{
          conver_id : new_con_ref.key(),
          my_mess_id: myMessRef.key(),
          contact_mess_id: contactMessRef.key(),
          contact_id: us_id
          }); 

          });

        }

        });

        }


          });

        

    };
  
*/

  ////////////////////////////////////////////////////////////////
  /*
  $scope.clearDefault = function(a){
      if(a.defaultValue==a.value)
          {a.value=""}
  };
  */

    /* variables AngularTimeAgo */
    //$scope.time = new Date();
    /* end variables AngularTimeAgo */
    /*
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

    };*/



})

.controller('logoutCtrl', function($scope,$state,Ref,userId) {
    $scope.logout = function(){
      Ref.unauth();
      console.log("logout complete!");
      userId.id = '';
      userId.data =  '';
      $state.go('login');
    };

})



.controller('contactProfileCtrl', function($scope) {
    

})





.controller('personalConversationCtrl', function($scope,$state,$firebaseArray,$ionicScrollDelegate,$ionicHistory,Ref,userId) {

  $scope.user = userId.data; 

  var conver_id = $state.params.conver_id;
  var my_mess_id = $state.params.my_mess_id;
  var contact_mess_id = $state.params.contact_mess_id;
  var contact_id = $state.params.contact_id;

  //var users_ref = new Firebase("https://radiant-fire-9029.firebaseio.com/usersTest");
  //var users_ref = Ref.child('usersTest');
  var conver_ref = Ref.child('conversationsTest/'+ conver_id);
  var my_ref = Ref.child('usersTest/'+userId.id+'/last_messages/'+my_mess_id);
  var contact_ref = Ref.child('usersTest/'+contact_id+'/last_messages/'+contact_mess_id);

  $scope.messages = $firebaseArray(conver_ref);

  $scope.sendMessage = function(){

    $ionicScrollDelegate.scrollBottom();

    conver_ref.push().set({
          userName: curr.name,
          userId: curr.user_id,
          content: $scope.message 
    });

    my_ref.update({
          content:$scope.message,
          sendAt: new Date()
    });

    contact_ref.update({
          content:$scope.message,
          sendAt: new Date()
    });

    $scope.message = '';
  };

  $scope.goProfile = function(id,name){
      console.log(id);
      $state.go('contactProfile',{
        contactId:id,
        contactName:name
      });
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
