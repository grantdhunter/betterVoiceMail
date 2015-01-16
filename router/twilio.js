var express = require('express');
var twilio = require("twilio");
var logger = require("tracer").colorConsole();
var env = process.env.NODE_ENV;
var config = require(__dirname + '/../config/config.json')[env];
var models = require('../models');


var client = twilio(config.twilio.accountSid, config.twilio.authToken);


var router = express.Router({
    caseSensitive: true
});

router.post('/incomingCall', function (req, res, next) {
    logger.log(req.body);
    models.VoiceMail.find({
        where: {
            number: req.body.Called
        }
    }).complete(function (err, voiceMail) {

        var twiml = new twilio.TwimlResponse();

        twiml.say(voiceMail.welcomeMessage)
            .pause(1)
            .record({
                action: '/v1/twilio/saveMessage',
                playBeep: voiceMail.playBeep,
                maxLength: 300
            });

        res.writeHead(200, {
            'Content-Type': 'text/xml'
        });
        res.end(twiml.toString());

    });
});

router.post('/saveMessage', function (req, res, next) {
    logger.log(req.body);

    models.VoiceMail.find({
        where: {
            number: req.body.Called
        }
    }).complete(function (err, voiceMail) {

        models.Message.create({
            UserId: voiceMail.UserId,
            messageUrl: req.body.RecordingUrl,
            fromNumber: req.body.From,
            duration: req.body.RecordingDuration
        }).complete(function (err, message) {

            res.sendStatus(200);
        });
    });
});

module.exports = router;