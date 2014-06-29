var MongoClient = require('mongodb').MongoClient;

var MongoDBDataProvider = function (options) {
    this.parser = options.parser;
    this.databaseName = options.databaseName;
    this.mongoUri = "mongodb://" + options.url + "/" + this.databaseName;
    this._ensureIndex();
    this.autoCompleteService = options.autoCompleteService;
};

MongoDBDataProvider.prototype.saveQueryRedis = function (queryString) {
    this.autoCompleteService.add(queryString);
};

MongoDBDataProvider.prototype.get = function (queryString, callback) {
    var self = this;
    if(!queryString)
        callback({});
    else {
        this._connect(function (collection, closeCallback) {
            var query = self.parser.parse(queryString);
            if (query.default)
                query = {$text: {$search: query.default, $language: "fr"}};

            collection.find(query).toArray(function (err, result) {
                if (err) throw err;
                callback({results: result});
                closeCallback();
                self.saveQueryRedis(queryString);
            });
        });
    }
};

MongoDBDataProvider.prototype._ensureIndex = function () {
    MongoClient.connect(this.mongoUri, function(err, db) {
        db.ensureIndex("pdfs", {contenu: "text"}, function(err, indexName) {
            if(err) throw err;
            db.close();
        });
    });
};

MongoDBDataProvider.prototype._connect = function(callback) {
    MongoClient.connect(this.mongoUri, function(err, db) {
        if(err) throw err;
        var collection = db.collection("pdfs");
        callback(collection, function() {
            db.close();
        });
    });
};

module.exports = MongoDBDataProvider;