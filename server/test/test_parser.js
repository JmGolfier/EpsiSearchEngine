var Parser = require("../src/Parser");
var parser;

module.exports = {

    setUp: function(callback) {
        parser = new Parser({"a": "Author", "t": "Title"});
        callback();
    },

    test_noBang: function(assert) {
        var result = parser.parse("toto");
        assert.same({default: "toto"}, result);
        assert.done();
    },

    test_author_bang: function(assert) {
        var result = parser.parse("toto !a");
        assert.same({Author: "/toto/"}, result);
        assert.done();
    },

    test_title_bang: function(assert) {
        var result = parser.parse("toto !t");
        assert.same({Title: "/toto/"}, result);
        assert.done();
    }
};
