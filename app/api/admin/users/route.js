const { Admin } = require('@/models');
const { authenticateAdmin, unauthorizedResponse, successResponse, errorResponse } = require('@/lib/middleware');
const { applyRateLimit } = require('@/lib/rateLimit');
const { validateInput, isValidEmail, isValidId } = require('@/lib/validation');
const { sanitizeString } = require('@/lib/sanitize');
const bcrypt = require('bcryptjs');

// GET - List all admin users (super_admin only)
export async function GET(request) {
    const auth = await authenticateAdmin(request);
    if (!auth.authenticated) {
        return unauthorizedResponse(auth.error);
    }

    // Only super_admin can view users
    if (auth.admin.role !== 'super_admin') {
        return errorResponse('Access denied. Super admin only.', 403);
    }

    try {
        const users = await Admin.findAll({
            attributes: ['id', 'username', 'email', 'role', 'isActive', 'createdAt'],
            order: [['createdAt', 'DESC']]
        });

        return successResponse({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        return errorResponse('Failed to fetch users');
    }
}

// POST - Create new admin user (super_admin only)
export async function POST(request) {
    const auth = await authenticateAdmin(request);
    if (!auth.authenticated) {
        return unauthorizedResponse(auth.error);
    }

    // Only super_admin can create users
    if (auth.admin.role !== 'super_admin') {
        return errorResponse('Access denied. Super admin only.', 403);
    }

    // Apply rate limiting
    const rateLimitResult = await applyRateLimit(request, 'admin-users-create', 10, 60);
    if (!rateLimitResult.allowed) {
        return errorResponse('Too many requests. Please try again later.', 429);
    }

    try {
        const body = await request.json();
        const { username, email, password, role, isActive } = body;

        // Validate required fields
        if (!username || !email || !password || !role) {
            return errorResponse('Missing required fields');
        }

        // Validate email format
        if (!isValidEmail(email)) {
            return errorResponse('Invalid email format');
        }

        // Validate password length
        if (password.length < 6) {
            return errorResponse('Password must be at least 6 characters');
        }

        // Validate role
        const validRoles = ['super_admin', 'admin', 'editor'];
        if (!validRoles.includes(role)) {
            return errorResponse('Invalid role');
        }

        // Sanitize inputs
        const sanitizedUsername = sanitizeString(username);
        const sanitizedEmail = sanitizeString(email);

        // Check if username already exists
        const existingUser = await Admin.findOne({ where: { username: sanitizedUsername } });
        if (existingUser) {
            return errorResponse('Username already exists');
        }

        // Check if email already exists
        const existingEmail = await Admin.findOne({ where: { email: sanitizedEmail } });
        if (existingEmail) {
            return errorResponse('Email already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await Admin.create({
            username: sanitizedUsername,
            email: sanitizedEmail,
            password: hashedPassword,
            role,
            isActive: isActive !== undefined ? isActive : true
        });

        return successResponse({
            message: 'Admin user created successfully',
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
                isActive: newUser.isActive
            }
        }, 201);
    } catch (error) {
        console.error('Error creating user:', error);
        return errorResponse('Failed to create user');
    }
}

// PUT - Update admin user (super_admin only)
export async function PUT(request) {
    const auth = await authenticateAdmin(request);
    if (!auth.authenticated) {
        return unauthorizedResponse(auth.error);
    }

    // Only super_admin can update users
    if (auth.admin.role !== 'super_admin') {
        return errorResponse('Access denied. Super admin only.', 403);
    }

    // Apply rate limiting
    const rateLimitResult = await applyRateLimit(request, 'admin-users-update', 20, 60);
    if (!rateLimitResult.allowed) {
        return errorResponse('Too many requests. Please try again later.', 429);
    }

    try {
        const body = await request.json();
        const { id, email, password, role, isActive } = body;

        // Validate ID
        if (!id || !isValidId(id)) {
            return errorResponse('Invalid user ID');
        }

        // Find user
        const user = await Admin.findByPk(id);
        if (!user) {
            return errorResponse('User not found', 404);
        }

        // Prepare update data
        const updateData = {};

        if (email) {
            if (!isValidEmail(email)) {
                return errorResponse('Invalid email format');
            }
            // Check if email is taken by another user
            const existingEmail = await Admin.findOne({
                where: {
                    email: sanitizeString(email),
                    id: { [require('sequelize').Op.ne]: id }
                }
            });
            if (existingEmail) {
                return errorResponse('Email already exists');
            }
            updateData.email = sanitizeString(email);
        }

        if (password) {
            if (password.length < 6) {
                return errorResponse('Password must be at least 6 characters');
            }
            updateData.password = await bcrypt.hash(password, 10);
        }

        if (role) {
            const validRoles = ['super_admin', 'admin', 'editor'];
            if (!validRoles.includes(role)) {
                return errorResponse('Invalid role');
            }
            updateData.role = role;
        }

        if (isActive !== undefined) {
            updateData.isActive = isActive;
        }

        // Update user
        await user.update(updateData);

        return successResponse({
            message: 'Admin user updated successfully',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                isActive: user.isActive
            }
        });
    } catch (error) {
        console.error('Error updating user:', error);
        return errorResponse('Failed to update user');
    }
}

// DELETE - Delete admin user (super_admin only)
export async function DELETE(request) {
    const auth = await authenticateAdmin(request);
    if (!auth.authenticated) {
        return unauthorizedResponse(auth.error);
    }

    // Only super_admin can delete users
    if (auth.admin.role !== 'super_admin') {
        return errorResponse('Access denied. Super admin only.', 403);
    }

    // Apply rate limiting
    const rateLimitResult = await applyRateLimit(request, 'admin-users-delete', 10, 60);
    if (!rateLimitResult.allowed) {
        return errorResponse('Too many requests. Please try again later.', 429);
    }

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        // Validate ID
        if (!id || !isValidId(id)) {
            return errorResponse('Invalid user ID');
        }

        // Prevent deleting self
        if (parseInt(id) === auth.admin.id) {
            return errorResponse('You cannot delete your own account');
        }

        // Find and delete user
        const user = await Admin.findByPk(id);
        if (!user) {
            return errorResponse('User not found', 404);
        }

        await user.destroy();

        return successResponse({ message: 'Admin user deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        return errorResponse('Failed to delete user');
    }
}
