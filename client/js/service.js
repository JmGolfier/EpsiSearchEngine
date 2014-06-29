var searchServices = angular.module('searchServices', ['ngResource']);

searchServices.factory('Search', ['$resource', '$location',
    function($resource, $location){
        return $resource(getUrl($location.host(), 'search/:query'), {}, {
            query: { method:'GET', isArray:false}
        });
    }]);

searchServices.factory('AutoComplete', ['$resource', '$location',
    function($resource, $location){
        return $resource(getUrl($location.host(), "autocomplete"), {}, {
            query: { method:'GET', isArray:true}
        });
    }]);

function getUrl(host, resource) {
    return "http://" + host + ":8080/" + resource;
}