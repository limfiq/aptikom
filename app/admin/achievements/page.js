'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash, Search, X, Award, Save } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';

export default function AchievementsManagement() {
    const [achievements, setAchievements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentAchievement, setCurrentAchievement] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        category: '',
        image: null
    });

    useEffect(() => {
        fetchAchievements();
    }, []);

    const fetchAchievements = async () => {
        try {
            const response = await fetch('/api/admin/achievements');
            if (response.ok) {
                const data = await response.json();
                setAchievements(data);
            }
        } catch (error) {
            console.error('Error fetching achievements:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredAchievements = achievements.filter(achievement =>
        achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        achievement.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenModal = (achievement = null) => {
        if (achievement) {
            setIsEditing(true);
            setCurrentAchievement(achievement);
            setFormData({
                title: achievement.title,
                description: achievement.description || '',
                date: achievement.date ? new Date(achievement.date).toISOString().split('T')[0] : '',
                category: achievement.category || '',
                image: achievement.image
            });
        } else {
            setIsEditing(false);
            setCurrentAchievement(null);
            setFormData({
                title: '',
                description: '',
                date: new Date().toISOString().split('T')[0],
                category: '',
                image: null
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({ title: '', description: '', date: '', category: '', image: null });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (file) => {
        setFormData(prev => ({ ...prev, image: file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('date', formData.date);
            data.append('category', formData.category);

            if (formData.image instanceof File) {
                data.append('image', formData.image);
            }

            const url = isEditing
                ? `/api/admin/achievements/${currentAchievement.id}`
                : '/api/admin/achievements';

            const method = isEditing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                body: data
            });

            if (response.ok) {
                fetchAchievements();
                handleCloseModal();
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error saving achievement:', error);
            alert('An error occurred while saving the achievement.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this achievement?')) {
            try {
                const response = await fetch(`/api/admin/achievements/${id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    fetchAchievements();
                } else {
                    alert('Error deleting achievement');
                }
            } catch (error) {
                console.error('Error deleting achievement:', error);
            }
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Manajemen Prestasi</h1>
                    <p className="text-gray-600">Kelola daftar prestasi dan penghargaan APTIKOM</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                    <Plus size={20} />
                    Tambah Prestasi
                </button>
            </div>

            {/* Search and Filters */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Cari prestasi..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            {/* Achievements List */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAchievements.map((achievement) => (
                    <div key={achievement.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group">
                        <div className="relative h-48 bg-gray-100">
                            {achievement.image ? (
                                <img
                                    src={achievement.image}
                                    alt={achievement.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    <Award size={48} />
                                </div>
                            )}
                            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleOpenModal(achievement)}
                                    className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 text-blue-600"
                                >
                                    <Pencil size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(achievement.id)}
                                    className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 text-red-600"
                                >
                                    <Trash size={16} />
                                </button>
                            </div>
                            <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 text-white text-xs rounded">
                                {achievement.category || 'Penghargaan'}
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="text-sm text-gray-500 mb-1">
                                {new Date(achievement.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">{achievement.title}</h3>
                            <p className="text-gray-600 text-sm line-clamp-3">{achievement.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                            <h2 className="text-xl font-bold text-gray-800">
                                {isEditing ? 'Edit Prestasi' : 'Tambah Prestasi Baru'}
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Judul Prestasi</label>
                                    <input
                                        type="text"
                                        name="title"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Kategori</label>
                                    <input
                                        type="text"
                                        name="category"
                                        placeholder="Contoh: Internasional, Nasional"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Tanggal</label>
                                <input
                                    type="date"
                                    name="date"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Deskripsi</label>
                                <textarea
                                    name="description"
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                ></textarea>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Gambar / Foto</label>
                                <ImageUpload
                                    value={formData.image}
                                    onChange={handleImageChange}
                                    className="aspect-video"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium flex items-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                                            Menyimpan...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={18} />
                                            Simpan
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
