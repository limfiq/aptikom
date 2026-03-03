'use client';

import { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ChangePasswordModal({ onClose, adminId }) {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.currentPassword) {
            toast.error('Password lama harus diisi');
            return false;
        }
        if (!formData.newPassword) {
            toast.error('Password baru harus diisi');
            return false;
        }
        if (formData.newPassword.length < 6) {
            toast.error('Password minimal 6 karakter');
            return false;
        }
        if (formData.newPassword !== formData.confirmPassword) {
            toast.error('Password baru tidak cocok');
            return false;
        }
        if (formData.currentPassword === formData.newPassword) {
            toast.error('Password baru harus berbeda dengan password lama');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('/api/admin/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword
                })
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || 'Gagal mengubah password');
                return;
            }

            toast.success('Password berhasil diubah');
            onClose();
        } catch (error) {
            console.error('Error:', error);
            toast.error('Terjadi kesalahan saat mengubah password');
        } finally {
            setLoading(false);
        }
    };

    const PasswordInput = ({ label, name, show, onToggleShow }) => (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <div className="relative">
                <input
                    type={show ? 'text' : 'password'}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition pr-10"
                    placeholder={label}
                    disabled={loading}
                />
                <button
                    type="button"
                    onClick={onToggleShow}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                    {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Ganti Password</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                    <PasswordInput
                        label="Password Lama"
                        name="currentPassword"
                        show={showPasswords.current}
                        onToggleShow={() => setShowPasswords(prev => ({
                            ...prev,
                            current: !prev.current
                        }))}
                    />

                    <PasswordInput
                        label="Password Baru"
                        name="newPassword"
                        show={showPasswords.new}
                        onToggleShow={() => setShowPasswords(prev => ({
                            ...prev,
                            new: !prev.new
                        }))}
                    />

                    <PasswordInput
                        label="Konfirmasi Password Baru"
                        name="confirmPassword"
                        show={showPasswords.confirm}
                        onToggleShow={() => setShowPasswords(prev => ({
                            ...prev,
                            confirm: !prev.confirm
                        }))}
                    />

                    {/* Buttons */}
                    <div className="flex gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition font-medium disabled:opacity-50"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
                        >
                            {loading ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
