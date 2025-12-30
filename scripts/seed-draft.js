const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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
    },
    {
        title: "BIMTEK OBE - PIKOBE",
        date: new Date("2025-09-15"),
        location: "Online Zoom Meeting",
    },
    {
        title: "APHACTON 2025",
        date: new Date("2025-11-10"),
        location: "Jakarta Smart City",
    }
];

const boardMembers = [
    { name: "Prof. Dr. Ir. Zainal A. Hasibuan, MLS., Ph.D.", position: "Ketua Umum", department: "Executive Board", image: "https://randomuser.me/api/portraits/men/1.jpg" },
    { name: "Prof. Dr. Achmad Benny Mutiara, S.Si., S.Kom.", position: "Sekretaris Jenderal", department: "Executive Board", image: "https://randomuser.me/api/portraits/men/2.jpg" },
    { name: "Dr. Dwiza Riana, S.Si., M.M., M.Kom.", position: "Bendahara Umum", department: "Executive Board", image: "https://randomuser.me/api/portraits/women/3.jpg" },
    { name: "Prof. Dr. Ema Utami, S.Si., M.Kom.", position: "Wakil Ketua I (Bidang Akademik)", department: "Vice Chairmen", image: "https://randomuser.me/api/portraits/women/4.jpg" },
    { name: "Solikin, S.Si., M.T.", position: "Wakil Ketua II (Bidang SDM)", department: "Vice Chairmen", image: "https://randomuser.me/api/portraits/men/5.jpg" },
];

const institutions = [
    { name: "Universitas Indonesia", type: "PTN", province: "DKI Jakarta", website: "https://ui.ac.id", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Makara_of_Universitas_Indonesia.svg/1200px-Makara_of_Universitas_Indonesia.svg.png" },
    { name: "Institut Teknologi Bandung", type: "PTN", province: "Jawa Barat", website: "https://itb.ac.id", logo: "https://upload.wikimedia.org/wikipedia/id/thumb/9/95/Logo_ITB_%281959%29.svg/1200px-Logo_ITB_%281959%29.svg.png" },
    { name: "Universitas Gadjah Mada", type: "PTN", province: "DI Yogyakarta", website: "https://ugm.ac.id", logo: "https://upload.wikimedia.org/wikipedia/id/thumb/8/8f/Logo_Universitas_Gadjah_Mada.png/1200px-Logo_Universitas_Gadjah_Mada.png" },
    { name: "Universitas Telkom", type: "PTS", province: "Jawa Barat", website: "https://telkomuniversity.ac.id", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Telkom_University_Logo.svg/1200px-Telkom_University_Logo.svg.png" },
    { name: "Universitas Gunadarma", type: "PTS", province: "Jawa Barat", website: "https://gunadarma.ac.id", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Logo_Universitas_Gunadarma.svg/1200px-Logo_Universitas_Gunadarma.svg.png" },
];

const journals = [
    { title: "IAES International Journal of Artificial Intelligence (IJ-AI)", publisher: "IAES & APTIKOM", link: "#", description: "Scopus Q2" },
    { title: "International Journal of Electrical and Computer Engineering (IJECE)", publisher: "IAES & APTIKOM", link: "#", description: "Scopus Q2" },
    { title: "Jurnal Sistem Informasi (JSI)", publisher: "Fasilkom UI & APTIKOM", link: "#", description: "SINTA 2" },
    { title: "APTIKOM Journal on Computer Science and Information Technologies (CSIT)", publisher: "APTIKOM Pusat", link: "#", description: "SINTA 3" },
];

const documents = [
    { title: "Panduan Kurikulum OBE APTIKOM 2024", category: "Panduan", fileUrl: "#", description: "Size: 4.2 MB | Date: Jan 2024" },
    { title: "Buku Saku Anggota APTIKOM", category: "Panduan", fileUrl: "#", description: "Size: 1.5 MB | Date: Des 2023" },
    { title: "Pedoman Akreditasi LAM INFOKOM", category: "Panduan", fileUrl: "#", description: "Size: 3.8 MB | Date: Nov 2023" },
    { title: "Surat Edaran RAKORNAS 2025", category: "Edaran Pusat", fileUrl: "#", description: "Size: 250 KB | Date: Jun 2025" },
    { title: "SK Pengurus Pusat 2022-2026", category: "Edaran Pusat", fileUrl: "#", description: "Size: 1.2 MB | Date: Okt 2022" },
    { title: "Undangan Halal Bihalal APTIKOM Jatim", category: "Edaran Jatim", fileUrl: "#", description: "Size: 180 KB | Date: Mei 2025" },
    { title: "Hasil Muswil APTIKOM Jatim 2024", category: "Edaran Jatim", fileUrl: "#", description: "Size: 2.1 MB | Date: Mar 2024" },
];

const individuals = [
    { name: "Dr. Budi Santoso, M.Kom.", affiliation: "Universitas Indonesia", role: "Dosen", province: "DKI Jakarta" },
    { name: "Siti Aminah, S.Kom., M.T.", affiliation: "Institut Teknologi Bandung", role: "Dosen", province: "Jawa Barat" },
    { name: "Rahmat Hidayat", affiliation: "PT. Telkom Indonesia", role: "Praktisi", province: "Jawa Barat" },
    { name: "Andi Wijaya, S.Kom.", affiliation: "Universitas Gadjah Mada", role: "Mahasiswa S2", province: "DI Yogyakarta" },
    { name: "Prof. Dr. Eko Indrajit", affiliation: "Perbanas Institute", role: "Dosen", province: "DKI Jakarta" },
];

async function main() {
    console.log('Seeding database...');

    // Posts
    for (const post of posts) {
        await prisma.post.create({ data: post });
    }

    // Events
    for (const event of events) {
        await prisma.event.create({ data: event });
    }

    // Board Members
    for (const member of boardMembers) {
        // Need to adjust schema if department is not there, or use dynamic field
        // Checking schema, BoardMember has: id, name, position, image, period, order. NO DEPARTMENT.
        // I will add department to schema first or map it to something else? 
        // User hasn't asked for department schema change, but the UI filters by it.
        // I should update schema to include 'department' string field.
    }
}

// Since I realized BoardMember schema is missing 'department', I will fix schema first.
console.log("Please update schema to include BoardMember department field first!");
