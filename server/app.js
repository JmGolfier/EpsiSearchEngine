var Server = require("./src/Server");
var Parser = require("./src/Parser");
var MongoDBDataProvider = require("./src/DataProvider/MongoDBDataProvider");
var AutoCompleteService = require("./src/AutoCompleteService");

var server = new Server(
    {
        port: 8080,
        dataProvider: new MongoDBDataProvider({
            url: "127.0.0.1:27017",
            databaseName: "nosql",
            parser: new Parser({"a": "Author", "t": "title", "sub": "subject"})
        }),
        autoCompleteService : new AutoCompleteService()
    });
server.run();

/*

 _id	:	53afcf652e504e126037ec3a
 meta:author	:	Maxime
 producer	:	Mac OS X 10.8.4 Quartz PDFContext
 Author	:	Maxime
 dc:title	:	Memoire
 meta:save-date	:	2013-08-27T06:46:14Z
 Last-Modified	:	2013-08-27T06:46:14Z
 xmp:CreatorTool	:	Pages
 dcterms:created	:	2013-08-27T06:46:14Z
 dc:subject	:
 dc:creator	:	Maxime
 creator	:	Maxime
 Creation-Date	:	2013-08-27T06:46:14Z
 subject	:
 meta:keyword	:
 Last-Save-Date	:	2013-08-27T06:46:14Z
 date	:	2013-08-27T06:46:14Z
 language	:	fr
 created	:	Tue Aug 27 08:46:14 CEST 2013
 title	:	Memoire
 modified	:	2013-08-27T06:46:14Z
 meta:creation-date	:	2013-08-27T06:46:14Z
 xmpTPg:NPages	:	105
 Keywords	:
 dcterms:modified	:	2013-08-27T06:46:14Z
 Content-Type	:	application/pdf

 */