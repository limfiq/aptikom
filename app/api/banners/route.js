import { NextResponse } from 'next/server';
const { Banner } = require('@/models');

export async function GET() {
    try {
        const banners = await Banner.findAll({
            where: {
                isActive: true
            },
            order: [['order', 'ASC']],
            raw: true
        });

        return NextResponse.json(banners);
    } catch (error) {
        console.error('Error fetching banners:', error);
        return NextResponse.json(
            { error: 'Failed to fetch banners' },
            { status: 500 }
        );
    }
}
