const { Post } = require('../../../../models');
const { authenticateAdmin, unauthorizedResponse, applyRateLimit, apiLimiter, authLimiter } = require('../../../../lib/middleware');
const { validateInput, validatePagination, isValidId } = require('../../../../lib/validation');
const { sanitizeString, sanitizeUserContent } = require('../../../../lib/sanitize');

// GET - List all posts with pagination
export async function GET(request) {
    // Apply rate limiting
    const rateLimit = await applyRateLimit(request, apiLimiter);
    if (!rateLimit.allowed) {
        return rateLimit.response;
    }

    try {
        const { searchParams } = new URL(request.url);
        const page = searchParams.get('page') || '1';
        const limit = searchParams.get('limit') || '10';
        const category = searchParams.get('category');

        // Validate pagination parameters
        const pagination = validatePagination(page, limit);
        if (!pagination.valid) {
            return Response.json({ error: 'Invalid pagination parameters' }, { status: 400 });
        }

        const offset = (pagination.page - 1) * pagination.limit;

        const where = {};
        if (category) {
            // Sanitize category input
            where.category = sanitizeString(category, { maxLength: 100 });
        }

        const { count, rows } = await Post.findAndCountAll({
            where,
            limit: pagination.limit,
            offset,
            order: [['createdAt', 'DESC']]
        });

        return Response.json({
            posts: rows,
            total: count,
            page: pagination.page,
            totalPages: Math.ceil(count / pagination.limit)
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return Response.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}

// POST - Create new post (protected)
export async function POST(request) {
    // Apply stricter rate limiting for write operations
    const rateLimit = await applyRateLimit(request, authLimiter);
    if (!rateLimit.allowed) {
        return rateLimit.response;
    }

    const auth = await authenticateAdmin(request);
    if (!auth.authenticated) {
        return unauthorizedResponse(auth.error);
    }

    try {
        const body = await request.json();
        const { title, content, image, category } = body;

        // Validate input
        const validation = validateInput(body, {
            title: {
                required: true,
                type: 'string',
                minLength: 3,
                maxLength: 500,
                checkSql: true
            },
            content: {
                required: true,
                type: 'string',
                minLength: 10,
                maxLength: 50000,
                checkSql: true
            },
            category: {
                required: true,
                type: 'string',
                minLength: 2,
                maxLength: 100,
                checkSql: true
            },
            image: {
                required: false,
                type: 'url'
            }
        });

        if (!validation.valid) {
            return Response.json(
                { error: 'Validation failed', details: validation.errors },
                { status: 400 }
            );
        }

        // Sanitize inputs
        const sanitizedData = {
            title: sanitizeString(title, { maxLength: 500 }),
            content: sanitizeUserContent(content, { maxLength: 50000 }),
            category: sanitizeString(category, { maxLength: 100 }),
            image: image ? sanitizeString(image, { maxLength: 1000 }) : null
        };

        const post = await Post.create(sanitizedData);

        return Response.json({ success: true, post }, { status: 201 });
    } catch (error) {
        console.error('Error creating post:', error);
        return Response.json({ error: 'Failed to create post' }, { status: 500 });
    }
}

// PUT - Update post (protected)
export async function PUT(request) {
    // Apply rate limiting
    const rateLimit = await applyRateLimit(request, authLimiter);
    if (!rateLimit.allowed) {
        return rateLimit.response;
    }

    const auth = await authenticateAdmin(request);
    if (!auth.authenticated) {
        return unauthorizedResponse(auth.error);
    }

    try {
        const body = await request.json();
        const { id, title, content, image, category } = body;

        // Validate ID
        if (!isValidId(id)) {
            return Response.json({ error: 'Invalid post ID' }, { status: 400 });
        }

        const post = await Post.findByPk(id);
        if (!post) {
            return Response.json({ error: 'Post not found' }, { status: 404 });
        }

        // Validate input if provided
        const fieldsToValidate = {};
        if (title !== undefined) fieldsToValidate.title = title;
        if (content !== undefined) fieldsToValidate.content = content;
        if (category !== undefined) fieldsToValidate.category = category;
        if (image !== undefined) fieldsToValidate.image = image;

        if (Object.keys(fieldsToValidate).length > 0) {
            const validation = validateInput(fieldsToValidate, {
                title: { type: 'string', minLength: 3, maxLength: 500, checkSql: true },
                content: { type: 'string', minLength: 10, maxLength: 50000, checkSql: true },
                category: { type: 'string', minLength: 2, maxLength: 100, checkSql: true },
                image: { type: 'url' }
            });

            if (!validation.valid) {
                return Response.json(
                    { error: 'Validation failed', details: validation.errors },
                    { status: 400 }
                );
            }
        }

        // Sanitize and update
        const updateData = {};
        if (title) updateData.title = sanitizeString(title, { maxLength: 500 });
        if (content) updateData.content = sanitizeUserContent(content, { maxLength: 50000 });
        if (category) updateData.category = sanitizeString(category, { maxLength: 100 });
        if (image !== undefined) updateData.image = image ? sanitizeString(image, { maxLength: 1000 }) : null;

        await post.update(updateData);

        return Response.json({ success: true, post });
    } catch (error) {
        console.error('Error updating post:', error);
        return Response.json({ error: 'Failed to update post' }, { status: 500 });
    }
}

// DELETE - Delete post (protected)
export async function DELETE(request) {
    // Apply rate limiting
    const rateLimit = await applyRateLimit(request, authLimiter);
    if (!rateLimit.allowed) {
        return rateLimit.response;
    }

    const auth = await authenticateAdmin(request);
    if (!auth.authenticated) {
        return unauthorizedResponse(auth.error);
    }

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        // Validate ID
        if (!isValidId(id)) {
            return Response.json({ error: 'Invalid post ID' }, { status: 400 });
        }

        const post = await Post.findByPk(id);
        if (!post) {
            return Response.json({ error: 'Post not found' }, { status: 404 });
        }

        await post.destroy();
        return Response.json({ success: true, message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        return Response.json({ error: 'Failed to delete post' }, { status: 500 });
    }
}
