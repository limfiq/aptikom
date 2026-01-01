const { sequelize, Admin } = require('../models');
const { hashPassword } = require('../lib/auth');

async function seedAdmin() {
    try {
        // Sync database
        await sequelize.sync();
        console.log('Database synced successfully');

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ where: { username: 'admin' } });

        if (existingAdmin) {
            console.log('Admin user already exists');
            return;
        }

        // Create admin user
        const hashedPassword = await hashPassword('admin123');

        const admin = await Admin.create({
            username: 'admin',
            email: 'admin@aptikom.or.id',
            password: hashedPassword,
            role: 'admin',
            isActive: true
        });

        console.log('Admin user created successfully:');
        console.log('Username:', admin.username);
        console.log('Email:', admin.email);
        console.log('Password: admin123');
        console.log('\n⚠️  Please change the password after first login!');

    } catch (error) {
        console.error('Error seeding admin:', error);
    } finally {
        await sequelize.close();
    }
}

seedAdmin();
