/**
 * Input Validation Utilities
 * Provides validation functions to ensure data integrity and security
 */

// Email validation
function isValidEmail(email) {
    if (!email || typeof email !== 'string') return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 255;
}

// String validation with length constraints
function isValidString(str, minLength = 1, maxLength = 1000) {
    if (typeof str !== 'string') return false;
    const trimmed = str.trim();
    return trimmed.length >= minLength && trimmed.length <= maxLength;
}

// Number validation with range
function isValidNumber(num, min = -Infinity, max = Infinity) {
    const parsed = typeof num === 'string' ? parseFloat(num) : num;
    return !isNaN(parsed) && parsed >= min && parsed <= max;
}

// Integer validation
function isValidInteger(num, min = -Infinity, max = Infinity) {
    const parsed = typeof num === 'string' ? parseInt(num, 10) : num;
    return Number.isInteger(parsed) && parsed >= min && parsed <= max;
}

// URL validation
function isValidUrl(url) {
    if (!url || typeof url !== 'string') return false;
    try {
        const urlObj = new URL(url);
        return ['http:', 'https:'].includes(urlObj.protocol);
    } catch {
        return false;
    }
}

// Date validation
function isValidDate(dateString) {
    if (!dateString) return false;
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
}

// Validate allowed characters (alphanumeric + spaces + common punctuation)
function hasOnlyAllowedChars(str, allowedPattern = /^[a-zA-Z0-9\s\-_.,!?@#$%&*()\[\]{}:;"'\/\\+=<>]+$/) {
    if (typeof str !== 'string') return false;
    return allowedPattern.test(str);
}

// Check for SQL injection patterns
function containsSqlInjection(str) {
    if (typeof str !== 'string') return false;
    const sqlPatterns = [
        /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE|UNION|DECLARE)\b)/gi,
        /(--|;|\/\*|\*\/|xp_|sp_)/gi,
        /('|(\\')|(;)|(--)|(\/\*))/gi
    ];
    return sqlPatterns.some(pattern => pattern.test(str));
}

// Validate object has required fields
function hasRequiredFields(obj, requiredFields) {
    if (!obj || typeof obj !== 'object') return false;
    return requiredFields.every(field => {
        const value = obj[field];
        return value !== undefined && value !== null && value !== '';
    });
}

// Validate pagination parameters
function validatePagination(page, limit) {
    const validPage = isValidInteger(page, 1, 10000);
    const validLimit = isValidInteger(limit, 1, 100);
    return {
        valid: validPage && validLimit,
        page: validPage ? parseInt(page, 10) : 1,
        limit: validLimit ? parseInt(limit, 10) : 10
    };
}

// Validate ID parameter
function isValidId(id) {
    return isValidInteger(id, 1);
}

// Validate file extension
function isValidFileExtension(filename, allowedExtensions = []) {
    if (!filename || typeof filename !== 'string') return false;
    const ext = filename.split('.').pop().toLowerCase();
    return allowedExtensions.includes(ext);
}

// Comprehensive input validator
function validateInput(data, schema) {
    const errors = [];

    for (const [field, rules] of Object.entries(schema)) {
        const value = data[field];

        // Required check
        if (rules.required && (value === undefined || value === null || value === '')) {
            errors.push(`${field} is required`);
            continue;
        }

        // Skip further validation if field is optional and empty
        if (!rules.required && !value) continue;

        // Type validation
        if (rules.type === 'email' && !isValidEmail(value)) {
            errors.push(`${field} must be a valid email`);
        }

        if (rules.type === 'string' && !isValidString(value, rules.minLength, rules.maxLength)) {
            errors.push(`${field} must be a string between ${rules.minLength || 1} and ${rules.maxLength || 1000} characters`);
        }

        if (rules.type === 'number' && !isValidNumber(value, rules.min, rules.max)) {
            errors.push(`${field} must be a number between ${rules.min || -Infinity} and ${rules.max || Infinity}`);
        }

        if (rules.type === 'integer' && !isValidInteger(value, rules.min, rules.max)) {
            errors.push(`${field} must be an integer between ${rules.min || -Infinity} and ${rules.max || Infinity}`);
        }

        if (rules.type === 'url' && !isValidUrl(value)) {
            errors.push(`${field} must be a valid URL`);
        }

        if (rules.type === 'date' && !isValidDate(value)) {
            errors.push(`${field} must be a valid date`);
        }

        // Custom pattern validation
        if (rules.pattern && !rules.pattern.test(value)) {
            errors.push(`${field} has invalid format`);
        }

        // SQL injection check
        if (rules.checkSql && containsSqlInjection(value)) {
            errors.push(`${field} contains invalid characters`);
        }
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

module.exports = {
    isValidEmail,
    isValidString,
    isValidNumber,
    isValidInteger,
    isValidUrl,
    isValidDate,
    hasOnlyAllowedChars,
    containsSqlInjection,
    hasRequiredFields,
    validatePagination,
    isValidId,
    isValidFileExtension,
    validateInput
};
