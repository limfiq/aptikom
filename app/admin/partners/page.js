'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash, Search, X, Building2, Save, ExternalLink } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';

export default function PartnersManagement() {
    const [partners, setPartners] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPartner, setCurrentPartner] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        link: '',
        logo: null
    });

    useEffect(() => {
        fetchPartners();
    }, []);

    const fetchPartners = async () => {
        try {
            const response = await fetch('/api/admin/partners');
            if (response.ok) {
                const data = await response.json();
                setPartners(data);
            }
        } catch (error) {
            console.error('Error fetching partners:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredPartners = partners.filter(partner =>
        partner.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenModal = (partner = null) => {
        if (partner) {
            setIsEditing(true);
            setCurrentPartner(partner);
            setFormData({
                name: partner.name,
                link: partner.link || '',
                logo: partner.logo
            });
        } else {
            setIsEditing(false);
            setCurrentPartner(null);
            setFormData({
                name: '',
                link: '',
                logo: null
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({ name: '', link: '', logo: null });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (file) => {
        setFormData(prev => ({ ...prev, logo: file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('link', formData.link);

            if (formData.logo instanceof File) {
                data.append('logo', formData.logo);
            }

            const url = isEditing
                ? `/api/admin/partners/${currentPartner.id}`
                : '/api/admin/partners';

            const method = isEditing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                body: data
            });

            if (response.ok) {
                fetchPartners();
                handleCloseModal();
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error saving partner:', error);
            alert('An error occurred while saving the partner.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this partner?')) {
            try {
                const response = await fetch(`/api/admin/partners/${id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    fetchPartners();
                } else {
                    alert('Error deleting partner');
                }
            } catch (error) {
                console.error('Error deleting partner:', error);
            }
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Manajemen Mitra</h1>
                    <p className="text-gray-600">Kelola daftar mitra kerjasama dan partner APTIKOM</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                    <Plus size={20} />
                    Tambah Mitra
                </button>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Cari nama mitra..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            {/* Partners List */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {filteredPartners.map((partner) => (
                    <div key={partner.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center group relative hover:shadow-md transition-all">
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <button
                                onClick={() => handleOpenModal(partner)}
                                className="p-1.5 bg-gray-100 rounded-md hover:bg-blue-100 text-blue-600"
                            >
                                <Pencil size={14} />
                            </button>
                            <button
                                onClick={() => handleDelete(partner.id)}
                                className="p-1.5 bg-gray-100 rounded-md hover:bg-red-100 text-red-600"
                            >
                                <Trash size={14} />
                            </button>
                        </div>

                        <div className="h-24 w-full flex items-center justify-center mb-4 grayscale group-hover:grayscale-0 transition-all opacity-70 group-hover:opacity-100">
                            {partner.logo ? (
                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className="max-h-full max-w-full object-contain"
                                />
                            ) : (
                                <Building2 size={40} className="text-gray-300" />
                            )}
                        </div>
                        <h3 className="font-bold text-gray-800 text-sm mb-1">{partner.name}</h3>
                        {partner.link && (
                            <a
                                href={partner.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-primary hover:underline flex items-center gap-1"
                            >
                                Kunjungi Website <ExternalLink size={10} />
                            </a>
                        )}
                    </div>
                ))}
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white rounded-t-xl">
                            <h2 className="text-xl font-bold text-gray-800">
                                {isEditing ? 'Edit Mitra' : 'Tambah Mitra Baru'}
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Nama Mitra</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Website URL</label>
                                <input
                                    type="url"
                                    name="link"
                                    placeholder="https://"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    value={formData.link}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Logo</label>
                                <ImageUpload
                                    value={formData.logo}
                                    onChange={handleImageChange}
                                    className="aspect-square w-32 mx-auto"
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
