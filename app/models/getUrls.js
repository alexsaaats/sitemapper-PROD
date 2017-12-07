'use strict';

module.exports = (sequelize, DataTypes) => {
    // Define sequelize model for the URLs

    const siteCode = sequelize.define('siteurls', {
        URLid: DataTypes.INTEGER,
        URL: DataTypes.STRING,
        statusCode: DataTypes.STRING,
        screenshotPath: DataTypes.STRING
    });

    return siteCode;
};