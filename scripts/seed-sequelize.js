const {
    Post,
    Event,
    BoardMember,
    MemberInstitution,
    Journal,
    Document,
    IndividualMember,
    sequelize
} = require('../models');

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

const events = [
    {
        title: "Nusantara Cyber Security 2025",
        date: new Date("2025-10-20"),
        location: "Bali Nusa Dua Convention Center",
        type: "Konferensi"
    },
    {
        title: "BIMTEK OBE - PIKOBE",
        date: new Date("2025-09-15"),
        location: "Online Zoom Meeting",
        type: "Pelatihan"
    },
    {
        title: "APHACTON 2025",
        date: new Date("2025-11-10"),
        location: "Jakarta Smart City",
        type: "Kompetisi"
    }
];

const boardMembers = [
    { name: "Prof. Dr. Ir. Zainal A. Hasibuan, MLS., Ph.D.", position: "Ketua Umum", department: "Executive Board", image: "https://randomuser.me/api/portraits/men/1.jpg", period: "2022-2026", order: 1 },
    { name: "Prof. Dr. Achmad Benny Mutiara, S.Si., S.Kom.", position: "Sekretaris Jenderal", department: "Executive Board", image: "https://randomuser.me/api/portraits/men/2.jpg", period: "2022-2026", order: 2 },
    { name: "Dr. Dwiza Riana, S.Si., M.M., M.Kom.", position: "Bendahara Umum", department: "Executive Board", image: "https://randomuser.me/api/portraits/women/3.jpg", period: "2022-2026", order: 3 },
    { name: "Prof. Dr. Ema Utami, S.Si., M.Kom.", position: "Wakil Ketua I (Bidang Akademik)", department: "Vice Chairmen", image: "https://randomuser.me/api/portraits/women/4.jpg", period: "2022-2026", order: 4 },
    { name: "Solikin, S.Si., M.T.", position: "Wakil Ketua II (Bidang SDM)", department: "Vice Chairmen", image: "https://randomuser.me/api/portraits/men/5.jpg", period: "2022-2026", order: 5 },
];

const institutions = [
    { name: "Universitas Indonesia", type: "Universitas", province: "DKI Jakarta", website: "https://ui.ac.id", logo: "UI" },
    { name: "Institut Teknologi Bandung", type: "Institut", province: "Jawa Barat", website: "https://itb.ac.id", logo: "ITB" },
    { name: "Universitas Gadjah Mada", type: "Universitas", province: "DI Yogyakarta", website: "https://ugm.ac.id", logo: "UGM" },
    { name: "Institut Teknologi Sepuluh Nopember", type: "Institut", province: "Jawa Timur", website: "https://its.ac.id", logo: "ITS" },
    { name: "Universitas Telkom", type: "Universitas", province: "Jawa Barat", website: "https://telkomuniversity.ac.id", logo: "Telkom" },
    { name: "Universitas Gunadarma", type: "Universitas", province: "Jawa Barat", website: "https://gunadarma.ac.id", logo: "UG" },
    { name: "Universitas Bina Nusantara", type: "Universitas", province: "DKI Jakarta", website: "https://binus.ac.id", logo: "Binus" },
    { name: "Politeknik Elektronika Negeri Surabaya", type: "Politeknik", province: "Jawa Timur", website: "https://pens.ac.id", logo: "PENS" },
];

const journals = [
    { title: "IAES International Journal of Artificial Intelligence (IJ-AI)", publisher: "IAES & APTIKOM", link: "#", rank: "Scopus Q2" },
    { title: "International Journal of Electrical and Computer Engineering (IJECE)", publisher: "IAES & APTIKOM", link: "#", rank: "Scopus Q2" },
    { title: "Jurnal Sistem Informasi (JSI)", publisher: "Fasilkom UI & APTIKOM", link: "#", rank: "SINTA 2" },
    { title: "APTIKOM Journal on Computer Science and Information Technologies (CSIT)", publisher: "APTIKOM Pusat", link: "#", rank: "SINTA 3" },
];

const documents = [
    { title: "Panduan Kurikulum OBE APTIKOM 2024", category: "Panduan", fileUrl: "#", size: "4.2 MB" },
    { title: "Buku Saku Anggota APTIKOM", category: "Panduan", fileUrl: "#", size: "1.5 MB" },
    { title: "Pedoman Akreditasi LAM INFOKOM", category: "Panduan", fileUrl: "#", size: "3.8 MB" },
    { title: "Surat Edaran RAKORNAS 2025", category: "Edaran Pusat", fileUrl: "#", size: "250 KB" },
    { title: "SK Pengurus Pusat 2022-2026", category: "Edaran Pusat", fileUrl: "#", size: "1.2 MB" },
    { title: "Undangan Halal Bihalal APTIKOM Jatim", category: "Edaran Jatim", fileUrl: "#", size: "180 KB" },
    { title: "Hasil Muswil APTIKOM Jatim 2024", category: "Edaran Jatim", fileUrl: "#", size: "2.1 MB" },
];

const individualMembers = [
    { name: "Dr. Budi Santoso, M.Kom.", affiliation: "Universitas Indonesia", role: "Dosen", province: "DKI Jakarta" },
    { name: "Siti Aminah, S.Kom., M.T.", affiliation: "Institut Teknologi Bandung", role: "Dosen", province: "Jawa Barat" },
    { name: "Rahmat Hidayat", affiliation: "PT. Telkom Indonesia", role: "Praktisi", province: "Jawa Barat" },
    { name: "Andi Wijaya, S.Kom.", affiliation: "Universitas Gadjah Mada", role: "Mahasiswa S2", province: "DI Yogyakarta" },
    { name: "Prof. Dr. Eko Indrajit", affiliation: "Perbanas Institute", role: "Dosen", province: "DKI Jakarta" },
];

async function seed() {
    try {
        console.log('Clearing existing data...');
        await Post.destroy({ where: {} });
        await Event.destroy({ where: {} });
        await BoardMember.destroy({ where: {} });
        await MemberInstitution.destroy({ where: {} });
        await Journal.destroy({ where: {} });
        await Document.destroy({ where: {} });
        await IndividualMember.destroy({ where: {} });

        console.log('Seeding Posts...');
        await Post.bulkCreate(posts);

        console.log('Seeding Events...');
        await Event.bulkCreate(events);

        console.log('Seeding Board Members...');
        await BoardMember.bulkCreate(boardMembers);

        console.log('Seeding Institutions...');
        await MemberInstitution.bulkCreate(institutions);

        console.log('Seeding Journals...');
        await Journal.bulkCreate(journals);

        console.log('Seeding Documents...');
        await Document.bulkCreate(documents);

        console.log('Seeding Individual Members...');
        await IndividualMember.bulkCreate(individualMembers);

        console.log('Seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seed();
