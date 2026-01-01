/**
 * Permission definitions for different roles
 */
export const PERMISSIONS = {
    super_admin: {
        all: true, // Has all permissions
        users: ['create', 'read', 'update', 'delete'],
        posts: ['create', 'read', 'update', 'delete'],
        events: ['create', 'read', 'update', 'delete'],
        banners: ['create', 'read', 'update', 'delete'],
        members: ['create', 'read', 'update', 'delete'],
        institutions: ['create', 'read', 'update', 'delete'],
        journals: ['create', 'read', 'update', 'delete'],
        documents: ['create', 'read', 'update', 'delete'],
        profile: ['read', 'update'],
        logs: ['read']
    },
    admin: {
        all: false,
        users: ['read'], // Can only view users
        posts: ['create', 'read', 'update', 'delete'],
        events: ['create', 'read', 'update', 'delete'],
        banners: ['read', 'update'], // Can't create/delete banners
        members: ['create', 'read', 'update'],
        institutions: ['create', 'read', 'update'],
        journals: ['create', 'read', 'update'],
        documents: ['create', 'read', 'update', 'delete'],
        profile: ['read'],
        logs: [] // No access to logs
    },
    editor: {
        all: false,
        users: [],
        posts: ['create', 'read', 'update'],
        events: ['create', 'read', 'update'],
        banners: ['read'],
        members: ['read'],
        institutions: ['read'],
        journals: ['read'],
        documents: ['read'],
        profile: ['read'],
        logs: []
    }
};

/**
 * Check if user has permission for an action
 * @param {string} role - User role (super_admin, admin, editor)
 * @param {string} module - Module name (posts, events, etc.)
 * @param {string} action - Action (create, read, update, delete)
 * @returns {boolean}
 */
export function hasPermission(role, module, action) {
    if (!role || !PERMISSIONS[role]) {
        return false;
    }

    const rolePermissions = PERMISSIONS[role];

    // Super admin has all permissions
    if (rolePermissions.all) {
        return true;
    }

    // Check module permissions
    if (!rolePermissions[module]) {
        return false;
    }

    return rolePermissions[module].includes(action);
}

/**
 * Check if user can access a module
 * @param {string} role - User role
 * @param {string} module - Module name
 * @returns {boolean}
 */
export function canAccessModule(role, module) {
    if (!role || !PERMISSIONS[role]) {
        return false;
    }

    const rolePermissions = PERMISSIONS[role];

    if (rolePermissions.all) {
        return true;
    }

    return rolePermissions[module] && rolePermissions[module].length > 0;
}

/**
 * Get all modules accessible by role
 * @param {string} role - User role
 * @returns {Array<string>}
 */
export function getAccessibleModules(role) {
    if (!role || !PERMISSIONS[role]) {
        return [];
    }

    const rolePermissions = PERMISSIONS[role];

    if (rolePermissions.all) {
        return Object.keys(PERMISSIONS.super_admin).filter(key => key !== 'all');
    }

    return Object.keys(rolePermissions)
        .filter(key => key !== 'all' && rolePermissions[key].length > 0);
}

/**
 * Middleware to check permission (for API routes)
 * @param {string} module - Module name
 * @param {string} action - Action
 * @returns {Function}
 */
export function requirePermission(module, action) {
    return (admin) => {
        if (!admin || !admin.role) {
            return { allowed: false, error: 'Unauthorized' };
        }

        if (!hasPermission(admin.role, module, action)) {
            return {
                allowed: false,
                error: `You don't have permission to ${action} ${module}`
            };
        }

        return { allowed: true };
    };
}
