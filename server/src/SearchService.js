var SearchService = function (options) {
    if(options)
        this.dataProvider = options.dataProvider;
};

SearchService.prototype.search = function(filter, callback) {
    this.dataProvider.get(filter, function(result) {
        callback(result);
    });
};

module.exports = SearchService;