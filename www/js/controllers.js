angular.module('app.controllers', [])



.controller('tabsControllerCtrl', function($scope, $state, notificationsTabs,userId,Ref) {

    $scope.notification=notificationsTabs;
    $scope.go=function(ref,tab){
      $state.go(ref);
      $scope.notification[tab]=0;
    };


    //$scope.chatRoom = 4;
    //$scope.friendRequests = 0;

    var user_not_ref = Ref.child('usersTest/'+userId.id+'/notifications');
    user_not_ref.on('child_added',function(data){
      console.log('New Notification!');
      console.log($scope.notification.friendRequests);
      $scope.notification.friendRequests = $scope.notification.friendRequests + 1;
      console.log($scope.notification.friendRequests);
    });

    var user_mess_ref = Ref.child('usersTest/'+userId.id+'/last_messages');

    user_mess_ref.on('child_added',function(data){
      console.log('New message!');
      console.log($scope.notification.messages);
      $scope.notification.messages = $scope.notification.messages + 1;
      console.log($scope.notification.messages);
    });



})



.controller('messagesCtrl', function($scope,$state,Ref,userId,$firebaseArray) {

   //var my_ref = getRef.getMyRef().child('last_messages');
   var my_ref = Ref.child('usersTest/'+userId.id+'/last_messages');
   $scope.messages = $firebaseArray(my_ref);

  //Go to contact controller

  $scope.goChatWith = function(converId,m1_id,m2_id,contactId){

    console.log("Message controller...");
    console.log("Conversation id: "+converId);
    console.log("M1 id: "+m1_id);
    console.log("M2 id: "+m2_id);
    console.log("Contact id: "+contactId);


    $state.go('personalConversation',{
      conver_id : converId,
      my_mess_id: m1_id,
      contact_mess_id: m2_id,
      contact_id: contactId
    });

  };


})

