'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Shield, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import { exportToCSV, formatDateForCSV, formatBooleanForCSV } from '@/lib/exportToCSV';

export default function AdminUsersManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [currentUser, setCurrentUser] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [currentAdminRole, setCurrentAdminRole] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'admin',
        isActive: true
    });

    useEffect(() => {
        // Get current admin role
        const adminInfo = localStorage.getItem('adminInfo');
        if (adminInfo) {
            const admin = JSON.parse(adminInfo);
            setCurrentAdminRole(admin.role);
        }
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('/api/admin/users', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setUsers(data.users || []);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setModalMode('create');
        setFormData({
            username: '',
            email: '',
            password: '',
            role: 'admin',
            isActive: true
        });
        setShowPassword(false);
        setShowModal(true);
    };

    const handleEdit = (user) => {
        setModalMode('edit');
        setCurrentUser(user);
        setFormData({
            username: user.username,
            email: user.email,
            password: '', // Don't show existing password
            role: user.role,
            isActive: user.isActive
        });
        setShowPassword(false);
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loadingToast = toast.loading(
            modalMode === 'create' ? 'Creating admin user...' : 'Updating admin user...'
        );

        try {
            const token = localStorage.getItem('adminToken');
            const method = modalMode === 'create' ? 'POST' : 'PUT';

            const payload = modalMode === 'edit'
                ? { ...formData, id: currentUser.id }
                : formData;

            // Don't send empty password on edit
            if (modalMode === 'edit' && !payload.password) {
                delete payload.password;
            }

            const response = await fetch('/api/admin/users', {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setShowModal(false);
                fetchUsers();
                toast.success(
                    `Admin user ${modalMode === 'create' ? 'created' : 'updated'} successfully!`,
                    { id: loadingToast }
                );
            } else {
                const data = await response.json();
                toast.error(data.error || 'Operation failed', { id: loadingToast });
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Network error', { id: loadingToast });
        }
    };

    const handleDelete = async (id, username) => {
        // Check if trying to delete self
        const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
        if (adminInfo.id === id) {
            toast.error('You cannot delete your own account');
            return;
        }

        if (!confirm(`Are you sure you want to delete user "${username}"?`)) return;

        const loadingToast = toast.loading('Deleting admin user...');

        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`/api/admin/users?id=${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                fetchUsers();
                toast.success('Admin user deleted successfully!', { id: loadingToast });
            } else {
                const data = await response.json();
                toast.error(data.error || 'Failed to delete user', { id: loadingToast });
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Network error', { id: loadingToast });
        }
    };

    const handleToggleActive = async (user) => {
        // Check if trying to deactivate self
        const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
        if (adminInfo.id === user.id && user.isActive) {
            toast.error('You cannot deactivate your own account');
            return;
        }

        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('/api/admin/users', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    id: user.id,
                    isActive: !user.isActive
                })
            });

            if (response.ok) {
                fetchUsers();
                toast.success(`User ${!user.isActive ? 'activated' : 'deactivated'} successfully!`);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to update user status');
        }
    };

    const handleExport = () => {
        const exportData = users.map(user => ({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            active: formatBooleanForCSV(user.isActive),
            createdAt: formatDateForCSV(user.createdAt)
        }));

        const columns = [
            { key: 'id', label: 'ID' },
            { key: 'username', label: 'Username' },
            { key: 'email', label: 'Email' },
            { key: 'role', label: 'Role' },
            { key: 'active', label: 'Active' },
            { key: 'createdAt', label: 'Created Date' }
        ];

        exportToCSV(exportData, 'admin-users-export', columns);
        toast.success('Data exported successfully!');
    };

    const getRoleBadgeColor = (role) => {
        switch (role) {
            case 'super_admin':
                return 'bg-purple-100 text-purple-800';
            case 'admin':
                return 'bg-blue-100 text-blue-800';
            case 'editor':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Check if current user is super_admin
    const isSuperAdmin = currentAdminRole === 'super_admin';

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    // Only super_admin can access this page
    if (!isSuperAdmin) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <Shield className="mx-auto mb-4 text-red-500" size={48} />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
                    <p className="text-gray-600">Only super administrators can manage users.</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Admin Users Management</h1>
                <div className="flex gap-2">
                    <button
                        onClick={handleExport}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                        <Download size={20} />
                        Export CSV
                    </button>
                    <button
                        onClick={handleCreate}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                        <Plus size={20} />
                        Add Admin User
                    </button>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.username}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleBadgeColor(user.role)}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleToggleActive(user)}
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${user.isActive
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                            }`}
                                    >
                                        {user.isActive ? 'Active' : 'Inactive'}
                                    </button>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(user)}
                                            className="text-blue-600 hover:text-blue-800"
                                            title="Edit"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id, user.username)}
                                            className="text-red-600 hover:text-red-800"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">
                            {modalMode === 'create' ? 'Add Admin User' : 'Edit Admin User'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Username *</label>
                                <input
                                    type="text"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    required
                                    disabled={modalMode === 'edit'}
                                />
                                {modalMode === 'edit' && (
                                    <p className="text-xs text-gray-500 mt-1">Username cannot be changed</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password {modalMode === 'create' ? '*' : '(leave blank to keep current)'}
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        required={modalMode === 'create'}
                                        minLength="6"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                                <select
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="super_admin">Super Admin</option>
                                    <option value="admin">Admin</option>
                                    <option value="editor">Editor</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                                <select
                                    value={formData.isActive}
                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                            </div>
                            <div className="flex gap-2 justify-end mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    {modalMode === 'create' ? 'Create' : 'Update'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
