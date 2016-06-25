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



  .service('mydatabaseService', [function(){
    var mydatabaselist = [
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
    return{
      database: function(){
         return mydatabaselist;
      }
    }

  }])


.service('BlankService', [function(){

}]);


//////////////// implementacion///////////////
