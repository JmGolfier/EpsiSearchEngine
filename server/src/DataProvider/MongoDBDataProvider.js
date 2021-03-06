var MongoClient = require('mongodb').MongoClient;

var MongoDBDataProvider = function (options) {
    this.parser = options.parser;
    this.databaseName = options.databaseName;
    this.mongoUri = "mongodb://" + options.url + "/" + this.databaseName;
    this._ensureIndex();
};

MongoDBDataProvider.prototype.get = function (queryString, callback) {
    var self = this;
    if(!queryString)
        callback({});
    else {
        this._connect(function (collection, closeCallback) {
            var query = self.parser.parse(queryString);

            if (query.default)
                collection.find({
                        $text: {
                            $search: query.default,
                            $language: "fr"
                        }
                    },
                    {score: {$meta: "textScore"}
                }).sort({
                    score: {
                        $meta: "textScore"
                    }}
                ).toArray(resultCallback);
            else
                collection.find(query).toArray(resultCallback);

            function resultCallback(err, results) {
                if (err) throw err;
                callback({results: results});
                closeCallback();
            }
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