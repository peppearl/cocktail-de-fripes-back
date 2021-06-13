module.exports = (sequelize, Sequelize) => {
    const News = sequelize.define("news", {
        id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        title: {type: Sequelize.STRING(255), allowNull: false},
        content: {type: Sequelize.TEXT, allowNull: false},
        category: {type: Sequelize.STRING(255), allowNull: false},
        desc: {type: Sequelize.STRING(255), allowNull: false},
        thumbnail: {type: Sequelize.STRING(255), allowNull: false},
        date: {type: Sequelize.STRING(255), allowNull: false}
    });
    return News;
};