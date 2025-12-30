const { sequelize } = require('../models');

async function syncDatabase() {
    try {
        await sequelize.sync({ alter: true });
        console.log('Database synchronized successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error synchronizing database:', error);
        process.exit(1);
    }
}

syncDatabase();
