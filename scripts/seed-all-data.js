const {
    sequelize,
    Post,
    Event,
    BoardMember,
    MemberInstitution,
    Journal,
    Document,
    OrganizationProfile,
    IndividualMember,
    Admin,
    Banner,
    ContactInfo,
    ContactMessage,
    Achievement,
    Partner
} = require('../models');
const bcrypt = require('bcryptjs');

async function main() {
    try {
        await sequelize.authenticate();
        console.log('✓ Database connected');

        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
        await sequelize.truncate({ cascade: true, restartIdentity: true });
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

        // 1. Seed Organization Profile
        console.log('📋 Seeding Organization Profile...');
        await OrganizationProfile.create({
            name: 'APTIKOM',
            fullName: 'Asosiasi Pendidikan Tinggi Informatika dan Komputer',
            abbreviation: 'APTIKOM',
            establishedDate: '2012-05-15',
            legalStatus: 'Organisasi Kemasyarakatan (Ormas)',
            registrationNumber: 'AHU-0001234.AH.01.07.TAHUN 2012',
            email: 'sekretariat@aptikom.org',
            phone: '+62 21 1234 5678',
            address: 'Gedung Graha Informatika, Jl. Teknologi Raya No. 123',
            city: 'Jakarta Selatan',
            province: 'DKI Jakarta',
            postalCode: '12950',
            website: 'https://aptikom.org',
            facebook: 'https://facebook.com/aptikom.official',
            twitter: 'https://twitter.com/aptikom_id',
            instagram: 'https://instagram.com/aptikom.official',
            linkedin: 'https://linkedin.com/company/aptikom',
            youtube: 'https://youtube.com/@aptikomofficial',
            chairperson: 'Prof. Dr. Ir. Ahmad Budiman, M.Kom.',
            secretary: 'Dr. Siti Nurhaliza, S.Kom., M.T.',
            treasurer: 'Ir. Budi Santoso, M.Kom.',
            totalMembers: 450,
            totalInstitutions: 285,
            history: 'APTIKOM didirikan pada 15 Mei 2012 sebagai organisasi nirlaba yang beranggotakan perguruan tinggi dengan program studi informatika dan komputer.',
            vision: 'Menjadi organisasi pembina pendidikan tinggi informatika terkemuka di Asia Tenggara yang inovatif dan berkontribusi bagi kemajuan bangsa.',
            mission: '<ul><li>Meningkatkan kualitas pendidikan informatika</li><li>Mendorong kolaborasi riset dan publikasi ilmiah</li><li>Memfasilitasi kerjasama strategis</li></ul>',
            goals: '<ul><li>Menjadi rujukan pengembangan kurikulum informatika</li><li>Meningkatkan publikasi internasional</li></ul>',
            objectives: '<ul><li>Mengembangkan kurikulum nasional</li><li>Menyelenggarakan konferensi tahunan</li></ul>',
            structure: 'Struktur terdiri dari Dewan Penasehat, Pengurus Pusat, dan Pengurus Wilayah di 12 provinsi.',
            logo: '/images/aptikom-logo.png'
        });

        // 2. Seed Admin
        console.log('👤 Seeding Admin Users...');
        const hashedPassword = await bcrypt.hash('password123', 10);
        await Admin.bulkCreate([
            {
                username: 'admin',
                email: 'admin@aptikom.org',
                password: hashedPassword,
                role: 'super_admin',
                isActive: true
            },
            {
                username: 'editor',
                email: 'editor@aptikom.org',
                password: hashedPassword,
                role: 'editor',
                isActive: true
            }
        ]);

        // 3. Seed Posts
        console.log('📰 Seeding Posts...');
        await Post.bulkCreate([
            {
                title: 'Peluncuran Program Akreditasi Unggul 2024',
                content: 'APTIKOM dengan bangga meluncurkan program akreditasi unggul tahun 2024 untuk meningkatkan kualitas program studi informatika di seluruh Indonesia. Program ini dirancang untuk membantu institusi mencapai standar akreditasi tertinggi.',
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
                category: 'Pengumuman'
            },
            {
                title: 'Hasil Workshop Kurikulum OBE Berhasil Dilaksanakan',
                content: 'Workshop Kurikulum Outcomes-Based Education (OBE) telah berhasil dilaksanakan dengan menghadirkan lebih dari 200 peserta dari berbagai perguruan tinggi anggota APTIKOM.',
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
                category: 'Kegiatan'
            },
            {
                title: 'APTIKOM Menjalin Kerjasama Internasional Baru',
                content: 'APTIKOM telah menjalin kerjasama strategis dengan asosiasi informatika internasional untuk meningkatkan kolaborasi penelitian dan pertukaran mahasiswa.',
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
                category: 'Kerjasama'
            },
            {
                title: 'Penerbitan Journal APTIKOM Edisi Terbaru',
                content: 'Journal APTIKOM Edisi 15 tahun 2024 telah dipublikasikan dengan 20 artikel berkualitas dari peneliti di seluruh Indonesia dan Asia.',
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
                category: 'Publikasi'
            }
        ]);

        // 4. Seed Events
        console.log('📅 Seeding Events...');
        await Event.bulkCreate([
            {
                title: 'Konferensi Nasional Informatika 2024',
                date: new Date('2024-09-15'),
                location: 'Hotel Grand Indonesia, Jakarta',
                type: 'Konferensi',
                description: 'Konferensi tahunan APTIKOM menghadirkan pembicara internasional dan pengusaha teknologi terkemuka.',
                link: 'https://aptikom.org/konferensi-2024'
            },
            {
                title: 'Workshop Kurikulum Berbasis OBE',
                date: new Date('2024-08-20'),
                location: 'Universitas Gadjah Mada, Yogyakarta',
                type: 'Workshop',
                description: 'Pelatihan pengembangan kurikulum berbasis Outcomes-Based Education untuk dosen informatika.',
                link: 'https://aptikom.org/workshop-obe'
            },
            {
                title: 'Seminar Akreditasi LAM INFOKOM',
                date: new Date('2024-07-10'),
                location: 'Institut Teknologi Bandung, Bandung',
                type: 'Seminar',
                description: 'Seminar tentang standar dan proses akreditasi program studi informatika oleh LAM INFOKOM.',
                link: 'https://aptikom.org/seminar-akreditasi'
            },
            {
                title: 'Pertemuan Rutin Ketua Program Studi',
                date: new Date('2024-06-05'),
                location: 'Virtual (Zoom)',
                type: 'Pertemuan',
                description: 'Pertemuan bulanan diskusi dan koordinasi antar ketua program studi informatika.',
                link: '#'
            }
        ]);

        // 5. Seed Board Members
        console.log('👨‍💼 Seeding Board Members...');
        await BoardMember.bulkCreate([
            {
                name: 'Prof. Dr. Ir. Ahmad Budiman, M.Kom.',
                position: 'Ketua Umum',
                department: 'Direksi',
                period: '2022-2025',
                order: 1
            },
            {
                name: 'Dr. Siti Nurhaliza, S.Kom., M.T.',
                position: 'Wakil Ketua I',
                department: 'Direksi',
                period: '2022-2025',
                order: 2
            },
            {
                name: 'Ir. Budi Santoso, M.Kom.',
                position: 'Wakil Ketua II',
                department: 'Direksi',
                period: '2022-2025',
                order: 3
            },
            {
                name: 'Dr. Eka Prasetya, S.T., M.T.',
                position: 'Sekretaris Jenderal',
                department: 'Direksi',
                period: '2022-2025',
                order: 4
            },
            {
                name: 'Ir. Rini Wijayanti, M.Kom.',
                position: 'Bendahara',
                department: 'Direksi',
                period: '2022-2025',
                order: 5
            }
        ]);

        // 6. Seed Member Institutions
        console.log('🏢 Seeding Member Institutions...');
        await MemberInstitution.bulkCreate([
            {
                name: 'Institut Teknologi Bandung',
                type: 'Universitas',
                province: 'Jawa Barat',
                website: 'https://itb.ac.id'
            },
            {
                name: 'Universitas Indonesia',
                type: 'Universitas',
                province: 'DKI Jakarta',
                website: 'https://ui.ac.id'
            },
            {
                name: 'Universitas Gadjah Mada',
                type: 'Universitas',
                province: 'DI Yogyakarta',
                website: 'https://ugm.ac.id'
            },
            {
                name: 'Institut Pertanian Bogor',
                type: 'Universitas',
                province: 'Jawa Barat',
                website: 'https://ipb.ac.id'
            },
            {
                name: 'Bina Nusantara University',
                type: 'Universitas Swasta',
                province: 'DKI Jakarta',
                website: 'https://binus.ac.id'
            },
            {
                name: 'Universitas Pendidikan Indonesia',
                type: 'Universitas',
                province: 'Jawa Barat',
                website: 'https://upi.edu'
            }
        ]);

        // 7. Seed Individual Members
        console.log('👨‍🎓 Seeding Individual Members...');
        await IndividualMember.bulkCreate([
            {
                employeeNumber: 'APTM001',
                name: 'Prof. Ahmad Rizki',
                affiliation: 'Institut Teknologi Bandung',
                studyProgram: 'Teknik Informatika',
                role: 'Ketua Program Studi',
                province: 'Jawa Barat',
                validityPeriod: new Date('2025-12-31')
            },
            {
                employeeNumber: 'APTM002',
                name: 'Dr. Budi Handoko',
                affiliation: 'Universitas Indonesia',
                studyProgram: 'Ilmu Komputer',
                role: 'Dosen',
                province: 'DKI Jakarta',
                validityPeriod: new Date('2025-12-31')
            },
            {
                employeeNumber: 'APTM003',
                name: 'Ir. Ani Suryanti',
                affiliation: 'Universitas Gadjah Mada',
                studyProgram: 'Teknik Informatika',
                role: 'Ketua Program Studi',
                province: 'DI Yogyakarta',
                validityPeriod: new Date('2025-12-31')
            },
            {
                employeeNumber: 'APTM004',
                name: 'Dr. Eka Wahyono',
                affiliation: 'Bina Nusantara University',
                studyProgram: 'Computer Science',
                role: 'Dosen',
                province: 'DKI Jakarta',
                validityPeriod: new Date('2025-12-31')
            }
        ]);

        // 8. Seed Journals
        console.log('📚 Seeding Journals...');
        await Journal.bulkCreate([
            {
                title: 'APTIKOM Journal of Computer Science',
                publisher: 'APTIKOM',
                link: 'https://journal.aptikom.org',
                rank: 'Sinta 2',
                description: 'Jurnal ilmiah yang menerbitkan artikel penelitian di bidang informatika dan teknologi komputer.'
            },
            {
                title: 'Proceedings of APTIKOM National Conference',
                publisher: 'APTIKOM',
                link: 'https://conference.aptikom.org',
                rank: 'Terindeks',
                description: 'Kumpulan makalah penelitian dari Konferensi Nasional APTIKOM setiap tahunnya.'
            },
            {
                title: 'APTIKOM Education Review',
                publisher: 'APTIKOM',
                link: 'https://education.aptikom.org',
                rank: 'Sinta 3',
                description: 'Jurnal yang fokus pada pengembangan kurikulum dan pembelajaran informatika.'
            }
        ]);

        // 9. Seed Documents
        console.log('📄 Seeding Documents...');
        await Document.bulkCreate([
            {
                title: 'Kurikulum Informatika Nasional 2023',
                category: 'Kurikulum',
                fileUrl: '/documents/Kurikulum-Informatika-Nasional-2023.pdf',
                size: '2.5 MB',
                description: 'Dokumen standar kurikulum nasional untuk program studi informatika dan komputer.'
            },
            {
                title: 'Panduan Akreditasi LAM INFOKOM',
                category: 'Akreditasi',
                fileUrl: '/documents/Panduan-Akreditasi-LAM-INFOKOM.pdf',
                size: '1.8 MB',
                description: 'Panduan lengkap proses akreditasi program studi oleh Lembaga Akreditasi Mandiri.'
            },
            {
                title: 'Standar Kompetensi Lulusan Informatika',
                category: 'Standar',
                fileUrl: '/documents/Standar-Kompetensi-Lulusan.pdf',
                size: '1.2 MB',
                description: 'Dokumen standar kompetensi yang harus dimiliki lulusan program informatika.'
            },
            {
                title: 'Laporan Tahunan APTIKOM 2023',
                category: 'Laporan',
                fileUrl: '/documents/Laporan-Tahunan-2023.pdf',
                size: '3.5 MB',
                description: 'Laporan kegiatan dan pencapaian APTIKOM tahun 2023.'
            }
        ]);

        // 10. Seed Banners
        console.log('🎯 Seeding Banners...');
        await Banner.bulkCreate([
            {
                title: 'Konferensi Nasional APTIKOM 2024',
                description: 'Bergabunglah dengan ribuan profesional di konferensi tahunan kami',
                image: '/banners/konferensi-2024.jpg',
                link: '/events/1',
                isActive: true,
                order: 1
            },
            {
                title: 'Daftar Sebagai Anggota APTIKOM',
                description: 'Jadilah bagian dari jaringan terbesar pendidikan informatika di Indonesia',
                image: '/banners/membership.jpg',
                link: '/join',
                isActive: true,
                order: 2
            },
            {
                title: 'Akreditasi Program Studi Anda',
                description: 'Raih akreditasi unggul dengan panduan dari APTIKOM',
                image: '/banners/akreditasi.jpg',
                link: '/documents',
                isActive: true,
                order: 3
            }
        ]);

        // 11. Seed Achievements
        console.log('🏆 Seeding Achievements...');
        await Achievement.bulkCreate([
            {
                title: 'Penghargaan Program Studi Terbaik 2023',
                description: 'Program studi informatika dengan penilaian terbaik dalam bidang akademik dan inovasi.',
                date: new Date('2023-10-15'),
                category: 'Penghargaan',
                order: 1
            },
            {
                title: 'Sertifikasi ISO 9001:2015 untuk Manajemen Kualitas',
                description: 'APTIKOM memperoleh sertifikasi ISO untuk sistem manajemen kualitas organisasi.',
                date: new Date('2023-06-20'),
                category: 'Sertifikasi',
                order: 2
            },
            {
                title: 'Penghargaan Internasional dari IAESTED',
                description: 'Kontribusi dalam pengembangan pendidikan informatika diakui oleh organisasi internasional.',
                date: new Date('2023-05-10'),
                category: 'Penghargaan Internasional',
                order: 3
            },
            {
                title: 'Kolaborasi dengan 50 Universitas Internasional',
                description: 'APTIKOM berhasil menjalin kerjasama dengan 50 universitas di berbagai negara.',
                date: new Date('2023-03-15'),
                category: 'Kerjasama',
                order: 4
            }
        ]);

        // 12. Seed Partners
        console.log('🤝 Seeding Partners...');
        await Partner.bulkCreate([
            {
                name: 'Microsoft Indonesia',
                description: 'Partner dalam program pengembangan kurikulum dan pelatihan digital.',
                logo: '/partners/microsoft.png',
                website: 'https://microsoft.com',
                order: 1
            },
            {
                name: 'Google Cloud',
                description: 'Menyediakan platform cloud untuk riset dan pembelajaran.',
                logo: '/partners/google.png',
                website: 'https://cloud.google.com',
                order: 2
            },
            {
                name: 'IBM Indonesia',
                description: 'Kolaborasi dalam pengembangan teknologi dan inovasi.',
                logo: '/partners/ibm.png',
                website: 'https://ibm.com',
                order: 3
            },
            {
                name: 'Cisco Networking Academy',
                description: 'Program pelatihan dan sertifikasi networking.',
                logo: '/partners/cisco.png',
                website: 'https://cisco.com',
                order: 4
            },
            {
                name: 'Oracle Academy',
                description: 'Program pembelajaran database dan enterprise solutions.',
                logo: '/partners/oracle.png',
                website: 'https://oracle.com',
                order: 5
            }
        ]);

        // 13. Seed Contact Messages
        console.log('💬 Seeding Contact Messages...');
        await ContactMessage.bulkCreate([
            {
                name: 'Ahmad Wijaya',
                email: 'ahmad@example.com',
                subject: 'Pertanyaan tentang program akreditasi',
                message: 'Saya ingin mengetahui lebih lanjut tentang program akreditasi unggul APTIKOM untuk universitas kami.'
            },
            {
                name: 'Siti Nurhaliza',
                email: 'siti@example.com',
                subject: 'Permintaan kerjasama',
                message: 'Kami dari universitas X ingin menjalin kerjasama dengan APTIKOM untuk pengembangan kurikulum.'
            },
            {
                name: 'Budi Santoso',
                email: 'budi@example.com',
                subject: 'Feedback konferensi 2024',
                message: 'Konferensi tahun ini sangat bagus dan bermanfaat. Terima kasih atas penyelenggaraannya.'
            }
        ]);

        console.log('\n✅ Semua data dummy berhasil diseed!');
        console.log('📊 Summary:');
        console.log('  ✓ 1 Organization Profile');
        console.log('  ✓ 2 Admin Users');
        console.log('  ✓ 4 Posts');
        console.log('  ✓ 4 Events');
        console.log('  ✓ 5 Board Members');
        console.log('  ✓ 6 Member Institutions');
        console.log('  ✓ 4 Individual Members');
        console.log('  ✓ 3 Journals');
        console.log('  ✓ 4 Documents');
        console.log('  ✓ 3 Banners');
        console.log('  ✓ 4 Achievements');
        console.log('  ✓ 5 Partners');
        console.log('  ✓ 3 Contact Messages');

    } catch (error) {
        console.error('❌ Error seeding data:', error);
        throw error;
    } finally {
        await sequelize.close();
    }
}

main()
    .then(() => {
        console.log('\n✨ Seeding completed successfully');
        process.exit(0);
    })
    .catch(error => {
        console.error('Seeding failed:', error);
        process.exit(1);
    });
