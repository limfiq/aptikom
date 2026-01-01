'use client';

import { useState, useEffect } from 'react';
import { Mail, Eye, Trash2, Check, Reply, Filter, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import { exportToCSV } from '@/lib/exportToCSV';

export default function ContactMessagesPage() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, unread, read, replied
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchMessages();
    }, [filter]);

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const url = filter === 'all'
                ? '/api/contact'
                : `/api/contact?status=${filter}`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.success) {
                setMessages(data.data);
            } else {
                toast.error('Gagal memuat pesan');
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
            toast.error('Terjadi kesalahan saat memuat pesan');
        } finally {
            setLoading(false);
        }
    };

    const updateMessageStatus = async (id, newStatus) => {
        try {
            const response = await fetch(`/api/contact/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            const data = await response.json();

            if (data.success) {
                toast.success(`Pesan ditandai sebagai ${newStatus}`);
                fetchMessages();
            } else {
                toast.error(data.message || 'Gagal mengupdate status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Terjadi kesalahan');
        }
    };

    const deleteMessage = async (id) => {
        if (!confirm('Apakah Anda yakin ingin menghapus pesan ini?')) return;

        try {
            const response = await fetch(`/api/contact/${id}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Pesan berhasil dihapus');
                fetchMessages();
                if (selectedMessage?.id === id) {
                    closeModal();
                }
            } else {
                toast.error(data.message || 'Gagal menghapus pesan');
            }
        } catch (error) {
            console.error('Error deleting message:', error);
            toast.error('Terjadi kesalahan');
        }
    };

    const openModal = (message) => {
        setSelectedMessage(message);
        setIsModalOpen(true);

        // Mark as read if unread
        if (message.status === 'unread') {
            updateMessageStatus(message.id, 'read');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedMessage(null), 300);
    };

    const handleExportCSV = () => {
        const csvData = messages.map(msg => ({
            'ID': msg.id,
            'Nama': msg.name,
            'Email': msg.email,
            'Subjek': msg.subject,
            'Pesan': msg.message,
            'Status': msg.status,
            'IP Address': msg.ipAddress,
            'Tanggal': new Date(msg.createdAt).toLocaleString('id-ID')
        }));

        exportToCSV(csvData, `contact-messages-${new Date().toISOString().split('T')[0]}.csv`);
        toast.success('Data berhasil diekspor');
    };

    const getStatusBadge = (status) => {
        const badges = {
            unread: 'bg-blue-100 text-blue-800',
            read: 'bg-gray-100 text-gray-800',
            replied: 'bg-green-100 text-green-800'
        };
        return badges[status] || badges.unread;
    };

    const getStatusText = (status) => {
        const texts = {
            unread: 'Belum Dibaca',
            read: 'Sudah Dibaca',
            replied: 'Sudah Dibalas'
        };
        return texts[status] || status;
    };

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Pesan Kontak</h1>
                    <p className="text-gray-600 mt-1">Kelola pesan dari formulir kontak</p>
                </div>
                <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                    <Download size={18} />
                    Export CSV
                </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6 border-b border-gray-200">
                {['all', 'unread', 'read', 'replied'].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-4 py-2 font-medium transition-colors ${filter === status
                            ? 'text-primary border-b-2 border-primary'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        {status === 'all' ? 'Semua' : getStatusText(status)}
                        {status !== 'all' && (
                            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-200">
                                {messages.filter(m => m.status === status).length}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Messages List */}
            {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="text-gray-600 mt-4">Memuat pesan...</p>
                </div>
            ) : messages.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                    <Mail size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">Tidak ada pesan</p>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Pengirim
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Subjek
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tanggal
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {messages.map((message) => (
                                    <tr
                                        key={message.id}
                                        className={`hover:bg-gray-50 transition-colors ${message.status === 'unread' ? 'bg-blue-50' : ''
                                            }`}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                                                    <Mail className="text-primary" size={20} />
                                                </div>
                                                <div className="ml-4">
                                                    <div className={`text-sm font-medium ${message.status === 'unread' ? 'font-bold text-gray-900' : 'text-gray-900'
                                                        }`}>
                                                        {message.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">{message.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={`text-sm ${message.status === 'unread' ? 'font-semibold text-gray-900' : 'text-gray-900'
                                                }`}>
                                                {message.subject}
                                            </div>
                                            <div className="text-sm text-gray-500 truncate max-w-xs">
                                                {message.message.substring(0, 60)}...
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(message.status)}`}>
                                                {getStatusText(message.status)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(message.createdAt).toLocaleDateString('id-ID', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openModal(message)}
                                                    className="text-blue-600 hover:text-blue-900"
                                                    title="Lihat Detail"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                <select
                                                    value={message.status}
                                                    onChange={(e) => updateMessageStatus(message.id, e.target.value)}
                                                    className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <option value="unread">Belum Dibaca</option>
                                                    <option value="read">Sudah Dibaca</option>
                                                    <option value="replied">Sudah Dibalas</option>
                                                </select>
                                                <button
                                                    onClick={() => deleteMessage(message.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                    title="Hapus"
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
                </div>
            )}

            {/* Detail Modal */}
            {isModalOpen && selectedMessage && (
                <div className="fixed inset-0 z-[9999] overflow-y-auto">
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                        onClick={closeModal}
                    ></div>

                    <div className="flex min-h-full items-center justify-center p-4">
                        <div
                            className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="bg-primary px-6 py-4 flex items-center justify-between rounded-t-lg">
                                <h3 className="text-lg font-bold text-white">Detail Pesan</h3>
                                <button
                                    onClick={closeModal}
                                    className="text-white hover:text-gray-200 transition-colors"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Content */}
                            <div className="px-6 py-6">
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Nama Pengirim</label>
                                            <p className="text-sm font-medium text-gray-900">{selectedMessage.name}</p>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Email</label>
                                            <a href={`mailto:${selectedMessage.email}`} className="text-sm text-primary hover:underline">
                                                {selectedMessage.email}
                                            </a>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Subjek</label>
                                        <p className="text-sm font-medium text-gray-900">{selectedMessage.subject}</p>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Pesan</label>
                                        <div className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                                            {selectedMessage.message}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Status</label>
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(selectedMessage.status)}`}>
                                                {getStatusText(selectedMessage.status)}
                                            </span>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Tanggal Dikirim</label>
                                            <p className="text-sm text-gray-700">
                                                {new Date(selectedMessage.createdAt).toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">IP Address</label>
                                            <p className="text-sm text-gray-700">{selectedMessage.ipAddress || '-'}</p>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">User Agent</label>
                                            <p className="text-sm text-gray-700 truncate" title={selectedMessage.userAgent}>
                                                {selectedMessage.userAgent ? selectedMessage.userAgent.substring(0, 50) + '...' : '-'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="bg-gray-50 px-6 py-4 flex justify-between rounded-b-lg">
                                <div className="flex gap-2 items-center">
                                    <label className="text-sm font-medium text-gray-700">Ubah Status:</label>
                                    <select
                                        value={selectedMessage.status}
                                        onChange={(e) => {
                                            updateMessageStatus(selectedMessage.id, e.target.value);
                                            setSelectedMessage({ ...selectedMessage, status: e.target.value });
                                        }}
                                        className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                    >
                                        <option value="unread">Belum Dibaca</option>
                                        <option value="read">Sudah Dibaca</option>
                                        <option value="replied">Sudah Dibalas</option>
                                    </select>
                                    <button
                                        onClick={() => {
                                            deleteMessage(selectedMessage.id);
                                        }}
                                        className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                                    >
                                        <Trash2 size={16} />
                                        Hapus
                                    </button>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
