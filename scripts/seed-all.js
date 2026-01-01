const seedBanners = require('./seed-banners');
const seedContact = require('./seed-contact');
const seedSuperAdmin = require('./seed-superadmin');

async function seedAll() {
    console.log('🌱 Starting comprehensive database seeding...\n');

    try {
        // Seed Super Admin (must be first for admin access)
        await seedSuperAdmin();

        // Seed Banners
        await seedBanners();

        // Seed Contact Info
        await seedContact();

        console.log('\n✅ All seeding completed successfully!');
        console.log('\n📋 Summary:');
        console.log('   ✅ Admin accounts created (superadmin, admin, editor)');
        console.log('   ✅ Banners seeded');
        console.log('   ✅ Contact info seeded');
        console.log('\n🔗 Quick Links:');
        console.log('   Admin Login: http://localhost:3000/admin/login');
        console.log('   Website: http://localhost:3000');
        console.log('\n🔐 Default Credentials:');
        console.log('   Super Admin: superadmin / admin123');
        console.log('   Admin: admin / admin123');
        console.log('   Editor: editor / editor123');
        console.log('');

        process.exit(0);
    } catch (error) {
        console.error('\n❌ Seeding failed:', error);
        process.exit(1);
    }
}

seedAll();
