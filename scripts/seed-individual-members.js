const { IndividualMember } = require('../models');

async function seedIndividualMembers() {
    try {
        console.log('👥 Seeding Individual Members...');

        // Check if data already exists
        const count = await IndividualMember.count();
        if (count > 0) {
            console.log('⚠️  Individual members already exist. Skipping...');
            return;
        }

        const members = [
            {
                employeeNumber: 'APT-001',
                name: 'Dr. Budi Santoso, M.Kom.',
                affiliation: 'Universitas Brawijaya',
                studyProgram: 'Teknik Informatika',
                role: 'Dosen',
                province: 'Jawa Timur',
                validityPeriod: '2025-12-31'
            },
            {
                employeeNumber: 'APT-002',
                name: 'Siti Aminah, S.Kom., M.T.',
                affiliation: 'Institut Teknologi Sepuluh Nopember',
                studyProgram: 'Sistem Informasi',
                role: 'Dosen',
                province: 'Jawa Timur',
                validityPeriod: '2025-12-31'
            },
            {
                employeeNumber: 'APT-003',
                name: 'Rahmat Hidayat, S.Kom.',
                affiliation: 'Politeknik Negeri Malang',
                studyProgram: 'Teknik Komputer',
                role: 'Dosen',
                province: 'Jawa Timur',
                validityPeriod: '2025-12-31'
            },
            {
                employeeNumber: 'APT-004',
                name: 'Andi Wijaya, S.Kom., M.Kom.',
                affiliation: 'Universitas Negeri Malang',
                studyProgram: 'Pendidikan Teknik Informatika',
                role: 'Dosen',
                province: 'Jawa Timur',
                validityPeriod: '2026-06-30'
            },
            {
                employeeNumber: 'APT-005',
                name: 'Prof. Dr. Eko Indrajit, M.Kom.',
                affiliation: 'STMIK ASIA Malang',
                studyProgram: 'Sistem Informasi',
                role: 'Dosen',
                province: 'Jawa Timur',
                validityPeriod: '2026-12-31'
            },
            {
                employeeNumber: 'APT-006',
                name: 'Dewi Lestari, S.Kom., M.T.',
                affiliation: 'Universitas Muhammadiyah Malang',
                studyProgram: 'Teknik Informatika',
                role: 'Dosen',
                province: 'Jawa Timur',
                validityPeriod: '2025-12-31'
            },
            {
                employeeNumber: 'APT-007',
                name: 'Ahmad Fauzi, S.Kom.',
                affiliation: 'Politeknik Elektronika Negeri Surabaya',
                studyProgram: 'Teknik Informatika',
                role: 'Dosen',
                province: 'Jawa Timur',
                validityPeriod: '2026-06-30'
            },
            {
                employeeNumber: 'APT-008',
                name: 'Rina Kusuma, M.Kom.',
                affiliation: 'Universitas Airlangga',
                studyProgram: 'Sistem Informasi',
                role: 'Dosen',
                province: 'Jawa Timur',
                validityPeriod: '2025-12-31'
            }
        ];

        await IndividualMember.bulkCreate(members);

        console.log(`✅ ${members.length} individual members seeded successfully!`);
    } catch (error) {
        console.error('❌ Error seeding individual members:', error);
        throw error;
    }
}

// Run if called directly
if (require.main === module) {
    seedIndividualMembers()
        .then(() => {
            console.log('✅ Seeding completed!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('❌ Seeding failed:', error);
            process.exit(1);
        });
}

module.exports = seedIndividualMembers;
