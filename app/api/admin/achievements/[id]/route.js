import { NextResponse } from 'next/server';
import { Achievement } from '@/models';
import { uploadImage } from '@/lib/upload';

export async function GET(request, { params }) {
    try {
        const achievement = await Achievement.findByPk(params.id);
        if (!achievement) {
            return NextResponse.json({ error: 'Achievement not found' }, { status: 404 });
        }
        return NextResponse.json(achievement);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const achievement = await Achievement.findByPk(params.id);
        if (!achievement) {
            return NextResponse.json({ error: 'Achievement not found' }, { status: 404 });
        }

        const formData = await request.formData();
        const title = formData.get('title');
        const description = formData.get('description');
        const date = formData.get('date');
        const category = formData.get('category');
        const file = formData.get('image');

        let imageUrl = achievement.image;
        if (file && file instanceof File) {
            imageUrl = await uploadImage(file, 'achievements');
        }

        await achievement.update({
            title: title || achievement.title,
            description: description || achievement.description,
            date: date || achievement.date,
            category: category || achievement.category,
            image: imageUrl
        });

        return NextResponse.json(achievement);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const achievement = await Achievement.findByPk(params.id);
        if (!achievement) {
            return NextResponse.json({ error: 'Achievement not found' }, { status: 404 });
        }

        await achievement.destroy();
        return NextResponse.json({ message: 'Achievement deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
