var express = require('express');
var logger = require("tracer").colorConsole();
var env = process.env.NODE_ENV;
var config = require(__dirname + '/../config/config.json')[env];
var models = require('../models');

var router = express.Router({
    caseSensitive: true
});

router.get('/:id', function (req, res, next) {
    models.User.find({
        where: {
            id: req.body.params
        }
    }).complete(function (err, user) {
        if (err) {
            return res.send(err);
        }
        res.sendStatus(user);
    });
});

router.post('/create', function (req, res, next) {
    logger.log(req.body);
    models.User.create(req.body).complete(function (err, result) {
        if (err) {
            return res.send(err);
        }
        var welcomeMessage = config.defaultWelcomeMessage.split('#');
        welcomeMessage = welcomeMessage.join(req.body.name);

        logger.log(welcomeMessage);

        models.VoiceMail.create({
            UserId: result.id,
            welcomeMessage: welcomeMessage
        }).complete(function (err, result) {
            if (err) {
                return res.send(err);
            }
            res.sendStatus(200);
        });
    });
});

router.put('/:id/update', function (req, res, next) {
    models.update(req.body, {
        where: {
            id: req.params.id
        }
    }).complete(function (err, user) {
        if (err) {
            return res.send(err);
        }
        res.sendStatus(user);
    })
});

module.exports = router;