module.exports = (sequelize, Sequelize) => {
    const Thrift = sequelize.define("thrift", {
        id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        name: {type: Sequelize.STRING(255), allowNull: false},
        content: {type: Sequelize.TEXT, allowNull: false},
        city: {type: Sequelize.STRING(255), allowNull: false},
        address: {type: Sequelize.STRING(255), allowNull: false},
        hours: {type: Sequelize.STRING(255), allowNull: false},
        instagram: {type: Sequelize.STRING(255), allowNull: true},
        facebook: {type: Sequelize.STRING(255), allowNull: true},
        tel: {type: Sequelize.STRING(255), allowNull: false},
        style: {type: Sequelize.STRING(255), allowNull: false},
        desc: {type: Sequelize.STRING(255), allowNull: false},
        thumbnail: {type: Sequelize.STRING(255), allowNull: false},
        pic1: {type: Sequelize.STRING(255), allowNull: true},
        pic2: {type: Sequelize.STRING(255), allowNull: true},
        pic3: {type: Sequelize.STRING(255), allowNull: true},
        pic4: {type: Sequelize.STRING(255), allowNull: true},
    });
    return Thrift;
};