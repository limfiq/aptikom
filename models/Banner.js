const { DataTypes } = require('sequelize');
const sequelize = require('../lib/db');

const Banner = sequelize.define('Banner', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subtitle: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    backgroundImage: {
        type: DataTypes.STRING,
        allowNull: true
    },
    buttonText: {
        type: DataTypes.STRING,
        allowNull: true
    },
    buttonLink: {
        type: DataTypes.STRING,
        allowNull: true
    },
    order: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'Banner',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
});

module.exports = Banner;
