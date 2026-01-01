/**
 * Input Sanitization Utilities
 * Cleans and sanitizes user input to prevent XSS and other attacks
 */

// Strip HTML tags from string
function stripHtml(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/<[^>]*>/g, '');
}

// Escape HTML special characters
function escapeHtml(str) {
    if (typeof str !== 'string') return str;
    const htmlEscapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;'
    };
    return str.replace(/[&<>"'/]/g, char => htmlEscapeMap[char]);
}

// Remove potentially dangerous SQL keywords (extra layer of protection)
function removeSqlKeywords(str) {
    if (typeof str !== 'string') return str;
    const sqlKeywords = [
        'SELECT', 'INSERT', 'UPDATE', 'DELETE', 'DROP', 'CREATE', 'ALTER',
        'EXEC', 'EXECUTE', 'UNION', 'DECLARE', 'SCRIPT', 'JAVASCRIPT'
    ];
    let sanitized = str;
    sqlKeywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        sanitized = sanitized.replace(regex, '');
    });
    return sanitized;
}

// Trim and normalize whitespace
function normalizeWhitespace(str) {
    if (typeof str !== 'string') return str;
    return str.trim().replace(/\s+/g, ' ');
}

// Remove null bytes
function removeNullBytes(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/\0/g, '');
}

// Sanitize filename (remove path traversal attempts)
function sanitizeFilename(filename) {
    if (typeof filename !== 'string') return '';
    return filename
        .replace(/[^a-zA-Z0-9._-]/g, '_')
        .replace(/\.{2,}/g, '.')
        .replace(/^\.+/, '')
        .substring(0, 255);
}

// Sanitize string for safe database storage
function sanitizeString(str, options = {}) {
    if (typeof str !== 'string') return str;

    let sanitized = str;

    // Remove null bytes
    sanitized = removeNullBytes(sanitized);

    // Normalize whitespace
    if (options.normalizeWhitespace !== false) {
        sanitized = normalizeWhitespace(sanitized);
    }

    // Strip HTML if requested
    if (options.stripHtml) {
        sanitized = stripHtml(sanitized);
    }

    // Escape HTML if requested
    if (options.escapeHtml) {
        sanitized = escapeHtml(sanitized);
    }

    // Remove SQL keywords (extra protection)
    if (options.removeSql) {
        sanitized = removeSqlKeywords(sanitized);
    }

    // Limit length
    if (options.maxLength) {
        sanitized = sanitized.substring(0, options.maxLength);
    }

    return sanitized;
}

// Sanitize object recursively
function sanitizeObject(obj, options = {}) {
    if (!obj || typeof obj !== 'object') return obj;

    const sanitized = Array.isArray(obj) ? [] : {};

    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'string') {
            sanitized[key] = sanitizeString(value, options);
        } else if (typeof value === 'object' && value !== null) {
            sanitized[key] = sanitizeObject(value, options);
        } else {
            sanitized[key] = value;
        }
    }

    return sanitized;
}

// Sanitize for URL (encode special characters)
function sanitizeUrl(url) {
    if (typeof url !== 'string') return '';
    try {
        const urlObj = new URL(url);
        return urlObj.toString();
    } catch {
        return '';
    }
}

// Remove script tags and event handlers
function removeScripts(str) {
    if (typeof str !== 'string') return str;
    return str
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
        .replace(/javascript:/gi, '');
}

// Comprehensive sanitization for user content
function sanitizeUserContent(content, options = {}) {
    if (typeof content !== 'string') return content;

    let sanitized = content;

    // Remove scripts and event handlers
    sanitized = removeScripts(sanitized);

    // Remove null bytes
    sanitized = removeNullBytes(sanitized);

    // Normalize whitespace if not preserving formatting
    if (!options.preserveFormatting) {
        sanitized = normalizeWhitespace(sanitized);
    }

    // Limit length
    if (options.maxLength) {
        sanitized = sanitized.substring(0, options.maxLength);
    }

    return sanitized;
}

module.exports = {
    stripHtml,
    escapeHtml,
    removeSqlKeywords,
    normalizeWhitespace,
    removeNullBytes,
    sanitizeFilename,
    sanitizeString,
    sanitizeObject,
    sanitizeUrl,
    removeScripts,
    sanitizeUserContent
};
