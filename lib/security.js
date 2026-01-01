/**
 * Security Headers and Middleware
 * Implements security best practices for HTTP headers
 */

// Security headers configuration
const securityHeaders = {
    // Prevent clickjacking
    'X-Frame-Options': 'DENY',

    // Prevent MIME type sniffing
    'X-Content-Type-Options': 'nosniff',

    // Enable XSS protection
    'X-XSS-Protection': '1; mode=block',

    // Referrer policy
    'Referrer-Policy': 'strict-origin-when-cross-origin',

    // Content Security Policy
    'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Next.js requires unsafe-inline and unsafe-eval
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: https: http:",
        "connect-src 'self'",
        "frame-ancestors 'none'"
    ].join('; '),

    // Permissions policy
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

// Apply security headers to response
function applySecurityHeaders(response) {
    const headers = new Headers(response.headers);

    Object.entries(securityHeaders).forEach(([key, value]) => {
        headers.set(key, value);
    });

    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers
    });
}

// Create security headers object for Next.js responses
function getSecurityHeaders() {
    return securityHeaders;
}

// Validate request size
function validateRequestSize(request, maxSize = 10 * 1024 * 1024) { // 10MB default
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > maxSize) {
        return {
            valid: false,
            error: 'Request body too large'
        };
    }
    return { valid: true };
}

// Validate content type
function validateContentType(request, allowedTypes = ['application/json']) {
    const contentType = request.headers.get('content-type');
    if (!contentType) {
        return { valid: true }; // Allow requests without content-type (GET, DELETE)
    }

    const isAllowed = allowedTypes.some(type =>
        contentType.toLowerCase().includes(type.toLowerCase())
    );

    if (!isAllowed) {
        return {
            valid: false,
            error: 'Invalid content type'
        };
    }

    return { valid: true };
}

// Validate origin for CORS
function validateOrigin(request, allowedOrigins = []) {
    const origin = request.headers.get('origin');

    // If no origin header, it's a same-origin request
    if (!origin) return { valid: true };

    // If no allowed origins specified, allow all (development mode)
    if (allowedOrigins.length === 0) return { valid: true };

    // Check if origin is in allowed list
    const isAllowed = allowedOrigins.includes(origin);

    return {
        valid: isAllowed,
        error: isAllowed ? null : 'Origin not allowed'
    };
}

// CORS headers
function getCorsHeaders(origin = '*') {
    return {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400'
    };
}

// Handle OPTIONS preflight request
function handlePreflight() {
    return new Response(null, {
        status: 204,
        headers: getCorsHeaders()
    });
}

// Sanitize error messages (don't expose internal details)
function sanitizeErrorMessage(error, isDevelopment = false) {
    if (isDevelopment) {
        return error.message || 'An error occurred';
    }

    // In production, return generic messages
    const genericMessages = {
        'ECONNREFUSED': 'Service temporarily unavailable',
        'ETIMEDOUT': 'Request timeout',
        'SequelizeValidationError': 'Invalid data provided',
        'SequelizeUniqueConstraintError': 'Duplicate entry',
        'JsonWebTokenError': 'Invalid authentication',
        'TokenExpiredError': 'Session expired'
    };

    return genericMessages[error.name] || 'An error occurred';
}

// Log security events
function logSecurityEvent(event, details = {}) {
    const timestamp = new Date().toISOString();
    console.warn(`[SECURITY] ${timestamp} - ${event}`, details);
}

module.exports = {
    securityHeaders,
    applySecurityHeaders,
    getSecurityHeaders,
    validateRequestSize,
    validateContentType,
    validateOrigin,
    getCorsHeaders,
    handlePreflight,
    sanitizeErrorMessage,
    logSecurityEvent
};
