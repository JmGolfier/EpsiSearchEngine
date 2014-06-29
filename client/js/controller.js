var searchControllers = angular.module('searchControllers', []);

searchControllers.controller('SearchController', ['$scope', 'Search', 'AutoComplete',
    function($scope, Search, AutoComplete){

        $scope.previousSearches = AutoComplete.query();

        $scope.search = function () {
            if($scope.input) {
                Search.query({query: $scope.input}, function (result) {
                    $scope.result = result;
                    $scope.previousSearches = AutoComplete.query();
                });
            }
        }
    }]);