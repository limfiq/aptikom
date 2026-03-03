'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Footer() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // Default footer data as fallback
    const defaultData = {
        address: 'Jl. Telekomunikasi No. 1, Terusan Buah Batu, Bandung, Indonesia',
        phone: '+62 812-3456-7890',
        email: 'info@aptikom.org',
        facebook: '#',
        twitter: '#',
        instagram: '#',
        linkedin: '#'
    };

    // Fetch profile from API
    useEffect(() => {
        async function fetchProfile() {
            try {
                const response = await fetch('/api/profile');
                if (response.ok) {
                    const data = await response.json();
                    setProfile(data);
                } else {
                    setProfile(defaultData);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                setProfile(defaultData);
            } finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, []);

    const data = profile || defaultData;
    const { address, city, province, phone, email, facebook, twitter, instagram, linkedin } = data;
    const fullAddress = `${address}${city ? ', ' + city : ''}${province ? ', ' + province : ''}`;

    return (
        <footer className="bg-primary text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Column 1: Organization Info */}
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-white text-xl font-bold mb-4 tracking-wider">APTIKOM Jawa Timur</h3>
                        <Image src="/logo.png" alt="Logo" width={100} height={50} />
                        <p className="text-sm mb-4">
                            Asosiasi Pendidikan Tinggi Informatika dan Komputer. Mewujudkan pendidikan tinggi komputer yang berkualitas dan berdaya saing global.
                        </p>
                        <div className="flex space-x-4">
                            {facebook && facebook !== '#' && (
                                <Link href={facebook} target="_blank" className="text-gray-400 hover:text-secondary transition-colors"><Facebook size={20} /></Link>
                            )}
                            {twitter && twitter !== '#' && (
                                <Link href={twitter} target="_blank" className="text-gray-400 hover:text-secondary transition-colors"><Twitter size={20} /></Link>
                            )}
                            {instagram && instagram !== '#' && (
                                <Link href={instagram} target="_blank" className="text-gray-400 hover:text-secondary transition-colors"><Instagram size={20} /></Link>
                            )}
                            {linkedin && linkedin !== '#' && (
                                <Link href={linkedin} target="_blank" className="text-gray-400 hover:text-secondary transition-colors"><Linkedin size={20} /></Link>
                            )}
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4 border-b border-gray-600 pb-2 inline-block">Tautan Cepat</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className="hover:text-secondary transition-colors">Beranda</Link></li>
                            <li><Link href="/about" className="hover:text-secondary transition-colors">Tentang Kami</Link></li>
                            <li><Link href="/news" className="hover:text-secondary transition-colors">Berita Terkini</Link></li>
                            <li><Link href="/events" className="hover:text-secondary transition-colors">Agenda Kegiatan</Link></li>
                            <li><Link href="/contact" className="hover:text-secondary transition-colors">Hubungi Kami</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Membership */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4 border-b border-gray-600 pb-2 inline-block">Keanggotaan</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/institusi" className="hover:text-secondary transition-colors">Direktori Institusi</Link></li>
                            <li><Link href="/individu" className="hover:text-secondary transition-colors">Direktori Individu</Link></li>
                            <li><Link href="https://dias.aptikom.org/" className="hover:text-secondary transition-colors">Portal DIAS</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact - Dynamic from Database */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4 border-b border-gray-600 pb-2 inline-block">Kontak</h3>
                        <ul className="space-y-3 text-sm">
                            {loading ? (
                                <li className="text-gray-400">Loading...</li>
                            ) : (
                                <>
                                    {fullAddress && (
                                        <li className="flex items-start">
                                            <MapPin size={18} className="mr-2 mt-0.5 text-secondary flex-shrink-0" />
                                            <span>{fullAddress}</span>
                                        </li>
                                    )}
                                    {phone && (
                                        <li className="flex items-center">
                                            <Phone size={18} className="mr-2 text-secondary flex-shrink-0" />
                                            <a href={`tel:${phone}`} className="hover:text-secondary transition-colors">{phone}</a>
                                        </li>
                                    )}
                                    {email && (
                                        <li className="flex items-center">
                                            <Mail size={18} className="mr-2 text-secondary flex-shrink-0" />
                                            <a href={`mailto:${email}`} className="hover:text-secondary transition-colors">{email}</a>
                                        </li>
                                    )}
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bg-[#15233b] py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-400">
                    &copy; {new Date().getFullYear()} APTIKOM. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
