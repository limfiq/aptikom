import Link from 'next/link';

export default function About() {
    return (
        <div className="bg-white">
            {/* Header */}
            <div className="bg-primary py-20 text-center text-white">
                <h1 className="text-4xl font-bold mb-4">Tentang APTIKOM</h1>
                <p className="text-xl opacity-90 max-w-2xl mx-auto">
                    Mengenal lebih dekat sejarah, visi, dan misi kami dalam memajukan pendidikan tinggi informatika di Indonesia.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* History Section */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-primary mb-6">Sejarah Singkat</h2>
                    <div className="prose prose-lg text-gray-600 max-w-none">
                        <p className="mb-4">
                            Asosiasi Pendidikan Tinggi Informatika dan Komputer (APTIKOM) adalah organisasi nirlaba yang beranggotakan perguruan tinggi yang menyelenggarakan program studi di bidang Rumpun Ilmu Informatika dan Komputer.
                        </p>
                        <p>
                            Didirikan dengan semangat kebersamaan untuk meningkatkan kualitas pendidikan tinggi komputer di Indonesia, APTIKOM telah berkembang menjadi wadah strategis bagi pertukaran informasi, pengembangan kurikulum, dan kolaborasi riset antar perguruan tinggi di seluruh nusantara.
                        </p>
                    </div>
                </div>

                {/* Vision & Mission */}
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
                        <h3 className="text-2xl font-bold text-primary mb-4">Visi</h3>
                        <p className="text-gray-700 italic">
                            "Menjadi organisasi pembina pendidikan tinggi informatika dan komputer yang terkemuka, modern, dan berkontribusi nyata bagi kemajuan bangsa."
                        </p>
                    </div>
                    <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
                        <h3 className="text-2xl font-bold text-primary mb-4">Misi</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>Meningkatkan kualitas akademik program studi rumpun infokom.</li>
                            <li>Mendorong kolaborasi riset dan publikasi ilmiah.</li>
                            <li>Memfasilitasi kerjasama antara perguruan tinggi dan industri.</li>
                            <li>Mengembangkan standar kompetensi lulusan yang berdaya saing global.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
