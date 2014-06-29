var searchServices = angular.module('searchServices', ['ngResource']);

//searchServices.factory('Search', ['$resource', '$location',
//    function($resource, $location){
//        return $resource(getUrl($location.host(), 'search/:query'), {}, {
//            query: { method:'GET', isArray:false}
//        });
//}]);
//
//searchServices.factory('AutoComplete', ['$resource', '$location',
//    function($resource, $location){
//        return $resource(getUrl($location.host(), "autocomplete"), {}, {
//            query: { method:'GET', isArray:true}
//        });
//    }]);

searchServices.factory('Search', ['$resource', '$location',
    function($resource, $location){
        return {
            query: function(query, callback) {
                var lipsum = {
                    Author: "manu",
                    title: "Tiiiiitle",
                    created: "15-10-1922",
                    fileName: "le titre",
                    contenu: "Contrairement à une opinion répandue, le Lorem Ipsum n'est pas simplement du texte aléatoire. Il trouve ses racines dans une oeuvre de la littérature latine classique datant de 45 av. J.-C., le rendant vieux de 2000 ans. Un professeur du Hampden-Sydney College, en Virginie, s'est intéressé à un des mots latins les plus obscurs, consectetur, extrait d'un passage du Lorem Ipsum, et en étudiant tous les usages de ce mot dans la littérature classique, découvrit la source incontestable du Lorem Ipsum. Il provient en fait des sections 1.10.32 et 1.10.33 du 'De Finibus Bonorum et Malorum' (Des Suprêmes Biens et des Suprêmes Maux) de Cicéron. Cet ouvrage, très populaire pendant la Renaissance, est un traité sur la théorie de l'éthique. Les premières lignes du Lorem Ipsum, 'Lorem ipsum dolor sit amet...', proviennent de la section 1.10.32. L'extrait standard de Lorem Ipsum utilisé depuis le XVIè siècle est reproduit ci-dessous pour les curieux. Les sections 1.10.32 et 1.10.33 du 'De Finibus Bonorum et Malorum' de Cicéron sont aussi reproduites dans leur version originale, accompagnée de la traduction anglaise de H. Rackham (1914)."
                };
                var lipsum2 = {
                    Author: "manu",
                    title: "Tiiiiitle",
                    created: "15-10-1922",
                    fileName: "le titre",
                    contenu: "Contrairement à une opinion répandue, le Lorem Ipsum n'est pas simplement du texte aléatoire. Il trouve ses racines dans une oeuvre de la littérature latine classique datant de 45 av. J.-C., le rendant vieux de 2000 ans. Un professeur du Hampden-Sydney College, en Virginie, s'est intéressé à un des mots latins les plus obscurs, consectetur, extrait d'un passage du Lorem Ipsum, et en étudiant tous les usages de ce mot dans la littérature classique, découvrit la source incontestable du Lorem Ipsum. Il provient en fait des sections 1.10.32 et 1.10.33 du 'De Finibus Bonorum et Malorum' (Des Suprêmes Biens et des Suprêmes Maux) de Cicéron. Cet ouvrage, très populaire pendant la Renaissance, est un traité sur la théorie de l'éthique. Les premières lignes du Lorem Ipsum, 'Lorem ipsum dolor sit amet...', proviennent de la section 1.10.32. L'extrait standard de Lorem Ipsum utilisé depuis le XVIè siècle est reproduit ci-dessous pour les curieux. Les sections 1.10.32 et 1.10.33 du 'De Finibus Bonorum et Malorum' de Cicéron sont aussi reproduites dans leur version originale, accompagnée de la traduction anglaise de H. Rackham (1914)."
                };
                var data = {
                    results: [lipsum, lipsum2]
                };
                callback(data);
            }
        }
    }]);

searchServices.factory('AutoComplete', ['$resource', '$location',
    function($resource, $location){
        return {
            query: function(query, callback) {
                return ["stfuuuu"];
            }
        }
    }]);

function getUrl(host, resource) {
    return "http://" + host + ":8080/" + resource;
}