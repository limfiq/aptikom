import Link from 'next/link';

export default function Join() {
    return (
        <div className="bg-gray-50 min-h-screen py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-primary py-10 px-8 text-center">
                        <h1 className="text-3xl font-bold text-white mb-2">Gabung Anggota APTIKOM</h1>
                        <p className="text-blue-100">Bergabunglah dengan ribuan institusi lainnya.</p>
                    </div>

                    <div className="p-8 md:p-12">
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="inst_name" className="block text-sm font-medium text-gray-700 mb-1">Nama Institusi</label>
                                    <input type="text" id="inst_name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all" />
                                </div>
                                <div>
                                    <label htmlFor="inst_type" className="block text-sm font-medium text-gray-700 mb-1">Jenis Institusi</label>
                                    <select id="inst_type" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all">
                                        <option>Universitas</option>
                                        <option>Institut</option>
                                        <option>Politeknik</option>
                                        <option>Sekolah Tinggi</option>
                                        <option>Akademi</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                                <textarea id="address" rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"></textarea>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Resmi</label>
                                    <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all" />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
                                    <input type="tel" id="phone" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all" />
                                </div>
                            </div>

                            <div className="pt-4">
                                <button type="submit" className="w-full bg-secondary text-white font-bold py-3 px-4 rounded-lg hover:bg-secondary-hover transition-colors shadow-md">
                                    Kirim Pendaftaran
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
