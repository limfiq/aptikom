'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Download, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import { exportToCSV, formatDateForCSV } from '@/lib/exportToCSV';

export default function IndividualMembersManagement() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [currentMember, setCurrentMember] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [formData, setFormData] = useState({
        employeeNumber: '',
        name: '',
        affiliation: '',
        studyProgram: '',
        role: '',
        province: '',
        validityPeriod: ''
    });

    useEffect(() => {
        fetchMembers();
    }, [page, searchTerm]);

    const fetchMembers = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`/api/admin/individual-members?page=${page}&limit=10&search=${searchTerm}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setMembers(data.members || []);
                setTotalPages(data.totalPages || 1);
            }
        } catch (error) {
            console.error('Error fetching members:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setModalMode('create');
        setFormData({
            employeeNumber: '',
            name: '',
            affiliation: '',
            studyProgram: '',
            role: '',
            province: '',
            validityPeriod: ''
        });
        setShowModal(true);
    };

    const handleEdit = (member) => {
        setModalMode('edit');
        setCurrentMember(member);
        setFormData({
            employeeNumber: member.employeeNumber,
            name: member.name,
            affiliation: member.affiliation,
            studyProgram: member.studyProgram,
            role: member.role,
            province: member.province,
            validityPeriod: member.validityPeriod
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loadingToast = toast.loading(
            modalMode === 'create' ? 'Creating member...' : 'Updating member...'
        );

        try {
            const token = localStorage.getItem('adminToken');
            const method = modalMode === 'create' ? 'POST' : 'PUT';
            const payload = modalMode === 'edit'
                ? { ...formData, id: currentMember.id }
                : formData;

            const response = await fetch('/api/admin/individual-members', {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setShowModal(false);
                fetchMembers();
                toast.success(
                    `Member ${modalMode === 'create' ? 'created' : 'updated'} successfully!`,
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

    const handleDelete = async (id, name) => {
        if (!confirm(`Are you sure you want to delete member "${name}"?`)) return;

        const loadingToast = toast.loading('Deleting member...');

        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`/api/admin/individual-members?id=${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                fetchMembers();
                toast.success('Member deleted successfully!', { id: loadingToast });
            } else {
                toast.error('Failed to delete member', { id: loadingToast });
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Network error', { id: loadingToast });
        }
    };

    const handleExport = () => {
        const exportData = members.map(member => ({
            employeeNumber: member.employeeNumber,
            name: member.name,
            affiliation: member.affiliation,
            studyProgram: member.studyProgram,
            role: member.role,
            province: member.province,
            validityPeriod: formatDateForCSV(member.validityPeriod)
        }));

        const columns = [
            { key: 'employeeNumber', label: 'Employee Number' },
            { key: 'name', label: 'Name' },
            { key: 'affiliation', label: 'Affiliation' },
            { key: 'studyProgram', label: 'Study Program' },
            { key: 'role', label: 'Role' },
            { key: 'province', label: 'Province' },
            { key: 'validityPeriod', label: 'Validity Period' }
        ];

        exportToCSV(exportData, 'individual-members-export', columns);
        toast.success('Data exported successfully!');
    };

    const isExpired = (validityPeriod) => {
        return new Date(validityPeriod) < new Date();
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
                <h1 className="text-3xl font-bold text-gray-900">Individual Members</h1>
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
                        Add Member
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="mb-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search members..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee #</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Affiliation</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Study Program</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Province</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Validity</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {members.map((member) => (
                            <tr key={member.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{member.employeeNumber}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{member.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{member.affiliation}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{member.studyProgram}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{member.role}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{member.province}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${isExpired(member.validityPeriod)
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-green-100 text-green-800'
                                        }`}>
                                        {new Date(member.validityPeriod).toLocaleDateString()}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(member)}
                                            className="text-blue-600 hover:text-blue-800"
                                            title="Edit"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(member.id, member.name)}
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

            {/* Pagination */}
            <div className="mt-4 flex justify-center gap-2">
                <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="px-4 py-2">Page {page} of {totalPages}</span>
                <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">
                            {modalMode === 'create' ? 'Add Member' : 'Edit Member'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Employee Number *</label>
                                <input
                                    type="text"
                                    value={formData.employeeNumber}
                                    onChange={(e) => setFormData({ ...formData, employeeNumber: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="APT-001"
                                    required
                                />
                            </div>
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Affiliation *</label>
                                <input
                                    type="text"
                                    value={formData.affiliation}
                                    onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="Universitas Brawijaya"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Study Program *</label>
                                <input
                                    type="text"
                                    value={formData.studyProgram}
                                    onChange={(e) => setFormData({ ...formData, studyProgram: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="Teknik Informatika"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                                <select
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Select Role</option>
                                    <option value="Dosen">Dosen</option>
                                    <option value="Peneliti">Peneliti</option>
                                    <option value="Praktisi">Praktisi</option>
                                    <option value="Mahasiswa S2">Mahasiswa S2</option>
                                    <option value="Mahasiswa S3">Mahasiswa S3</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Province *</label>
                                <input
                                    type="text"
                                    value={formData.province}
                                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="Jawa Timur"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Validity Period *</label>
                                <input
                                    type="date"
                                    value={formData.validityPeriod}
                                    onChange={(e) => setFormData({ ...formData, validityPeriod: e.target.value })}
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
