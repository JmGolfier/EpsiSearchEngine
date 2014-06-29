var AngularApp = angular.module('AngularApp', [
    'ngRoute',
    'ngResource',
    'ui.bootstrap',
    'searchControllers',
    'searchServices',
    'searchFilters'
]);

//AngularApp.config(['$routeProvider', function($routeProvider) {
//    $routeProvider.when('/home', {templateUrl: 'index.html', controller: 'SearchController'});
//    $routeProvider.otherwise({redirectTo: "/home"});
//}]);