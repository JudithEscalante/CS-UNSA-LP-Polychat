angular.module('app.services', [])



// .factory('BlankFactory', [function(){
// }])


/*.factory('Auth', function (rootRef, $firebaseAuth) {
  return $firebaseAuth(rootRef);
})
//Auth.$inject = ['rootRef', '$firebaseAuth']
*/
.factory('Auth', function($firebaseAuth, cfg) {
    var ref = new Firebase(cfg.firebase_url);
    return $firebaseAuth(ref);
  })


.service('BlankService', [function(){

}]);


//////////////// implementacion///////////////
