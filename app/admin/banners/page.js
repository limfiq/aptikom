'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import ImageUpload from '@/components/ImageUpload';

export default function BannersManagement() {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
    const [currentBanner, setCurrentBanner] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        backgroundImage: '',
        buttonText: '',
        buttonLink: '',
        order: 0,
        isActive: true
    });

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            const response = await fetch('/api/banners');
            if (response.ok) {
                const data = await response.json();
                setBanners(data);
            }
        } catch (error) {
            console.error('Error fetching banners:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setModalMode('create');
        setFormData({
            title: '',
            subtitle: '',
            backgroundImage: '',
            buttonText: '',
            buttonLink: '',
            order: banners.length + 1,
            isActive: true
        });
        setShowModal(true);
    };

    const handleEdit = (banner) => {
        setModalMode('edit');
        setCurrentBanner(banner);
        setFormData({
            title: banner.title,
            subtitle: banner.subtitle,
            backgroundImage: banner.backgroundImage || '',
            buttonText: banner.buttonText || '',
            buttonLink: banner.buttonLink || '',
            order: banner.order,
            isActive: banner.isActive
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loadingToast = toast.loading(modalMode === 'create' ? 'Creating banner...' : 'Updating banner...');

        try {
            const token = localStorage.getItem('adminToken');
            const url = modalMode === 'create' ? '/api/admin/banners' : '/api/admin/banners';
            const method = modalMode === 'create' ? 'POST' : 'PUT';

            const payload = modalMode === 'edit'
                ? { ...formData, id: currentBanner.id }
                : formData;

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setShowModal(false);
                fetchBanners();
                toast.success(`Banner ${modalMode === 'create' ? 'created' : 'updated'} successfully!`, { id: loadingToast });
            } else {
                const data = await response.json();
                toast.error(data.error || 'Operation failed', { id: loadingToast });
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Network error', { id: loadingToast });
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this banner?')) return;

        const loadingToast = toast.loading('Deleting banner...');

        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`/api/admin/banners?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                fetchBanners();
                toast.success('Banner deleted successfully!', { id: loadingToast });
            } else {
                toast.error('Failed to delete banner', { id: loadingToast });
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Network error', { id: loadingToast });
        }
    };

    const handleToggleActive = async (banner) => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('/api/admin/banners', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    id: banner.id,
                    isActive: !banner.isActive
                })
            });

            if (response.ok) {
                fetchBanners();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Banner Management</h1>
                <button
                    onClick={handleCreate}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                    <Plus size={20} />
                    Add Banner
                </button>
            </div>

            {/* Banners List */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preview</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {banners.map((banner) => (
                            <tr key={banner.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    {banner.backgroundImage && (
                                        <img
                                            src={banner.backgroundImage}
                                            alt={banner.title}
                                            className="w-20 h-12 object-cover rounded"
                                        />
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-900">{banner.title}</div>
                                    <div className="text-sm text-gray-500 truncate max-w-xs">{banner.subtitle}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">{banner.order}</td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleToggleActive(banner)}
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${banner.isActive
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800'
                                            }`}
                                    >
                                        {banner.isActive ? 'Active' : 'Inactive'}
                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(banner)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(banner.id)}
                                            className="text-red-600 hover:text-red-800"
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
                    <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">
                            {modalMode === 'create' ? 'Create New Banner' : 'Edit Banner'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle *</label>
                                <textarea
                                    value={formData.subtitle}
                                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    rows="3"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Background Image</label>
                                <ImageUpload
                                    value={formData.backgroundImage}
                                    onChange={(url) => setFormData({ ...formData, backgroundImage: url })}
                                    folder="banners"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                                <input
                                    type="text"
                                    value={formData.buttonText}
                                    onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
                                <input
                                    type="url"
                                    value={formData.buttonLink}
                                    onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                                    <input
                                        type="number"
                                        value={formData.order}
                                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        min="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        value={formData.isActive}
                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="true">Active</option>
                                        <option value="false">Inactive</option>
                                    </select>
                                </div>
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
