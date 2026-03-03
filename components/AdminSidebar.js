'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Image,
    FileText,
    Calendar,
    Users,
    Building2,
    UserCircle,
    BookOpen,
    FileDown,
    Settings,
    Shield,
    Mail,
    Award,
    Handshake
} from 'lucide-react';

export default function AdminSidebar({ isOpen, onClose }) {
    const pathname = usePathname();
    const [adminRole, setAdminRole] = useState('');

    useEffect(() => {
        // Get admin role from localStorage
        const adminInfo = localStorage.getItem('adminInfo');
        if (adminInfo) {
            try {
                const admin = JSON.parse(adminInfo);
                setAdminRole(admin.role || '');
            } catch (error) {
                console.error('Error parsing admin info:', error);
            }
        }
    }, []);

    // Grouped menu items
    const menuGroups = [
        {
            label: null, // Dashboard standalone
            items: [
                { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, roles: ['super_admin', 'admin', 'editor'] }
            ]
        },
        {
            label: 'Master',
            items: [
                { href: '/admin/users', label: 'Admin Users', icon: Shield, roles: ['super_admin'] },
                { href: '/admin/board-members', label: 'Board Members', icon: Users, roles: ['super_admin', 'admin', 'editor'] },
                { href: '/admin/institutions', label: 'Institutions', icon: Building2, roles: ['super_admin', 'admin', 'editor'] },
                { href: '/admin/individual-members', label: 'Individual Members', icon: UserCircle, roles: ['super_admin', 'admin', 'editor'] },
                { href: '/admin/profile', label: 'Organization Profile', icon: Settings, roles: ['super_admin', 'admin', 'editor'] }
            ]
        },
        {
            label: 'Kerjasama',
            items: [
                { href: '/admin/partners', label: 'Mitra', icon: Handshake, roles: ['super_admin', 'admin', 'editor'] },
                { href: '/admin/achievements', label: 'Prestasi', icon: Award, roles: ['super_admin', 'admin', 'editor'] },
                { href: '/admin/contact-messages', label: 'Pesan Kontak', icon: Mail, roles: ['super_admin', 'admin', 'editor'] }
            ]
        },
        {
            label: 'Post',
            items: [
                { href: '/admin/posts', label: 'Posts', icon: FileText, roles: ['super_admin', 'admin', 'editor'] },
                { href: '/admin/banners', label: 'Banners', icon: Image, roles: ['super_admin', 'admin', 'editor'] },
                { href: '/admin/events', label: 'Events', icon: Calendar, roles: ['super_admin', 'admin', 'editor'] }
            ]
        },
        {
            label: 'Info',
            items: [
                { href: '/admin/journals', label: 'Journals', icon: BookOpen, roles: ['super_admin', 'admin', 'editor'] },
                { href: '/admin/documents', label: 'Documents', icon: FileDown, roles: ['super_admin', 'admin', 'editor'] }
            ]
        }
    ];

    // Filter menu items based on role
    const getVisibleItems = (items) => {
        return items.filter(item =>
            !item.roles || item.roles.includes(adminRole)
        );
    };

    return (
        <div className={`fixed inset-y-0 left-0 transform bg-blue-600 text-white w-64 flex flex-col z-50 transition-transform duration-200 ease-in-out 
            ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:inset-auto`}>
            {/* Header */}
            <div className="p-6 border-b border-gray-800 flex flex-col items-center">
                <img src="/logo.png" alt="APTIKOM logo" className="w-24 h-auto mb-3" />
                <h1 className="text-2xl font-bold">APTIKOM Jatim</h1>
                <p className="text-sm text-gray-400 mt-1">Admin Panel</p>
                {adminRole && (
                    <div className="mt-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${adminRole === 'super_admin' ? 'bg-purple-600' :
                            adminRole === 'admin' ? 'bg-blue-600' :
                                'bg-green-600'
                            }`}>
                            {adminRole === 'super_admin' ? 'Super Admin' :
                                adminRole === 'admin' ? 'Admin' : 'Editor'}
                        </span>
                    </div>
                )}
            </div>

            {/* Close button for mobile */}
            <div className="md:hidden p-4 flex justify-end">
                <button onClick={onClose} className="text-gray-300 hover:text-white">
                    ×
                </button>
            </div>
            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-6">
                {menuGroups.map((group, groupIdx) => {
                    const visibleItems = getVisibleItems(group.items);

                    if (visibleItems.length === 0) return null;

                    return (
                        <div key={groupIdx} className="space-y-2">
                            {/* Group Label */}
                            {group.label && (
                                <h3 className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    {group.label}
                                </h3>
                            )}

                            {/* Group Items */}
                            <div className="space-y-1">
                                {visibleItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = pathname === item.href;

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive
                                                ? 'bg-blue-600 text-white'
                                                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                                }`}
                                        >
                                            <Icon size={20} />
                                            <span className="text-sm font-medium">{item.label}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </nav>
        </div>
    );
}
