'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AdminSidebar from '../../components/AdminSidebar';
import AdminUserMenu from '../../components/AdminUserMenu';

export default function AdminLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
    const [adminInfo, setAdminInfo] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        // Skip authentication check for login page
        if (pathname === '/admin/login') {
            setLoading(false);
            return;
        }

        // Check authentication for other admin pages
        const token = localStorage.getItem('adminToken');
        const info = localStorage.getItem('adminInfo');

        if (!token || !info) {
            router.push('/admin/login');
            return;
        }

        setAdminInfo(JSON.parse(info));
        setLoading(false);
    }, [router, pathname]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminInfo');
        router.push('/admin/login');
    };

    // For login page, render without layout
    if (pathname === '/admin/login') {
        return children;
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1" onClick={() => sidebarOpen && setSidebarOpen(false)}>
                {/* Top Bar */}
                <div className="bg-white border-b border-gray-200 px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {/* sidebar toggle for mobile */}
                            <button
                                className="md:hidden text-gray-600 hover:text-gray-900"
                                onClick={() => setSidebarOpen(true)}
                            >
                                ☰
                            </button>

                            <AdminUserMenu 
                                adminInfo={adminInfo}
                                onLogout={handleLogout}
                            />
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
