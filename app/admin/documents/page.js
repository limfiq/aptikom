'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Download } from 'lucide-react';

export default function DocumentsManagement() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [currentDocument, setCurrentDocument] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Peraturan',
        fileUrl: '',
        fileSize: ''
    });

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('/api/admin/documents', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setDocuments(data.documents || []);
            }
        } catch (error) {
            console.error('Error fetching documents:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setModalMode('create');
        setFormData({
            title: '',
            description: '',
            category: 'Peraturan',
            fileUrl: '',
            fileSize: ''
        });
        setShowModal(true);
    };

    const handleEdit = (document) => {
        setModalMode('edit');
        setCurrentDocument(document);
        setFormData({
            title: document.title,
            description: document.description,
            category: document.category,
            fileUrl: document.fileUrl,
            fileSize: document.fileSize || ''
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('adminToken');
            const method = modalMode === 'create' ? 'POST' : 'PUT';
            const payload = modalMode === 'edit'
                ? { ...formData, id: currentDocument.id }
                : formData;

            const response = await fetch('/api/admin/documents', {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setShowModal(false);
                fetchDocuments();
                alert(`Document ${modalMode === 'create' ? 'created' : 'updated'} successfully!`);
            } else {
                const data = await response.json();
                alert(data.error || 'Operation failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Network error');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this document?')) return;

        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`/api/admin/documents?id=${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                fetchDocuments();
                alert('Document deleted successfully!');
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
                <h1 className="text-3xl font-bold text-gray-900">Documents Management</h1>
                <button
                    onClick={handleCreate}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                    <Plus size={20} />
                    Add Document
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {documents.map((document) => (
                            <tr key={document.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-900">{document.title}</div>
                                    <div className="text-sm text-gray-500 truncate max-w-md">{document.description}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded">
                                        {document.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">{document.fileSize || '-'}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <a
                                            href={document.fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-green-600 hover:text-green-800"
                                        >
                                            <Download size={18} />
                                        </a>
                                        <button
                                            onClick={() => handleEdit(document)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(document.id)}
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
                    <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
                        <h2 className="text-2xl font-bold mb-4">
                            {modalMode === 'create' ? 'Add Document' : 'Edit Document'}
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    rows="3"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Peraturan">Peraturan</option>
                                    <option value="Panduan">Panduan</option>
                                    <option value="Formulir">Formulir</option>
                                    <option value="Laporan">Laporan</option>
                                    <option value="Lainnya">Lainnya</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">File URL *</label>
                                <input
                                    type="url"
                                    value={formData.fileUrl}
                                    onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">File Size</label>
                                <input
                                    type="text"
                                    value={formData.fileSize}
                                    onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., 2.5 MB"
                                />
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
