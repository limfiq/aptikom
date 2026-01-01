import { NextResponse } from 'next/server';
import { Partner } from '@/models';

export async function GET() {
    try {
        const partners = await Partner.findAll({
            order: [
                ['order', 'ASC'],
                ['createdAt', 'DESC']
            ]
        });

        return NextResponse.json({
            success: true,
            data: partners
        });
    } catch (error) {
        console.error('Error fetching partners:', error);
        return NextResponse.json(
            { success: false, message: 'Gagal memuat data mitra' },
            { status: 500 }
        );
    }
}
