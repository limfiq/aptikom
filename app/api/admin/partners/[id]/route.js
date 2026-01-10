import { NextResponse } from 'next/server';
import { Partner } from '@/models';
import { uploadImage } from '@/lib/upload';

export async function GET(request, { params }) {
    try {
        const partner = await Partner.findByPk(params.id);
        if (!partner) {
            return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
        }
        return NextResponse.json(partner);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const partner = await Partner.findByPk(params.id);
        if (!partner) {
            return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
        }

        const formData = await request.formData();
        const name = formData.get('name');
        const link = formData.get('link');
        const file = formData.get('logo');

        let logoUrl = partner.logo;
        if (file && file instanceof File) {
            logoUrl = await uploadImage(file, 'partners');
        }

        await partner.update({
            name: name || partner.name,
            link: link || partner.link,
            logo: logoUrl
        });

        return NextResponse.json(partner);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const partner = await Partner.findByPk(params.id);
        if (!partner) {
            return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
        }

        await partner.destroy();
        return NextResponse.json({ message: 'Partner deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
