import Link from 'next/link';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
    return (
        <div className="bg-gray-50 min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-primary mb-4">Hubungi Kami</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Kami siap mendengar masukan, pertanyaan, dan saran Anda untuk kemajuan bersama.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold text-primary mb-6">Kantor Pusat</h3>
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                        <MapPin size={24} />
                                    </div>
                                    <div className="ml-4">
                                        <p className="font-semibold text-gray-900">Alamat</p>
                                        <p className="text-gray-600">
                                            Gd. Graha Simatupang, Menara I A Lantai 5<br />
                                            Jl. TB Simatupang Kav. 38, Jakarta, Indonesia
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                        <Phone size={24} />
                                    </div>
                                    <div className="ml-4">
                                        <p className="font-semibold text-gray-900">Telepon</p>
                                        <p className="text-gray-600">+62 811 8300 996</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                        <Mail size={24} />
                                    </div>
                                    <div className="ml-4">
                                        <p className="font-semibold text-gray-900">Email</p>
                                        <p className="text-gray-600">info@aptikom.org</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary p-8 rounded-xl shadow-lg text-white">
                            <h3 className="text-xl font-bold mb-4">Jam Operasional</h3>
                            <ul className="space-y-2 text-blue-100">
                                <li className="flex justify-between">
                                    <span>Senin - Jumat</span>
                                    <span>08.00 - 16.00 WIB</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Sabtu - Minggu</span>
                                    <span>Tutup</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-xl shadow-lg">
                        <h3 className="text-2xl font-bold text-primary mb-6">Kirim Pesan</h3>
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                                    <input type="text" id="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subjek</label>
                                <input type="text" id="subject" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all" placeholder="Perihal pesan Anda" />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
                                <textarea id="message" rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all" placeholder="Tuliskan pesan Anda di sini..."></textarea>
                            </div>

                            <button type="submit" className="w-full bg-secondary text-white font-bold py-3 px-4 rounded-lg hover:bg-secondary-hover transition-colors shadow-md flex items-center justify-center">
                                <Send size={18} className="mr-2" />
                                Kirim Pesan
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
