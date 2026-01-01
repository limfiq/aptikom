import { NextResponse } from 'next/server';
const { ContactInfo } = require('@/models');

export async function GET() {
    try {
        // Get the first (and should be only) contact info record
        const contactInfo = await ContactInfo.findOne({
            raw: true
        });

        if (!contactInfo) {
            return NextResponse.json(
                { error: 'Contact information not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(contactInfo);
    } catch (error) {
        console.error('Error fetching contact info:', error);
        return NextResponse.json(
            { error: 'Failed to fetch contact information' },
            { status: 500 }
        );
    }
}
