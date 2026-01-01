const bcrypt = require('bcryptjs');
const { Admin } = require('../models');

async function seedSuperAdmin() {
    try {
        console.log('🔐 Seeding Super Admin...');

        // Check if super admin already exists
        const existingAdmin = await Admin.findOne({
            where: { username: 'superadmin' }
        });

        if (existingAdmin) {
            console.log('⚠️  Super admin already exists. Skipping...');
            return;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash('admin123', 10);

        // Create super admin
        const superAdmin = await Admin.create({
            username: 'superadmin',
            email: 'superadmin@aptikom.org',
            password: hashedPassword,
            role: 'super_admin',
            isActive: true
        });

        console.log('✅ Super admin created successfully!');
        console.log('');
        console.log('📋 Login Credentials:');
        console.log('   Username: superadmin');
        console.log('   Password: admin123');
        console.log('   Email: superadmin@aptikom.org');
        console.log('   Role: super_admin');
        console.log('');
        console.log('🔗 Login URL: http://localhost:3000/admin/login');
        console.log('');
        console.log('⚠️  IMPORTANT: Please change the password after first login!');
        console.log('');

        // Create additional demo admins
        const demoAdmins = [
            {
                username: 'admin',
                email: 'admin@aptikom.org',
                password: await bcrypt.hash('admin123', 10),
                role: 'admin',
                isActive: true
            },
            {
                username: 'editor',
                email: 'editor@aptikom.org',
                password: await bcrypt.hash('editor123', 10),
                role: 'editor',
                isActive: true
            }
        ];

        for (const adminData of demoAdmins) {
            const existing = await Admin.findOne({
                where: { username: adminData.username }
            });

            if (!existing) {
                await Admin.create(adminData);
                console.log(`✅ Demo ${adminData.role} created: ${adminData.username}`);
            }
        }

        console.log('');
        console.log('📝 All Admin Accounts:');
        console.log('   1. superadmin / admin123 (super_admin)');
        console.log('   2. admin / admin123 (admin)');
        console.log('   3. editor / editor123 (editor)');
        console.log('');

    } catch (error) {
        console.error('❌ Error seeding super admin:', error);
        throw error;
    }
}

// Run if called directly
if (require.main === module) {
    seedSuperAdmin()
        .then(() => {
            console.log('✅ Seeding completed!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('❌ Seeding failed:', error);
            process.exit(1);
        });
}

module.exports = seedSuperAdmin;
