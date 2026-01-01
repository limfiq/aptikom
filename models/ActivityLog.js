const { DataTypes } = require('sequelize');
const sequelize = require('../lib/db');

const ActivityLog = sequelize.define('ActivityLog', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'admins',
            key: 'id'
        }
    },
    adminUsername: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    action: {
        type: DataTypes.ENUM('create', 'update', 'delete', 'login', 'logout'),
        allowNull: false
    },
    module: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: 'posts, events, banners, users, etc.'
    },
    recordId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: 'ID of the affected record'
    },
    details: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: 'Additional details about the action'
    },
    ipAddress: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    userAgent: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'activity_logs',
    timestamps: true,
    updatedAt: false, // Only createdAt needed for logs
    indexes: [
        {
            fields: ['adminId']
        },
        {
            fields: ['module']
        },
        {
            fields: ['action']
        },
        {
            fields: ['createdAt']
        }
    ]
});

module.exports = ActivityLog;
