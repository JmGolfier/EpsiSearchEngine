var restify = require("restify");

var server, client;

module.eports = {
    setUp: function(callback) {
        server = new Server({port: 8081});
        client = restify.createJsonClient({url: "http://localhost:8081"});
        callback();
    },

    teardown: function(callback) {
        server.close();
        client.close();
    }
};