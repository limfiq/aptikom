const { MemberInstitution } = require('@/models');
import MemberTable from '@/components/MemberTable';

export default async function Members() {
    const members = await MemberInstitution.findAll({
        order: [['name', 'ASC']],
        raw: true
    });

    return (
        <div className="bg-gray-50 min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <MemberTable members={members} type="institusi" />
            </div>
        </div>
    );
}
