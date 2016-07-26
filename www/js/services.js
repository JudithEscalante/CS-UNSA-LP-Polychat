angular.module('app.services', [])

//       CORDOVA Camera
.factory('Camera', function($q) {

   return {
      getPicture: function(options) {
         var q = $q.defer();
         navigator.camera.getPicture(function(result) {
            q.resolve(result);
         }, function(err) {
            q.reject(err);
         }, options);

         return q.promise;
      }
   }
})
// END - CORDOVA Camera

//     conectandon con FIREBASE
.factory('Ref', function($firebaseAuth, cfg) {
    return  new Firebase(cfg.firebase_url);
  })
.factory('Auth', function($firebaseAuth,cfg,Ref) {
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


.service('mydatabaseService', [function(){
  var mydatabaselist = [
                  {id_user:"1",
                    body:"bla bla bla bla bla bla bla bla",
                    name:"felpiña2",
                    date:"199999 de agosto",
                    img:"img/eso-no-porfavor.jpg",
                    country: "Perú",
                    city: "Arequipa"},

                  {id_user:"12",
                    body:" bla bla bla bla",
                    name:"pollo",
                    date:"2222222 de octubre",
                    img:"img/profile-image-1.jpg",
                    country: "Perú",
                    city: "Arequipa"},

                  {id_user:"13",
                    body:"ay ay ay ay ay ay ay ay",
                    name:"Marikita",
                    date:"11111 de agosto",
                    img:"img/profile-image-5.jpg",
                    country: "Perú",
                    city: "Arequipa"},

                  {id_user:"1",
                    body:"bla bla bla blabla bla bla blabla bla bla bla",
                    name:"pollino",
                    date:"5 de agosto",
                    img:"img/profile-image-3.jpg",
                    country: "Perú",
                    city: "Arequipa"},

                  {id_user:"19",
                    body:"bla bla bla",
                    name:"felpon",
                    date:"33333 de octubre",
                    img:"img/que.jpg",
                    country: "Perú",
                    city: "Arequipa"}
  ];
  return{
    database: function(){
       return mydatabaselist;
    }
  }

}])


.filter('searchContacts', function(){
  return function (items, query) {
    var filtered = [];
    var letterMatch = new RegExp(query, 'i');
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (query) {
        if (letterMatch.test(item.first_name.substring(0, query.length))) {
          filtered.push(item);
        }
      } else {
        filtered.push(item);
      }
    }
    return filtered;
  };
})




.service('BlankService', [function(){

}]);


//////////////// implementacion///////////////
