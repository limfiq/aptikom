import { NextResponse } from 'next/server';
import { Achievement } from '@/models';

export async function GET() {
    try {
        const achievements = await Achievement.findAll({
            order: [
                ['order', 'ASC'],
                ['date', 'DESC']
            ]
        });

        return NextResponse.json({
            success: true,
            data: achievements
        });
    } catch (error) {
        console.error('Error fetching achievements:', error);
        return NextResponse.json(
            { success: false, message: 'Gagal memuat data prestasi' },
            { status: 500 }
        );
    }
}
