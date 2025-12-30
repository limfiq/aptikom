const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const individualMembers = [
    { name: "Dr. Budi Santoso, M.Kom.", affiliation: "Universitas Indonesia", role: "Dosen", province: "DKI Jakarta" },
    { name: "Siti Aminah, S.Kom., M.T.", affiliation: "Institut Teknologi Bandung", role: "Dosen", province: "Jawa Barat" },
    { name: "Rahmat Hidayat", affiliation: "PT. Telkom Indonesia", role: "Praktisi", province: "Jawa Barat" },
    { name: "Andi Wijaya, S.Kom.", affiliation: "Universitas Gadjah Mada", role: "Mahasiswa S2", province: "DI Yogyakarta" },
    { name: "Prof. Dr. Eko Indrajit", affiliation: "Perbanas Institute", role: "Dosen", province: "DKI Jakarta" },
];

async function main() {
    console.log('Seeding Individual Members...');
    for (const member of individualMembers) {
        await prisma.individualMember.create({
            data: member
        });
    }
    console.log('Seeding finished.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
