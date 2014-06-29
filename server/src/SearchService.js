var fs = require("fs");
var sys = require("sys");
var exec = require('child_process').exec;

var SearchService = function (options) {
    this.dataProvider = options.dataProvider;
    this.autoCompleteService = options.autoCompleteService;
    this.pdfFolder = options.pdfFolder;
    this.addPdfPythonFile = options.addPdfPythonFile;
};

SearchService.prototype.search = function(queryString, callback) {
    var self = this;
    this.dataProvider.get(queryString, function(result) {
        callback(result);
        self.saveQueryRedis(queryString);
    });
};

SearchService.prototype.addPdf = function(fileInfo, callback) {
    var self = this;
    var destination = this.pdfFolder + fileInfo.name;
    fs.rename(fileInfo.path, destination, function (err) {
        if(err) throw err;
        self.addJobPdf(fileInfo.name, callback);
    });
};

SearchService.prototype.addJobPdf = function(fileName, callback) {
    exec("python '" +  this.addPdfPythonFile + "' " + fileName, function(err, stdout, stderr) {
        if(err) throw err;
        sys.puts(stdout);
        callback();
    });
};

SearchService.prototype.saveQueryRedis = function (queryString) {
    this.autoCompleteService.add(queryString);
};

module.exports = SearchService;