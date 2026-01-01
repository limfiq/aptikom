const { OrganizationProfile } = require('../../../../models');
const { authenticateAdmin, unauthorizedResponse } = require('../../../../lib/middleware');

// GET - Get organization profile
export async function GET(request) {
    try {
        // Get the first (and should be only) profile record
        const profile = await OrganizationProfile.findOne();

        if (!profile) {
            return Response.json({ error: 'Profile not found' }, { status: 404 });
        }

        return Response.json({ profile });
    } catch (error) {
        console.error('Error fetching profile:', error);
        return Response.json({ error: 'Failed to fetch profile' }, { status: 500 });
    }
}

// PUT - Update organization profile (protected)
export async function PUT(request) {
    const auth = await authenticateAdmin(request);
    if (!auth.authenticated) {
        return unauthorizedResponse(auth.error);
    }

    try {
        const body = await request.json();

        // Get existing profile or create new one
        let profile = await OrganizationProfile.findOne();

        if (!profile) {
            // Create new profile if doesn't exist
            profile = await OrganizationProfile.create(body);
        } else {
            // Update existing profile
            await profile.update(body);
        }

        return Response.json({ success: true, profile });
    } catch (error) {
        console.error('Error updating profile:', error);
        return Response.json({ error: 'Failed to update profile' }, { status: 500 });
    }
}
