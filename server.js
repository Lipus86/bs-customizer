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
    var 
        grayLase = req.body.grayLase,
        grayDarker = req.body.grayDarker,
        grayDark = req.body.grayDark,
        gray = req.body.gray,
        grayLight = req.body.grayLight,
        grayLighter = req.body.grayLighter,
        brandPrimary = req.body.brandPrimary,
        brandSuccess = req.body.brandSuccess,
        brandInfo = req.body.brandInfo,
        brandWarning = req.body.brandWarning,
        brandDanger = req.body.brandDanger;
    var sassConf = 
                    '$gray-base:' + grayLase +
                    ';\n$gray-darker:' + grayDarker +
                    ';\n$gray-dark:' + grayDark +
                    ';\n$gray:' + gray +
                    ';\n$gray-light:' + grayLight +
                    ';\n$gray-lighter:' + grayLighter +
                    ';\n$brand-primary:' + brandPrimary +
                    ';\n$brand-success:' + brandSuccess +
                    ';\n$brand-info:' + brandInfo +
                    ';\n$brand-warning:' + brandWarning +
                    ';\n$brand-danger:' + brandDanger + ';';
    fs.writeFile('styles/_bootstrap-variables.sass', sassConf, function (err) {
      if (err) throw err;
      console.log('It\'s saved!');
        var sass = require('node-sass');
        sass.render({
            file: 'styles/all.scss',
            success: function(renderObject){
                 fs.writeFile('public/all.css', renderObject.css, function (err) {
                      if (err) throw err;
                     console.log('all.css is saved');
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