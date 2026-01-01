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
    LogOut,
    Shield,
    Mail,
    Award,
    Handshake
} from 'lucide-react';

export default function AdminSidebar({ onLogout }) {
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

    const menuItems = [
        { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, roles: ['super_admin', 'admin', 'editor'] },
        { href: '/admin/users', label: 'Admin Users', icon: Shield, roles: ['super_admin'] },
        { href: '/admin/contact-messages', label: 'Pesan Kontak', icon: Mail, roles: ['super_admin', 'admin', 'editor'] },
        { href: '/admin/banners', label: 'Banners', icon: Image, roles: ['super_admin', 'admin', 'editor'] },
        { href: '/admin/posts', label: 'Posts', icon: FileText, roles: ['super_admin', 'admin', 'editor'] },
        { href: '/admin/events', label: 'Events', icon: Calendar, roles: ['super_admin', 'admin', 'editor'] },
        { href: '/admin/board-members', label: 'Board Members', icon: Users, roles: ['super_admin', 'admin', 'editor'] },
        { href: '/admin/institutions', label: 'Institutions', icon: Building2, roles: ['super_admin', 'admin', 'editor'] },
        { href: '/admin/individual-members', label: 'Individual Members', icon: UserCircle, roles: ['super_admin', 'admin', 'editor'] },
        { href: '/admin/journals', label: 'Journals', icon: BookOpen, roles: ['super_admin', 'admin', 'editor'] },
        { href: '/admin/documents', label: 'Documents', icon: FileDown, roles: ['super_admin', 'admin', 'editor'] },
        { href: '/admin/achievements', label: 'Prestasi', icon: Award, roles: ['super_admin', 'admin', 'editor'] },
        { href: '/admin/partners', label: 'Mitra', icon: Handshake, roles: ['super_admin', 'admin', 'editor'] },
        { href: '/admin/profile', label: 'Organization Profile', icon: Settings, roles: ['super_admin', 'admin', 'editor'] },
    ];

    // Filter menu items based on role
    const visibleMenuItems = menuItems.filter(item =>
        !item.roles || item.roles.includes(adminRole)
    );

    return (
        <div className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-800">
                <h1 className="text-2xl font-bold">APTIKOM</h1>
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

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                {visibleMenuItems.map((item) => {
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
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-gray-800">
                <button
                    onClick={onLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition w-full"
                >
                    <LogOut size={20} />
                    <span className="text-sm font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
}
