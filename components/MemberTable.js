'use client';
import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import Pagination from '@/components/Pagination';

export default function MemberTable({ members, type = 'institusi' }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 10;

    // Filter members based on search query
    const filteredMembers = useMemo(() => {
        if (!searchQuery) return members;

        const query = searchQuery.toLowerCase();
        return members.filter(member =>
            member.name.toLowerCase().includes(query) ||
            (member.province && member.province.toLowerCase().includes(query)) ||
            (member.type && member.type.toLowerCase().includes(query)) ||
            (member.affiliation && member.affiliation.toLowerCase().includes(query)) ||
            (member.role && member.role.toLowerCase().includes(query))
        );
    }, [members, searchQuery]);

    // Paginate filtered members
    const paginatedMembers = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredMembers.slice(startIndex, endIndex);
    }, [filteredMembers, currentPage]);

    // Reset to page 1 when search changes
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-primary">
                        {type === 'institusi' ? 'Direktori Anggota Institusi' : 'Direktori Anggota Individu'}
                    </h1>
                    <p className="text-gray-600">
                        {type === 'institusi'
                            ? 'Daftar institusi pendidikan tinggi anggota APTIKOM.'
                            : 'Daftar anggota perorangan (dosen, praktisi, mahasiswa) APTIKOM.'}
                    </p>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        placeholder={type === 'institusi' ? 'Cari institusi...' : 'Cari anggota...'}
                        value={searchQuery}
                        onChange={handleSearch}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-[#1A2B48] text-white">
                            <tr>
                                {type === 'institusi' ? (
                                    <>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                                            Nama Institusi
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                                            Bentuk
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                                            Provinsi
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider">
                                            Status
                                        </th>
                                    </>
                                ) : (
                                    <>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                                            Nama Lengkap
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                                            Afiliasi / Institusi
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                                            Peran
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                                            Provinsi
                                        </th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedMembers.length > 0 ? (
                                paginatedMembers.map((member) => (
                                    <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                                        {type === 'institusi' ? (
                                            <>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xs">
                                                            {member.logo}
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{member.name}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-600">{member.type}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-600">{member.province}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        Aktif
                                                    </span>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-bold text-gray-900">{member.name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-600">{member.affiliation}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                        {member.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-600">{member.province}</div>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                                        {searchQuery ? 'Tidak ada data yang sesuai dengan pencarian.' : 'Belum ada data.'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    totalItems={filteredMembers.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />
            </div>
        </>
    );
}
