var MongoClient = require('mongodb').MongoClient;

var MongoDBDataProvider = function (options) {
    this.databaseName = options.databaseName;
    this.mongoUri = "mongodb://" + options.url + "/" + this.databaseName;
    this._ensureIndex();
};

MongoDBDataProvider.prototype.get = function (filter, callback) {
    this._connect(function (collection, closeCallback) {
        collection.find({$text: {$search: filter.default, $language: "fr"}}).toArray(function(err, result) {
            if(err) throw err;
            callback(result);
            closeCallback();
        });
    });
};

MongoDBDataProvider.prototype._ensureIndex = function () {
    MongoClient.connect(this.mongoUri, function(err, db) {
        db.ensureIndex("pdfs", {contenu: "text"}, function(err, indexName) {
            if(err) throw err;
            console.log(indexName);
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