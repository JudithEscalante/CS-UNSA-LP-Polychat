angular.module('app.services', [])



//     conectandon con FIREBASE

.factory('Ref', function($firebaseAuth, cfg) {
    return  new Firebase(cfg.firebase_url);
  })
.factory('Auth', function($firebaseAuth, cfg , Ref) {
    return $firebaseAuth(Ref);
  })
//end- conectandon con FIREBASE



//prueba
.factory('Auth2', [function() {
    var user;
    return {
        setUser: function(aUser){
          user=aUser;
        },
        isLoggedIn: function () {
          return(user)?user:false;
        }
    }
  }])





.service('BlankService', [function(){

}]);


//////////////// implementacion///////////////
