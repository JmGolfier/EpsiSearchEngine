var searchControllers = angular.module('searchControllers', []);

searchControllers.controller('search', ['$scope', 'Search',
    function($scope, Search){
        $scope.search = function () {
            var result = Search.$save({default : $scope.input});
        }
    }]);