const { IndividualMember } = require('../models');

async function seedIndividualMembers() {
    try {
        console.log('👥 Seeding Individual Members...');

        // Clear existing data
        await IndividualMember.destroy({ where: {}, truncate: true });

        // Helper function to parse date from DD/MM/YYYY format
        const parseDate = (dateStr) => {
            if (!dateStr || dateStr === '30/11/-0001' || dateStr === '') {
                return '2025-12-31'; // Default validity period
            }
            const parts = dateStr.split('/');
            if (parts.length === 3) {
                const day = parts[0].padStart(2, '0');
                const month = parts[1].padStart(2, '0');
                const year = parts[2];
                if (parseInt(year) > 0) {
                    return `${year}-${month}-${day}`;
                }
            }
            return '2025-12-31';
        };

        // Data from user - converted to proper format
        const rawData = [
            { "Nomor Anggota": "AP-15.00203", "Nama": "Pujo Hari Saputro, S.Kom, M.T", "Perguruan Tinggi": "Universitas Alma Ata", "Program Studi": "Fakultas Komputer - S1", "Nama Provinsi": "JAWA TIMUR", "Masa Berlaku": "02/06/2022" },
            { "Nomor Anggota": "AP-16.00001", "Nama": "AGUNG WIDODO, S.T., M.T.", "Perguruan Tinggi": "UNIVERSITAS NAROTAMA", "Program Studi": "Sistem Informasi", "Nama Provinsi": "JAWA TIMUR", "Masa Berlaku": "13/09/2018" },
            { "Nomor Anggota": "AP-16.00002", "Nama": "Tessy Badriyah", "Perguruan Tinggi": "Politeknik Elektronika Negeri Surabaya", "Program Studi": "Teknik Informatika", "Nama Provinsi": "JAWA TIMUR", "Masa Berlaku": "17/09/2017" },
            { "Nomor Anggota": "AP-16.00003", "Nama": "Miftahus Sholihin, M.Cs", "Perguruan Tinggi": "Universitas Islam Lamongan", "Program Studi": "Teknik Informatika - S1", "Nama Provinsi": "JAWA TIMUR", "Masa Berlaku": "06/05/2025" },
            { "Nomor Anggota": "AP-16.00004", "Nama": "Ekka Pujo Ariesanto Akhmad", "Perguruan Tinggi": "Universitas Hang Tuah Surabaya", "Program Studi": "Manajemen Pelabuhan", "Nama Provinsi": "JAWA TIMUR", "Masa Berlaku": "06/09/2022" },
            { "Nomor Anggota": "AP-16.00005", "Nama": "Kustanto,S.T.,M.T.", "Perguruan Tinggi": "Universitas Islam Balitar", "Program Studi": "Teknik Informatika", "Nama Provinsi": "JAWA TIMUR", "Masa Berlaku": "19/10/2017" },
            { "Nomor Anggota": "AP-16.00006", "Nama": "Indyah Hartami Santi, M.Kom", "Perguruan Tinggi": "Universitas Islam Balitar", "Program Studi": "Teknik Informatika", "Nama Provinsi": "JAWA TIMUR", "Masa Berlaku": "05/10/2017" },
            { "Nomor Anggota": "AP-16.00007", "Nama": "Muhammad Misdram", "Perguruan Tinggi": "Universitas Yudharta Pasuruan", "Program Studi": "Teknik Informatika", "Nama Provinsi": "JAWA TIMUR", "Masa Berlaku": "15/10/2017" },
            { "Nomor Anggota": "AP-16.00008", "Nama": "Muslim Alamsyah", "Perguruan Tinggi": "Universitas Yudharta Pasuruan", "Program Studi": "Teknik Informatika", "Nama Provinsi": "JAWA TIMUR", "Masa Berlaku": "15/10/2017" },
            { "Nomor Anggota": "AP-16.00009", "Nama": "Resdi Hadi Prayoga", "Perguruan Tinggi": "Universitas Yudharta Pasuruan", "Program Studi": "Teknik Informatika", "Nama Provinsi": "JAWA TIMUR", "Masa Berlaku": "15/10/2017" },
            { "Nomor Anggota": "AP-16.00010", "Nama": "Muhammad Imron Rosadi", "Perguruan Tinggi": "Universitas Yudharta Pasuruan", "Program Studi": "Teknik Informatika", "Nama Provinsi": "JAWA TIMUR", "Masa Berlaku": "15/10/2017" }
        ];

        // Transform data to match our model
        const individualMembers = rawData.map(item => ({
            employeeNumber: item['Nomor Anggota'],
            name: item['Nama'],
            affiliation: item['Perguruan Tinggi'],
            studyProgram: item['Program Studi'] || 'Tidak Disebutkan',
            role: 'Dosen', // Default role, bisa disesuaikan
            province: item['Nama Provinsi'],
            validityPeriod: parseDate(item['Masa Berlaku'])
        }));

        // Bulk insert with batching for better performance
        const batchSize = 100;
        for (let i = 0; i < individualMembers.length; i += batchSize) {
            const batch = individualMembers.slice(i, i + batchSize);
            await IndividualMember.bulkCreate(batch);
            console.log(`✅ Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(individualMembers.length / batchSize)}`);
        }

        console.log(`✅ ${individualMembers.length} individual members seeded successfully!`);
        console.log('✅ Seeding completed!');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding individual members:', error);
        process.exit(1);
    }
}

seedIndividualMembers();
