'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Contact() {
    const [contactInfo, setContactInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch organization profile from database
    useEffect(() => {
        async function fetchContactData() {
            try {
                const response = await fetch('/api/profile');
                if (response.ok) {
                    const data = await response.json();
                    setContactInfo({
                        officeName: data.name || 'APTIKOM',
                        address: data.address || '',
                        city: data.city || '',
                        province: data.province || '',
                        phone: data.phone || '',
                        email: data.email || '',
                        weekdayHours: data.operatingHours?.weekday || '08.00 - 16.00 WIB',
                        weekendHours: data.operatingHours?.weekend || 'Closed'
                    });
                } else {
                    console.error('Failed to fetch profile:', response.status);
                }
            } catch (error) {
                console.error('Error fetching contact data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchContactData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.email.trim() ||
            !formData.subject.trim() || !formData.message.trim()) {
            toast.error('Semua field harus diisi.');
            return;
        }

        setIsSubmitting(true);
        const loadingToast = toast.loading('Mengirim pesan...');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            toast.dismiss(loadingToast);

            if (response.ok && data.success) {
                toast.success(data.message || 'Pesan berhasil dikirim!');
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            } else {
                toast.error(data.message || 'Gagal mengirim pesan. Silakan coba lagi.');
            }
        } catch (error) {
            toast.dismiss(loadingToast);
            console.error('Error submitting form:', error);
            toast.error('Terjadi kesalahan. Silakan coba lagi.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const info = contactInfo || {
        officeName: 'APTIKOM',
        address: '',
        city: '',
        province: '',
        phone: '',
        email: '',
        weekdayHours: '—',
        weekendHours: '—'
    };

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
                            {loading ? (
                                <div className="animate-pulse space-y-6">
                                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                                    <div className="space-y-4">
                                        <div className="h-20 bg-gray-200 rounded"></div>
                                        <div className="h-20 bg-gray-200 rounded"></div>
                                        <div className="h-20 bg-gray-200 rounded"></div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-xl font-bold text-primary mb-6">{info.officeName}</h3>
                                    <div className="space-y-6">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                                <MapPin size={24} />
                                            </div>
                                            <div className="ml-4">
                                                <p className="font-semibold text-gray-900">Alamat</p>
                                                <p className="text-gray-600 whitespace-pre-line">
                                                    {info.address || '(Tidak tersedia)'}
                                                    {info.city && `, ${info.city}`}
                                                    {info.province && ` - ${info.province}`}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                                <Phone size={24} />
                                            </div>
                                            <div className="ml-4">
                                                <p className="font-semibold text-gray-900">Telepon</p>
                                                <p className="text-gray-600">{info.phone}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                                <Mail size={24} />
                                            </div>
                                            <div className="ml-4">
                                                <p className="font-semibold text-gray-900">Email</p>
                                                <p className="text-gray-600">{info.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="bg-primary p-8 rounded-xl shadow-lg text-white">
                            {loading ? (
                                <div className="animate-pulse space-y-4">
                                    <div className="h-6 bg-white/20 rounded w-1/2"></div>
                                    <div className="space-y-2">
                                        <div className="h-4 bg-white/20 rounded"></div>
                                        <div className="h-4 bg-white/20 rounded"></div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-xl font-bold mb-4">Jam Operasional</h3>
                                    <ul className="space-y-2 text-blue-100">
                                        <li className="flex justify-between">
                                            <span>Senin - Jumat</span>
                                            <span>{info.weekdayHours}</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span>Sabtu - Minggu</span>
                                            <span>{info.weekendHours}</span>
                                        </li>
                                    </ul>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-xl shadow-lg">
                        <h3 className="text-2xl font-bold text-primary mb-6">Kirim Pesan</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all disabled:bg-gray-100"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all disabled:bg-gray-100"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subjek</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all disabled:bg-gray-100"
                                    placeholder="Perihal pesan Anda"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isSubmitting}
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all disabled:bg-gray-100"
                                    placeholder="Tuliskan pesan Anda di sini..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-secondary text-white font-bold py-3 px-4 rounded-lg hover:bg-secondary-hover transition-colors shadow-md flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                <Send size={18} className="mr-2" />
                                {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
