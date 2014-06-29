var redis = require('redis');


var AutoCompleteService = function() {
    this.redisClient = redis.createClient();
};

AutoCompleteService.prototype.add = function(query) {
    this.redisClient.zincrby('autocomplete', 1, query);
};

AutoCompleteService.prototype.get = function(callback) {
    this.redisClient.zrangebyscore(['autocomplete', '-inf', '+inf'], function (err, results) {
        if(err) throw err;
        callback(results.reverse());
    });
};

module.exports = AutoCompleteService;