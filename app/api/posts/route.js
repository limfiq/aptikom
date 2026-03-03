import { NextResponse } from 'next/server';
import { Post } from '@/models';

export async function GET() {
    try {
        const posts = await Post.findAll({
            order: [['createdAt', 'DESC']]
        });

        return NextResponse.json({
            success: true,
            data: posts
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json(
            { success: false, message: 'Gagal memuat data posts' },
            { status: 500 }
        );
    }
}
