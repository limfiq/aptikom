const { Post } = require('@/models');
import Link from 'next/link';
import { Calendar, Tag, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function NewsPage() {
    const posts = await Post.findAll({
        order: [['createdAt', 'DESC']],
        raw: true
    });

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="bg-primary py-20 text-white text-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold mb-4">Berita & Pengumuman</h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Informasi terkini seputar kegiatan dan perkembangan APTIKOM
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <article key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                            {post.image && (
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            )}
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs font-semibold rounded uppercase">
                                        {post.category}
                                    </span>
                                    <div className="flex items-center text-gray-500 text-xs">
                                        <Calendar size={14} className="mr-1" />
                                        {new Date(post.createdAt).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </div>
                                </div>
                                <h2 className="text-xl font-bold text-primary mb-3 line-clamp-2 leading-tight">
                                    {post.title}
                                </h2>
                                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                                    {post.content}
                                </p>
                                <Link
                                    href={`/news/${post.id}`}
                                    className="inline-flex items-center text-sm font-medium text-primary hover:text-secondary transition-colors"
                                >
                                    Baca Selengkapnya
                                    <ArrowRight size={16} className="ml-1" />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

                {posts.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-gray-500 text-lg">Belum ada berita yang dipublikasikan.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
