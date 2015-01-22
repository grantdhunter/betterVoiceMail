angular.module('app.factories',[])

.factory('Messages', function($resource, Config){
    return $resource('/')
})