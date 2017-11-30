let http = require('http');
let express = require('express');
let exphbs = require('express-hbs');
let path = require('path');
// let hbsHelpers = require('./public/utils/handlebars-helpers');
let hbs = exphbs.create({
    defaultLayout: 'main',
    // helpers: hbsHelpers
});
// hbsHelpers.registerHelper(hbs);

// var engines = require('consolidate');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let app = express();

// view engine setup
app.engine('hbs', hbs.express4());
app.set('html', path.join(__dirname, '/html'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
//app.use(express.static(path.join(__dirname + '/public/html'), {index: false, redirect: false}));

app.use(function (req, res, next) {
   console.log('router-createnote request method and url: ', req.method, req.url);
   next();
});

//Routers
app.use('/', require('./routes/static-routes'));
app.use('/notes', require('./routes/note-routes'));
//app.use('/createnote/:id/', require('./routes/note-routes.js'));

//catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


let server = app.listen(3004, function () { // callback to console as info to user
    console.log('Sever running at http://localhost' + server.address().port)
});
module.exports = app;


