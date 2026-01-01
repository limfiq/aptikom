const { Event } = require('../../../../models');
const { authenticateAdmin, unauthorizedResponse } = require('../../../../lib/middleware');

// GET - List all events
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 10;
        const type = searchParams.get('type');
        const offset = (page - 1) * limit;

        const where = {};
        if (type) {
            where.type = type;
        }

        const { count, rows } = await Event.findAndCountAll({
            where,
            limit,
            offset,
            order: [['date', 'DESC']]
        });

        return Response.json({
            events: rows,
            total: count,
            page,
            totalPages: Math.ceil(count / limit)
        });
    } catch (error) {
        console.error('Error fetching events:', error);
        return Response.json({ error: 'Failed to fetch events' }, { status: 500 });
    }
}

// POST - Create new event (protected)
export async function POST(request) {
    const auth = await authenticateAdmin(request);
    if (!auth.authenticated) {
        return unauthorizedResponse(auth.error);
    }

    try {
        const body = await request.json();
        const { title, date, location, type, link } = body;

        if (!title || !date || !location || !type) {
            return Response.json(
                { error: 'Title, date, location, and type are required' },
                { status: 400 }
            );
        }

        const event = await Event.create({
            title,
            date,
            location,
            type,
            link
        });

        return Response.json({ success: true, event }, { status: 201 });
    } catch (error) {
        console.error('Error creating event:', error);
        return Response.json({ error: 'Failed to create event' }, { status: 500 });
    }
}

// PUT - Update event (protected)
export async function PUT(request) {
    const auth = await authenticateAdmin(request);
    if (!auth.authenticated) {
        return unauthorizedResponse(auth.error);
    }

    try {
        const body = await request.json();
        const { id, title, date, location, type, link } = body;

        if (!id) {
            return Response.json({ error: 'Event ID is required' }, { status: 400 });
        }

        const event = await Event.findByPk(id);
        if (!event) {
            return Response.json({ error: 'Event not found' }, { status: 404 });
        }

        await event.update({
            title: title || event.title,
            date: date || event.date,
            location: location || event.location,
            type: type || event.type,
            link: link !== undefined ? link : event.link
        });

        return Response.json({ success: true, event });
    } catch (error) {
        console.error('Error updating event:', error);
        return Response.json({ error: 'Failed to update event' }, { status: 500 });
    }
}

// DELETE - Delete event (protected)
export async function DELETE(request) {
    const auth = await authenticateAdmin(request);
    if (!auth.authenticated) {
        return unauthorizedResponse(auth.error);
    }

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return Response.json({ error: 'Event ID is required' }, { status: 400 });
        }

        const event = await Event.findByPk(id);
        if (!event) {
            return Response.json({ error: 'Event not found' }, { status: 404 });
        }

        await event.destroy();
        return Response.json({ success: true, message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error);
        return Response.json({ error: 'Failed to delete event' }, { status: 500 });
    }
}
