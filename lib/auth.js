const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// JWT Secret - in production, use environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'aptikom-secret-key-2025';
const JWT_EXPIRES_IN = '7d';

/**
 * Hash a password using bcrypt
 * @param {string} password - Plain text password
 * @returns {Promise<string>} Hashed password
 */
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

/**
 * Compare a plain text password with a hashed password
 * @param {string} password - Plain text password
 * @param {string} hashedPassword - Hashed password
 * @returns {Promise<boolean>} True if passwords match
 */
async function comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
}

/**
 * Generate a JWT token
 * @param {object} payload - Data to encode in token
 * @returns {string} JWT token
 */
function generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Verify a JWT token
 * @param {string} token - JWT token to verify
 * @returns {object|null} Decoded token payload or null if invalid
 */
function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}

module.exports = {
    hashPassword,
    comparePassword,
    generateToken,
    verifyToken,
    JWT_SECRET
};
