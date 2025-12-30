const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const existing = await prisma.organizationProfile.findFirst();

    if (!existing) {
        await prisma.organizationProfile.create({
            data: {
                history: `Asosiasi Pendidikan Tinggi Informatika dan Komputer (APTIKOM) adalah organisasi nirlaba yang beranggotakan perguruan tinggi yang menyelenggarakan program studi di bidang Rumpun Ilmu Informatika dan Komputer.

Didirikan dengan semangat kebersamaan untuk meningkatkan kualitas pendidikan tinggi komputer di Indonesia, APTIKOM telah berkembang menjadi wadah strategis bagi pertukaran informasi, pengembangan kurikulum, dan kolaborasi riset antar perguruan tinggi di seluruh nusantara.`,
                vision: "Menjadi organisasi pembina pendidikan tinggi informatika dan komputer yang terkemuka, modern, dan berkontribusi nyata bagi kemajuan bangsa.",
                mission: `<ul>
  <li>Meningkatkan kualitas akademik program studi rumpun infokom.</li>
  <li>Mendorong kolaborasi riset dan publikasi ilmiah.</li>
  <li>Memfasilitasi kerjasama antara perguruan tinggi dan industri.</li>
  <li>Mengembangkan standar kompetensi lulusan yang berdaya saing global.</li>
</ul>`
            }
        });
        console.log('Seeded OrganizationProfile');
    } else {
        console.log('OrganizationProfile already exists');
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
