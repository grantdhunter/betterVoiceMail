"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV;
var config = require(__dirname + '/../config/config.json')[env];

var logger = require("tracer").colorConsole();
config.logging = logger.log;


var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db = {};

fs.readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== basename);
    })
    .forEach(function (file) {
        var model = sequelize["import"](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.connect = function (cb) {
    sequelize.authenticate().complete(function (err) {
        if (!!err) {
            console.log('Unable to connect to the database:', err)
        } else {
            console.log('Connection has been established successfully.')
            sequelize.sync({force: true}).complete(function (err) {
                if (err) {
                    logger.log(err);
                } else {
                    logger.log("Synced");
                    cb();
                }
            });
        }
    });
}


module.exports = db;