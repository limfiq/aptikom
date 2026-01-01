const { Admin } = require('../../../../models');
const { comparePassword, generateToken } = require('../../../../lib/auth');
const { applyRateLimit, authLimiter } = require('../../../../lib/middleware');
const { validateInput } = require('../../../../lib/validation');
const { sanitizeString } = require('../../../../lib/sanitize');
const { logSecurityEvent } = require('../../../../lib/security');

export async function POST(request) {
    // Apply strict rate limiting for login attempts (prevent brute force)
    const rateLimit = await applyRateLimit(request, authLimiter);
    if (!rateLimit.allowed) {
        logSecurityEvent('LOGIN_RATE_LIMIT', { retryAfter: rateLimit.response.headers.get('Retry-After') });
        return rateLimit.response;
    }

    try {
        const body = await request.json();
        const { username, password } = body;

        // Validate input
        const validation = validateInput(body, {
            username: {
                required: true,
                type: 'string',
                minLength: 3,
                maxLength: 50,
                checkSql: true
            },
            password: {
                required: true,
                type: 'string',
                minLength: 6,
                maxLength: 100
            }
        });

        if (!validation.valid) {
            logSecurityEvent('LOGIN_VALIDATION_FAILED', { errors: validation.errors });
            return Response.json(
                { error: 'Invalid input', details: validation.errors },
                { status: 400 }
            );
        }

        // Sanitize username
        const sanitizedUsername = sanitizeString(username, { maxLength: 50 });

        // Find admin by username
        const admin = await Admin.findOne({ where: { username: sanitizedUsername } });

        if (!admin) {
            logSecurityEvent('LOGIN_FAILED', { username: sanitizedUsername, reason: 'User not found' });
            // Use generic error message to prevent username enumeration
            return Response.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Check if admin is active
        if (!admin.isActive) {
            logSecurityEvent('LOGIN_FAILED', { username: sanitizedUsername, reason: 'Account inactive' });
            return Response.json(
                { error: 'Account is inactive' },
                { status: 403 }
            );
        }

        // Verify password
        const isValidPassword = await comparePassword(password, admin.password);

        if (!isValidPassword) {
            logSecurityEvent('LOGIN_FAILED', { username: sanitizedUsername, reason: 'Invalid password' });
            // Use generic error message
            return Response.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Generate JWT token
        const token = generateToken({
            id: admin.id,
            username: admin.username,
            email: admin.email,
            role: admin.role
        });

        logSecurityEvent('LOGIN_SUCCESS', { username: sanitizedUsername, adminId: admin.id });

        // Return success response
        return Response.json({
            success: true,
            token,
            admin: {
                id: admin.id,
                username: admin.username,
                email: admin.email,
                role: admin.role
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        logSecurityEvent('LOGIN_ERROR', { error: error.message });
        return Response.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
