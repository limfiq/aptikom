const { Event } = require('@/models');
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

export default async function EventsPage() {
    const events = await Event.findAll({
        order: [['date', 'ASC']],
        raw: true
    });

    // Separate upcoming and past events
    const now = new Date();
    const upcomingEvents = events.filter(e => new Date(e.date) >= now);
    const pastEvents = events.filter(e => new Date(e.date) < now);

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="bg-primary py-20 text-white text-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold mb-4">Agenda & Kegiatan</h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Konferensi, pelatihan, dan kompetisi yang diselenggarakan APTIKOM
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Upcoming Events */}
                {upcomingEvents.length > 0 && (
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold text-primary mb-6">Event Mendatang</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {upcomingEvents.map((event) => (
                                <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="p-6">
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="flex-shrink-0 w-16 text-center">
                                                <div className="bg-primary/10 text-primary rounded-lg py-2 px-1">
                                                    <span className="block text-xs font-bold uppercase">
                                                        {new Date(event.date).toLocaleDateString('id-ID', { month: 'short' })}
                                                    </span>
                                                    <span className="block text-2xl font-bold">
                                                        {new Date(event.date).getDate()}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs font-semibold rounded uppercase">
                                                    {event.type}
                                                </span>
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-bold text-primary mb-3 line-clamp-2">
                                            {event.title}
                                        </h3>
                                        <div className="flex items-start text-gray-600 text-sm mb-4">
                                            <MapPin size={16} className="mr-2 flex-shrink-0 mt-0.5" />
                                            <span className="line-clamp-2">{event.location}</span>
                                        </div>
                                        <Link
                                            href={`/events/${event.id}`}
                                            className="inline-flex items-center text-sm font-medium text-primary hover:text-secondary transition-colors"
                                        >
                                            Lihat Detail
                                            <ArrowRight size={16} className="ml-1" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Past Events */}
                {pastEvents.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-700 mb-6">Event Sebelumnya</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pastEvents.map((event) => (
                                <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden opacity-75 hover:opacity-100 transition-opacity">
                                    <div className="p-6">
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="flex-shrink-0 w-16 text-center">
                                                <div className="bg-gray-100 text-gray-600 rounded-lg py-2 px-1">
                                                    <span className="block text-xs font-bold uppercase">
                                                        {new Date(event.date).toLocaleDateString('id-ID', { month: 'short' })}
                                                    </span>
                                                    <span className="block text-2xl font-bold">
                                                        {new Date(event.date).getDate()}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded uppercase">
                                                    {event.type}
                                                </span>
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-700 mb-3 line-clamp-2">
                                            {event.title}
                                        </h3>
                                        <div className="flex items-start text-gray-500 text-sm mb-4">
                                            <MapPin size={16} className="mr-2 flex-shrink-0 mt-0.5" />
                                            <span className="line-clamp-2">{event.location}</span>
                                        </div>
                                        <Link
                                            href={`/events/${event.id}`}
                                            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-primary transition-colors"
                                        >
                                            Lihat Detail
                                            <ArrowRight size={16} className="ml-1" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {events.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-gray-500 text-lg">Belum ada event yang dijadwalkan.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
