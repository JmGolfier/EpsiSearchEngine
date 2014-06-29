var SearchService = require("./SearchService");
var restify = require("restify");

var Server = function (options) {
    this.port = options.port;
    this.searchService = new SearchService({dataProvider: options.dataProvider});
    this._createServer();
    this._addRoutes();
};

Server.prototype.run = function () {
    var self = this;
    this.server.listen(this.port, function() {
        console.log("Server listening at http://localhost:%s", self.port);
    });
};

Server.prototype.close = function () {
    this.server.close();
};

Server.prototype._addRoutes = function () {
    var self = this;
    this.server.get("/search/:query", function (req, res) {
        self.searchService.search(req.query, function(result) {
            res.send(result);
        });
    });
};

Server.prototype._createServer = function () {
    this.server = restify.createServer();
    this.server.use(restify.bodyParser({ mapParams: false }));
    this.server.use(
        function crossOrigin(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            return next();
        }
    );
};

module.exports = Server;