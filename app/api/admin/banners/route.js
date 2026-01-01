const { Banner } = require('../../../../models');
const { authenticateAdmin, unauthorizedResponse, applyRateLimit, apiLimiter, authLimiter } = require('../../../../lib/middleware');
const { validateInput, isValidId } = require('../../../../lib/validation');
const { sanitizeString, sanitizeUserContent } = require('../../../../lib/sanitize');

// GET - List all banners (admin view)
export async function GET(request) {
    const rateLimit = await applyRateLimit(request, apiLimiter);
    if (!rateLimit.allowed) {
        return rateLimit.response;
    }

    const auth = await authenticateAdmin(request);
    if (!auth.authenticated) {
        return unauthorizedResponse(auth.error);
    }

    try {
        const banners = await Banner.findAll({
            order: [['order', 'ASC']],
            raw: true
        });

        return Response.json(banners);
    } catch (error) {
        console.error('Error fetching banners:', error);
        return Response.json({ error: 'Failed to fetch banners' }, { status: 500 });
    }
}

// POST - Create new banner
export async function POST(request) {
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
        const { title, subtitle, backgroundImage, buttonText, buttonLink, order, isActive } = body;

        // Validate input
        const validation = validateInput(body, {
            title: {
                required: true,
                type: 'string',
                minLength: 3,
                maxLength: 500,
                checkSql: true
            },
            subtitle: {
                required: true,
                type: 'string',
                minLength: 10,
                maxLength: 1000,
                checkSql: true
            },
            backgroundImage: {
                required: false,
                type: 'url'
            },
            buttonText: {
                required: false,
                type: 'string',
                maxLength: 100
            },
            buttonLink: {
                required: false,
                type: 'url'
            },
            order: {
                required: false,
                type: 'integer',
                min: 0
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
            subtitle: sanitizeUserContent(subtitle, { maxLength: 1000 }),
            backgroundImage: backgroundImage ? sanitizeString(backgroundImage, { maxLength: 1000 }) : null,
            buttonText: buttonText ? sanitizeString(buttonText, { maxLength: 100 }) : null,
            buttonLink: buttonLink ? sanitizeString(buttonLink, { maxLength: 1000 }) : null,
            order: order || 0,
            isActive: isActive !== undefined ? isActive : true
        };

        const banner = await Banner.create(sanitizedData);

        return Response.json({ success: true, banner }, { status: 201 });
    } catch (error) {
        console.error('Error creating banner:', error);
        return Response.json({ error: 'Failed to create banner' }, { status: 500 });
    }
}

// PUT - Update banner
export async function PUT(request) {
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
        const { id, title, subtitle, backgroundImage, buttonText, buttonLink, order, isActive } = body;

        // Validate ID
        if (!isValidId(id)) {
            return Response.json({ error: 'Invalid banner ID' }, { status: 400 });
        }

        const banner = await Banner.findByPk(id);
        if (!banner) {
            return Response.json({ error: 'Banner not found' }, { status: 404 });
        }

        // Validate input if provided
        const fieldsToValidate = {};
        if (title !== undefined) fieldsToValidate.title = title;
        if (subtitle !== undefined) fieldsToValidate.subtitle = subtitle;
        if (backgroundImage !== undefined) fieldsToValidate.backgroundImage = backgroundImage;
        if (buttonText !== undefined) fieldsToValidate.buttonText = buttonText;
        if (buttonLink !== undefined) fieldsToValidate.buttonLink = buttonLink;
        if (order !== undefined) fieldsToValidate.order = order;

        if (Object.keys(fieldsToValidate).length > 0) {
            const validation = validateInput(fieldsToValidate, {
                title: { type: 'string', minLength: 3, maxLength: 500, checkSql: true },
                subtitle: { type: 'string', minLength: 10, maxLength: 1000, checkSql: true },
                backgroundImage: { type: 'url' },
                buttonText: { type: 'string', maxLength: 100 },
                buttonLink: { type: 'url' },
                order: { type: 'integer', min: 0 }
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
        if (subtitle) updateData.subtitle = sanitizeUserContent(subtitle, { maxLength: 1000 });
        if (backgroundImage !== undefined) updateData.backgroundImage = backgroundImage ? sanitizeString(backgroundImage, { maxLength: 1000 }) : null;
        if (buttonText !== undefined) updateData.buttonText = buttonText ? sanitizeString(buttonText, { maxLength: 100 }) : null;
        if (buttonLink !== undefined) updateData.buttonLink = buttonLink ? sanitizeString(buttonLink, { maxLength: 1000 }) : null;
        if (order !== undefined) updateData.order = order;
        if (isActive !== undefined) updateData.isActive = isActive;

        await banner.update(updateData);

        return Response.json({ success: true, banner });
    } catch (error) {
        console.error('Error updating banner:', error);
        return Response.json({ error: 'Failed to update banner' }, { status: 500 });
    }
}

// DELETE - Delete banner
export async function DELETE(request) {
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
            return Response.json({ error: 'Invalid banner ID' }, { status: 400 });
        }

        const banner = await Banner.findByPk(id);
        if (!banner) {
            return Response.json({ error: 'Banner not found' }, { status: 404 });
        }

        await banner.destroy();
        return Response.json({ success: true, message: 'Banner deleted successfully' });
    } catch (error) {
        console.error('Error deleting banner:', error);
        return Response.json({ error: 'Failed to delete banner' }, { status: 500 });
    }
}
