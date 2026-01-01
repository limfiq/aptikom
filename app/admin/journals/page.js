'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function JournalsManagement() {
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [currentJournal, setCurrentJournal] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        publisher: '',
        issn: '',
        rank: '',
        url: ''
    });

    useEffect(() => {
        fetchJournals();
    }, []);

    const fetchJournals = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('/api/admin/journals', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setJournals(data.journals || []);
            }
        } catch (error) {
            console.error('Error fetching journals:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setModalMode('create');
        setFormData({
            name: '',
            publisher: '',
            issn: '',
            rank: '',
            url: ''
        });
        setShowModal(true);
    };

    const handleEdit = (journal) => {
        setModalMode('edit');
        setCurrentJournal(journal);
        setFormData({
            name: journal.name,
            publisher: journal.publisher,
            issn: journal.issn,
            rank: journal.rank,
            url: journal.url
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('adminToken');
            const method = modalMode === 'create' ? 'POST' : 'PUT';
            const payload = modalMode === 'edit'
                ? { ...formData, id: currentJournal.id }
                : formData;

            const response = await fetch('/api/admin/journals', {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setShowModal(false);
                fetchJournals();
                alert(`Journal ${modalMode === 'create' ? 'created' : 'updated'} successfully!`);
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
        if (!confirm('Are you sure you want to delete this journal?')) return;

        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`/api/admin/journals?id=${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                fetchJournals();
                alert('Journal deleted successfully!');
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
                <h1 className="text-3xl font-bold text-gray-900">Journals Management</h1>
                <button
                    onClick={handleCreate}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                    <Plus size={20} />
                    Add Journal
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Publisher</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ISSN</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rank</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {journals.map((journal) => (
                            <tr key={journal.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{journal.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{journal.publisher}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{journal.issn}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                                        {journal.rank}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(journal)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(journal.id)}
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
                            {modalMode === 'create' ? 'Add Journal' : 'Edit Journal'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Publisher *</label>
                                <input
                                    type="text"
                                    value={formData.publisher}
                                    onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ISSN *</label>
                                <input
                                    type="text"
                                    value={formData.issn}
                                    onChange={(e) => setFormData({ ...formData, issn: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Rank *</label>
                                <select
                                    value={formData.rank}
                                    onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Select Rank</option>
                                    <option value="Sinta 1">Sinta 1</option>
                                    <option value="Sinta 2">Sinta 2</option>
                                    <option value="Sinta 3">Sinta 3</option>
                                    <option value="Sinta 4">Sinta 4</option>
                                    <option value="Sinta 5">Sinta 5</option>
                                    <option value="Sinta 6">Sinta 6</option>
                                    <option value="Scopus">Scopus</option>
                                    <option value="WoS">WoS</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">URL *</label>
                                <input
                                    type="url"
                                    value={formData.url}
                                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    required
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
