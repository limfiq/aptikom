const { Document } = require('../../../../models');
const { authenticateAdmin, unauthorizedResponse } = require('../../../../lib/middleware');

// GET - List all documents
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 10;
        const category = searchParams.get('category');
        const offset = (page - 1) * limit;

        const where = {};
        if (category) where.category = category;

        const { count, rows } = await Document.findAndCountAll({
            where,
            limit,
            offset,
            order: [['updatedAt', 'DESC']]
        });

        return Response.json({
            documents: rows,
            total: count,
            page,
            totalPages: Math.ceil(count / limit)
        });
    } catch (error) {
        console.error('Error fetching documents:', error);
        return Response.json({ error: 'Failed to fetch documents' }, { status: 500 });
    }
}

// POST - Create new document (protected)
export async function POST(request) {
    const auth = await authenticateAdmin(request);
    if (!auth.authenticated) {
        return unauthorizedResponse(auth.error);
    }

    try {
        const body = await request.json();
        const { title, category, fileUrl, size, description } = body;

        if (!title || !category || !fileUrl) {
            return Response.json(
                { error: 'Title, category, and fileUrl are required' },
                { status: 400 }
            );
        }

        const document = await Document.create({
            title,
            category,
            fileUrl,
            size,
            description
        });

        return Response.json({ success: true, document }, { status: 201 });
    } catch (error) {
        console.error('Error creating document:', error);
        return Response.json({ error: 'Failed to create document' }, { status: 500 });
    }
}

// PUT - Update document (protected)
export async function PUT(request) {
    const auth = await authenticateAdmin(request);
    if (!auth.authenticated) {
        return unauthorizedResponse(auth.error);
    }

    try {
        const body = await request.json();
        const { id, title, category, fileUrl, size, description } = body;

        if (!id) {
            return Response.json({ error: 'Document ID is required' }, { status: 400 });
        }

        const document = await Document.findByPk(id);
        if (!document) {
            return Response.json({ error: 'Document not found' }, { status: 404 });
        }

        await document.update({
            title: title || document.title,
            category: category || document.category,
            fileUrl: fileUrl || document.fileUrl,
            size: size !== undefined ? size : document.size,
            description: description !== undefined ? description : document.description
        });

        return Response.json({ success: true, document });
    } catch (error) {
        console.error('Error updating document:', error);
        return Response.json({ error: 'Failed to update document' }, { status: 500 });
    }
}

// DELETE - Delete document (protected)
export async function DELETE(request) {
    const auth = await authenticateAdmin(request);
    if (!auth.authenticated) {
        return unauthorizedResponse(auth.error);
    }

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return Response.json({ error: 'Document ID is required' }, { status: 400 });
        }

        const document = await Document.findByPk(id);
        if (!document) {
            return Response.json({ error: 'Document not found' }, { status: 404 });
        }

        await document.destroy();
        return Response.json({ success: true, message: 'Document deleted successfully' });
    } catch (error) {
        console.error('Error deleting document:', error);
        return Response.json({ error: 'Failed to delete document' }, { status: 500 });
    }
}
