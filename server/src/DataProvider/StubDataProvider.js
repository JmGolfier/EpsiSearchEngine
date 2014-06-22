var StubDataProvider = function (data) {
    this.data = data;
};

StubDataProvider.prototype.get = function (filter, callback) {
    callback(this.data);
};

module.exports = StubDataProvider;