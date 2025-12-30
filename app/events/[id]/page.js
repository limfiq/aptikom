const { Event } = require('@/models');
import Link from 'next/link';
import { Calendar, MapPin, ArrowLeft, ExternalLink } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function EventDetail({ params }) {
    const { id } = await params;

    const event = await Event.findOne({
        where: { id: parseInt(id) },
        raw: true
    });

    if (!event) {
        notFound();
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="bg-primary py-16 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
                        <ArrowLeft size={20} className="mr-2" />
                        Kembali ke Beranda
                    </Link>
                    <div className="flex items-center gap-4 mb-4">
                        <span className="px-3 py-1 bg-secondary text-white text-xs font-semibold rounded-full uppercase">
                            {event.type}
                        </span>
                    </div>
                    <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-8">
                    {/* Event Info */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="flex-shrink-0 w-16 text-center">
                                <div className="bg-primary/10 text-primary rounded-lg py-2 px-1">
                                    <span className="block text-xs font-bold uppercase">
                                        {new Date(event.date).toLocaleDateString('id-ID', { month: 'short' })}
                                    </span>
                                    <span className="block text-2xl font-bold">
                                        {new Date(event.date).getDate()}
                                    </span>
                                    <span className="block text-xs">
                                        {new Date(event.date).getFullYear()}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500 mb-1">Tanggal</div>
                                <div className="font-semibold text-gray-900">
                                    {new Date(event.date).toLocaleDateString('id-ID', {
                                        weekday: 'long',
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                            <MapPin className="text-primary flex-shrink-0 mt-1" size={24} />
                            <div>
                                <div className="text-sm text-gray-500 mb-1">Lokasi</div>
                                <div className="font-semibold text-gray-900">{event.location}</div>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-primary mb-4">Tentang Event</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Event {event.type.toLowerCase()} ini akan diselenggarakan pada tanggal{' '}
                            {new Date(event.date).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}{' '}
                            di {event.location}. Acara ini merupakan bagian dari program APTIKOM untuk meningkatkan
                            kualitas pendidikan tinggi informatika dan komputer di Indonesia.
                        </p>
                    </div>

                    {/* Link */}
                    {event.link && event.link !== '#' && (
                        <div className="border-t pt-6">
                            <a
                                href={event.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
                            >
                                Informasi Lebih Lanjut
                                <ExternalLink size={18} className="ml-2" />
                            </a>
                        </div>
                    )}
                </div>

                {/* Back Button */}
                <div className="mt-8">
                    <Link
                        href="/"
                        className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        <ArrowLeft size={20} className="mr-2" />
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>
        </div>
    );
}
