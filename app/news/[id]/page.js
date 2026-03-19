const { Post } = require('@/models');
import Link from 'next/link';
import { Calendar, ArrowLeft, Tag } from 'lucide-react';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
    const { id } = await params;
    const post = await Post.findOne({
        where: { id: parseInt(id) },
        raw: true
    });

    if (!post) {
        return {
            title: 'Berita Tidak Ditemukan | APTIKOM',
        };
    }

    const description = post.content ? post.content.substring(0, 150) + '...' : 'Berita terbaru APTIKOM.';

    return {
        title: `${post.title} | Berita APTIKOM`,
        description: description,
        openGraph: {
            title: post.title,
            description: description,
            images: post.image ? [post.image] : ['/logo.png'],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: description,
            images: post.image ? [post.image] : ['/logo.png'],
        }
    };
}
export default async function NewsDetail({ params }) {
    const { id } = await params;

    const post = await Post.findOne({
        where: { id: parseInt(id) },
        raw: true
    });

    if (!post) {
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
                            {post.category}
                        </span>
                        <div className="flex items-center text-white/80 text-sm">
                            <Calendar size={16} className="mr-2" />
                            {new Date(post.createdAt).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {post.image && (
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-96 object-cover"
                        />
                    )}
                    <div className="p-8">
                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {post.content}
                            </p>
                        </div>
                    </div>
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
