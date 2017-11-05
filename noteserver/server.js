var http = require('http');
var express = require('express');
var exphbs = require('express-hbs');
var hbsHelpers = require('./utils/helpers.js');
var hbs = exphbs.create({
    defaultLayout: 'main',
    helpers: hbsHelpers
});
hbsHelpers.registerHelper(hbs);
var path = require('path');
// var engines = require('consolidate');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.engine('hbs', hbs.express4());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

//Routers
app.use('/', require('./routes/route-index.js'));
app.use('/createnote', require('./routes/route-createnote.js'));

//catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


var server = app.listen(3004, function () { // callback to console as info to user
    console.log('Sever running at http://localhost' + server.address().port)
});
module.exports = app;


