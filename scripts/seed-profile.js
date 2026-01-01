const { sequelize, OrganizationProfile } = require('../models');

async function main() {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');

        // Check if profile already exists
        const existing = await OrganizationProfile.findOne();

        if (!existing) {
            await OrganizationProfile.create({
                // Basic Information
                name: 'APTIKOM',
                fullName: 'Asosiasi Pendidikan Tinggi Informatika dan Komputer',
                abbreviation: 'APTIKOM',

                // Legal & Establishment
                establishedDate: '2012-05-15',
                legalStatus: 'Organisasi Kemasyarakatan (Ormas)',
                registrationNumber: 'AHU-0001234.AH.01.07.TAHUN 2012',

                // Contact Information
                email: 'sekretariat@aptikom.org',
                phone: '+62 21 1234 5678',
                address: 'Gedung Graha Informatika, Jl. Teknologi Raya No. 123',
                city: 'Jakarta Selatan',
                province: 'DKI Jakarta',
                postalCode: '12950',
                website: 'https://aptikom.org',

                // Social Media
                facebook: 'https://facebook.com/aptikom.official',
                twitter: 'https://twitter.com/aptikom_id',
                instagram: 'https://instagram.com/aptikom.official',
                linkedin: 'https://linkedin.com/company/aptikom',
                youtube: 'https://youtube.com/@aptikomofficial',

                // Organizational Details
                chairperson: 'Prof. Dr. Ir. Ahmad Budiman, M.Kom.',
                secretary: 'Dr. Siti Nurhaliza, S.Kom., M.T.',
                treasurer: 'Ir. Budi Santoso, M.Kom.',
                totalMembers: 450,
                totalInstitutions: 285,

                // Core Content
                history: `Asosiasi Pendidikan Tinggi Informatika dan Komputer (APTIKOM) adalah organisasi nirlaba yang beranggotakan perguruan tinggi yang menyelenggarakan program studi di bidang Rumpun Ilmu Informatika dan Komputer.

Didirikan pada tanggal 15 Mei 2012 di Jakarta, APTIKOM lahir dari kebutuhan mendesak untuk meningkatkan kualitas pendidikan tinggi komputer di Indonesia. Dengan semangat kebersamaan dan kolaborasi, para pendiri APTIKOM yang terdiri dari dekan dan ketua program studi dari berbagai perguruan tinggi terkemuka di Indonesia bersepakat untuk membentuk wadah strategis bagi pertukaran informasi, pengembangan kurikulum, dan kolaborasi riset antar perguruan tinggi.

Sejak berdiri, APTIKOM telah berkembang pesat menjadi organisasi yang memiliki lebih dari 285 institusi anggota dan 450 anggota individu yang tersebar di seluruh nusantara. APTIKOM secara aktif berkontribusi dalam pengembangan standar kurikulum nasional, akreditasi program studi, serta memfasilitasi berbagai kegiatan ilmiah seperti seminar, workshop, dan konferensi internasional.

Perjalanan APTIKOM ditandai dengan berbagai pencapaian penting, termasuk kerjasama dengan industri teknologi global, penerbitan jurnal ilmiah terakreditasi, dan peran aktif dalam merumuskan kebijakan pendidikan tinggi informatika di tingkat nasional.`,

                vision: 'Menjadi organisasi pembina pendidikan tinggi informatika dan komputer yang terkemuka di Asia Tenggara, modern, inovatif, dan berkontribusi nyata bagi kemajuan bangsa melalui pengembangan sumber daya manusia yang kompeten dan berdaya saing global.',

                mission: `<ul>
  <li>Meningkatkan kualitas akademik program studi rumpun informatika dan komputer melalui pengembangan kurikulum berbasis kompetensi dan kebutuhan industri.</li>
  <li>Mendorong kolaborasi riset dan publikasi ilmiah berkualitas tinggi di tingkat nasional dan internasional.</li>
  <li>Memfasilitasi kerjasama strategis antara perguruan tinggi, industri, dan pemerintah untuk menghasilkan lulusan yang siap kerja.</li>
  <li>Mengembangkan standar kompetensi lulusan yang berdaya saing global dan sesuai dengan perkembangan teknologi terkini.</li>
  <li>Menyelenggarakan program peningkatan kapasitas dosen dan tenaga kependidikan melalui pelatihan, sertifikasi, dan pertukaran pengalaman.</li>
  <li>Membangun jaringan kerjasama internasional untuk meningkatkan visibilitas dan reputasi pendidikan tinggi informatika Indonesia.</li>
</ul>`,

                goals: `<ul>
  <li>Menjadi rujukan utama dalam pengembangan kurikulum dan standar pendidikan informatika di Indonesia.</li>
  <li>Meningkatkan jumlah publikasi ilmiah berkualitas dari anggota APTIKOM di jurnal internasional bereputasi.</li>
  <li>Memfasilitasi minimal 50 kegiatan ilmiah (seminar, workshop, konferensi) setiap tahunnya.</li>
  <li>Membangun kemitraan strategis dengan minimal 100 perusahaan teknologi untuk program magang dan rekrutmen lulusan.</li>
  <li>Meningkatkan akreditasi program studi anggota menjadi minimal peringkat B atau lebih baik.</li>
</ul>`,

                objectives: `<ul>
  <li>Mengembangkan dan memperbarui kurikulum nasional informatika setiap 2 tahun sekali.</li>
  <li>Menyelenggarakan konferensi internasional APTIKOM tahunan dengan partisipasi minimal 500 peserta.</li>
  <li>Menerbitkan jurnal ilmiah terakreditasi Sinta 2 atau lebih tinggi.</li>
  <li>Memberikan pelatihan dan sertifikasi kepada minimal 1000 dosen setiap tahunnya.</li>
  <li>Memfasilitasi program pertukaran dosen dan mahasiswa dengan universitas mitra di luar negeri.</li>
  <li>Mengembangkan platform digital untuk berbagi sumber daya pembelajaran dan penelitian.</li>
</ul>`,

                structure: `Struktur organisasi APTIKOM terdiri dari:

<strong>Dewan Penasehat</strong>
Terdiri dari tokoh-tokoh senior di bidang pendidikan tinggi informatika yang memberikan arahan strategis.

<strong>Pengurus Pusat</strong>
- Ketua Umum
- Wakil Ketua
- Sekretaris Jenderal
- Bendahara

<strong>Divisi-Divisi</strong>
- Divisi Akademik dan Kurikulum
- Divisi Penelitian dan Publikasi
- Divisi Kerjasama dan Kemitraan
- Divisi Pengembangan SDM
- Divisi Teknologi Informasi
- Divisi Humas dan Komunikasi

<strong>Pengurus Wilayah</strong>
APTIKOM memiliki pengurus wilayah di 12 provinsi untuk memperkuat koordinasi dan pelayanan kepada anggota di daerah.`,

                logo: '/images/aptikom-logo.png'
            });
            console.log('✓ Seeded OrganizationProfile with comprehensive data');
        } else {
            console.log('✓ OrganizationProfile already exists');
        }
    } catch (error) {
        console.error('Error seeding profile:', error);
        throw error;
    } finally {
        await sequelize.close();
    }
}

main()
    .then(() => {
        console.log('Seed completed successfully');
        process.exit(0);
    })
    .catch(error => {
        console.error('Seed failed:', error);
        process.exit(1);
    });
