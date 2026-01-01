'use client';

import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ImageUpload({ value, onChange, folder = 'general' }) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(value || '');
    const fileInputRef = useRef(null);

    const handleFileSelect = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file');
            return;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('File size must be less than 5MB');
            return;
        }

        setUploading(true);
        const uploadToast = toast.loading('Uploading image...');

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('folder', folder);

            const token = localStorage.getItem('adminToken');
            const response = await fetch('/api/admin/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.json();
            setPreview(data.url);
            onChange(data.url);
            toast.success('Image uploaded successfully', { id: uploadToast });
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Failed to upload image', { id: uploadToast });
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = () => {
        setPreview('');
        onChange('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-2">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                disabled={uploading}
            />

            {preview ? (
                <div className="relative inline-block">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    >
                        <X size={16} />
                    </button>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="w-full max-w-md h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-blue-500 transition disabled:opacity-50"
                >
                    {uploading ? (
                        <>
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
                            <p className="text-sm text-gray-600">Uploading...</p>
                        </>
                    ) : (
                        <>
                            <ImageIcon className="text-gray-400 mb-2" size={32} />
                            <p className="text-sm text-gray-600">Click to upload image</p>
                            <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 5MB</p>
                        </>
                    )}
                </button>
            )}
        </div>
    );
}
