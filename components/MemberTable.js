'use client';
import { useState, useMemo } from 'react';
import { Search, X, Eye } from 'lucide-react';
import Pagination from '@/components/Pagination';

export default function MemberTable({ members, type = 'institusi' }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMember, setSelectedMember] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const itemsPerPage = 10;

    const openModal = (member) => {
        setSelectedMember(member);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedMember(null), 300);
    };

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
                                        <th scope="col" className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </>
                                ) : (
                                    <>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                                            Nomor Anggota
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                                            Nama Lengkap
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                                            Afiliasi / Institusi
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                                            Masa Berlaku
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">
                                            Aksi
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
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    <button
                                                        onClick={() => openModal(member)}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-lg hover:bg-primary/90 transition-colors"
                                                    >
                                                        <Eye size={14} />
                                                        Detail
                                                    </button>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-primary">{member.employeeNumber}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-bold text-gray-900">{member.name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-600">{member.affiliation}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-600">
                                                        {new Date(member.validityPeriod).toLocaleDateString('id-ID', {
                                                            day: '2-digit',
                                                            month: 'long',
                                                            year: 'numeric'
                                                        })}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    <button
                                                        onClick={() => openModal(member)}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-lg hover:bg-primary/90 transition-colors"
                                                    >
                                                        <Eye size={14} />
                                                        Detail
                                                    </button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={type === 'institusi' ? 5 : 5} className="px-6 py-4 text-center text-gray-500">
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

            {/* Detail Modal */}
            {isModalOpen && selectedMember && (
                <div className="fixed inset-0 z-[9999] overflow-y-auto">
                    {/* Background overlay */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                        onClick={closeModal}
                    ></div>

                    {/* Modal container */}
                    <div className="flex min-h-full items-center justify-center p-4">
                        {/* Modal panel */}
                        <div
                            className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="bg-primary px-6 py-4 flex items-center justify-between rounded-t-lg">
                                <h3 className="text-lg font-bold text-white">Detail Anggota Individu</h3>
                                <button
                                    onClick={closeModal}
                                    className="text-white hover:text-gray-200 transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="bg-white px-6 py-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Nomor Anggota</label>
                                        <p className="text-sm font-medium text-primary">{selectedMember.employeeNumber}</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Nama Lengkap</label>
                                        <p className="text-sm font-bold text-gray-900">{selectedMember.name}</p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Afiliasi / Institusi</label>
                                        <p className="text-sm text-gray-700">{selectedMember.affiliation}</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Program Studi</label>
                                        <p className="text-sm text-gray-700">{selectedMember.studyProgram}</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Peran</label>
                                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                            {selectedMember.role}
                                        </span>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Provinsi</label>
                                        <p className="text-sm text-gray-700">{selectedMember.province}</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Masa Berlaku</label>
                                        <p className="text-sm text-gray-700">
                                            {new Date(selectedMember.validityPeriod).toLocaleDateString('id-ID', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="bg-gray-50 px-6 py-4 flex justify-end rounded-b-lg">
                                <button
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Institution Detail Modal */}
            {isModalOpen && selectedMember && type === 'institusi' && (
                <div className="fixed inset-0 z-[9999] overflow-y-auto">
                    {/* Background overlay */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                        onClick={closeModal}
                    ></div>

                    {/* Modal container */}
                    <div className="flex min-h-full items-center justify-center p-4">
                        {/* Modal panel */}
                        <div
                            className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="bg-primary px-6 py-4 flex items-center justify-between rounded-t-lg">
                                <h3 className="text-lg font-bold text-white">Detail Anggota Institusi</h3>
                                <button
                                    onClick={closeModal}
                                    className="text-white hover:text-gray-200 transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="bg-white px-6 py-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Nama Institusi</label>
                                        <p className="text-sm font-bold text-gray-900">{selectedMember.name}</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Bentuk</label>
                                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                                            {selectedMember.type}
                                        </span>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Provinsi</label>
                                        <p className="text-sm text-gray-700">{selectedMember.province}</p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Alamat</label>
                                        <p className="text-sm text-gray-700">{selectedMember.address || '-'}</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Email</label>
                                        <p className="text-sm text-gray-700">{selectedMember.email || '-'}</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Telepon</label>
                                        <p className="text-sm text-gray-700">{selectedMember.phone || '-'}</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Website</label>
                                        <p className="text-sm text-gray-700">
                                            {selectedMember.website ? (
                                                <a href={selectedMember.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                                    {selectedMember.website}
                                                </a>
                                            ) : '-'}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Status</label>
                                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                            Aktif
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="bg-gray-50 px-6 py-4 flex justify-end rounded-b-lg">
                                <button
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
