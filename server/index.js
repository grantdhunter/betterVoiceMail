var express = require("express");
var cors = require('cors');
var bodyParser = require("body-parser");

var mysqlOptions = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'buzzerfull',
    port: 3306
};


var app = express();
var twilioRouter = require('./router/twilio');
var userRouter = require('./router/user')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));



app.use('/v1', cors({
    origin: true,
    methods: ['GET', 'PUT'],
    credentials: false,
    maxAge: 3600
}));
app.use('/v1/twilio', twilioRouter);
app.use('/v1/user', userRouter);

module.exports = app;