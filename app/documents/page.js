import { FileText, Download, Folder } from 'lucide-react';
const { Document } = require('@/models');

export default async function Documents() {
    const allDocs = await Document.findAll({
        order: [['updatedAt', 'DESC']],
        raw: true
    });

    // Group documents by category
    const categories = [...new Set(allDocs.map(d => d.category))];
    const documents = categories.map(cat => ({
        category: cat,
        items: allDocs.filter(d => d.category === cat).map(doc => ({
            ...doc,
            date: new Date(doc.updatedAt).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })
        }))
    }));
    return (
        <div className="bg-gray-50 min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h1 className="text-3xl font-bold text-primary mb-4">Dokumen & Edaran</h1>
                    <p className="text-gray-600">
                        Unduh materi panduan resmi, surat keputusan, dan surat edaran dari APTIKOM Pusat maupun Wilayah.
                    </p>
                </div>

                <div className="space-y-12">
                    {documents.map((section, idx) => (
                        <div key={idx}>
                            <div className="flex items-center mb-6">
                                <Folder className="text-secondary mr-2" size={24} />
                                <h2 className="text-2xl font-bold text-primary">{section.category}</h2>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100">
                                {section.items.map((doc) => (
                                    <div key={doc.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center">
                                            <div className="bg-red-50 text-red-500 w-10 h-10 rounded-lg flex items-center justify-center mr-4">
                                                <FileText size={20} />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{doc.title}</h3>
                                                <div className="flex text-xs text-gray-400 mt-1 space-x-2">
                                                    <span>{doc.date}</span>
                                                    <span>&bull;</span>
                                                    <span>{doc.size}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <a
                                            href={doc.fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-secondary transition-colors p-2 rounded-full hover:bg-gray-100"
                                        >
                                            <Download size={20} />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
