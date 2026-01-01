const { Banner, sequelize } = require('../models');

async function seedBanners() {
    try {
        // Sync database
        await sequelize.sync({ alter: true });
        console.log('Database synced successfully');

        // Clear existing banners
        await Banner.destroy({ where: {} });
        console.log('Cleared existing banners');

        // Create sample banners
        const banners = [
            {
                title: 'Memajukan Pendidikan Tinggi Informatika & Komputer',
                subtitle: 'Bergabunglah bersama kami dalam membangun ekosistem pendidikan teknologi yang unggul, inovatif, dan berdaya saing global untuk masa depan Indonesia.',
                backgroundImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
                buttonText: 'Daftar Anggota',
                buttonLink: 'https://dias.aptikom.org/',
                order: 1,
                isActive: true
            },
            {
                title: 'Kolaborasi untuk Pendidikan Berkualitas',
                subtitle: 'Bersama 850+ institusi anggota di 34 provinsi, kami berkomitmen meningkatkan standar pendidikan informatika dan komputer di Indonesia.',
                backgroundImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
                buttonText: 'Pelajari Lebih Lanjut',
                buttonLink: '/about',
                order: 2,
                isActive: true
            },
            {
                title: 'Mencetak Talenta Digital Unggul',
                subtitle: 'Melalui kurikulum berbasis OBE dan KKNI, kami mempersiapkan lulusan yang siap menghadapi tantangan industri 4.0 dan era digital.',
                backgroundImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
                buttonText: 'Lihat Program',
                buttonLink: '/programs',
                order: 3,
                isActive: true
            }
        ];

        await Banner.bulkCreate(banners);
        console.log('✅ Successfully created 3 sample banners');

        // Display created banners
        const createdBanners = await Banner.findAll({ raw: true });
        console.log('\nCreated banners:');
        createdBanners.forEach((banner, index) => {
            console.log(`${index + 1}. ${banner.title}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Error seeding banners:', error);
        process.exit(1);
    }
}

seedBanners();
