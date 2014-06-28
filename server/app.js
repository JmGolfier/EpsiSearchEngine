var Server = require("./src/Server");
var MongoDBDataProvider = require("./src/DataProvider/MongoDBDataProvider");

var server = new Server(
    {
        port: 8080,
        dataProvider: new MongoDBDataProvider({
            url: "127.0.0.1:27017",
            databaseName: "nosql"
        })
    });
server.run();