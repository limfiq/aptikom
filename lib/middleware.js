const { verifyToken } = require('./auth');
const { Admin } = require('../models');
const { rateLimitMiddleware, authLimiter, apiLimiter } = require('./rateLimit');
const { validateRequestSize, validateContentType, sanitizeErrorMessage, logSecurityEvent } = require('./security');

/**
 * Middleware to verify JWT token and authenticate admin
 * Usage: Add this middleware to protected routes
 */
async function authenticateAdmin(request) {
    try {
        // Get token from Authorization header
        const authHeader = request.headers.get('authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            logSecurityEvent('AUTH_FAILED', { reason: 'No token provided' });
            return {
                authenticated: false,
                error: 'No token provided'
            };
        }

        const token = authHeader.substring(7); // Remove 'Bearer ' prefix

        // Verify token
        const decoded = verifyToken(token);

        if (!decoded) {
            logSecurityEvent('AUTH_FAILED', { reason: 'Invalid token' });
            return {
                authenticated: false,
                error: 'Invalid or expired token'
            };
        }

        // Check if admin exists and is active
        const admin = await Admin.findByPk(decoded.id);

        if (!admin || !admin.isActive) {
            logSecurityEvent('AUTH_FAILED', { reason: 'Admin not found or inactive', adminId: decoded.id });
            return {
                authenticated: false,
                error: 'Admin not found or inactive'
            };
        }

        return {
            authenticated: true,
            admin: {
                id: admin.id,
                username: admin.username,
                email: admin.email,
                role: admin.role
            }
        };
    } catch (error) {
        console.error('Authentication error:', error);
        logSecurityEvent('AUTH_ERROR', { error: error.message });
        return {
            authenticated: false,
            error: 'Authentication failed'
        };
    }
}

/**
 * Helper function to create unauthorized response
 */
function unauthorizedResponse(message = 'Unauthorized') {
    return new Response(
        JSON.stringify({ error: message }),
        {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
        }
    );
}

/**
 * Apply rate limiting to request
 */
async function applyRateLimit(request, limiter = apiLimiter) {
    const rateLimitCheck = await rateLimitMiddleware(limiter)(request);
    return rateLimitCheck;
}

/**
 * Validate request before processing
 */
function validateRequest(request, options = {}) {
    const errors = [];

    // Validate request size
    const sizeValidation = validateRequestSize(request, options.maxSize);
    if (!sizeValidation.valid) {
        errors.push(sizeValidation.error);
    }

    // Validate content type for POST/PUT requests
    if (['POST', 'PUT'].includes(request.method)) {
        const contentTypeValidation = validateContentType(request, options.allowedContentTypes);
        if (!contentTypeValidation.valid) {
            errors.push(contentTypeValidation.error);
        }
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

/**
 * Create error response with sanitized message
 */
function errorResponse(error, status = 500, isDevelopment = false) {
    const message = sanitizeErrorMessage(error, isDevelopment);
    return new Response(
        JSON.stringify({ error: message }),
        {
            status,
            headers: { 'Content-Type': 'application/json' }
        }
    );
}

/**
 * Create success response
 */
function successResponse(data, status = 200) {
    return new Response(
        JSON.stringify(data),
        {
            status,
            headers: { 'Content-Type': 'application/json' }
        }
    );
}

module.exports = {
    authenticateAdmin,
    unauthorizedResponse,
    applyRateLimit,
    validateRequest,
    errorResponse,
    successResponse,
    authLimiter,
    apiLimiter
};
