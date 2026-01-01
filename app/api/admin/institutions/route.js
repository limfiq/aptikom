const { MemberInstitution } = require('../../../../models');
const { authenticateAdmin, unauthorizedResponse } = require('../../../../lib/middleware');

// GET - List all institutions
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 20;
        const type = searchParams.get('type');
        const province = searchParams.get('province');
        const offset = (page - 1) * limit;

        const where = {};
        if (type) where.type = type;
        if (province) where.province = province;

        const { count, rows } = await MemberInstitution.findAndCountAll({
            where,
            limit,
            offset,
            order: [['name', 'ASC']]
        });

        return Response.json({
            institutions: rows,
            total: count,
            page,
            totalPages: Math.ceil(count / limit)
        });
    } catch (error) {
        console.error('Error fetching institutions:', error);
        return Response.json({ error: 'Failed to fetch institutions' }, { status: 500 });
    }
}

// POST - Create new institution (protected)
export async function POST(request) {
    const auth = await authenticateAdmin(request);
    if (!auth.authenticated) {
        return unauthorizedResponse(auth.error);
    }

    try {
        const body = await request.json();
        const { name, type, province, logo, website } = body;

        if (!name || !type || !province) {
            return Response.json(
                { error: 'Name, type, and province are required' },
                { status: 400 }
            );
        }

        const institution = await MemberInstitution.create({
            name,
            type,
            province,
            logo,
            website
        });

        return Response.json({ success: true, institution }, { status: 201 });
    } catch (error) {
        console.error('Error creating institution:', error);
        return Response.json({ error: 'Failed to create institution' }, { status: 500 });
    }
}

// PUT - Update institution (protected)
export async function PUT(request) {
    const auth = await authenticateAdmin(request);
    if (!auth.authenticated) {
        return unauthorizedResponse(auth.error);
    }

    try {
        const body = await request.json();
        const { id, name, type, province, logo, website } = body;

        if (!id) {
            return Response.json({ error: 'Institution ID is required' }, { status: 400 });
        }

        const institution = await MemberInstitution.findByPk(id);
        if (!institution) {
            return Response.json({ error: 'Institution not found' }, { status: 404 });
        }

        await institution.update({
            name: name || institution.name,
            type: type || institution.type,
            province: province || institution.province,
            logo: logo !== undefined ? logo : institution.logo,
            website: website !== undefined ? website : institution.website
        });

        return Response.json({ success: true, institution });
    } catch (error) {
        console.error('Error updating institution:', error);
        return Response.json({ error: 'Failed to update institution' }, { status: 500 });
    }
}

// DELETE - Delete institution (protected)
export async function DELETE(request) {
    const auth = await authenticateAdmin(request);
    if (!auth.authenticated) {
        return unauthorizedResponse(auth.error);
    }

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return Response.json({ error: 'Institution ID is required' }, { status: 400 });
        }

        const institution = await MemberInstitution.findByPk(id);
        if (!institution) {
            return Response.json({ error: 'Institution not found' }, { status: 404 });
        }

        await institution.destroy();
        return Response.json({ success: true, message: 'Institution deleted successfully' });
    } catch (error) {
        console.error('Error deleting institution:', error);
        return Response.json({ error: 'Failed to delete institution' }, { status: 500 });
    }
}
