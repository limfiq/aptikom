const { Achievement, Partner } = require('../models');

async function syncNewTables() {
    try {
        console.log('🔄 Syncing Achievement & Partner tables...');

        // Sync tables
        await Achievement.sync({ force: true });
        console.log('✅ Achievement table created');

        await Partner.sync({ force: true });
        console.log('✅ Partner table created');

        // Add dummy data for Achievement
        await Achievement.bulkCreate([
            {
                title: 'Juara 1 Kompetisi Coding Nasional',
                description: 'Tim mahasiswa perwakilan APTIKOM berhasil meraih juara 1 dalam kompetisi coding tingkat nasional tahun 2024.',
                date: new Date('2024-12-15'),
                category: 'Nasional',
                image: '/uploads/achievement-1.jpg',
                order: 1
            },
            {
                title: 'Penghargaan Asosiasi Terbaik',
                description: 'APTIKOM mendapatkan penghargaan sebagai asosiasi profesi terbaik di bidang informatika.',
                date: new Date('2024-11-20'),
                category: 'Penghargaan',
                image: '/uploads/achievement-2.jpg',
                order: 2
            },
            {
                title: 'Akreditasi Internasional',
                description: 'Beberapa prodi anggota APTIKOM berhasil meraih akreditasi internasional.',
                date: new Date('2024-10-10'),
                category: 'Internasional',
                image: '/uploads/achievement-3.jpg',
                order: 3
            }
        ]);
        console.log('✅ Created dummy achievements');

        // Add dummy data for Partners
        await Partner.bulkCreate([
            {
                name: 'Kemendikbud Ristek',
                logo: '/uploads/partner-1.png',
                website: 'https://kemdikbud.go.id',
                order: 1
            },
            {
                name: 'Kominfo',
                logo: '/uploads/partner-2.png',
                website: 'https://kominfo.go.id',
                order: 2
            },
            {
                name: 'BRIN',
                logo: '/uploads/partner-3.png',
                website: 'https://brin.go.id',
                order: 3
            },
            {
                name: 'Google Indonesia',
                logo: '/uploads/partner-4.png',
                website: 'https://google.com',
                order: 4
            },
            {
                name: 'Microsoft Indonesia',
                logo: '/uploads/partner-5.png',
                website: 'https://microsoft.com',
                order: 5
            }
        ]);
        console.log('✅ Created dummy partners');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error syncing tables:', error);
        process.exit(1);
    }
}

syncNewTables();
