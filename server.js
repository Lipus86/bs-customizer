var express = require('express'),
    app = express(),
    fs = require('fs');

app.use(express.static(__dirname + '/public'));

app.listen(8898);

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


app.post('/', function(req, res) {
    var sassConf = 
                    '$gray-base:' + req.body.grayLase +
                    ';\n$gray-darker:' + req.body.grayDarker +
                    ';\n$gray-dark:' + req.body.grayDark +
                    ';\n$gray:' + req.body.gray +/*
                    ';\n$gray-light:' + req.body.grayLight +
                    ';\n$gray-lighter:' + req.body.grayLighter +
                    ';\n$brand-primary:' + req.body.brandPrimary +
                    ';\n$brand-success:' + req.body.brandSuccess +
                    ';\n$brand-info:' + req.body.brandInfo +
                    ';\n$brand-warning:' + req.body.brandWarning +
                    ';\n$brand-danger:' + req.body.brandDanger +*/ ';';
    fs.writeFile('styles/_bootstrap-variables.sass', sassConf, function (err) {
      if (err) throw err;
      console.log('It\'s saved!');
        var sass = require('node-sass');
        sass.render({
            file: 'styles/bootstrap.scss',
            success: function(renderObject){
                 fs.writeFile('public/bootstrap.css', renderObject.css, function (err) {
                      if (err) throw err;
                     console.log('bootstrap.css is saved');
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