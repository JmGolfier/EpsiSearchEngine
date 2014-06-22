var restify = require("restify");
var StubDataProvider = require("../src/DataProvider/StubDataProvider");
var Server = require("../src/Server");

var server, client;

module.exports = {
    setUp: function(callback) {
        client = new restify.createJsonClient({url: "http://localhost:8081"});
        callback();
    },

    tearDown: function(callback) {
        client.close();
        server.close();
        callback();
    },

    search_empty: function(assert) {
        server = new Server({port: 8081, dataProvider: new StubDataProvider([])});
        server.run();
        client.post("/search", null, function (err, res, req, obj) {
            assert.same(obj, []);
            assert.done();
        });
    }
};