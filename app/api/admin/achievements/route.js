import { NextResponse } from 'next/server';
import { Achievement } from '@/models';
import { uploadImage } from '../../../../lib/upload';

export async function GET() {
    try {
        const achievements = await Achievement.findAll({
            order: [
                ['order', 'ASC'],
                ['date', 'DESC']
            ]
        });
        return NextResponse.json(achievements);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const formData = await request.formData();
        const title = formData.get('title');
        const description = formData.get('description');
        const date = formData.get('date');
        const category = formData.get('category');
        const file = formData.get('image');

        if (!title || !date) {
            return NextResponse.json({ error: 'Title and Date are required' }, { status: 400 });
        }

        let imageUrl = null;
        if (file && file !== 'undefined') {
            imageUrl = await uploadImage(file, 'achievements');
        }

        const achievement = await Achievement.create({
            title,
            description,
            date,
            category,
            image: imageUrl,
            order: 0 // Default order, can be managed later
        });

        return NextResponse.json(achievement);
    } catch (error) {
        console.error('Error creating achievement:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
