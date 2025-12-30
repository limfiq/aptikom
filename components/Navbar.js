'use client';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-primary sticky top-0 z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <Link href="/" className="text-white font-bold text-2xl tracking-wider">
                            APTIKOM
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-6">
                            <Link href="/" className="text-gray-300 hover:text-secondary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Home
                            </Link>

                            {/* Profil Dropdown Group */}
                            <div className="relative group">
                                <button className="text-gray-300 hover:text-secondary px-3 py-2 rounded-md text-sm font-medium transition-colors inline-flex items-center">
                                    Profil
                                </button>
                                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left z-50">
                                    <div className="py-1">
                                        <Link href="/about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Tentang Kami</Link>
                                        <Link href="/management" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Susunan Pengurus</Link>
                                        <Link href="/institusi" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Anggota Instansi</Link>
                                        <Link href="/individu" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Anggota Individu</Link>
                                    </div>
                                </div>
                            </div>

                            {/* Publikasi Dropdown Group */}
                            <div className="relative group">
                                <button className="text-gray-300 hover:text-secondary px-3 py-2 rounded-md text-sm font-medium transition-colors inline-flex items-center">
                                    Publikasi
                                </button>
                                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left z-50">
                                    <div className="py-1">
                                        <Link href="/news" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Berita</Link>
                                        <Link href="/journals" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Jurnal</Link>
                                        <Link href="/documents" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Panduan & Edaran</Link>
                                    </div>
                                </div>
                            </div>

                            <Link href="/events" className="text-gray-300 hover:text-secondary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Kegiatan
                            </Link>
                            <Link href="/contact" className="text-gray-300 hover:text-secondary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Kontak
                            </Link>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <Link href="/join" className="bg-secondary hover:bg-secondary-hover text-white px-5 py-2 rounded-full font-medium transition-colors">
                            Gabung Anggota
                        </Link>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="bg-primary inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primary border-t border-gray-700">
                        <Link href="/" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</Link>
                        <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Profil</div>
                        <Link href="/about" className="text-gray-300 hover:text-white block px-3 py-1 rounded-md text-base font-medium pl-6">Tentang Kami</Link>
                        <Link href="/management" className="text-gray-300 hover:text-white block px-3 py-1 rounded-md text-base font-medium pl-6">Susunan Pengurus</Link>
                        <Link href="/members" className="text-gray-300 hover:text-white block px-3 py-1 rounded-md text-base font-medium pl-6">Direktori Anggota</Link>

                        <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-2">Publikasi</div>
                        <Link href="/news" className="text-gray-300 hover:text-white block px-3 py-1 rounded-md text-base font-medium pl-6">Berita</Link>
                        <Link href="/journals" className="text-gray-300 hover:text-white block px-3 py-1 rounded-md text-base font-medium pl-6">Jurnal</Link>
                        <Link href="/documents" className="text-gray-300 hover:text-white block px-3 py-1 rounded-md text-base font-medium pl-6">Panduan & Edaran</Link>

                        <Link href="/events" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium mt-2">Kegiatan</Link>
                        <Link href="/contact" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Kontak</Link>
                        <Link href="https://dias.aptikom.org/" className="bg-secondary text-white block px-3 py-2 rounded-md text-base font-medium mt-4 text-center">Gabung Anggota</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
