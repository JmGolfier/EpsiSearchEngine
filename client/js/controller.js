var searchControllers = angular.module('searchControllers', []);

searchControllers.controller('SearchController', ['$scope', 'Search',
    function($scope, Search){
        $scope.search = function () {
            var search = new Search({default : $scope.input});
            $scope.result = search.$save();
        }
    }]);