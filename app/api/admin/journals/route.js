const { Journal } = require('../../../../models');
const { authenticateAdmin, unauthorizedResponse } = require('../../../../lib/middleware');

// GET - List all journals
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const rank = searchParams.get('rank');

        const where = {};
        if (rank) where.rank = rank;

        const journals = await Journal.findAll({
            where,
            order: [['id', 'DESC']]
        });

        return Response.json({ journals });
    } catch (error) {
        console.error('Error fetching journals:', error);
        return Response.json({ error: 'Failed to fetch journals' }, { status: 500 });
    }
}

// POST - Create new journal (protected)
export async function POST(request) {
    const auth = await authenticateAdmin(request);
    if (!auth.authenticated) {
        return unauthorizedResponse(auth.error);
    }

    try {
        const body = await request.json();
        const { title, publisher, link, rank, description } = body;

        if (!title || !publisher || !link) {
            return Response.json(
                { error: 'Title, publisher, and link are required' },
                { status: 400 }
            );
        }

        const journal = await Journal.create({
            title,
            publisher,
            link,
            rank,
            description
        });

        return Response.json({ success: true, journal }, { status: 201 });
    } catch (error) {
        console.error('Error creating journal:', error);
        return Response.json({ error: 'Failed to create journal' }, { status: 500 });
    }
}

// PUT - Update journal (protected)
export async function PUT(request) {
    const auth = await authenticateAdmin(request);
    if (!auth.authenticated) {
        return unauthorizedResponse(auth.error);
    }

    try {
        const body = await request.json();
        const { id, title, publisher, link, rank, description } = body;

        if (!id) {
            return Response.json({ error: 'Journal ID is required' }, { status: 400 });
        }

        const journal = await Journal.findByPk(id);
        if (!journal) {
            return Response.json({ error: 'Journal not found' }, { status: 404 });
        }

        await journal.update({
            title: title || journal.title,
            publisher: publisher || journal.publisher,
            link: link || journal.link,
            rank: rank !== undefined ? rank : journal.rank,
            description: description !== undefined ? description : journal.description
        });

        return Response.json({ success: true, journal });
    } catch (error) {
        console.error('Error updating journal:', error);
        return Response.json({ error: 'Failed to update journal' }, { status: 500 });
    }
}

// DELETE - Delete journal (protected)
export async function DELETE(request) {
    const auth = await authenticateAdmin(request);
    if (!auth.authenticated) {
        return unauthorizedResponse(auth.error);
    }

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return Response.json({ error: 'Journal ID is required' }, { status: 400 });
        }

        const journal = await Journal.findByPk(id);
        if (!journal) {
            return Response.json({ error: 'Journal not found' }, { status: 404 });
        }

        await journal.destroy();
        return Response.json({ success: true, message: 'Journal deleted successfully' });
    } catch (error) {
        console.error('Error deleting journal:', error);
        return Response.json({ error: 'Failed to delete journal' }, { status: 500 });
    }
}
