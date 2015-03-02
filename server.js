var express = require('express'),
    app = express(),
    fs = require('fs'),
    copyFile = require('fast-copy-file'),
    variables = require('./public/data/variables');

app.use(express.static(__dirname + '/public'));

app.listen(8898);

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


app.post('/', function(req, res) {
    var property,
        sassConf = '@import "bootstrap/variables";\n';
    for (var key in req.body ) {
        property = "$" + key + ':' + req.body[key] + ';\n';
        sassConf = sassConf + property;
    };
    fs.writeFile('styles/_bootstrap-variables.sass', sassConf, function (err) {
      if (err) throw err;
        console.log('_bootstrap-variables.sass is saved!');
        copyFile('styles/_bootstrap-variables.sass', 'public/users_data/_bootstrap-variables.sass', function (err) {
            if (err) console.log("Can't copy _bootstrap-variables.sass");
            console.log("_bootstrap-variables.sass copied");
        });
        var sass = require('node-sass');
        sass.render({
            file: 'styles/bootstrap.scss',
            success: function(renderObject){
                 fs.writeFile('public/bootstrap.css', renderObject.css, function (err) {
                      if (err) throw err;
                     console.log('bootstrap.css is generated');
                     res.send('OK');
                 });
            },
            error: function(error) { // starting v2.1 error is an Error-typed object
                // error is an object: v2 change
                console.log('message: '+error.message);
                console.log('status: '+error.status); // changed from code to status in v2.1
                console.log('line: '+error.line);
                console.log('column: '+error.column); // new in v2
                
                res.send(error.message);
            }
        });
    });
});