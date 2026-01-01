const { DataTypes } = require('sequelize');
const sequelize = require('../lib/db');

const ContactInfo = sequelize.define('ContactInfo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    officeName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Kantor Pusat'
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true
    },
    province: {
        type: DataTypes.STRING,
        allowNull: true
    },
    postalCode: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    weekdayHours: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '08.00 - 16.00 WIB'
    },
    weekendHours: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Tutup'
    },
    latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true
    },
    longitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: true
    }
}, {
    tableName: 'ContactInfo',
    timestamps: true,
    createdAt: false,
    updatedAt: 'updatedAt'
});

module.exports = ContactInfo;
