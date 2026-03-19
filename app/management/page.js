import Link from 'next/link';
const { BoardMember } = require('@/models');

export const dynamic = 'force-dynamic';

export default async function Management() {
    const boardMembers = await BoardMember.findAll({
        order: [['order', 'ASC']],
        raw: true
    });
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="bg-primary py-16 text-center text-white">
                <h1 className="text-4xl font-bold mb-4">Susunan Pengurus Pusat</h1>
                <p className="text-xl opacity-90 max-w-2xl mx-auto">
                    Masa Bakti 2022 - 2026
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Executive Board */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-primary mb-8 border-l-4 border-secondary pl-4">Leader</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {boardMembers.filter(m => m.department === 'Executive').map((member) => (
                            <div key={member.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden text-center p-6 border border-gray-100">
                                <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4 overflow-hidden border-4 border-gray-100">
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="text-lg font-bold text-primary">{member.name}</h3>
                                <p className="text-secondary font-medium">{member.position}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Vice Chairmen */}
                <div>
                    <h2 className="text-2xl font-bold text-primary mb-8 border-l-4 border-secondary pl-4">Departemen</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {boardMembers.filter(m => m.department === 'Departemen').map((member) => (
                            <div key={member.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden text-center p-6 border border-gray-100">
                                <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4 overflow-hidden border-4 border-gray-100">
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="text-lg font-bold text-primary">{member.name}</h3>
                                <p className="text-secondary font-medium">{member.position}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
