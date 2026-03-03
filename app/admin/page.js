'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, MessageSquare, Award, Users, Plus, FileText, Calendar, Building2 } from 'lucide-react';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        posts: 0,
        events: 0,
        messages: 0,
        members: 0,
        achievements: 0,
        partners: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            // Fetch data from public APIs
            const [postsRes, achievementsRes, partnersRes] = await Promise.all([
                fetch('/api/posts').then(r => r.json()).catch(() => ({ data: [] })),
                fetch('/api/achievements').then(r => r.json()).catch(() => ({ data: [] })),
                fetch('/api/partners').then(r => r.json()).catch(() => ({ data: [] }))
            ]);

            const posts = postsRes?.data || [];
            const achievements = achievementsRes?.data || [];
            const partners = partnersRes?.data || [];

            setStats({
                posts: Array.isArray(posts) ? posts.length : 0,
                events: 0,
                messages: Math.floor(Math.random() * 50) + 20,
                members: Math.floor(Math.random() * 100) + 50,
                achievements: Array.isArray(achievements) ? achievements.length : 0,
                partners: Array.isArray(partners) ? partners.length : 0
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    // KPI Cards with trend indicators
    const kpiCards = [
        { label: 'Revenue', value: '$23,569.00', trend: '+12.5%', color: 'bg-emerald-50', accentColor: 'text-emerald-600' },
        { label: 'Orders', value: '3,435', trend: '+8.2%', color: 'bg-purple-50', accentColor: 'text-purple-600' },
        { label: 'Customers', value: '1,245', trend: '+5.7%', color: 'bg-blue-50', accentColor: 'text-blue-600' },
        { label: 'Bounce Rate', value: '47.0%', trend: '+1.1%', color: 'bg-orange-50', accentColor: 'text-orange-600' }
    ];

    // Activity data
    const recentActivity = [
        { icon: '📝', title: 'New post created', description: 'Admin uploaded new article', time: '2 hours ago' },
        { icon: '👤', title: 'New member registered', description: 'Jane Smith joined APTIKOM', time: '4 hours ago' },
        { icon: '⚠️', title: 'Low resource alert', description: 'Server memory usage high', time: '1 hour ago' },
        { icon: '⭐', title: 'New review posted', description: 'User gave 5-star rating', time: '30 minutes ago' }
    ];

    // Top items data
    const topItems = [
        { name: 'Workshop Kurikulum OBE', value: 156, revenue: '$12,250', status: 'active' },
        { name: 'Seminar Akreditasi', value: 89, revenue: '$8,450', status: 'active' },
        { name: 'Konferensi APTIKOM', value: 56, revenue: '$4,680', status: 'pending' },
        { name: 'Pelatihan Dosen', value: 38, revenue: '$1,900', status: 'active' }
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition flex items-center gap-2">
                    <Plus size={18} />
                    Add New
                </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiCards.map((card, idx) => (
                    <div key={idx} className={`${card.color} rounded-xl p-6 shadow-sm`}>
                        <p className="text-gray-600 text-sm mb-2">{card.label}</p>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{card.value}</h3>
                        <div className={`inline-flex items-center gap-1 text-sm font-medium ${card.accentColor}`}>
                            <TrendingUp size={16} />
                            {card.trend}
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Sales Overview */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Sales Overview</h3>
                    <svg viewBox="0 0 500 300" className="w-full h-auto">
                        {/* Line chart placeholder */}
                        <defs>
                            <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style={{stopColor: '#3b82f6', stopOpacity: 0.3}} />
                                <stop offset="100%" style={{stopColor: '#3b82f6', stopOpacity: 0}} />
                            </linearGradient>
                        </defs>
                        {/* Grid */}
                        <line x1="40" y1="30" x2="40" y2="250" stroke="#e5e7eb" strokeWidth="1" />
                        <line x1="40" y1="250" x2="480" y2="250" stroke="#e5e7eb" strokeWidth="1" />
                        {/* Data lines */}
                        <polyline points="50,200 100,180 150,150 200,140 250,120 300,100 350,90 400,80 450,70" fill="none" stroke="#3b82f6" strokeWidth="2" />
                        <polyline points="50,220 100,210 150,190 200,175 250,160 300,150 350,145 400,140 450,130" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.7" />
                        {/* Labels */}
                        <text x="50" y="270" textAnchor="middle" fontSize="12" fill="#9ca3af">Jan</text>
                        <text x="100" y="270" textAnchor="middle" fontSize="12" fill="#9ca3af">Feb</text>
                        <text x="150" y="270" textAnchor="middle" fontSize="12" fill="#9ca3af">Mar</text>
                        <text x="200" y="270" textAnchor="middle" fontSize="12" fill="#9ca3af">Apr</text>
                        <text x="250" y="270" textAnchor="middle" fontSize="12" fill="#9ca3af">May</text>
                        <text x="300" y="270" textAnchor="middle" fontSize="12" fill="#9ca3af">Jun</text>
                        <text x="350" y="270" textAnchor="middle" fontSize="12" fill="#9ca3af">Jul</text>
                        <text x="400" y="270" textAnchor="middle" fontSize="12" fill="#9ca3af">Aug</text>
                        <text x="450" y="270" textAnchor="middle" fontSize="12" fill="#9ca3af">Sep</text>
                    </svg>
                    <div className="flex gap-6 mt-4 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="text-gray-600">Revenue</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-gray-600">Profit</span>
                        </div>
                    </div>
                </div>

                {/* Traffic Sources - Donut Chart */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Traffic Sources</h3>
                    <div className="flex justify-center mb-4">
                        <svg width="200" height="200" viewBox="0 0 200 200">
                            <circle cx="100" cy="100" r="90" fill="none" stroke="#3b82f6" strokeWidth="30" strokeDasharray="141 565" transform="rotate(-90 100 100)" />
                            <circle cx="100" cy="100" r="90" fill="none" stroke="#10b981" strokeWidth="30" strokeDasharray="141 565" strokeDashoffset="-141" transform="rotate(-90 100 100)" opacity="0.7" />
                            <circle cx="100" cy="100" r="90" fill="none" stroke="#f97316" strokeWidth="30" strokeDasharray="141 565" strokeDashoffset="-282" transform="rotate(-90 100 100)" opacity="0.5" />
                            <circle cx="100" cy="100" r="70" fill="white" />
                        </svg>
                    </div>
                    <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-gray-600">Direct</span>
                            </div>
                            <span className="font-medium text-gray-900">25%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-gray-600">Social</span>
                            </div>
                            <span className="font-medium text-gray-900">45%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                <span className="text-gray-600">Referral</span>
                            </div>
                            <span className="font-medium text-gray-900">30%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Activity and Top Items */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {recentActivity.map((item, idx) => (
                            <div key={idx} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0">
                                <div className="text-2xl">{item.icon}</div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900 text-sm">{item.title}</p>
                                    <p className="text-xs text-gray-500">{item.description}</p>
                                    <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Products */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Top Activities</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left py-2 px-2 text-gray-600 font-medium">Activity</th>
                                    <th className="text-right py-2 px-2 text-gray-600 font-medium">Count</th>
                                    <th className="text-right py-2 px-2 text-gray-600 font-medium">Value</th>
                                    <th className="text-center py-2 px-2 text-gray-600 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topItems.map((item, idx) => (
                                    <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50">
                                        <td className="py-3 px-2 font-medium text-gray-900">{item.name}</td>
                                        <td className="py-3 px-2 text-right text-gray-600">{item.value}</td>
                                        <td className="py-3 px-2 text-right font-medium text-gray-900">{item.revenue}</td>
                                        <td className="py-3 px-2 text-center">
                                            <span className={`text-xs font-medium px-2 py-1 rounded ${
                                                item.status === 'active' 
                                                    ? 'bg-green-100 text-green-700' 
                                                    : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
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
