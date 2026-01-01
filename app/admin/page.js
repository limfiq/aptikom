'use client';

import { useEffect, useState } from 'react';
import { FileText, Calendar, Users, Building2, UserCircle, BookOpen, FileDown } from 'lucide-react';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        posts: 0,
        events: 0,
        boardMembers: 0,
        institutions: 0,
        individualMembers: 0,
        journals: 0,
        documents: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const headers = {
                'Authorization': `Bearer ${token}`
            };

            // Fetch counts from each endpoint
            const [posts, events, members, institutions, individuals, journals, documents] = await Promise.all([
                fetch('/api/admin/posts?limit=1', { headers }).then(r => r.json()),
                fetch('/api/admin/events?limit=1', { headers }).then(r => r.json()),
                fetch('/api/admin/board-members', { headers }).then(r => r.json()),
                fetch('/api/admin/institutions?limit=1', { headers }).then(r => r.json()),
                fetch('/api/admin/individual-members?limit=1', { headers }).then(r => r.json()),
                fetch('/api/admin/journals', { headers }).then(r => r.json()),
                fetch('/api/admin/documents?limit=1', { headers }).then(r => r.json())
            ]);

            setStats({
                posts: posts.total || 0,
                events: events.total || 0,
                boardMembers: members.members?.length || 0,
                institutions: institutions.total || 0,
                individualMembers: individuals.total || 0,
                journals: journals.journals?.length || 0,
                documents: documents.total || 0
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        { label: 'Posts', value: stats.posts, icon: FileText, color: 'bg-blue-500', href: '/admin/posts' },
        { label: 'Events', value: stats.events, icon: Calendar, color: 'bg-green-500', href: '/admin/events' },
        { label: 'Board Members', value: stats.boardMembers, icon: Users, color: 'bg-purple-500', href: '/admin/board-members' },
        { label: 'Institutions', value: stats.institutions, icon: Building2, color: 'bg-orange-500', href: '/admin/institutions' },
        { label: 'Individual Members', value: stats.individualMembers, icon: UserCircle, color: 'bg-pink-500', href: '/admin/individual-members' },
        { label: 'Journals', value: stats.journals, icon: BookOpen, color: 'bg-indigo-500', href: '/admin/journals' },
        { label: 'Documents', value: stats.documents, icon: FileDown, color: 'bg-teal-500', href: '/admin/documents' }
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <a
                            key={stat.label}
                            href={stat.href}
                            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition cursor-pointer"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                                <div className={`${stat.color} p-3 rounded-lg`}>
                                    <Icon className="text-white" size={24} />
                                </div>
                            </div>
                        </a>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a
                        href="/admin/posts"
                        className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition text-center"
                    >
                        <FileText className="mx-auto mb-2 text-blue-600" size={32} />
                        <p className="font-medium text-gray-900">Manage Posts</p>
                    </a>
                    <a
                        href="/admin/events"
                        className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition text-center"
                    >
                        <Calendar className="mx-auto mb-2 text-green-600" size={32} />
                        <p className="font-medium text-gray-900">Manage Events</p>
                    </a>
                    <a
                        href="/admin/profile"
                        className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition text-center"
                    >
                        <Building2 className="mx-auto mb-2 text-purple-600" size={32} />
                        <p className="font-medium text-gray-900">Organization Profile</p>
                    </a>
                </div>
            </div>
        </div>
    );
}
