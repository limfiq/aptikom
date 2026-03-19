const { Achievement } = require('@/models');
import { Award, Calendar } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AchievementsPage() {
    const achievements = await Achievement.findAll({
        order: [
            ['order', 'ASC'],
            ['date', 'DESC']
        ],
        raw: true
    });

    return (
        <div className="bg-white min-h-screen">
            {/* Header */}
            <div className="bg-primary py-20 text-white text-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold mb-4">Prestasi & Penghargaan</h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Jejak langkah keberhasilan dan pengakuan atas dedikasi APTIKOM dalam memajukan pendidikan informatika
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {achievements.map((achievement) => (
                        <div key={achievement.id} className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="relative h-64 overflow-hidden bg-gray-100">
                                {achievement.image ? (
                                    <img
                                        src={achievement.image}
                                        alt={achievement.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                        <Award size={64} />
                                    </div>
                                )}
                                <div className="absolute top-0 right-0 m-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm border border-gray-200">
                                    {achievement.category || 'Penghargaan'}
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center text-gray-500 text-xs mb-3 font-medium">
                                    <Calendar size={14} className="mr-1.5" />
                                    {new Date(achievement.date).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </div>
                                <h3 className="text-xl font-bold text-primary mb-3 leading-tight group-hover:text-secondary transition-colors">
                                    {achievement.title}
                                </h3>
                                {achievement.description && (
                                    <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                                        {achievement.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {achievements.length === 0 && (
                    <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        <Award size={48} className="mx-auto text-gray-400 mb-4 opacity-50" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Belum Ada Data Prestasi</h3>
                        <p className="text-gray-500">Data prestasi dan penghargaan akan segera ditampilkan di sini.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
