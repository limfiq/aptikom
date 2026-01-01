const { BoardMember } = require('../../../../models');
const { authenticateAdmin, unauthorizedResponse } = require('../../../../lib/middleware');

// GET - List all board members
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const period = searchParams.get('period');

        const where = {};
        if (period) {
            where.period = period;
        }

        const members = await BoardMember.findAll({
            where,
            order: [['order', 'ASC'], ['id', 'ASC']]
        });

        return Response.json({ members });
    } catch (error) {
        console.error('Error fetching board members:', error);
        return Response.json({ error: 'Failed to fetch board members' }, { status: 500 });
    }
}

// POST - Create new board member (protected)
export async function POST(request) {
    const auth = await authenticateAdmin(request);
    if (!auth.authenticated) {
        return unauthorizedResponse(auth.error);
    }

    try {
        const body = await request.json();
        const { name, position, department, image, period, order } = body;

        if (!name || !position || !department || !period) {
            return Response.json(
                { error: 'Name, position, department, and period are required' },
                { status: 400 }
            );
        }

        const member = await BoardMember.create({
            name,
            position,
            department,
            image,
            period,
            order: order || 0
        });

        return Response.json({ success: true, member }, { status: 201 });
    } catch (error) {
        console.error('Error creating board member:', error);
        return Response.json({ error: 'Failed to create board member' }, { status: 500 });
    }
}

// PUT - Update board member (protected)
export async function PUT(request) {
    const auth = await authenticateAdmin(request);
    if (!auth.authenticated) {
        return unauthorizedResponse(auth.error);
    }

    try {
        const body = await request.json();
        const { id, name, position, department, image, period, order } = body;

        if (!id) {
            return Response.json({ error: 'Member ID is required' }, { status: 400 });
        }

        const member = await BoardMember.findByPk(id);
        if (!member) {
            return Response.json({ error: 'Board member not found' }, { status: 404 });
        }

        await member.update({
            name: name || member.name,
            position: position || member.position,
            department: department || member.department,
            image: image !== undefined ? image : member.image,
            period: period || member.period,
            order: order !== undefined ? order : member.order
        });

        return Response.json({ success: true, member });
    } catch (error) {
        console.error('Error updating board member:', error);
        return Response.json({ error: 'Failed to update board member' }, { status: 500 });
    }
}

// DELETE - Delete board member (protected)
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

        const member = await BoardMember.findByPk(id);
        if (!member) {
            return Response.json({ error: 'Board member not found' }, { status: 404 });
        }

        await member.destroy();
        return Response.json({ success: true, message: 'Board member deleted successfully' });
    } catch (error) {
        console.error('Error deleting board member:', error);
        return Response.json({ error: 'Failed to delete board member' }, { status: 500 });
    }
}