.controller('contactsCtrl', function($scope,$state, $ionicHistory,Ref,userId,$firebaseArray) {
  //naveganciòn...
    $ionicHistory.nextViewOptions({
     disableAnimate: false,
     disableBack: false
    });

    var contacts_ref = Ref.child('usersTest/'+userId.id+'/contacts');
    $scope.friendsList = $firebaseArray(contacts_ref);

    //$scope.goProfile = function(id,name){};

    $scope.goProfile = function(id,name){

    if(userId.id != id){

      $state.go('contactProfile',{
        contactId:id,
        contactName:name
      });
    }
    };



    /*
    $scope.data = {
    showDelete: false
    };

    $scope.friendslist = mydatabaseService.database();

    $scope.deleteFriendButton = function(friend){

    $scope.friendslist.splice($scope.friendslist.indexOf(friend), 1);
    console.log("te borre XD!");
    };

    $scope.editFriendButton = function(item){

    };

    $scope.sendMessage = function(objFriend){
    $state.go('conversation',{'contact_id': objFriend.id_user });
    console.log("contacto enviado");
    };*/


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

.controller('profileCtrl', function($scope,$state,Ref,userId,Camera, $ionicPopover) {

  console.log("Profile ctrl");
  console.log("User id...",userId.id);
  var curr = userId.data;
  var userRef = Ref.child('usersTest/'+userId.id);
  $scope.photo = userId.photo;

  $scope.name = curr.name;
  $scope.age = curr.age;
  $scope.genre = curr.genre;
  $scope.country= curr.country;
  $scope.nat_lan= curr.nat;
  $scope.obj_lan= curr.obj;


  $scope.takePicture = function (options) {
    console.log("start takePicture");
    var options = {
                     quality : 75,
                     targetWidth: 200,
                     targetHeight: 200,
                     sourceType: 1
    };
    Camera.getPicture(options).then(function(imageData) {
       $scope.photo = imageData;
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
        $scope.photo = imageData;
     }, function(err) {
        console.log(err);
     });
  };

  //$scope.user=userPrincipal;
  $scope.findFriends = function(){
    //$state.go('tabsController.friendRequests');
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

  $scope.ratingsObject2 = {
    iconOn: 'ion-ios-star',    //Optional
    iconOff: 'ion-ios-star-outline',   //Optional
    iconOnColor: 'rgb(200, 200, 100)',  //Optional
    iconOffColor:  'rgb(200, 100, 100)',    //Optional
    rating:  userId.rating, //Optional
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


.controller('loginCtrl', function($scope, Auth, Ref ,$rootScope, $state, $ionicModal, $ionicLoading,userId) {

   $scope.login = function(user) {
       if (user && user.email && user.password) {
         $ionicLoading.show({ template: 'Loging in..' });
         Auth.$authWithPassword({
           email: user.email,
           password: user.password
         }).then(function(authData) {
             console.log('Logged in as: ' + authData.uid); // logeado como ID:usuario (manejadaor por firebase)

             $ionicLoading.hide();
             console.log("Login controller...");

             var user_ref = Ref.child('usersTest/'+authData.uid);

             user_ref.once('value',function(data){
              userId.id = authData.uid;
              userId.data = data.val();
              console.log('Data val inside query',data.val().name);
              console.log('User name inside query',userId.data.name);

               $state.go('tabsController.chatRoom');
             });

             //console.log('User name outside query',userId.data.name);



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

     $scope.loginWithFacebook = function(){

        Auth.$authWithOAuthPopup("facebook").then(function(authData) {
          console.log("Logged in as:", authData.uid);
          console.log("Logged in as:", authData.facebook.id);
          userId.id = authData.facebook.id;
          userId.photo = authData.facebook.profileImageURL;
          console.log(userId.id);


          userRef = Ref.child('usersTest/'+userId.id);
          userRef.once('value',function(data){
            if(data.val()){
              userId.data = data.val();
              console.log(userId.data);
              $state.go('tabsController.chatRoom');

            }
            else{
              $state.go('extraDataFacebook');
            }
          });



        }).catch(function(error) {
          console.log("Authentication failed:", error);
        });

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
    //userId.data = $scope.data;
    console.log("user data name: ",userId.data.name);
    console.log("scope data name",$scope.data.name);
    Ref.child('usersTest/'+userId.id).set($scope.data);
    $state.go('login');

    };
})
.controller('extraDataFacebookCtrl',function($scope,$state,userId,Ref){

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


    Ref.child('usersTest/'+userId.id).set($scope.data);

    userId.data = $scope.data;

    $state.go('tabsController.chatRoom');

    };

})

.controller('accountCtrl', function($scope) {

})

.controller('serverCtrl', function($scope) {

})

.controller('friendRequestsCtrl', function($scope,$state,Ref,userId,$firebaseArray) {

  var curr = userId.data;
  var user_not_ref = Ref.child('usersTest/'+userId.id+'/notifications');
  $scope.strangersList = $firebaseArray(user_not_ref);

  //var my_ref_contacts = Ref.child('usersTest/'+curr.user_id+'/contacts/'+contactId);
  //var contact_ref_contacts = Ref.child('usersTest/'+contactId+'/contacts/'+curr.user_id);
  //var my_ref_not = Ref.child('usersTest/'+curr.user_id+'/notifications/'+contactId);

  $scope.confirm = function(id,name){

    var my_ref_contacts = Ref.child('usersTest/'+curr.user_id+'/contacts/'+id);
    var contact_ref_contacts = Ref.child('usersTest/'+id+'/contacts/'+curr.user_id);
    var my_ref_not = Ref.child('usersTest/'+curr.user_id+'/notifications/'+id);

    my_ref_contacts.set({
      contact_id : id,
      contact_name : name
    });

    contact_ref_contacts.set({
      contact_id : curr.user_id,
      contact_name : curr.name
    })

    my_ref_not.set(null);
  };

  $scope.delete = function(id){
    var my_ref_not = Ref.child('usersTest/'+curr.user_id+'/notifications/'+id);
    my_ref_not.set(null);
  };

})



.controller('chatRoomCtrl', function($scope, $ionicScrollDelegate,$state, mydatabaseService, userPrincipal,userId,Ref,$firebaseArray) {

  //var ref = new Firebase("https://radiant-fire-9029.firebaseio.com");
  $scope.user = userId.data;
  var chatRef = Ref.child('chatTest');
  var user_ref = Ref.child('usersTest');

  $scope.messages = $firebaseArray(chatRef);

  var auth_id = userId.id;
  //var new_con = new Firebase('https://radiant-fire-9029.firebaseio.com/conversationsTest');
  var new_con = Ref.child('conversationsTest');

  console.log("Chat room controller...");
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

      var existing_conver_ref = my_ref.child(us_id);
      existing_conver_ref.once('value',function(data){

        var existing_conver = data.val();

        if(existing_conver){

          console.log('Existing conver...',existing_conver.conversationId);

          $state.go('personalConversation',{
          conver_id : existing_conver.conversationId,
          my_mess_id: existing_conver.messId1,
          contact_mess_id: existing_conver.messId2,
          contact_id: existing_conver.contact_id
          });

        }
        else{
          var contact_ref = Ref.child('usersTest/'+us_id+'/last_messages');
          var new_con_ref = new_con.push();

          //var myMessRef = my_ref.push();
          //var contactMessRef = contact_ref.push();

          var myMessRef = my_ref.child(us_id);
          var contactMessRef = contact_ref.child(curr.user_id);

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

          $state.go('personalConversation',{
          conver_id : new_con_ref.key(),
          my_mess_id: myMessRef.key(),
          contact_mess_id: contactMessRef.key(),
          contact_id: us_id
          });

        }

      });

    }

  };


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
      userId.data =  {};
      userId.photo = 'img/user.png';
      $state.go('login');
    };

})
.controller('contactProfileCtrl', function($scope,$state,Ref,userId) {

  var contactId = $state.params.contactId;
  var contactName = $state.params.contactName;

  console.log('Contact profile controller');
  console.log('contact id',contactId);
  console.log('contact name',contactName);

  var curr = userId.data;

  var my_ref = Ref.child('usersTest/'+userId.id+'/last_messages');
  var contact_ref = Ref.child('usersTest/'+contactId+'/last_messages');
  var new_con = Ref.child('conversationsTest');

  user_ref = Ref.child('usersTest/'+contactId);
  var existing_conver_ref = my_ref.child(contactId);

  $scope.photo = userId.photoUser;
  $scope.backgroundPicture = 'img/fondo2.jpg';


  user_ref.on('value',function(data){
    var user = data.val();

    $scope.name = user.name;
    $scope.age = user.age;
    $scope.genre = user.genre;
    $scope.country= user.country;
    $scope.nat_lan= user.nat;
    $scope.obj_lan= user.obj;
  });

  $scope.sendMessage = function(){

    existing_conver_ref.once('value',function(data){

      var existing_conver = data.val();

      if(existing_conver){

          console.log('Existing conver...',existing_conver.conversationId);

          $state.go('personalConversation',{
          conver_id : existing_conver.conversationId,
          my_mess_id: existing_conver.messId1,
          contact_mess_id: existing_conver.messId2,
          contact_id: existing_conver.contact_id
          });

        }
        else{

          var new_con_ref = new_con.push();

          var myMessRef = my_ref.child(contactId);
          var contactMessRef = contact_ref.child(curr.user_id);

          myMessRef.set({
          conversationId : new_con_ref.key(),
          messId1 : myMessRef.key(),
          messId2 : contactMessRef.key(),
          contact_name : contactName,
          contact_id : contactId
          });

          contactMessRef.set({
          conversationId : new_con_ref.key(),
          messId1 : contactMessRef.key(),
          messId2 : myMessRef.key(),
          contact_name : curr.name,
          contact_id : curr.user_id
          });

          $state.go('personalConversation',{
          conver_id : new_con_ref.key(),
          my_mess_id: myMessRef.key(),
          contact_mess_id: contactMessRef.key(),
          contact_id: contactId
          });

        }

    });
  };

  var contact_ref_not =  Ref.child('usersTest/'+contactId+'/notifications/'+curr.user_id);
  $scope.addFriend = function(){
    //console.log("We're gonna add a friend here...");
    contact_ref_not.set({
      contact_id : curr.user_id,
      contact_name : curr.name
    });
  };



  var my_ref_contacts = Ref.child('usersTest/'+curr.user_id+'/contacts/'+contactId);
  var contact_ref_contacts = Ref.child('usersTest/'+contactId+'/contacts/'+curr.user_id);
  var my_ref_not = Ref.child('usersTest/'+curr.user_id+'/notifications/'+contactId);

  my_ref_contacts.on('value',function(data){
    contact_ref_not.on('value',function(info){
      my_ref_not.on('value',function(snapshot){

        $scope.isMyFriend = function(){
                if(data.val() || info.val() || snapshot.val())
                  return false;
                return true;
        };
      });
    });
  });


  my_ref_not.on('value',function(data){
    $scope.requestSent = function(){
      if(data.val())
        return true;
      return false;
    };
  });

  $scope.respondRequest = function(){
    //console.log("Here we can accept a request");
    my_ref_contacts.set({
      contact_id : contactId,
      contact_name : contactName
    });

    contact_ref_contacts.set({
      contact_id : curr.user_id,
      contact_name : curr.name
    })

    my_ref_not.set(null);

  };

  $scope.ratingsObject2 = {
    iconOn: 'ion-ios-star',    //Optional
    iconOff: 'ion-ios-star-outline',   //Optional
    iconOnColor: 'rgb(200, 200, 100)',  //Optional
    iconOffColor:  'rgb(200, 100, 100)',    //Optional
    rating:  userId.rating, //Optional
    minRating:0,    //Optional
    readOnly: true, //Optional
    callback: function(rating) {    //Mandatory
      $scope.ratingsCallback(rating);
    }
  };

  $scope.ratingsCallback = function(rating) {
    console.log('profile: Selected rating is : ', rating);
  };

})
.controller('personalConversationCtrl', function($scope,$state,$firebaseArray,$ionicScrollDelegate,$ionicHistory,Ref,userId,$ionicPopover) {
   $scope.myGoBack = function() {
    $ionicHistory.goBack();
  };



  $scope.user = userId.data;

  var conver_id = $state.params.conver_id;
  var my_mess_id = $state.params.my_mess_id;
  var contact_mess_id = $state.params.contact_mess_id;
  var contact_id = $state.params.contact_id;

  //var users_ref = new Firebase("https://radiant-fire-9029.firebaseio.com/usersTest");
  //var users_ref = Ref.child('usersTest');
  console.log('personalConversationCtrl');
  console.log('my id: ',userId.id);
  console.log('contact id: ',contact_id);

  console.log('Conversation id: ',conver_id );
  console.log('my message id: ',my_mess_id);
  console.log('contact message id: ',contact_mess_id);

  var conver_ref = Ref.child('conversationsTest/'+ conver_id);
  var my_ref = Ref.child('usersTest/'+userId.id+'/last_messages/'+my_mess_id);
  var contact_ref = Ref.child('usersTest/'+contact_id+'/last_messages/'+contact_mess_id);

  $scope.messages = $firebaseArray(conver_ref);

  $scope.sendMessage = function(){

    $ionicScrollDelegate.scrollBottom();

    conver_ref.push().set({
          userName: $scope.user.name,
          userId: $scope.user.user_id,
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

    if($scope.user.user_id != id){

      console.log(id);
      $state.go('contactProfile',{
        contactId:id,
        contactName:name
      });

    }

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
    rating:  userId.rating, //Optional
    minRating: 0,    //Optional
    readOnly: false, //Optional
    callback: function(rating) {    //Mandatory
      $scope.ratingsCallback(rating);
      userId.rating=rating;
    }
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
