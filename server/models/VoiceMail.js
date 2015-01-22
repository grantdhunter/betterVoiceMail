var logger = require("tracer").colorConsole();

module.exports = function (sequelize, DataTypes) {
    var VoiceMail = sequelize.define("VoiceMail", {
        number: DataTypes.STRING,
        welcomeMessage: {
            type: DataTypes.STRING,
            defaultValue: "Hello, you have reached a voice mail. Please leave a message."
        },
        welcomMessageUrl: DataTypes.STRING,
        playBeep: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        tableName: 'VoiceMails',
        paranoid: true,
        classMethods: {
            associate: function (models) {
                VoiceMail.belongsTo(models.User)
            }
        },
        hooks: {}
    });

    return VoiceMail;
};