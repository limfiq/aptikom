import { NextResponse } from 'next/server';
import { Partner } from '@/models';
import { uploadImage } from '../../../../lib/upload';

export async function GET() {
    try {
        const partners = await Partner.findAll({
            order: [['order', 'ASC']]
        });
        return NextResponse.json(partners);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const formData = await request.formData();
        const name = formData.get('name');
        const link = formData.get('link');
        const file = formData.get('logo');

        if (!name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        let logoUrl = null;
        if (file && file !== 'undefined') {
            logoUrl = await uploadImage(file, 'partners');
        }

        const partner = await Partner.create({
            name,
            link,
            logo: logoUrl,
            order: 0 // Default order
        });

        return NextResponse.json(partner);
    } catch (error) {
        console.error('Error creating partner:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
