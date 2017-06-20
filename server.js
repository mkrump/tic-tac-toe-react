var https       = require('https');
var express     = require('express');
var path        = require('path');
var app         = express();
var port        = 3000;
var public_path = path.join(__dirname, 'public');

var logRequest = function(request) {
  var method = request.method;
  var url    = request.url;
  var params = JSON.stringify(request.params);
  var query  = JSON.stringify(request.query);

  console.log('Received request: ', [method, url, params, query].join("  "));
};

app.set('port', port);

app.use('/', express.static(public_path));

app.use(function requestLogger(request, response, next) {
  logRequest(request);
  next();
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(public_path, 'index.html'));
});

app.listen(process.env.PORT || app.get('port'), function() {
  console.log('React sample dev server started on port ' + app.get('port'));
});
