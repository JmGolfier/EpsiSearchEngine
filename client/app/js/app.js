var AngularApp = angular.module('AngularApp', [
    'searchControllers',
    'searchServices'
]);

AngularApp.config(['$routeProvider',
    function($routeProvider){
        $routeProvider.
            when('/home', {
                templateUrl: '/index.html',
                controller: 'search'
            });
}]);