var express = require("express");
var bodyParser = require('body-parser');
var jsonFormat = require("json-format");
var fs = require("fs");
var BSON = require("bson");
var cors = require('cors');
var earcut = require('earcut');
var xmlBeautify = require('xml-beautifier');
var opn = require('opn');
var app = express();


app.use('/', express.static(__dirname));
app.use(cors());
var jsonParsor = bodyParser.json();
app.use(bodyParser.json({limit: '1gb'}));
app.use(bodyParser.raw({
  limit: '1gb' }));
app.use(bodyParser.text({limit: '1gb'}));

var server = app.listen(8080, function() {

  console.log('IndoorGML-Editor App listening on port 8080...');
  opn('http://127.0.0.1:8080/', {app: 'chrome'});

});


app.post('/save-json', function(req, res) {

  fs.writeFile('./output/output.json', jsonFormat(req.body), 'utf8', function(err) {

    if (err) return res.status(500).send(err);
    res.json('success');

  });
});


app.post('/save-project', function(req, res) {

  var bson = new BSON();
  var data = bson.serialize(req.body.doc);

  fs.writeFile(req.body.path, data, function(err) {

    if (err)  return res.status(500).send(err);

    res.json('success');

  });

});

app.get('/load-project', function(req, res) {

  var bson = new BSON();

  fs.readFile('./output/save-project.bson', function(err, data) {

    if (err) return res.status(500).send(err);

    var bson = new BSON();
    var json = bson.deserialize(data);
    res.json(json);

  });

});

app.post('/save-gml/*', function(req, res) {

  fs.writeFile('./output/'+ req.params[0] +'.gml', xmlBeautify(req.body) , function(err) {

    if (err)  return res.status(500).send(err);

    res.send('/output/'+ req.params[0] +'.gml');

  });
});

app.post('/xml-to-json', function(req,res){
  var IndoorGML_Core_1_0_3 = require('./json/IndoorGML_Core_1_0_3.js').IndoorGML_Core_1_0_3;
  var Jsonix = require('jsonix').Jsonix;
  var context = new Jsonix.Context([IndoorGML_Core_1_0_3]);
  var unmarshaller = context.createUnmarshaller();

  var resume = unmarshaller.unmarshalFile(req.body, function(result) {
  		res.send(JSON.stringify(result, null, 1));
  	});
});

app.post('/convert-bson-to-json', function(req, res){

  var buffer = new Buffer(req.body, "binary");
  var bson = new BSON();
  var json = bson.deserialize(buffer);
  res.send(json);

});

app.post('/triangulate', function(req, res){

  var triangles = earcut(req.body);
  res.send(triangles);

});
