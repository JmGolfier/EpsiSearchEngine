var searchServices = angular.module('searchServices', ['ngResource']);

searchServices.factory('Search', ['$resource',
    function($resource){
        return $resource('http://localhost:8080/search/:query', {}, {
            query: { method:'GET', isArray:false}
        });
}]);

searchServices.factory('AutoComplete', ['$resource',
    function($resource){
        return $resource('http://localhost:8080/autocomplete', {}, {
            query: { method:'GET', isArray:true}
        });
    }]);