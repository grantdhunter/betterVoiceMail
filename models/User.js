var passwordHash = require('password-hash');
var logger = require("tracer").colorConsole();

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        name: DataTypes.STRING,
        stripeCustomerId: DataTypes.STRING
    }, {
        tableName: 'users',
        paranoid: true,
        classMethods: {
            associate: function (models) {
                User.hasOne(models.VoiceMail)
                User.hasMany(models.Message)
            }
        },
        hooks: {
            beforeCreate: function (user, option, done) {
                logger.log(user)
                user.password = passwordHash.generate(user.password);
                done();
            },
            beforeUpdate: function (user, option, done) {
                if (typeof user.password !== 'undefined') {
                    user.password = passwordHash.generate(user.password);
                }
                done();
            }
        }
    });


    return User;
};