var SearchService = require("../src/SearchService");
var StubDataProvider = require("../src/DataProvider/StubDataProvider");

var testData = getTestData();

module.exports = {
    search_empty: function(assert) {
        var searchService = new SearchService({dataProvider: new StubDataProvider([])});
        searchService.search(null, function (result) {
            assert.same(result, []);
            assert.done();
        });
    },

    search_one_result: function(assert) {
        var searchService = new SearchService({dataProvider: new StubDataProvider(testData[0])});
        searchService.search({nom : "Payet"}, function (result) {
            assert.equal(result, testData[0]);
            assert.done();
        });
    }
};

function getTestData() {
    return [
        [{
            nom: "Payet",
            prenom: "Emmanuel",
            annee: 2013,
            contenu : "stuff"
        }]
    ];
}