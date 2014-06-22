var searchServices = angular.module('searchServices', ['ngResource']);

searchServices.factory('Search', ['$resource',
    function($resource){
        return $resource('http://127.0.0.1:8080/search', {}, {
            query: { method:'GET', isArray:true}
        });
}]);