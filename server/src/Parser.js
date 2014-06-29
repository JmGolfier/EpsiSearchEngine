var Parser = function(bangs) {
    this.bangs = bangs;
};

Parser.prototype.parse = function(query) {
    var split = query.split("!");
    if (split.length == 1)
        return {default: query};
    var request = {};
    var key = this.bangs[split[1].trim()];
    request[key] = new RegExp(split[0].trim());
    return request;
};

module.exports = Parser;