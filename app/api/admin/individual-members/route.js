const { IndividualMember } = require('../../../../models');
const { authenticateAdmin, unauthorizedResponse } = require('../../../../lib/middleware');

// GET - List all individual members
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 20;
        const province = searchParams.get('province');
        const role = searchParams.get('role');
        const offset = (page - 1) * limit;

        const where = {};
        if (province) where.province = province;
        if (role) where.role = role;

        const { count, rows } = await IndividualMember.findAndCountAll({
            where,
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        });

        return Response.json({
            members: rows,
            total: count,
            page,
            totalPages: Math.ceil(count / limit)
        });
    } catch (error) {
        console.error('Error fetching individual members:', error);
        return Response.json({ error: 'Failed to fetch individual members' }, { status: 500 });
    }
}

// POST - Create new individual member (protected)
export async function POST(request) {
    const auth = await authenticateAdmin(request);
    if (!auth.authenticated) {
        return unauthorizedResponse(auth.error);
    }

    try {
        const body = await request.json();
        const { name, affiliation, role, province, image } = body;

        if (!name || !affiliation || !role || !province) {
            return Response.json(
                { error: 'Name, affiliation, role, and province are required' },
                { status: 400 }
            );
        }

        const member = await IndividualMember.create({
            name,
            affiliation,
            role,
            province,
            image
        });

        return Response.json({ success: true, member }, { status: 201 });
    } catch (error) {
        console.error('Error creating individual member:', error);
        return Response.json({ error: 'Failed to create individual member' }, { status: 500 });
    }
}

// PUT - Update individual member (protected)
export async function PUT(request) {
    const auth = await authenticateAdmin(request);
    if (!auth.authenticated) {
        return unauthorizedResponse(auth.error);
    }

    try {
        const body = await request.json();
        const { id, name, affiliation, role, province, image } = body;

        if (!id) {
            return Response.json({ error: 'Member ID is required' }, { status: 400 });
        }

        const member = await IndividualMember.findByPk(id);
        if (!member) {
            return Response.json({ error: 'Individual member not found' }, { status: 404 });
        }

        await member.update({
            name: name || member.name,
            affiliation: affiliation || member.affiliation,
            role: role || member.role,
            province: province || member.province,
            image: image !== undefined ? image : member.image
        });

        return Response.json({ success: true, member });
    } catch (error) {
        console.error('Error updating individual member:', error);
        return Response.json({ error: 'Failed to update individual member' }, { status: 500 });
    }
}

// DELETE - Delete individual member (protected)
export async function DELETE(request) {
    const auth = await authenticateAdmin(request);
    if (!auth.authenticated) {
        return unauthorizedResponse(auth.error);
    }

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return Response.json({ error: 'Member ID is required' }, { status: 400 });
        }

        const member = await IndividualMember.findByPk(id);
        if (!member) {
            return Response.json({ error: 'Individual member not found' }, { status: 404 });
        }

        await member.destroy();
        return Response.json({ success: true, message: 'Individual member deleted successfully' });
    } catch (error) {
        console.error('Error deleting individual member:', error);
        return Response.json({ error: 'Failed to delete individual member' }, { status: 500 });
    }
}
