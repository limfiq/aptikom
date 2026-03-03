'use client';

import { useState } from 'react';
import { LogOut, Lock, ChevronDown } from 'lucide-react';
import ChangePasswordModal from './ChangePasswordModal';

export default function AdminUserMenu({ adminInfo, onLogout }) {
    const [isOpen, setIsOpen] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const handleChangePassword = () => {
        setShowPasswordModal(true);
        setIsOpen(false);
    };

    return (
        <>
            <div className="relative">
                {/* User Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition"
                >
                    <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                            {adminInfo?.username}
                        </p>
                        <p className="text-xs text-gray-500">
                            {adminInfo?.role}
                        </p>
                    </div>
                    <ChevronDown size={16} className={`text-gray-700 transition ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="absolute left-full top-0 ml-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                        <button
                            onClick={handleChangePassword}
                            className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-blue-50 transition border-b border-gray-100"
                        >
                            <Lock size={18} className="text-blue-600" />
                            <span className="text-sm font-medium">Ganti Password</span>
                        </button>
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                onLogout();
                            }}
                            className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition rounded-b-lg"
                        >
                            <LogOut size={18} />
                            <span className="text-sm font-medium">Logout</span>
                        </button>
                    </div>
                )}

                {/* Change Password Modal */}
                {showPasswordModal && (
                    <ChangePasswordModal
                        onClose={() => setShowPasswordModal(false)}
                        adminId={adminInfo?.id}
                    />
                )}
            </div>

            {/* Close menu when clicking outside */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
