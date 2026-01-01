'use client';

import Link from 'next/link';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center">
                {/* 404 Animation */}
                <div className="mb-8">
                    <div className="relative inline-block">
                        <h1 className="text-[180px] md:text-[240px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 leading-none">
                            404
                        </h1>
                        <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-blue-400 to-indigo-400 opacity-20 -z-10"></div>
                    </div>
                </div>

                {/* Message */}
                <div className="mb-8 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Halaman Tidak Ditemukan
                    </h2>
                    <p className="text-lg text-gray-600 max-w-md mx-auto">
                        Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
                    </p>
                </div>

                {/* Decorative Elements */}
                <div className="mb-12 flex justify-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center animate-bounce">
                        <Search className="text-blue-600" size={28} />
                    </div>
                    <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center animate-bounce">
                        <Home className="text-indigo-600" size={28} />
                    </div>
                    <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center animate-bounce">
                        <ArrowLeft className="text-purple-600" size={28} />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                        <Home size={20} />
                        Kembali ke Beranda
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 hover:shadow-lg transition-all duration-300"
                    >
                        <ArrowLeft size={20} />
                        Halaman Sebelumnya
                    </button>
                </div>

                {/* Helpful Links */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-4">Mungkin Anda mencari:</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link href="/about" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                            Tentang APTIKOM
                        </Link>
                        <span className="text-gray-300">•</span>
                        <Link href="/news" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                            Berita
                        </Link>
                        <span className="text-gray-300">•</span>
                        <Link href="/events" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                            Event
                        </Link>
                        <span className="text-gray-300">•</span>
                        <Link href="/contact" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                            Kontak
                        </Link>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="mt-8">
                    <p className="text-xs text-gray-400">
                        Jika Anda yakin ini adalah kesalahan, silakan{' '}
                        <Link href="/contact" className="text-blue-600 hover:underline">
                            hubungi kami
                        </Link>
                    </p>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            </div>
        </div>
    );
}
