var MongoClient = require('mongodb').MongoClient;

var MongoDBDataProvider = function (options) {
    this.databaseName = options.databaseName;
    this.mongoUri = "mongodb://" + options.url + this.databaseName;
    this._ensureIndex();
};

MongoDBDataProvider.prototype.get = function (filter, callback) {
    this._connect(function (collection, closeCallback) {
        collection.find({$text: {$search: filter.default, $language: "fr"}}, function(err, result) {
            if(err) throw err;
            callback(result);
            closeCallback();
        });
    });
    callback(filter);
};

MongoDBDataProvider.prototype._connect = function(callback) {
    var self = this;
    MongoClient.connect(this.mongoUri, function(err, db) {
        if(err) throw err;
        var collection = db.collection(self.databaseName);
        callback(collection, function() {
            db.close();
        });
    });
};

MongoDBDataProvider.prototype._ensureIndex = function () {
    this._connect(function (collection, closeCallback) {
        collection.ensureIndex({contenu: "text"});
        closeCallback();
    });
};

module.exports = MongoDBDataProvider;