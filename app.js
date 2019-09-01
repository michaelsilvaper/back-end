var http = require('http'),
    path = require('path'),
    methods = require('methods'),
    express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cors = require('cors'),
    passport = require('passport'),
    errorhandler = require('errorhandler'),
    mongoose = require('mongoose');

var { User, Role } = require('./app/models/mysql');

var isProduction = process.env.NODE_ENV === 'production';

// Create global app object
var app = express();

app.use(cors());

// Normal express config defaults
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Role.create({label: "Administrator", code: "admin", permissions: 999});
//User.create({ name: 'Michael Silva', email: 'michael@silvaper.me', idrole: 2, password: '12345', salt: "12345" });

app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'silvaper', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));

if (!isProduction) {
  app.use(errorhandler());
}

if(isProduction){
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect('mongodb://ec2-3-15-227-251.us-east-2.compute.amazonaws.com:27017/silvaper?authMechanism=SCRAM-SHA-1&authSource=admin', {
    auth: {
      user: 'silvaper',
      password: '$ilv49eR'
    },
    useNewUrlParser: true,
    useFindAndModify: false
  });
  mongoose.set('debug', false);

}

require('./app/models/mongo/ConversationFlow');
require('./config/passport');


var CsvUtil = require('./app/utils').CsvUtil;
CsvUtil.loadCsv('assets/file.csv', true);

app.use(require('./app/routes'));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});

// finally, let's start our server...
var server = app.listen( process.env.PORT || 3000, function(){
  console.log('Listening on port ' + server.address().port);
});
