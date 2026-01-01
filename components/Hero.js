'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Hero() {
    const [banners, setBanners] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    // Default banner as fallback
    const defaultBanner = {
        title: 'Memajukan Pendidikan Tinggi Informatika & Komputer',
        subtitle: 'Bergabunglah bersama kami dalam membangun ekosistem pendidikan teknologi yang unggul, inovatif, dan berdaya saing global untuk masa depan Indonesia.',
        backgroundImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        buttonText: 'Daftar Anggota',
        buttonLink: 'https://dias.aptikom.org/'
    };

    // Fetch banners from API
    useEffect(() => {
        async function fetchBanners() {
            try {
                const response = await fetch('/api/banners');
                if (response.ok) {
                    const data = await response.json();
                    setBanners(data.length > 0 ? data : [defaultBanner]);
                } else {
                    setBanners([defaultBanner]);
                }
            } catch (error) {
                console.error('Error fetching banners:', error);
                setBanners([defaultBanner]);
            } finally {
                setLoading(false);
            }
        }
        fetchBanners();
    }, []);

    // Auto-play slider
    useEffect(() => {
        if (banners.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % banners.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [banners.length]);

    const currentBanner = banners[currentIndex] || defaultBanner;

    if (loading) {
        return (
            <div className="relative bg-[#1A2B48] text-white">
                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                    <div className="animate-pulse">
                        <div className="h-12 bg-white/10 rounded w-3/4 mb-6"></div>
                        <div className="h-6 bg-white/10 rounded w-2/3 mb-4"></div>
                        <div className="h-6 bg-white/10 rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative bg-[#1A2B48] text-white overflow-hidden">
            {/* Banner Slides */}
            <div className="relative">
                {banners.map((banner, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                    >
                        {/* Background Pattern/Image Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1A2B48] to-[#1A2B48]/80 z-10"></div>
                        <div
                            className="absolute inset-0 bg-cover bg-center z-0 opacity-40 mix-blend-overlay"
                            style={{ backgroundImage: `url('${banner.backgroundImage}')` }}
                        ></div>
                    </div>
                ))}

                {/* Content */}
                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                    <div className="md:w-2/3">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight transition-all duration-500">
                            {currentBanner.title.split(' ').slice(0, -2).join(' ')}{' '}
                            <br />
                            <span className="text-secondary">
                                {currentBanner.title.split(' ').slice(-2).join(' ')}
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl transition-all duration-500">
                            {currentBanner.subtitle}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            {currentBanner.buttonText && currentBanner.buttonLink && (
                                <Link
                                    href={currentBanner.buttonLink}
                                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-secondary hover:bg-secondary-hover transition-colors md:text-lg"
                                >
                                    {currentBanner.buttonText}
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            )}
                            <Link
                                href="/about"
                                className="inline-flex items-center justify-center px-8 py-3 border border-gray-400 text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors md:text-lg"
                            >
                                Pelajari Lebih Lanjut
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Navigation Dots */}
                {banners.length > 1 && (
                    <div className="relative z-20 flex justify-center gap-2 pb-8">
                        {banners.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                        ? 'bg-secondary w-8'
                                        : 'bg-white/30 hover:bg-white/50'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Stats or Highlight Bar */}
            <div className="relative z-20 bg-[#00BCD4]/10 border-t border-white/10 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                            <div className="text-3xl font-bold text-secondary">850+</div>
                            <div className="text-sm text-gray-400 uppercase tracking-wider">Anggota Institusi</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-secondary">34</div>
                            <div className="text-sm text-gray-400 uppercase tracking-wider">Provinsi</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-secondary">100+</div>
                            <div className="text-sm text-gray-400 uppercase tracking-wider">Mitra Industri</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-secondary">24/7</div>
                            <div className="text-sm text-gray-400 uppercase tracking-wider">Akses Sistem</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
