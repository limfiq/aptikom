import Link from 'next/link';
import { ExternalLink, BookOpen } from 'lucide-react';
const { Journal } = require('@/models');

export default async function Journals() {
    const journals = await Journal.findAll({
        order: [['title', 'ASC']],
        raw: true
    });
    return (
        <div className="bg-white min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-primary mb-4">Jurnal & Publikasi</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Daftar jurnal ilmiah nasional dan internasional yang dikelola atau bekerjasama dengan APTIKOM untuk publikasi hasil riset.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {journals.map((journal) => (
                        <div key={journal.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all group">
                            <div className="flex items-start justify-between">
                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <BookOpen size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-primary mb-1 leading-snug">{journal.title}</h3>
                                        <p className="text-sm text-gray-500 mb-2">{journal.publisher}</p>
                                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-medium">
                                            {journal.rank}
                                        </span>
                                    </div>
                                </div>
                                <Link href={journal.link} className="text-gray-400 hover:text-secondary">
                                    <ExternalLink size={20} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
