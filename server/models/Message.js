module.exports = function (sequelize, DataTypes) {
    var Message = sequelize.define("Message", {
        messageUrl: DataTypes.STRING,
        fromNumber: DataTypes.STRING,
        duration: DataTypes.INTEGER
    }, {
        tableName: 'Messages',
        paranoid: true,
        classMethods: {
            associate: function (models) {
                Message.belongsTo(models.User)
            }
        }
    });

    return Message;
};