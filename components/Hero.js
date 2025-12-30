import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <div className="relative bg-[#1A2B48] text-white">
            {/* Background Pattern/Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A2B48] to-[#1A2B48]/80 z-10"></div>
            <div
                className="absolute inset-0 bg-cover bg-center z-0 opacity-40 mix-blend-overlay"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}
            ></div>

            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                <div className="md:w-2/3">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
                        Memajukan Pendidikan Tinggi <br />
                        <span className="text-secondary">Informatika & Komputer</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
                        Bergabunglah bersama kami dalam membangun ekosistem pendidikan teknologi yang unggul, inovatif, dan berdaya saing global untuk masa depan Indonesia.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href="https://dias.aptikom.org/"
                            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-secondary hover:bg-secondary-hover transition-colors md:text-lg"
                        >
                            Daftar Anggota
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                        <Link
                            href="/about"
                            className="inline-flex items-center justify-center px-8 py-3 border border-gray-400 text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors md:text-lg"
                        >
                            Pelajari Lebih Lanjut
                        </Link>
                    </div>
                </div>
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
