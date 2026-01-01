const {
    Post,
    Event,
    BoardMember,
    MemberInstitution,
    IndividualMember,
    Journal,
    Document
} = require('../models');

async function seedAll() {
    try {
        console.log('🌱 Starting database seeding...\n');

        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await Post.destroy({ where: {}, truncate: true });
        await Event.destroy({ where: {}, truncate: true });
        await BoardMember.destroy({ where: {}, truncate: true });
        await MemberInstitution.destroy({ where: {}, truncate: true });
        await IndividualMember.destroy({ where: {}, truncate: true });
        await Journal.destroy({ where: {}, truncate: true });
        await Document.destroy({ where: {}, truncate: true });
        console.log('✅ Existing data cleared\n');

        // Seed Posts
        console.log('📰 Seeding Posts...');
        const posts = [
            {
                title: "APTIKOM dan Huawei Gelar FGD Nasional",
                content: "FGD ini membahas peran strategis industri teknologi dalam pengembangan kurikulum pendidikan tinggi...",
                category: "Kerjasama",
                image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                createdAt: new Date("2025-08-18")
            },
            {
                title: "Rakornas 2025: Mencetak Talenta Digital",
                content: "Rapat Koordinasi Nasional APTIKOM tahun ini fokus pada akselerasi transformasi digital di kampus...",
                category: "Berita",
                image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                createdAt: new Date("2025-08-12")
            },
            {
                title: "Webinar: Tren AI dalam Pendidikan",
                content: "Diskusi mendalam mengenai implementasi Artificial Intelligence untuk personalisasi pembelajaran...",
                category: "Webinar",
                image: "https://images.unsplash.com/photo-1531297461136-8208b501ad92?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                createdAt: new Date("2025-08-05")
            }
        ];
        await Post.bulkCreate(posts);
        console.log(`✅ ${posts.length} posts seeded\n`);

        // Seed Events
        console.log('📅 Seeding Events...');
        const events = [
            {
                title: "Nusantara Cyber Security 2025",
                date: new Date("2025-10-20"),
                location: "Bali Nusa Dua Convention Center",
                type: "Conference",
                link: "#"
            },
            {
                title: "BIMTEK OBE - PIKOBE",
                date: new Date("2025-09-15"),
                location: "Online Zoom Meeting",
                type: "Workshop",
                link: "#"
            },
            {
                title: "APHACTON 2025",
                date: new Date("2025-11-10"),
                location: "Jakarta Smart City",
                type: "Hackathon",
                link: "#"
            }
        ];
        await Event.bulkCreate(events);
        console.log(`✅ ${events.length} events seeded\n`);

        // Seed Board Members
        console.log('👥 Seeding Board Members...');
        const boardMembers = [
            { name: "Yoyon Arie Budi Suprio, M.Kom.", position: "Ketua", department: "Executive", image: "https://randomuser.me/api/portraits/men/1.jpg", period: "2022-2026", order: 1 },
            { name: "Abdi Pandu Kusuma, S.Kom., M.T.", position: "Wakil Ketua I", department: "Executive", image: "https://randomuser.me/api/portraits/men/2.jpg", period: "2022-2026", order: 2 },
            { name: "Andri Prasetyo, S.E, M.MSi.", position: "Wakil Ketua II", department: "Executive", image: "https://randomuser.me/api/portraits/women/3.jpg", period: "2022-2026", order: 3 },
            { name: "Supangat, M.Kom, Ph.D", position: "Wakil Ketua III", department: "Executive", image: "https://randomuser.me/api/portraits/women/4.jpg", period: "2022-2026", order: 4 },
            { name: "Devita Maulina Putri, S.ST, M.Pd.", position: "Sekretaris", department: "Executive", image: "https://randomuser.me/api/portraits/men/5.jpg", period: "2022-2026", order: 5 },
            { name: "Laila Isyriyah, M.Kom.", position: "Bendahara", department: "Executive", image: "https://randomuser.me/api/portraits/women/6.jpg", period: "2022-2026", order: 6 },
        ];
        await BoardMember.bulkCreate(boardMembers);
        console.log(`✅ ${boardMembers.length} board members seeded\n`);

        // Seed Institutions
        console.log('🏫 Seeding Member Institutions...');
        const institutions = [
            { name: "Universitas Indonesia", type: "PTN", province: "DKI Jakarta", website: "https://ui.ac.id", logo: "UI" },
            { name: "Institut Teknologi Bandung", type: "PTN", province: "Jawa Barat", website: "https://itb.ac.id", logo: "ITB" },
            { name: "Universitas Gadjah Mada", type: "PTN", province: "DI Yogyakarta", website: "https://ugm.ac.id", logo: "UGM" },
            { name: "Universitas Telkom", type: "PTS", province: "Jawa Barat", website: "https://telkomuniversity.ac.id", logo: "TEL" },
            { name: "Universitas Gunadarma", type: "PTS", province: "Jawa Barat", website: "https://gunadarma.ac.id", logo: "GUN" },
        ];
        await MemberInstitution.bulkCreate(institutions);
        console.log(`✅ ${institutions.length} institutions seeded\n`);

        // Seed Individual Members
        console.log('👤 Seeding Individual Members...');
        const individuals = [
            { employeeNumber: "AP-DEMO-001", name: "Dr. Budi Santoso, M.Kom.", affiliation: "Universitas Indonesia", studyProgram: "Teknik Informatika", role: "Dosen", province: "DKI Jakarta", validityPeriod: "2025-12-31" },
            { employeeNumber: "AP-DEMO-002", name: "Siti Aminah, S.Kom., M.T.", affiliation: "Institut Teknologi Bandung", studyProgram: "Sistem Informasi", role: "Dosen", province: "Jawa Barat", validityPeriod: "2025-12-31" },
            { employeeNumber: "AP-DEMO-003", name: "Rahmat Hidayat", affiliation: "PT. Telkom Indonesia", studyProgram: "Teknik Komputer", role: "Praktisi", province: "Jawa Barat", validityPeriod: "2026-06-30" },
            { employeeNumber: "AP-DEMO-004", name: "Andi Wijaya, S.Kom.", affiliation: "Universitas Gadjah Mada", studyProgram: "Ilmu Komputer", role: "Mahasiswa S2", province: "DI Yogyakarta", validityPeriod: "2025-06-30" },
            { employeeNumber: "AP-DEMO-005", name: "Prof. Dr. Eko Indrajit", affiliation: "Perbanas Institute", studyProgram: "Manajemen Informatika", role: "Dosen", province: "DKI Jakarta", validityPeriod: "2026-12-31" },
        ];
        await IndividualMember.bulkCreate(individuals);
        console.log(`✅ ${individuals.length} individual members seeded\n`);

        // Seed Journals
        console.log('📚 Seeding Journals...');
        const journals = [
            { title: "IAES International Journal of Artificial Intelligence (IJ-AI)", publisher: "IAES & APTIKOM", link: "#", description: "Scopus Q2" },
            { title: "International Journal of Electrical and Computer Engineering (IJECE)", publisher: "IAES & APTIKOM", link: "#", description: "Scopus Q2" },
            { title: "Jurnal Sistem Informasi (JSI)", publisher: "Fasilkom UI & APTIKOM", link: "#", description: "SINTA 2" },
            { title: "APTIKOM Journal on Computer Science and Information Technologies (CSIT)", publisher: "APTIKOM Pusat", link: "#", description: "SINTA 3" },
        ];
        await Journal.bulkCreate(journals);
        console.log(`✅ ${journals.length} journals seeded\n`);

        // Seed Documents
        console.log('📄 Seeding Documents...');
        const documents = [
            { title: "Panduan Kurikulum OBE APTIKOM 2024", category: "Panduan", fileUrl: "#", description: "Size: 4.2 MB | Date: Jan 2024" },
            { title: "Buku Saku Anggota APTIKOM", category: "Panduan", fileUrl: "#", description: "Size: 1.5 MB | Date: Des 2023" },
            { title: "Pedoman Akreditasi LAM INFOKOM", category: "Panduan", fileUrl: "#", description: "Size: 3.8 MB | Date: Nov 2023" },
            { title: "Surat Edaran RAKORNAS 2025", category: "Edaran Pusat", fileUrl: "#", description: "Size: 250 KB | Date: Jun 2025" },
            { title: "SK Pengurus Pusat 2022-2026", category: "Edaran Pusat", fileUrl: "#", description: "Size: 1.2 MB | Date: Okt 2022" },
            { title: "Undangan Halal Bihalal APTIKOM Jatim", category: "Edaran Jatim", fileUrl: "#", description: "Size: 180 KB | Date: Mei 2025" },
            { title: "Hasil Muswil APTIKOM Jatim 2024", category: "Edaran Jatim", fileUrl: "#", description: "Size: 2.1 MB | Date: Mar 2024" },
        ];
        await Document.bulkCreate(documents);
        console.log(`✅ ${documents.length} documents seeded\n`);

        console.log('🎉 All data seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seedAll();
