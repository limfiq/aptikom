import { NextResponse } from 'next/server';
import { OrganizationProfile } from '@/models';

export async function GET() {
    try {
        const profile = await OrganizationProfile.findOne();

        if (!profile) {
            return NextResponse.json(
                { error: 'Profile not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(profile);
    } catch (error) {
        console.error('Error fetching profile:', error);
        return NextResponse.json(
            { error: 'Failed to fetch profile' },
            { status: 500 }
        );
    }
}
