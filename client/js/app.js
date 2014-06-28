var AngularApp = angular.module('AngularApp', [
    'ngRoute',
    'ngResource',
    'searchControllers',
    'searchServices'
]);

//AngularApp.config(['$routeProvider', function($routeProvider) {
//    $routeProvider.when('/home', {templateUrl: 'index.html', controller: 'SearchController'});
//    $routeProvider.otherwise({redirectTo: "/home"});
//}]);